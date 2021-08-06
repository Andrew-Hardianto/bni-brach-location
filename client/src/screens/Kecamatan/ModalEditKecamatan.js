import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { KOTA_UPDATE_RESET } from '../../constants/kotaConstants';
import { detailKota, editKota, listKota } from '../../actions/kotaActions';
import { listProvinsi } from '../../actions/provinsiActions';
import { KECAMATAN_UPDATE_RESET } from '../../constants/kecamatanConstants';
import { detailKecamatan, editKecamatan } from '../../actions/kecamatanActions';

const initialState = { Kecamatan_Code: '', Kecamatan_Name: '', Kabupaten_Code: '' }

const ModalEditKecamatan = ({ onClick, kecamatanId }) => {

    const [data, setData] = useState(initialState)

    const dispatch = useDispatch();

    const { kecamatan } = useSelector(state => state.kecamatanDetail);

    const { loading, error, success } = useSelector(state => state.kecamatanUpdate);

    const { kota } = useSelector(state => state.kotaList);

    useEffect(() => {
        dispatch(listKota())
        if (success) {
            dispatch({ type: KECAMATAN_UPDATE_RESET })
            window.location.reload(false)
            onClick()
        } else {
            if (!kecamatan?.kecamatan?.Kecamatan_Name || kecamatan?.kecamatan?.ID_Kecamatan !== kecamatanId) {
                dispatch(detailKecamatan(kecamatanId));
            }
            setData(kecamatan?.kecamatan)
        }
    }, [dispatch, kecamatanId, kecamatan.kecamatan?.ID_Kecamatan, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editKecamatan({ ...data }))
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Kecamatan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Message variant="danger" >{error}</Message>}
                {loading && <Loader />}
                <Form>
                    <Form.Group controlId="Kecamatan_Code">
                        <Form.Label>Kode Kecamatan</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Kode Kecamatan..."
                            name="Kecamatan_Code"
                            value={data?.Kecamatan_Code}
                            onChange={(e) => setData({ ...data, Kecamatan_Code: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group controlId="Kecamatan_Name">
                        <Form.Label>Nama Kecamatan</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Nama Kecamatan..."
                            name="Kecamatan_Name"
                            value={data?.Kecamatan_Name}
                            onChange={(e) => setData({ ...data, Kecamatan_Name: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="Kabupaten_Code">
                        <Form.Label>Kota/Kabupaten</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            name="Kabupaten_Code"
                            value={data?.Kabupaten_Code}
                            onChange={(e) => setData({ ...data, Kabupaten_Code: e.target.value })}
                        >
                            <option value="">- Pilih Kota -</option>
                            {kota?.filter((kt) => kt.Kabupaten_Code.toString().includes(data?.Kecamatan_Code.toString().substring(0, 4)))
                                .map((data) => (
                                    <option key={data.ID_Kabupaten} value={data.Kabupaten_Code} >{data.Kabupaten_Name}</option>
                                ))}
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
