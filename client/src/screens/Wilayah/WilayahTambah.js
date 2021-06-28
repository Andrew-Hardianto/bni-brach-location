import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { createWilayah } from '../../actions/wilayahActions';

const initialState = { kode: '', nama: '' }

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
                        <Form.Group controlId="id">
                            <Form.Label>Kode Wilayah</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Wilayah..."
                                name="kode"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="nama">
                            <Form.Label>Nama Wilayah</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Wilayah..."
                                name="nama"
                                onChange={handleChange}
                            />
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
