import { useGetWilayahByIdQuery, useUpdateWilayahMutation } from '@/entities/wilayah/api/wilayahApi';
import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';

const initialState = { Region_Code: '', Region_Subname: '', Region_Name: '', Status: '' }

const WilayahEdit = ({ match, history }) => {
    const wilayahId = match.params.id;

    const [data, setData] = useState(initialState);

    const { data: queryData, isLoading: loadingDetail, error: errorDetail } = useGetWilayahByIdQuery(wilayahId, { skip: !wilayahId });
    const wilayah = queryData?.wilayah || {};
    
    const [updateWilayahApi, { isLoading: loadingUpdate, error: errorUpdate, isSuccess: successUpdate }] = useUpdateWilayahMutation();

    useEffect(() => {
        if (successUpdate) {
            history.push('/location/region')
        } 
    }, [history, successUpdate])

    useEffect(() => {
        if (wilayah && Object.keys(wilayah).length > 0) {
            setData({
                Region_Code: wilayah.Region_Code || '',
                Region_Subname: wilayah.Region_Subname || '',
                Region_Name: wilayah.Region_Name || '',
                Status: wilayah.Status || ''
            });
        }
    }, [wilayah])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        await updateWilayahApi({ id: wilayahId, body: { ...data } });
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Edit Wilayah</Card.Title>
                    {(loadingDetail || loadingUpdate) && <Loader />}
                    {(errorDetail || errorUpdate) && <Message variant="danger" >{(errorDetail as any)?.data?.message || (errorDetail as any)?.error || (errorUpdate as any)?.data?.message || (errorUpdate as any)?.error || 'Terjadi kesalahan'}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="Region_Code">
                            <Form.Label>Kode Wilayah</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Wilayah..."
                                name="Region_Code"
                                value={data?.Region_Code || ''}
                                onChange={(e) => setData({ ...data, Region_Code: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="Region_Subname">
                            <Form.Label>Subname Wilayah</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Subname Wilayah..."
                                name="Region_Subname"
                                value={data?.Region_Subname || ''}
                                onChange={(e) => setData({ ...data, Region_Name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="nama">
                            <Form.Label>Nama Wilayah</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Wilayah..."
                                name="nama"
                                value={data?.Region_Name || ''}
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
