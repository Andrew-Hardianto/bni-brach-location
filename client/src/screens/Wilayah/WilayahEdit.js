import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { detailWilayah, editWilayah } from '../../actions/wilayahActions';
import { WILAYAH_UPDATE_RESET } from '../../constants/wilayahConstants';

const initialState = { Region_Code: '', Region_Subname: '', Region_Name: '' }

const WilayahEdit = ({ match, history }) => {
    const wilayahId = match.params.id;

    const [data, setData] = useState(initialState);

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
            if (!wilayah?.wilayah?.Region_Name || wilayah?.wilayah?.ID_Region !== wilayahId) {
                dispatch(detailWilayah(wilayahId));
            }
            setData(wilayah.wilayah)
        }
    }, [dispatch, wilayahId, history, wilayah?.wilayah?.ID_Region, success])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editWilayah({ ...data }))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Edit Wilayah</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="Region_Code">
                            <Form.Label>Kode Wilayah</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Wilayah..."
                                name="Region_Code"
                                value={data?.Region_Code}
                                onChange={(e) => setData({ ...data, Region_Code: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="Region_Subname">
                            <Form.Label>Subname Wilayah</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Subname Wilayah..."
                                name="Region_Subname"
                                value={data?.Region_Subname}
                                onChange={(e) => setData({ ...data, Region_Name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="nama">
                            <Form.Label>Nama Wilayah</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Wilayah..."
                                name="nama"
                                value={data?.Region_Name}
                                onChange={(e) => setData({ ...data, Region_Name: e.target.value })}
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
