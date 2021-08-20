import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { detailProvinsi, editProvinsi } from '../../actions/provinsiActions';
import { PROVINSI_UPDATE_RESET } from '../../constants/provinsiConstants';
import Message from '../../components/Message';

const initialState = { Provinsi_Code: '', Provinsi_Name: '', BI_Location_Code: '', Status: '' }

const ModalEdit = ({ onClick, provinsiId }) => {
    const dispatch = useDispatch();
    const history = useHistory()

    const [data, setData] = useState(initialState);

    const { provinsi } = useSelector(state => state.provinsiDetail);

    const { loading, error, success } = useSelector(state => state.provinsiUpdate);

    useEffect(() => {
        if (success) {
            dispatch({ type: PROVINSI_UPDATE_RESET })
            window.location.reload(false)
            onClick()
        } else {
            if (!provinsi?.Provinsi_Name || provinsi?.ID_Provinsi !== provinsiId) {
                dispatch(detailProvinsi(provinsiId));
            }
            setData(provinsi)
        }
    }, [dispatch, history, provinsiId, provinsi.ID_Provinsi, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editProvinsi({ ...data }))
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Data Provinsi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Message variant="danger" >{error}</Message>}
                {loading && <Loader />}
                <Form>
                    <Form.Group controlId="id">
                        <Form.Label>Kode Provinsi</Form.Label>
                        <Form.Control
                            type="text"
                            value={data?.Provinsi_Code}
                            onChange={(e) => setData({ ...data, Provinsi_Code: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group controlId="nama">
                        <Form.Label>Nama Provinsi</Form.Label>
                        <Form.Control
                            type="text"
                            name="nama"
                            value={data?.Provinsi_Name}
                            onChange={(e) => setData({ ...data, Provinsi_Name: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="BI_Location_Code">
                        <Form.Label>BI Location Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="BI_Location_Code"
                            value={data?.BI_Location_Code}
                            onChange={(e) => setData({ ...data, BI_Location_Code: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="Status">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            name="Status"
                            value={data?.Status}
                            onChange={(e) => setData({ ...data, Status: e.target.value })}
                        >
                            <option value={data?.Status}>{data?.Status === 'Y' ? 'Aktif' : 'Tidak Aktif'}</option>
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
