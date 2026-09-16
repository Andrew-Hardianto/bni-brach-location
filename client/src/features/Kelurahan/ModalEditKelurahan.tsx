import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';
import { useGetKecamatansQuery } from '@/entities/kecamatan/api/kecamatanApi';
import { useGetKelurahanByIdQuery, useUpdateKelurahanMutation } from '@/entities/kelurahan/api/kelurahanApi';

const initialState = { Kelurahan_Code: '', Kelurahan_Name: '', Kecamatan_Code: '', Status: '' }

const ModalEditKelurahan = ({ onClick, kelurahanId }) => {

    const [data, setData] = useState(initialState);

    const { data: queryData } = useGetKelurahanByIdQuery(kelurahanId, { skip: !kelurahanId });
    const kelurahan = queryData?.kelurahan || queryData || {};

    const [updateKelurahanApi, { isLoading: loading, error, isSuccess: success }] = useUpdateKelurahanMutation();

    const { data: kecamatanData } = useGetKecamatansQuery({ limit: 100 });
    const kecamatan = kecamatanData?.kecamatan || [];

    useEffect(() => {
        if (success) {
            window.location.reload()
            onClick()
        } else {
            if (kelurahan && kelurahan.ID_Kelurahan) {
                setData(kelurahan)
            }
        }
    }, [kelurahan, success, onClick])

    const submitHandler = async (e) => {
        e.preventDefault();
        await updateKelurahanApi({ id: kelurahanId, body: { ...data } })
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Kelurahan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Message variant="danger" >{(error as any)?.data?.message || (error as any)?.error || 'Terjadi kesalahan'}</Message>}
                {loading && <Loader />}
                <Form>
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="button" onClick={submitHandler}>
                    Submit
                </Button>
                <Button variant="danger" onClick={onClick}>
                    Tutup
                </Button>
            </Modal.Footer>
        </div>
    )
}

export default ModalEditKelurahan
