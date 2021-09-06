let chai = require("chai");
let chaiHttp = require("chai-http");
const app = require("../../server");
const db = require('../../config/db');
const Provinsi = db.Provinsi;

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Provinsi API', () => {
    // Create Provinsi
    describe("Create Provinsi", () => {
        const provinsi = {
            ID_Provinsi: 50,
            Provinsi_Code: 99,
            Provinsi_Name: "Bekasi Merdeka",
            BI_Location_Code: 0042,
            Status: "Y"
        }

        it("Harus Menenyimpan data Provinsi", (done) => {
            chai.request(app)
                .post("/provinsi")
                .send(provinsi)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it("Harus gagal provinsi code sudah digunakan! ", (done) => {
            chai.request(app)
                .post("/provinsi")
                .send(provinsi)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

    });

    // Get Provinsi
    describe("Get Provinsi", () => {
        const provinsi = {
            ID_Provinsi: 50,
        }

        it("Harus manampilkan data Provinsi", (done) => {
            chai.request(app)
                .get("/provinsi")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("Harus menampilkan data Provinsi by ID", (done) => {
            chai.request(app)
                .get(`/provinsi/${provinsi.ID_Provinsi}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("Harus gagal provinsi tidak ditemukan! ", (done) => {
            chai.request(app)
                .get("/provinsi/99")
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

    });

    // update Provinsi
    describe("PUT Provinsi", () => {
        const provinsi = {
            Provinsi_Code: 99,
            Provinsi_Name: "Bekasi Merdeka",
            BI_Location_Code: 0042,
            Status: "N"
        }

        it("Harus update data Provinsi", (done) => {
            chai.request(app)
                .put(`/provinsi/50`)
                .send(provinsi)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("Harus gagal update data provinsi! ", (done) => {
            chai.request(app)
                .put("/provinsi/99")
                .send(provinsi)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

    });

    // delete Provinsi
    describe("Delete Provinsi", () => {
        const provinsi = {
            ID_Provinsi: 50,
        }

        it("Harus menghapus data Provinsi", (done) => {
            chai.request(app)
                .delete(`/provinsi/${provinsi.ID_Provinsi}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it("Harus gagal menghapus data provinsi! ", (done) => {
            chai.request(app)
                .put("/provinsi/99")
                .send(provinsi)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });

    });
});