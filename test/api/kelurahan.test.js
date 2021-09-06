let chai = require("chai");
let chaiHttp = require("chai-http");
const app = require("../../server");
const db = require('../../config/db');


//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Kelurahan API', () => {
    // Create Kelurahan
    describe("Create Kelurahan", () => {
        const kelurahan = {
            ID_Kelurahan: 90000,
            Kelurahan_Code: 99,
            Kelurahan_Name: "Bekasi Merdeka",
            Provinsi_Code: 11,
            Kabkota_Code: 1101,
            Kecamatan_Code: 1101010,
            Status: "Y"
        }

        it("Harus Menenyimpan data Kelurahan", (done) => {
            chai.request(app)
                .post("/kelurahan")
                .send(kelurahan)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it("Harus gagal code kelurahan sudah digunakan! ", (done) => {
            chai.request(app)
                .post("/kelurahan")
                .send(kelurahan)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

    });

    // Get Kota
    describe("Get kelurahan", () => {
        const kelurahan = {
            ID_Kelurahan: 90000,
        }

        it("Harus manampilkan data kelurahan", (done) => {
            chai.request(app)
                .get("/kelurahan")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("Harus menampilkan data kelurahan by ID", (done) => {
            chai.request(app)
                .get(`/kelurahan/${kelurahan.ID_Kelurahan}`)
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
    describe("PUT Kelurahan", () => {
        const kelurahan = {
            Kelurahan_Code: 99,
            Kelurahan_Name: "Bekasi Merdeka",
            Provinsi_Code: 11,
            Kabkota_Code: 1101,
            Kecamatan_Code: 1101010,
            Status: "Y"
        }

        it("Harus update data kelurahan", (done) => {
            chai.request(app)
                .put(`/kelurahan/90000`)
                .send(kelurahan)
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
    describe("Delete Kelurahan", () => {
        const kelurahan = {
            ID_Kelurahan: 90000,
        }

        it("Harus menghapus data Kelurahan", (done) => {
            chai.request(app)
                .delete(`/kelurahan/${kelurahan.ID_Kelurahan}`)
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