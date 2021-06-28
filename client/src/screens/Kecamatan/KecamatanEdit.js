import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { editKecamatan, detailKecamatan } from '../../actions/kecamatanActions';
import { listKota } from '../../actions/kotaActions';
import { KECAMATAN_UPDATE_RESET } from '../../constants/kecamatanConstants';

const initialState = { kode: '', nama: '', kotaId: '' }

const KecamatanEdit = ({ match, history }) => {
    const kecamatanId = match.params.id;

    const [data, setData] = useState(initialState)

    const dispatch = useDispatch();

    const kecamatanDetail = useSelector(state => state.kecamatanDetail);
    const { kecamatan } = kecamatanDetail;

    const kecamatanUpdate = useSelector(state => state.kecamatanUpdate);
    const { loading, error, success } = kecamatanUpdate;

    const kotaList = useSelector(state => state.kotaList);
    const { kota } = kotaList;

    useEffect(() => {
        dispatch(listKota())
        if (success) {
            dispatch({ type: KECAMATAN_UPDATE_RESET })
            history.push('/location/kecamatan')
        } else {
            if (!kecamatan.kecamatan?.nama || kecamatan.kecamatan?.id !== kecamatanId) {
                dispatch(detailKecamatan(kecamatanId));
            }
            setData(kecamatan.kecamatan)
        }
    }, [dispatch, history, kecamatanId, kecamatan, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editKecamatan({ ...data }))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Edit Kecamatan</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="kode">
                            <Form.Label>Kode Kecamatan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Kecamatan..."
                                name="kode"
                                value={data.kode}
                                onChange={(e) => setData({ ...data, kode: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="nama">
                            <Form.Label>Nama Kecamatan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Kecamatan..."
                                name="nama"
                                value={data?.nama}
                                onChange={(e) => setData({ ...data, nama: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="kotaId">
                            <Form.Label>Kota</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="kotaId"
                                value={data?.kotaId}
                                onChange={(e) => setData({ ...data, kotaId: e.target.value })}
                            >
                                <option value="">- Pilih Kota -</option>
                                {kota.map((data, index) => (
                                    <option key={index} value={data.kode} >{data.nama}</option>
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

export default KecamatanEdit
