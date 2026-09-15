import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { createWilayah } from '../../actions/wilayahActions';

const initialState = { Region_Code: '', Region_Subname: '', Region_Name: '', Status: '' }

const WilayahTambah = ({ history }) => {
    const [data, setData] = useState(initialState)

    const dispatch = useDispatch();

    const wilayahCreate = useSelector(state => state.wilayahCreate);
    const { loading, error, success } = wilayahCreate;

    useEffect(() => {
        if (success) {
            history.push('/location/region')
        }
    }, [history, success])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createWilayah(data))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Tambah Wilayah</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="Region_Code">
                            <Form.Label>Kode Wilayah</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Wilayah..."
                                name="Region_Code"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="Region_Subname">
                            <Form.Label>Subname Wilayah</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Subname Wilayah..."
                                name="Region_Subname"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="Region_Name">
                            <Form.Label>Nama Wilayah</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Wilayah..."
                                name="Region_Name"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="Status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="Status"
                                onChange={handleChange}
                            >
                                <option value="">- Pilih Status -</option>
                                <option value="Y" >Aktif</option>
                                <option value="N" >Tidak Aktif</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Link to={'/location/region'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default WilayahTambah
