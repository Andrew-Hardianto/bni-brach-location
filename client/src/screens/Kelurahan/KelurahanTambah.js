import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { createKelurahan } from '../../actions/kelurahanActions';
import { listKecamatan } from '../../actions/kecamatanActions';

const initialState = { Kelurahan_Code: '', Kelurahan_Name: '', Kecamatan_Code: '' }

const KelurahanTambah = ({ history }) => {

    const [data, setData] = useState(initialState);

    const dispatch = useDispatch();

    const kelurahanCreate = useSelector(state => state.kelurahanCreate);
    const { loading, error, success } = kelurahanCreate;

    const kecamatanList = useSelector(state => state.kecamatanList);
    const { kecamatan } = kecamatanList;

    useEffect(() => {
        dispatch(listKecamatan())
        if (success) {
            history.push('/location/kelurahan')
        }
    }, [history, success])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createKelurahan(data))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Tambah Kelurahan</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="Kelurahan_Code">
                            <Form.Label>Kode Kelurahan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Kelurahan..."
                                name="Kelurahan_Code"
                                // value={id}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="Kelurahan_Name">
                            <Form.Label>Nama Kelurahan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Kelurahan..."
                                name="Kelurahan_Name"
                                // value={nama}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="Kecamatan_Code">
                            <Form.Label>Kecamatan</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="Kecamatan_Code"
                                // value={kecamatanId}
                                onChange={handleChange}
                            >
                                <option value="">- Pilih Kecamatan -</option>
                                {kecamatan.filter((kc) => kc.Kecamatan_Code.toString().includes(data.Kelurahan_Code.toString().substring(0, 7)))
                                    .map((data) => (
                                        <option key={data.ID_Kecamatan} value={data.Kecamatan_Code} >{data.Kecamatan_Name}</option>
                                    ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Link to={'/location/kelurahan'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div >
    )
}

export default KelurahanTambah
