import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/Loader';
import { detailProvinsi, editProvinsi } from '../../actions/provinsiActions';
import { PROVINSI_UPDATE_RESET } from '../../constants/provinsiConstants';
import Message from '../../components/Message';

const initialState = { kode: '', nama: '' }

const ProvinsiEdit = ({ history, match }) => {
    const provinsiId = match.params.id;

    const [data, setData] = useState(initialState);

    const dispatch = useDispatch();

    const provinsiDetail = useSelector(state => state.provinsiDetail);
    const { provinsi } = provinsiDetail;

    const provinsiUpdate = useSelector(state => state.provinsiUpdate);
    const { loading, error, success } = provinsiUpdate;

    useEffect(() => {
        if (success) {
            dispatch({ type: PROVINSI_UPDATE_RESET })
            history.push('/location/provinsi')
        } else {
            // if (!provinsi.provinsi?.nama || provinsi.provinsi?.id !== provinsiId) {
            // } else {
            // }
            dispatch(detailProvinsi(provinsiId));
            setData(provinsi.provinsi)
        }
    }, [dispatch, history, provinsiId, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editProvinsi({ ...data }))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Edit Provinsi</Card.Title>
                    {error && <Message variant="danger" >{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler} >
                        <Form.Group controlId="id">
                            <Form.Label>Kode Provinsi</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Provinsi..."
                                value={data?.kode}
                                onChange={(e) => setData({ ...data, kode: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="nama">
                            <Form.Label>Nama Provinsi</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Provinsi..."
                                name="nama"
                                value={data?.nama}
                                onChange={(e) => setData({ ...data, nama: e.target.value })}
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
        </div>
    )
}

export default ProvinsiEdit
