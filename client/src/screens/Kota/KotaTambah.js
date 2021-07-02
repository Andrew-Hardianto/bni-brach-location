import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { createKota } from '../../actions/kotaActions';
import { listProvinsi } from '../../actions/provinsiActions';

const initialState = { Kabupaten_Code: '', Kabupaten_Name: '', BI_Location_Code: '', Antasena_Code: '', Provinsi_Code: '' }

const KotaTambah = ({ history }) => {
    const [data, setData] = useState(initialState)

    const dispatch = useDispatch();

    const kotaCreate = useSelector(state => state.kotaCreate);
    const { loading, error, success } = kotaCreate;

    const provinsiList = useSelector(state => state.provinsiList);
    const { provinsi } = provinsiList;

    useEffect(() => {
        dispatch(listProvinsi())
        if (success) {
            history.push('/location/kota')
        }
    }, [history, success])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createKota(data))
    }
    console.log(data)
    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3">
                <Card.Body>
                    <Card.Title>Tambah Kota</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="Kabupaten_Code">
                            <Form.Label>Kode Kota</Form.Label>
                            <Form.Control
                                type="text"
                                name="Kabupaten_Code"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="Kabupaten_Name">
                            <Form.Label>Nama Kota</Form.Label>
                            <Form.Control
                                type="text"
                                name="Kabupaten_Name"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="BI_Location_Code">
                            <Form.Label>BI Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="BI_Location_Code"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="Antasena_Code">
                            <Form.Label>Antasena Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="Antasena_Code"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="Provinsi_Code">
                            <Form.Label>Provinsi</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="Provinsi_Code"
                                onChange={handleChange}
                            >
                                <option value="">- Pilih Provinsi -</option>
                                {provinsi?.filter(prov => prov.Provinsi_Code.toString().includes(data.Kabupaten_Code.toString().substring(0, 2)))
                                    .map((prov) => (
                                        <option value={prov.Provinsi_Code} >{prov.Provinsi_Name}</option>
                                    ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Link to={'/location/kota'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div >
    )
}

export default KotaTambah
