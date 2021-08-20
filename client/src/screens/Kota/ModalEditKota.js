import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { KOTA_UPDATE_RESET } from '../../constants/kotaConstants';
import { detailKota, editKota } from '../../actions/kotaActions';
import { listProvinsi } from '../../actions/provinsiActions';


const ModalEditKota = ({ onClick, kotaId }) => {

    const [Kabkota_Code, setKode] = useState('');
    const [Kabkota_Name, setNama] = useState('');
    const [BI_Location_Code, setBiCode] = useState('');
    const [Antasena_Code, setAntasenaCode] = useState('');
    const [Provinsi_Code, setProvinsiCode] = useState('');
    const [Kabkota_Flag, setKabkotaFlag] = useState('');
    const [Status, setStatus] = useState('');

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
            if (!kota?.kota?.Kabkota_Name || kota?.kota?.ID_Kabkota !== kotaId) {
                dispatch(detailKota(kotaId));
            }
            dispatch(listProvinsi())
            setKode(kota.kota?.Kabkota_Code)
            setNama(kota.kota?.Kabkota_Name)
            setBiCode(kota.kota?.BI_Location_Code)
            setAntasenaCode(kota.kota?.Antasena_Code)
            setProvinsiCode(kota.kota?.Provinsi_Code)
            setKabkotaFlag(kota.kota?.Kabkota_Flag)
            setStatus(kota.kota?.Status)
        }
    }, [dispatch, kotaId, kota.kota?.ID_Kabkota, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editKota({ id: kotaId, Kabkota_Code, Kabkota_Name, BI_Location_Code, Antasena_Code, Provinsi_Code, Kabkota_Flag, Status }))
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
                    <Form.Group controlId="Kabkota_Code">
                        <Form.Label>Kode Kota</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Kode Kota..."
                            name="Kabkota_Code"
                            value={Kabkota_Code}
                            onChange={(e) => setKode(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="Kabkota_Name">
                        <Form.Label>Nama Kota</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Nama Provinsi..."
                            name="Kabkota_Name"
                            value={Kabkota_Name}
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
                            onChange={(e) => setProvinsiCode(e.target.value)}
                        >
                            {/* <option value="">- Pilih Provinsi -</option> */}
                            {/* {provinsi.map((prov, index) => (
                                    <option key={index} value={prov?.Provinsi_Code} >{prov?.Provinsi_Name}</option>
                                ))} */}
                            {provinsi?.filter(prov => prov.Provinsi_Code.toString().includes(Kabkota_Code?.toString().substring(0, 2)))
                                .map((prov) => (
                                    <option key={prov.ID_Provinsi} value={prov.Provinsi_Code} >{prov.Provinsi_Name}</option>
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
                        >
                            <option value="">{Kabkota_Flag}</option>
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
                            value={Status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value={Status}>{Status === 'Y' ? 'Aktif' : 'Tidak Aktif'}</option>
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
