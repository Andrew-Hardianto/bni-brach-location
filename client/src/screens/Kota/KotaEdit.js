import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/Loader';
import { detailKota, editKota } from '../../actions/kotaActions';
import { KOTA_UPDATE_RESET } from '../../constants/kotaConstants';
import Message from '../../components/Message';
import { listProvinsi } from '../../actions/provinsiActions';

const KotaEdit = ({ history, match }) => {
    const kotaId = match.params.id;

    const [Kabupaten_Code, setKode] = useState('');
    const [Kabupaten_Name, setNama] = useState('');
    const [BI_Location_Code, setBiCode] = useState('');
    const [Antasena_Code, setAntasenaCode] = useState('');
    const [Provinsi_Code, setProvinsiId] = useState('');

    const dispatch = useDispatch();

    const kotaDetail = useSelector(state => state.kotaDetail);
    const { kota } = kotaDetail;

    const kotaUpdate = useSelector(state => state.kotaUpdate);
    const { loading, error, success } = kotaUpdate;

    const provinsiList = useSelector(state => state.provinsiList);
    const { provinsi } = provinsiList;

    useEffect(() => {
        dispatch(listProvinsi())
        if (success) {
            dispatch({ type: KOTA_UPDATE_RESET })
            history.push('/location/kota')
        } else {
            if (!kota?.kota?.Kabupaten_Name || kota?.kota?.ID_Kabupaten !== kotaId) {
                dispatch(detailKota(kotaId));
            }
            setKode(kota.kota?.Kabupaten_Code)
            setNama(kota.kota?.Kabupaten_Name)
            setBiCode(kota.kota?.BI_Location_Code)
            setAntasenaCode(kota.kota?.Antasena_Code)
            setProvinsiId(kota.kota?.Provinsi_Code)
        }
    }, [dispatch, history, kotaId, kota.kota?.ID_Kabupaten, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editKota({ id: kotaId, Kabupaten_Code, Kabupaten_Name, BI_Location_Code, Antasena_Code, Provinsi_Code }))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3">
                <Card.Body>
                    <Card.Title>Edit Kota</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
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
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Link to={'/location/kota'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div >
    )
}

export default KotaEdit
