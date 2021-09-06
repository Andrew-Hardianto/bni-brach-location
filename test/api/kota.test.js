let chai = require("chai");
let chaiHttp = require("chai-http");
const app = require("../../server");
const db = require('../../config/db');
const Kota = db.Kota;

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Kota API', () => {
    // Create Kota
    describe("Create Kota", () => {
        const kota = {
            ID_Kabkota: 1000,
            Kabkota_Code: 99,
            Kabkota_Name: "Bekasi Merdeka",
            BI_Location_Code: 0042,
            Antasena_Code: 4002,
            Provinsi_Code: 11,
            Kabkota_Flag: 'Kotamadya',
            Status: "Y"
        }

        it("Harus Menenyimpan data Kota/kabupaten", (done) => {
            chai.request(app)
                .post("/kota")
                .send(kota)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it("Harus gagal code kota sudah digunakan! ", (done) => {
            chai.request(app)
                .post("/kota")
                .send(kota)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

    });

    // Get Kota
    describe("Get Kota", () => {
        const kota = {
            ID_Kabkota: 1000,
        }

        it("Harus manampilkan data Kota", (done) => {
            chai.request(app)
                .get("/kota")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("Harus menampilkan data Kota by ID", (done) => {
            chai.request(app)
                .get(`/kota/${kota.ID_Kabkota}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        // it("Harus gagal kota tidak ditemukan! ", (done) => {
        //     chai.request(app)
        //         .get("/provinsi/99")
        //         .end((err, res) => {
        //             res.should.have.status(500);
        //             done();
        //         });
        // });

    });

    // update Kota
    describe("PUT Kota", () => {
        const kota = {
            Kabkota_Code: 99,
            Kabkota_Name: "Bekasi Merdeka",
            BI_Location_Code: 0042,
            Antasena_Code: 4002,
            Provinsi_Code: 11,
            Kabkota_Flag: 'Kotamadya',
            Status: "N"
        }

        it("Harus update data Kota", (done) => {
            chai.request(app)
                .put(`/kota/1000`)
                .send(kota)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        // it("Harus gagal update data provinsi! ", (done) => {
        //     chai.request(app)
        //         .put("/provinsi/99")
        //         .send(provinsi)
        //         .end((err, res) => {
        //             res.should.have.status(500);
        //             done();
        //         });
        // });

    });

    // delete Kota
    describe("Delete Kota", () => {
        const kota = {
            ID_Kabkota: 1000,
        }

        it("Harus menghapus data Kota", (done) => {
            chai.request(app)
                .delete(`/kota/${kota.ID_Kabkota}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        // it("Harus gagal menghapus data provinsi! ", (done) => {
        //     chai.request(app)
        //         .put("/provinsi/99")
        //         .send(provinsi)
        //         .end((err, res) => {
        //             res.should.have.status(500);
        //             done();
        //         });
        // });

    });
});