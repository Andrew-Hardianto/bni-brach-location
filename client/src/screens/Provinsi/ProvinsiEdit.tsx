import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/Loader';
import { detailProvinsi, editProvinsi } from '../../actions/provinsiActions';
import { PROVINSI_UPDATE_RESET } from '../../constants/provinsiConstants';
import Message from '../../components/Message';

const initialState = { Provinsi_Code: '', Provinsi_Name: '', BI_Location_Code: '', Status: '' }

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
            if (!provinsi.Provinsi_Name || provinsi.ID_Provinsi !== provinsiId) {
                dispatch(detailProvinsi(provinsiId));
            }
            setData(provinsi)
        }
    }, [dispatch, history, provinsiId, provinsi.ID_Provinsi, success])

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
                                value={data?.Provinsi_Code}
                                onChange={(e) => setData({ ...data, Provinsi_Code: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="nama">
                            <Form.Label>Nama Provinsi</Form.Label>
                            <Form.Control
                                type="text"
                                name="nama"
                                value={data?.Provinsi_Name}
                                onChange={(e) => setData({ ...data, Provinsi_Name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="BI_Location_Code">
                            <Form.Label>BI Location Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="BI_Location_Code"
                                value={data?.BI_Location_Code}
                                onChange={(e) => setData({ ...data, BI_Location_Code: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="Status">
                            <Form.Label>Provinsi</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="Status"
                                value={data?.Status}
                                onChange={(e) => setData({ ...data, Status: e.target.value })}
                            >
                                <option value={data?.Status}>{data?.Status === 'Y' ? 'Aktif' : 'Tidak Aktif'}</option>
                                <option value="Y" >Aktif</option>
                                <option value="N" >Tidak Aktif</option>
                            </Form.Control>
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
