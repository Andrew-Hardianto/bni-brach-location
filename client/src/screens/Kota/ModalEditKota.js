import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { KOTA_UPDATE_RESET } from '../../constants/kotaConstants';
import { detailKota, editKota } from '../../actions/kotaActions';
import { listProvinsi } from '../../actions/provinsiActions';


const ModalEditKota = ({ onClick, kotaId }) => {

    const [Kabupaten_Code, setKode] = useState('');
    const [Kabupaten_Name, setNama] = useState('');
    const [BI_Location_Code, setBiCode] = useState('');
    const [Antasena_Code, setAntasenaCode] = useState('');
    const [Provinsi_Code, setProvinsiId] = useState('');

    const dispatch = useDispatch();

    const { kota } = useSelector(state => state.kotaDetail);

    const { loading, error, success } = useSelector(state => state.kotaUpdate);

    const { provinsi } = useSelector(state => state.provinsiList);

    useEffect(() => {
        if (success) {
            dispatch({ type: KOTA_UPDATE_RESET })
            window.location.reload(false)
            onClick()
        } else {
            if (!kota?.kota?.Kabupaten_Name || kota?.kota?.ID_Kabupaten !== kotaId) {
                dispatch(detailKota(kotaId));
            }
            dispatch(listProvinsi())
            setKode(kota.kota?.Kabupaten_Code)
            setNama(kota.kota?.Kabupaten_Name)
            setBiCode(kota.kota?.BI_Location_Code)
            setAntasenaCode(kota.kota?.Antasena_Code)
            setProvinsiId(kota.kota?.Provinsi_Code)
        }
    }, [dispatch, kotaId, kota.kota?.ID_Kabupaten, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editKota({ id: kotaId, Kabupaten_Code, Kabupaten_Name, BI_Location_Code, Antasena_Code, Provinsi_Code }))
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Kota/Kabupaten</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Message variant="danger" >{error}</Message>}
                {loading && <Loader />}
                <Form>
                    <Form.Group controlId="Kabupaten_Code">
                        <Form.Label>Kode Kota</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Kode Kota..."
                            name="Kabupaten_Code"
                            value={Kabupaten_Code}
                            onChange={(e) => setKode(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="Kabupaten_Name">
                        <Form.Label>Nama Kota</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Nama Provinsi..."
                            name="Kabupaten_Name"
                            value={Kabupaten_Name}
                            onChange={(e) => setNama(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="BI_Location_Code">
                        <Form.Label>BI Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan BI Code..."
                            name="BI_Location_Code"
                            value={BI_Location_Code}
                            onChange={(e) => setBiCode(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="Antasena_Code">
                        <Form.Label>Antasena Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Antasena Code..."
                            name="Antasena_Code"
                            value={Antasena_Code}
                            onChange={(e) => setAntasenaCode(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="Provinsi_Code">
                        <Form.Label>Provinsi</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            name="Provinsi_Code"
                            value={Provinsi_Code}
                            onChange={(e) => setProvinsiId(e.target.value)}
                        >
                            {/* <option value="">- Pilih Provinsi -</option> */}
                            {/* {provinsi.map((prov, index) => (
                                    <option key={index} value={prov?.Provinsi_Code} >{prov?.Provinsi_Name}</option>
                                ))} */}
                            {provinsi?.filter(prov => prov.Provinsi_Code.toString().includes(Kabupaten_Code?.toString().substring(0, 2)))
                                .map((prov) => (
                                    <option key={prov.ID_Provinsi} value={prov.Provinsi_Code} >{prov.Provinsi_Name}</option>
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

export default ModalEditKota
