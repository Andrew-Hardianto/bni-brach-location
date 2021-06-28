import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { detailWilayah, editWilayah } from '../../actions/wilayahActions';
import { WILAYAH_UPDATE_RESET } from '../../constants/wilayahConstants';

const WilayahEdit = ({ match, history }) => {
    const wilayahId = match.params.id;

    const [kode, setKode] = useState('');
    const [nama, setNama] = useState('');

    const dispatch = useDispatch();

    const wilayahDetail = useSelector(state => state.wilayahDetail);
    const { wilayah } = wilayahDetail;

    const wilayahUpdate = useSelector(state => state.wilayahUpdate);
    const { loading, error, success } = wilayahUpdate;

    useEffect(() => {
        if (success) {
            dispatch({ type: WILAYAH_UPDATE_RESET })
            history.push('/location/region')
        } else {
            dispatch(detailWilayah(wilayahId));
            setKode(wilayah.wilayah?.kode)
            setNama(wilayah.wilayah?.nama)
        }
    }, [dispatch, wilayahId, history, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editWilayah({ id: wilayahId, kode, nama }))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Edit Wilayah</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="kode">
                            <Form.Label>Kode Wilayah</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Wilayah..."
                                name="kode"
                                value={kode}
                                onChange={(e) => setKode(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="nama">
                            <Form.Label>Nama Wilayah</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Wilayah..."
                                name="nama"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
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

export default WilayahEdit
