const fs = require('fs')
const db = require('./config/db');
const Provinsi = db.Provinsi;
const Kota = db.Kota;
const Kecamatan = db.Kecamatan;
const Kelurahan = db.Kelurahan;
const Op = db.Sequelize.Op;
const colors = require('colors')
const dotenv = require('dotenv')

const provinsi = JSON.parse(fs.readFileSync(`${__dirname}/data/provinsi.json`, 'utf-8'))
const kota = JSON.parse(fs.readFileSync(`${__dirname}/data/kota.json`, 'utf-8'))
const kecamatan = JSON.parse(fs.readFileSync(`${__dirname}/data/kecamatan.json`, 'utf-8'))
const kelurahan = JSON.parse(fs.readFileSync(`${__dirname}/data/kelurahan.json`, 'utf-8'))

// Import data 
const importData = async () => {
    try {
        await Provinsi.bulkCreate(provinsi)
        await Kota.bulkCreate(kota)
        await Kecamatan.bulkCreate(kecamatan)
        // await Kelurahan.bulkCreate(kelurahan)

        console.log('Data Imported'.green.inverse)
        process.exit()
    } catch (err) {
        console.error(err)
    }
}

// Delete data
const deleteData = async () => {
    try {
        await Provinsi.bulkDelete()

        console.log('Data Deleted'.red.inverse)
        process.exit()
    } catch (err) {
        console.error(err)
    }
}

if (process.argv[2] === '-i') {
    importData()
} else if (process.argv[2] === '-d') {
    deleteData()
}