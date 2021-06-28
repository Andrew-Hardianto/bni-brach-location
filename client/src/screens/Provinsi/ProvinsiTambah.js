import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import { createProvinsi } from '../../actions/provinsiActions';
import Message from '../../components/Message';

const ProvinsiTambah = ({ history }) => {
    const [kode, setKode] = useState('');
    const [nama, setNama] = useState('');

    const dispatch = useDispatch();

    const provinsiCreate = useSelector(state => state.provinsiCreate);
    const { loading, error, success } = provinsiCreate;

    useEffect(() => {
        if (success) {
            history.push('/location/provinsi')
        }
    }, [history, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProvinsi(kode, nama))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Tambah Provinsi</Card.Title>
                    {error && <Message variant="danger" >{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="id">
                            <Form.Label>Kode Provinsi</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Provinsi..."
                                value={kode}
                                onChange={(e) => setKode(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="nama">
                            <Form.Label>Nama Provinsi</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Provinsi..."
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Link to={'/location/provinsi'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div >
    )
}

export default ProvinsiTambah
