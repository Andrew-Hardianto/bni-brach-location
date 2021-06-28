import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { detailKelurahan, editKelurahan } from '../../actions/kelurahanActions';
import { listKecamatan } from '../../actions/kecamatanActions';
import { KELURAHAN_UPDATE_RESET } from '../../constants/kelurahanConstants';

const initialState = { kode: '', nama: '', kecamatanId: '' }

const KelurahanEdit = ({ history, match }) => {
    const kelurahanId = match.params.id;

    const [data, setData] = useState(initialState);

    const dispatch = useDispatch();

    const kelurahanDetail = useSelector(state => state.kelurahanDetail);
    const { kelurahan } = kelurahanDetail;

    const kelurahanUpdate = useSelector(state => state.kelurahanUpdate);
    const { loading, error, success } = kelurahanUpdate;

    const kecamatanList = useSelector(state => state.kecamatanList);
    const { kecamatan } = kecamatanList;

    useEffect(() => {
        dispatch(listKecamatan())
        if (success) {
            dispatch({ type: KELURAHAN_UPDATE_RESET })
            history.push('/location/kelurahan')
        } else {
            if (!kelurahan.kelurahan?.nama || kelurahan.kelurahan?.id !== kelurahanId) {
                dispatch(detailKelurahan(kelurahanId));
            }
            setData(kelurahan.kelurahan)
        }
    }, [dispatch, history, kelurahanId, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editKelurahan({ ...data }))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Edit Kelurahan</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="kode">
                            <Form.Label>Kode Kelurahan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Kelurahan..."
                                name="kode"
                                value={data.kode}
                                onChange={(e) => setData({ ...data, kode: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="nama">
                            <Form.Label>Nama Kelurahan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Kelurahan..."
                                name="nama"
                                value={data?.nama}
                                onChange={(e) => setData({ ...data, nama: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="kecamatanId">
                            <Form.Label>Kecamatan</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="kecamatanId"
                                value={data?.kecamatanId}
                                onChange={(e) => setData({ ...data, kecamatanId: e.target.value })}
                            >
                                <option value="">- Pilih Kecamatan -</option>
                                {kecamatan.map((data, index) => (
                                    <option key={index} value={data.kode} >{data.nama}</option>
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

export default KelurahanEdit
