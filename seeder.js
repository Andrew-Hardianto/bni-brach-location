try {
    require('tsx/cjs')
} catch (e) { }

const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

const colors = require('colors')
const dbRaw = require('./config/db');
const db = dbRaw.default || dbRaw;

const Provinsi = db.Provinsi;
const Kota = db.Kota;
const Kecamatan = db.Kecamatan;
const Kelurahan = db.Kelurahan;
const Kodepos = db.Kodepos;
const Op = db.Sequelize.Op;

const provinsi = JSON.parse(fs.readFileSync(`${__dirname}/data/provinsi.json`, 'utf-8'))
const kota = JSON.parse(fs.readFileSync(`${__dirname}/data/kota.json`, 'utf-8'))
const kecamatan = JSON.parse(fs.readFileSync(`${__dirname}/data/kecamatan.json`, 'utf-8'))
const kelurahan = JSON.parse(fs.readFileSync(`${__dirname}/data/kelurahan.json`, 'utf-8'))
const kodepos = JSON.parse(fs.readFileSync(`${__dirname}/data/kodepos.json`, 'utf-8'))

// Import data
const batchInsert = async (model, data, entityName, batchSize = 2500) => {
    console.log(`Mengimpor ${entityName} (${data.length} records)...`.cyan)
    for (let i = 0; i < data.length; i += batchSize) {
        const chunk = data.slice(i, i + batchSize)
        await model.bulkCreate(chunk, { validate: false, hooks: false, ignoreDuplicates: true })
        const progress = Math.min(i + batchSize, data.length)
        process.stdout.write(`\r  -> Selesai ${progress}/${data.length} records`)
    }
    console.log('')
}

const importData = async () => {
    try {
        console.log('Memulai proses sinkronisasi database...'.yellow)
        await db.sequelize.sync()

        // Nonaktifkan Foreign Key Checks sementara untuk insert data
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')

        // 1. Provinsi
        await batchInsert(Provinsi, provinsi, 'Provinsi')

        // 2. Kota / Kabupaten
        await batchInsert(Kota, kota, 'Kabupaten/Kota')

        // 3. Kecamatan
        await batchInsert(Kecamatan, kecamatan, 'Kecamatan')

        // 4. Kelurahan
        await batchInsert(Kelurahan, kelurahan, 'Kelurahan')

        // 5. Kodepos - Sanitasi relasi Foreign Key agar tidak ada orphan reference
        console.log('Menyiapkan dan memvalidasi data Kodepos...'.yellow)
        const provCodes = new Set(provinsi.map(p => p.Provinsi_Code))
        const kotaCodes = new Set(kota.map(k => k.Kabkota_Code))
        const kecCodes = new Set(kecamatan.map(k => k.Kecamatan_Code))
        const kelMap = new Map(kelurahan.map(k => [k.Kelurahan_Code, k]))

        const sanitizedKodepos = kodepos.map(item => {
            const row = { ...item }

            // Cocokkan dari data kelurahan terdaftar jika memungkinkan
            if (row.Kelurahan_Code && kelMap.has(row.Kelurahan_Code)) {
                const parentKel = kelMap.get(row.Kelurahan_Code)
                if (row.Kecamatan_Code !== parentKel.Kecamatan_Code && kecCodes.has(parentKel.Kecamatan_Code)) {
                    row.Kecamatan_Code = parentKel.Kecamatan_Code
                }
                if (row.Kabkota_Code !== parentKel.Kabkota_Code && kotaCodes.has(parentKel.Kabkota_Code)) {
                    row.Kabkota_Code = parentKel.Kabkota_Code
                }
                if (row.Provinsi_Code !== parentKel.Provinsi_Code && provCodes.has(parentKel.Provinsi_Code)) {
                    row.Provinsi_Code = parentKel.Provinsi_Code
                }
            } else if (row.Kelurahan_Code && !kelMap.has(row.Kelurahan_Code)) {
                row.Kelurahan_Code = null
            }

            // Pastikan tidak ada kode kecamatan / kota / provinsi yang tidak ada di master
            if (row.Kecamatan_Code && !kecCodes.has(row.Kecamatan_Code)) {
                row.Kecamatan_Code = null
            }
            if (row.Kabkota_Code && !kotaCodes.has(row.Kabkota_Code)) {
                row.Kabkota_Code = null
            }
            if (row.Provinsi_Code && !provCodes.has(row.Provinsi_Code)) {
                row.Provinsi_Code = null
            }

            return row
        })

        await batchInsert(Kodepos, sanitizedKodepos, 'Kodepos')

        console.log('\nData Berhasil Diimport!'.green.inverse)
        process.exit(0)
    } catch (err) {
        console.error('\nTerjadi kesalahan saat import data:'.red, err)
        process.exit(1)
    } finally {
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;').catch(() => { })
    }
}

// Delete data
const deleteData = async () => {
    try {
        console.log('Menghapus semua data wilayah & kodepos...'.yellow)
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')

        await db.sequelize.query('TRUNCATE TABLE Master_Kodepos;').catch(() => Kodepos.destroy({ where: {} }))
        await db.sequelize.query('TRUNCATE TABLE Master_Kelurahan;').catch(() => Kelurahan.destroy({ where: {} }))
        await db.sequelize.query('TRUNCATE TABLE Master_Kecamatan;').catch(() => Kecamatan.destroy({ where: {} }))
        await db.sequelize.query('TRUNCATE TABLE Master_Kabupaten_Kota;').catch(() => Kota.destroy({ where: {} }))
        await db.sequelize.query('TRUNCATE TABLE Master_Provinsi;').catch(() => Provinsi.destroy({ where: {} }))

        console.log('Data Berhasil Dihapus!'.red.inverse)
        process.exit(0)
    } catch (err) {
        console.error('Terjadi kesalahan saat menghapus data:'.red, err)
        process.exit(1)
    } finally {
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;').catch(() => { })
    }
}

if (process.argv[2] === '-i') {
    importData()
} else if (process.argv[2] === '-d') {
    deleteData()
} else {
    console.log('Silakan tentukan argumen:'.yellow)
    console.log('  -i : Import data ke database')
    console.log('  -d : Hapus semua data seeder dari database')
    process.exit(1)
}