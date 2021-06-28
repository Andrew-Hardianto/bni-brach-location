import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { createKecamatan } from '../../actions/kecamatanActions';
import { listKota } from '../../actions/kotaActions';

const initialState = { kode: '', nama: '', kotaId: '' }

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
                        <Form.Group controlId="id">
                            <Form.Label>Kode Kecamatan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Kecamatan..."
                                name="kode"
                                // value={data.kode}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="nama">
                            <Form.Label>Nama Kecamatan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Kecamatan..."
                                name="nama"
                                // value={nama}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="kotaId">
                            <Form.Label>Kota</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="kotaId"
                                // value={kotaId}
                                onChange={handleChange}
                            >
                                <option value="">- Pilih Kota -</option>
                                {kota?.filter((kt) => kt.kode.toString().includes(data?.kode.toString().substring(0, 4)))
                                    .map((data, index) => (
                                        <option key={index} value={data?.kode} >{data.nama}</option>
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
