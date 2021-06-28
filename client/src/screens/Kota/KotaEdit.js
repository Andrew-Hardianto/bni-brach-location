import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/Loader';
import { detailKota, editKota } from '../../actions/kotaActions';
import { KOTA_UPDATE_RESET } from '../../constants/kotaConstants';
import Message from '../../components/Message';
import { listProvinsi } from '../../actions/provinsiActions';

const KotaEdit = ({ history, match }) => {
    const kotaId = match.params.id;

    const [kode, setKode] = useState('');
    const [nama, setNama] = useState('');
    const [biCode, setBiCode] = useState('');
    const [antasenaCode, setAntasenaCode] = useState('');
    const [provinsiId, setProvinsiId] = useState('');

    const dispatch = useDispatch();

    const kotaDetail = useSelector(state => state.kotaDetail);
    const { kota } = kotaDetail;

    const kotaUpdate = useSelector(state => state.kotaUpdate);
    const { loading, error, success } = kotaUpdate;

    const provinsiList = useSelector(state => state.provinsiList);
    const { provinsi } = provinsiList;

    useEffect(() => {
        dispatch(listProvinsi())
        if (success) {
            dispatch({ type: KOTA_UPDATE_RESET })
            history.push('/location/kota')
        } else {
            if (!kota.kota?.nama || kota.kota?.id !== kotaId) {
                dispatch(detailKota(kotaId));
            }
            setKode(kota.kota?.kode)
            setNama(kota.kota?.nama)
            setBiCode(kota.kota?.biCode)
            setAntasenaCode(kota.kota?.antasenaCode)
            setProvinsiId(kota.kota?.provinsiId)
        }
    }, [dispatch, history, kotaId, kota, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editKota({ id: kotaId, kode, nama, biCode, antasenaCode, provinsiId }))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3">
                <Card.Body>
                    <Card.Title>Edit Kota</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="id">
                            <Form.Label>Kode Kota</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Kota..."
                                value={kode}
                                onChange={(e) => setKode(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="nama">
                            <Form.Label>Nama Kota</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Provinsi..."
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="biCode">
                            <Form.Label>BI Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan BI Code..."
                                value={biCode}
                                onChange={(e) => setBiCode(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="antasenaCode">
                            <Form.Label>Antasena Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Antasena Code..."
                                value={antasenaCode}
                                onChange={(e) => setAntasenaCode(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="provinsiId">
                            <Form.Label>Provinsi</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="provinsiId"
                                value={provinsiId}
                                onChange={(e) => setProvinsiId(e.target.value)}
                            >
                                <option value="">- Pilih Provinsi -</option>
                                {provinsi.map((prov) => (
                                    <option value={prov.kode} >{prov.nama}</option>
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

export default KotaEdit
