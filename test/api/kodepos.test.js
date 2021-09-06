let chai = require("chai");
let chaiHttp = require("chai-http");
const app = require("../../server");
const db = require('../../config/db');


//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('kodepos API', () => {
    // Create kodepos
    describe("Create kodepos", () => {
        const kodepos = {
            ID_Postcode: 90000,
            Postcode: 99,
            Provinsi_Code: 11,
            Kabkota_Code: 1101,
            Kecamatan_Code: 1101010,
            Kelurahan_Code: 1101010001,
            Status: "Y"
        }

        it("Harus Menenyimpan data kodepos", (done) => {
            chai.request(app)
                .post("/kodepos")
                .send(kodepos)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

    });

    // Get Kota
    describe("Get kodepos", () => {
        const kodepos = {
            ID_Postcode: 90000,
        }

        it("Harus manampilkan data kodepos", (done) => {
            chai.request(app)
                .get("/kodepos")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("Harus menampilkan data kodepos by ID", (done) => {
            chai.request(app)
                .get(`/kodepos/${kodepos.ID_Postcode}`)
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
    describe("PUT kodepos", () => {
        const kodepos = {
            Postcode: 99,
            Provinsi_Code: 11,
            Kabkota_Code: 1101,
            Kecamatan_Code: 1101010,
            Kelurahan_Code: 1101010001,
            Status: "N"
        }

        it("Harus update data kodepos", (done) => {
            chai.request(app)
                .put(`/kodepos/90000`)
                .send(kodepos)
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
    describe("Delete kodepos", () => {
        const kodepos = {
            ID_Postcode: 90000,
        }

        it("Harus menghapus data kodepos", (done) => {
            chai.request(app)
                .delete(`/kodepos/${kodepos.ID_Postcode}`)
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