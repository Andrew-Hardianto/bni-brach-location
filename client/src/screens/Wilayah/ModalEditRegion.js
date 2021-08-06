import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { detailWilayah, editWilayah } from '../../actions/wilayahActions';
import { WILAYAH_UPDATE_RESET } from '../../constants/wilayahConstants';

const initialState = { Region_Code: '', Region_Subname: '', Region_Name: '' }

const ModalEditRegion = ({ onClick, wilayahId }) => {

    const [data, setData] = useState(initialState);

    const dispatch = useDispatch();

    const { wilayah } = useSelector(state => state.wilayahDetail);

    const { loading, error, success } = useSelector(state => state.wilayahUpdate);

    useEffect(() => {
        if (success) {
            dispatch({ type: WILAYAH_UPDATE_RESET })
            window.location.reload(false)
            onClick()
        } else {
            if (!wilayah?.wilayah?.Region_Name || wilayah?.wilayah?.ID_Region !== wilayahId) {
                dispatch(detailWilayah(wilayahId));
            }
            setData(wilayah.wilayah)
        }
    }, [dispatch, wilayahId, wilayah?.wilayah?.ID_Region, success])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editWilayah({ ...data }))
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Kelurahan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Message variant="danger" >{error}</Message>}
                {loading && <Loader />}
                <Form>
                    <Form.Group controlId="Region_Code">
                        <Form.Label>Kode Wilayah</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Kode Wilayah..."
                            name="Region_Code"
                            value={data?.Region_Code}
                            onChange={(e) => setData({ ...data, Region_Code: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="Region_Subname">
                        <Form.Label>Subname Wilayah</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Subname Wilayah..."
                            name="Region_Subname"
                            value={data?.Region_Subname}
                            onChange={(e) => setData({ ...data, Region_Subname: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="nama">
                        <Form.Label>Nama Wilayah</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Nama Wilayah..."
                            name="nama"
                            value={data?.Region_Name}
                            onChange={(e) => setData({ ...data, Region_Name: e.target.value })}
                        />
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
