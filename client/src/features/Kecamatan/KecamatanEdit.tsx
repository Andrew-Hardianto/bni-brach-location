import { useGetKecamatanByIdQuery, useUpdateKecamatanMutation } from '@/entities/kecamatan/api/kecamatanApi';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';
import { useGetKotasQuery } from '@/entities/kota/api/kotaApi';

const initialState = { Kecamatan_Code: '', Kecamatan_Name: '', Kabupaten_Code: '' }

const KecamatanEdit = ({ match, history }) => {
    const kecamatanId = match.params.id;

    const [data, setData] = useState(initialState)

    const { data: queryData, isLoading: loadingDetail, error: errorDetail } = useGetKecamatanByIdQuery(kecamatanId, { skip: !kecamatanId });
    const kecamatan = queryData?.kecamatan || queryData || {};
    const [updateKecamatanApi, { isLoading: loadingUpdate, error: errorUpdate, isSuccess: successUpdate }] = useUpdateKecamatanMutation();

    const { data: kotaData } = useGetKotasQuery({ limit: 100 });
    const kota = kotaData?.kota || [];

    useEffect(() => {
        if (successUpdate) {
            history.push('/location/kecamatan')
        } else {
            if (kecamatan) {
                setData({
                    Kecamatan_Code: kecamatan?.Kecamatan_Code || '',
                    Kecamatan_Name: kecamatan?.Kecamatan_Name || '',
                    Kabupaten_Code: kecamatan?.Kabupaten_Code || kecamatan?.Kabkota_Code || ''
                })
            }
        }
    }, [history, kecamatan, successUpdate])

    const submitHandler = async (e) => {
        e.preventDefault();
        await updateKecamatanApi({ id: kecamatanId, body: { ...data } });
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Edit Kecamatan</Card.Title>
                    {(loadingDetail || loadingUpdate) && <Loader />}
                    {(errorDetail || errorUpdate) && <Message variant="danger" >{(errorDetail as any)?.data?.message || (errorUpdate as any)?.data?.message || 'Terjadi kesalahan'}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="Kecamatan_Code">
                            <Form.Label>Kode Kecamatan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Kecamatan..."
                                name="Kecamatan_Code"
                                value={data?.Kecamatan_Code || ''}
                                onChange={(e) => setData({ ...data, Kecamatan_Code: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="Kecamatan_Name">
                            <Form.Label>Nama Kecamatan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Kecamatan..."
                                name="Kecamatan_Name"
                                value={data?.Kecamatan_Name || ''}
                                onChange={(e) => setData({ ...data, Kecamatan_Name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="Kabupaten_Code">
                            <Form.Label>Kota/Kabupaten</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="Kabupaten_Code"
                                value={data?.Kabupaten_Code || ''}
                                onChange={(e) => setData({ ...data, Kabupaten_Code: e.target.value })}
                            >
                                <option value="">- Pilih Kota -</option>
                                {kota?.filter((kt) => kt.Kabupaten_Code.toString().includes(data?.Kecamatan_Code.toString().substring(0, 4)))
                                    .map((data) => (
                                        <option key={data.ID_Kabupaten} value={data.Kabupaten_Code || ''} >{data.Kabupaten_Name}</option>
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
