let chai = require("chai");
let chaiHttp = require("chai-http");
const app = require("../../server");
const db = require('../../config/db');


//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Kecamatan API', () => {
    // Create Kecamatan
    describe("Create Kecamatan", () => {
        const kecamatan = {
            ID_Kecamatan: 8000,
            Kecamatan_Code: 99,
            Kecamatan_Name: "Bekasi Merdeka",
            Provinsi_Code: 11,
            Kabkota_Code: 1101,
            Status: "Y"
        }

        it("Harus Menenyimpan data Kecamatan", (done) => {
            chai.request(app)
                .post("/kecamatan")
                .send(kecamatan)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it("Harus gagal code kecamatan sudah digunakan! ", (done) => {
            chai.request(app)
                .post("/kecamatan")
                .send(kecamatan)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

    });

    // Get Kota
    describe("Get kecamatan", () => {

        it("Harus manampilkan data kecamatan", (done) => {
            chai.request(app)
                .get("/kecamatan")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("Harus menampilkan data kecamatan by ID", (done) => {
            chai.request(app)
                .get(`/kecamatan/7232`)
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
        const kecamatan = {
            Kecamatan_Code: 99,
            Kecamatan_Name: "Bekasi Merdeka",
            Provinsi_Code: 11,
            Kabkota_Code: 1101,
            Status: "N"
        }

        it("Harus update data kecamatan", (done) => {
            chai.request(app)
                .put(`/kecamatan/7232`)
                .send(kecamatan)
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
    describe("Delete Kecamatan", () => {
        const kecamatan = {
            ID_Kecamatan: 7232,
        }

        it("Harus menghapus data Kecamatan", (done) => {
            chai.request(app)
                .delete(`/kecamatan/${kecamatan.ID_Kecamatan}`)
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