import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useGetProvinsiByIdQuery, useUpdateProvinsiMutation } from '@/entities/provinsi/api/provinsiApi';
import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';

const initialState = { Provinsi_Code: '', Provinsi_Name: '', BI_Location_Code: '', Status: '' }

const ModalEdit = ({ onClick, provinsiId }) => {
    const [data, setData] = useState(initialState);

    const { data: queryData, isLoading: loadingDetail } = useGetProvinsiByIdQuery(provinsiId, { skip: !provinsiId });
    const provinsi = queryData?.provinsi || queryData || {};
    const [updateProvinsiApi, { isLoading: loadingUpdate, error: errorUpdate, isSuccess: successUpdate }] = useUpdateProvinsiMutation();

    useEffect(() => {
        if (successUpdate) {
            window.location.reload()
            onClick()
        } else {
            if (provinsi && provinsi.ID_Provinsi === provinsiId) {
                setData(provinsi)
            }
        }
    }, [provinsiId, provinsi, successUpdate, onClick])

    const submitHandler = async (e) => {
        e.preventDefault();
        await updateProvinsiApi({ id: provinsiId, body: { ...data } });
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Data Provinsi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorUpdate && <Message variant="danger" >{(errorUpdate as any)?.data?.message || 'Gagal mengubah data'}</Message>}
                {(loadingDetail || loadingUpdate) && <Loader />}
                <Form>
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
                        <Form.Label>Status</Form.Label>
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

export default ModalEdit
