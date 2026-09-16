import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';
import { useGetProvinsisQuery } from '@/entities/provinsi/api/provinsiApi';
import { useGetKotaByIdQuery, useUpdateKotaMutation } from '@/entities/kota/api/kotaApi';

const ModalEditKota = ({ onClick, kotaId }) => {

    const [Kabkota_Code, setKode] = useState('');
    const [Kabkota_Name, setNama] = useState('');
    const [BI_Location_Code, setBiCode] = useState('');
    const [Antasena_Code, setAntasenaCode] = useState('');
    const [Provinsi_Code, setProvinsiCode] = useState('');
    const [Kabkota_Flag, setKabkotaFlag] = useState('');
    const [Status, setStatus] = useState('');

    const { data: queryData, isLoading: loading, error } = useGetKotaByIdQuery(kotaId, { skip: !kotaId });
    const kota = queryData?.kota || queryData || {};

    const [updateKotaApi, { isLoading: loadingUpdate, error: errorUpdate, isSuccess: success }] = useUpdateKotaMutation();

    const { data: provinsiData } = useGetProvinsisQuery({ limit: 100 });
    const provinsi = provinsiData?.provinsi || [];

    useEffect(() => {
        if (success) {
            window.location.reload()
            onClick()
        } else {
            setKode(kota.kota?.Kabkota_Code || '')
            setNama(kota.kota?.Kabkota_Name || '')
            setBiCode(kota.kota?.BI_Location_Code || '')
            setAntasenaCode(kota.kota?.Antasena_Code || '')
            setProvinsiCode(kota.kota?.Provinsi_Code || '')
            setKabkotaFlag(kota.kota?.Kabkota_Flag || '')
            setStatus(kota.kota?.Status || '')
        }
    }, [kota, success])

    const submitHandler = async (e) => {
        e.preventDefault();
        await updateKotaApi({ id: kotaId, body: { Kabkota_Code, Kabkota_Name, BI_Location_Code, Antasena_Code, Provinsi_Code, Kabkota_Flag, Status } })
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Kota/Kabupaten</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorUpdate && <Message variant="danger" >{(errorUpdate as any)?.data?.message || 'Update failed'}</Message>}
                {(loading || loadingUpdate) && <Loader />}
                <Form>
                    <Form.Group controlId="Kabkota_Code">
                        <Form.Label>Kode Kota</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Kode Kota..."
                            name="Kabkota_Code"
                            value={Kabkota_Code || ''}
                            onChange={(e) => setKode(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="Kabkota_Name">
                        <Form.Label>Nama Kota</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Nama Provinsi..."
                            name="Kabkota_Name"
                            value={Kabkota_Name || ''}
                            onChange={(e) => setNama(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="BI_Location_Code">
                        <Form.Label>BI Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan BI Code..."
                            name="BI_Location_Code"
                            value={BI_Location_Code || ''}
                            onChange={(e) => setBiCode(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="Antasena_Code">
                        <Form.Label>Antasena Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Antasena Code..."
                            name="Antasena_Code"
                            value={Antasena_Code || ''}
                            onChange={(e) => setAntasenaCode(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="Provinsi_Code">
                        <Form.Label>Provinsi</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            name="Provinsi_Code"
                            value={Provinsi_Code || ''}
                            onChange={(e) => setProvinsiCode(e.target.value)}
                        >
                            {provinsi?.filter(prov => prov.Provinsi_Code.toString().includes(Kabkota_Code?.toString().substring(0, 2)))
                                .map((prov) => (
                                    <option key={prov.ID_Provinsi} value={prov.Provinsi_Code || ''} >{prov.Provinsi_Name}</option>
                                ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="Kabkota_Flag">
                        <Form.Label>Jenis Kabupaten/ Kotamadya</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            name="Kabkota_Flag"
                            onChange={(e) => setKabkotaFlag(e.target.value)}
                            value={Kabkota_Flag || ''}
                        >
                            <option value="Kabupaten" >Kabupaten</option>
                            <option value="Kotamadya" >Kotamadya</option>
                            <option value="Other" >Other</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="Status">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            name="Status"
                            value={Status || ''}
                            onChange={(e) => setStatus(e.target.value)}
                        >
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

export default ModalEditKota
