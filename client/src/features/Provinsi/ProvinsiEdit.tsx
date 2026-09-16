import { useGetProvinsiByIdQuery, useUpdateProvinsiMutation } from '@/entities/provinsi/api/provinsiApi';
import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';

const initialState = { Provinsi_Code: '', Provinsi_Name: '', BI_Location_Code: '', Status: '' }

const ProvinsiEdit = ({ history, match }) => {
    const provinsiId = match.params.id;

    const [data, setData] = useState(initialState);

    const { data: queryData, isLoading: loadingDetail, error: errorDetail } = useGetProvinsiByIdQuery(provinsiId, { skip: !provinsiId });
    const provinsi = queryData?.provinsi || queryData || {};
    const [updateProvinsiApi, { isLoading: loadingUpdate, error: errorUpdate, isSuccess: successUpdate }] = useUpdateProvinsiMutation();

    

    useEffect(() => {
        if (successUpdate) {
            history.push('/location/provinsi')
        } else {
            if (provinsi && provinsi.ID_Provinsi === provinsiId) {
                setData(provinsi)
            }
        }
    }, [history, provinsiId, provinsi, successUpdate])

    const submitHandler = async (e) => {
        e.preventDefault();
        await updateProvinsiApi({ id: provinsiId, body: { ...data } });
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Edit Provinsi</Card.Title>
                    {errorUpdate && <Message variant="danger" >{(errorUpdate as any)?.data?.message || 'Gagal mengubah data'}</Message>}
                    {(loadingDetail || loadingUpdate) && <Loader />}
                    <Form onSubmit={submitHandler} >
                        <Form.Group controlId="id">
                            <Form.Label>Kode Provinsi</Form.Label>
                            <Form.Control
                                type="text"
                                value={data?.Provinsi_Code || ''}
                                onChange={(e) => setData({ ...data, Provinsi_Code: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="nama">
                            <Form.Label>Nama Provinsi</Form.Label>
                            <Form.Control
                                type="text"
                                name="nama"
                                value={data?.Provinsi_Name || ''}
                                onChange={(e) => setData({ ...data, Provinsi_Name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="BI_Location_Code">
                            <Form.Label>BI Location Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="BI_Location_Code"
                                value={data?.BI_Location_Code || ''}
                                onChange={(e) => setData({ ...data, BI_Location_Code: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="Status">
                            <Form.Label>Provinsi</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="Status"
                                value={data?.Status || ''}
                                onChange={(e) => setData({ ...data, Status: e.target.value })}
                            >
                                <option value={data?.Status || ''}>{data?.Status === 'Y' ? 'Aktif' : 'Tidak Aktif'}</option>
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
