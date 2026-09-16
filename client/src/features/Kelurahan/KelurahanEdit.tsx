import { useGetKelurahanByIdQuery, useUpdateKelurahanMutation } from '@/entities/kelurahan/api/kelurahanApi';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';
import { useGetKecamatansQuery } from '@/entities/kecamatan/api/kecamatanApi';

const initialState = { Kelurahan_Code: '', Kelurahan_Name: '', Kecamatan_Code: '', Status: '' }

const KelurahanEdit = ({ history, match }) => {
    const kelurahanId = match.params.id;

    const [data, setData] = useState(initialState);

    const { data: queryData, isLoading: loadingDetail, error: errorDetail } = useGetKelurahanByIdQuery(kelurahanId, { skip: !kelurahanId });
    const kelurahan = queryData?.kelurahan || queryData || {};
    const [updateKelurahanApi, { isLoading: loadingUpdate, error: errorUpdate, isSuccess: successUpdate }] = useUpdateKelurahanMutation();

    const { data: kecamatanData } = useGetKecamatansQuery({ limit: 100 });
    const kecamatan = kecamatanData?.kecamatan || [];

    useEffect(() => {
        if (successUpdate) {
            history.push('/location/kelurahan')
        } else {
            if (kelurahan && kelurahan.ID_Kelurahan) {
                setData(kelurahan)
            }
        }
    }, [history, kelurahan, successUpdate])

    const submitHandler = async (e) => {
        e.preventDefault();
        await updateKelurahanApi({ id: kelurahanId, body: { ...data } });
    }

    // console.log(data)

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Edit Kelurahan</Card.Title>
                    {loadingUpdate && <Loader />}
                    {errorUpdate && <Message variant="danger" >{(errorUpdate as any)?.data?.message || (errorUpdate as any)?.error || 'Terjadi kesalahan'}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="Kelurahan_Code">
                            <Form.Label>Kode Kelurahan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Kelurahan..."
                                name="Kelurahan_Code"
                                value={data?.Kelurahan_Code || ''}
                                onChange={(e) => setData({ ...data, Kelurahan_Code: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="Kelurahan_Name">
                            <Form.Label>Nama Kelurahan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Kelurahan..."
                                name="Kelurahan_Name"
                                value={data?.Kelurahan_Name || ''}
                                onChange={(e) => setData({ ...data, Kelurahan_Name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="Kecamatan_Code">
                            <Form.Label>Kecamatan</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="kecamatanId"
                                value={data?.Kecamatan_Code || ''}
                                onChange={(e) => setData({ ...data, Kecamatan_Code: e.target.value })}
                            >
                                <option value="">- Pilih Kecamatan -</option>
                                {kecamatan.filter((kc) => kc.Kecamatan_Code.toString().includes(data?.Kelurahan_Code.toString().substring(0, 7)))
                                    .map((kc) => (
                                        <option key={kc.ID_Kecamatan} value={kc.Kecamatan_Code || ''} >{kc.Kecamatan_Name}</option>
                                    ))}
                                {/* {kecamatan.filter((kc) => kc.Kecamatan_Code?.toString().includes(data?.Kelurahan_Code.toString().substring(0, 7)))
                                    .map((d) => (
                                        <option key={d.ID_Kecamatan} value={d.Kecamatan_Code || ''} >{d.Kecamatan_Name}</option>
                                    ))} */}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="Status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="Status"
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
