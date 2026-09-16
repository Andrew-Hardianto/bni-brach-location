import { useGetWilayahByIdQuery, useUpdateWilayahMutation } from '@/entities/wilayah/api/wilayahApi';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';

const initialState = { Region_Code: '', Region_Subname: '', Region_Name: '', Status: '' }

const ModalEditRegion = ({ onClick, wilayahId }) => {

    const [data, setData] = useState(initialState);

    const { data: queryData, isLoading: loading, error } = useGetWilayahByIdQuery(wilayahId, { skip: !wilayahId });
    const wilayah = queryData?.wilayah || {};

    const [updateWilayahApi, { isLoading: loadingUpdate, error: errorUpdate, isSuccess: success }] = useUpdateWilayahMutation();

    useEffect(() => {
        if (success) {
            onClick();
        }
    }, [success, onClick]);

    useEffect(() => {
        if (wilayah && Object.keys(wilayah).length > 0) {
            setData({
                Region_Code: wilayah.Region_Code || '',
                Region_Subname: wilayah.Region_Subname || '',
                Region_Name: wilayah.Region_Name || '',
                Status: wilayah.Status || ''
            });
        }
    }, [wilayah]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        await updateWilayahApi({ id: wilayahId, body: { ...data } });
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Region</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(error || errorUpdate) && <Message variant="danger" >{(error as any)?.data?.message || (error as any)?.error || (errorUpdate as any)?.data?.message || (errorUpdate as any)?.error || 'Terjadi kesalahan'}</Message>}
                {(loading || loadingUpdate) && <Loader />}
                <Form>
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
                            onChange={(e) => setData({ ...data, Region_Subname: e.target.value })}
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

export default ModalEditRegion
