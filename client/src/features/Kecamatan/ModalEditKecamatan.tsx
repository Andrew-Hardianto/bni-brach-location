import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';
import { useGetProvinsisQuery } from '@/entities/provinsi/api/provinsiApi';
import { useGetKecamatanByIdQuery, useUpdateKecamatanMutation } from '@/entities/kecamatan/api/kecamatanApi';
import { useGetKotasQuery } from '@/entities/kota/api/kotaApi';

const initialState = { Kecamatan_Code: '', Kecamatan_Name: '', Kabkota_Code: '', Status: '' }

const ModalEditKecamatan = ({ onClick, kecamatanId }) => {
    const [data, setData] = useState(initialState)

    const { data: queryData, isLoading: loadingDetail, error: errorDetail } = useGetKecamatanByIdQuery(kecamatanId, { skip: !kecamatanId });
    const kecamatan = queryData?.kecamatan || queryData || {};

    const [updateKecamatanApi, { isLoading: loadingUpdate, error: errorUpdate, isSuccess: successUpdate }] = useUpdateKecamatanMutation();

    const { data: kotaData } = useGetKotasQuery({ limit: 100 });
    const kota = kotaData?.kota || [];

    useEffect(() => {
        if (successUpdate) {
            window.location.reload()
            onClick()
        } else {
            if (kecamatan) {
                setData({
                    Kecamatan_Code: kecamatan?.Kecamatan_Code || '',
                    Kecamatan_Name: kecamatan?.Kecamatan_Name || '',
                    Kabkota_Code: kecamatan?.Kabkota_Code || kecamatan?.Kabupaten_Code || '',
                    Status: kecamatan?.Status || ''
                })
            }
        }
    }, [kecamatan, successUpdate, onClick])

    const submitHandler = async (e) => {
        e.preventDefault();
        await updateKecamatanApi({ id: kecamatanId, body: { ...data } });
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Kecamatan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(errorDetail || errorUpdate) && <Message variant="danger" >{(errorDetail as any)?.data?.message || (errorUpdate as any)?.data?.message || 'Terjadi kesalahan'}</Message>}
                {(loadingDetail || loadingUpdate) && <Loader />}
                <Form>
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
                    <Form.Group controlId="Kabkota_Code">
                        <Form.Label>Kota/Kabupaten</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            name="Kabkota_Code"
                            value={data?.Kabkota_Code || ''}
                            onChange={(e) => setData({ ...data, Kabkota_Code: e.target.value })}
                        >
                            <option value="">- Pilih Kota -</option>
                            {kota?.filter((kt) => kt.Kabkota_Code.toString().includes(data?.Kecamatan_Code.toString().substring(0, 4)))
                                .map((data) => (
                                    <option key={data.ID_Kabkota} value={data.Kabkota_Code || ''} >{data.Kabkota_Name}</option>
                                ))}
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

export default ModalEditKecamatan
