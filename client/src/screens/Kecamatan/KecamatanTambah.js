import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { createKecamatan } from '../../actions/kecamatanActions';
import { listKota } from '../../actions/kotaActions';

const initialState = { Kecamatan_Code: '', Kecamatan_Name: '', Kabupaten_Code: '' }

const KecamatanTambah = ({ history }) => {

    const [data, setData] = useState(initialState)

    const dispatch = useDispatch();

    const kecamatanCreate = useSelector(state => state.kecamatanCreate);
    const { loading, error, success } = kecamatanCreate;

    const kotaList = useSelector(state => state.kotaList);
    const { kota } = kotaList;

    useEffect(() => {
        dispatch(listKota())
        if (success) {
            history.push('/location/kecamatan')
        }
    }, [dispatch, history, success])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createKecamatan(data))
    }
    console.log(data)
    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Tambah Kecamatan</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="Kecamatan_Code">
                            <Form.Label>Kode Kecamatan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Kecamatan..."
                                name="Kecamatan_Code"
                                // value={data.kode}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="Kecamatan_Name">
                            <Form.Label>Nama Kecamatan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Kecamatan..."
                                name="Kecamatan_Name"
                                // value={nama}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="Kabupaten_Code">
                            <Form.Label>Kota</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="Kabupaten_Code"
                                // value={kotaId}
                                onChange={handleChange}
                            >
                                <option value="">- Pilih Kota -</option>
                                {kota?.filter((kt) => kt.Kabupaten_Code.toString().includes(data?.Kecamatan_Code.toString().substring(0, 4)))
                                    .map((data) => (
                                        <option key={data?.ID_Kabupaten} value={data?.Kabupaten_Code} >{data.Kabupaten_Name}</option>
                                    ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Link to={'/location/kecamatan'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div >
    )
}

export default KecamatanTambah
