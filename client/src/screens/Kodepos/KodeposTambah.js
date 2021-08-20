import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { listKelurahan } from '../../actions/kelurahanActions';
import { createKodepos } from '../../actions/kodeposActions';

import Loader from '../../components/Loader';
import Message from '../../components/Message';

const initialState = { Postcode: '', Kelurahan_Code: '' }

const KodeposTambah = ({ history }) => {
    const [data, setData] = useState(initialState);
    const [Postcode, setKodeposCode] = useState('');
    const [Kelurahan_Code, setKelurahanCode] = useState('');
    const [Status, setStatus] = useState('');


    const dispatch = useDispatch();

    const kodeposCreate = useSelector(state => state.kodeposCreate);
    const { loading, error, success } = kodeposCreate;

    const kelurahanList = useSelector(state => state.kelurahanList);
    const { kelurahan } = kelurahanList;

    useEffect(() => {
        dispatch(listKelurahan())
        if (success) {
            history.push('/location/kodepos')
        }
    }, [history, success]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    function filterBy(option, state) {
        if (state.selected.length) {
            return true;
        }
        return option?.Kelurahan_Name.toLowerCase().indexOf(state.text.toLowerCase()) > -1;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(createKodepos(data))
        dispatch(createKodepos({ Postcode, Kelurahan_Code: Kelurahan_Code[0]?.Kelurahan_Code, Status }))
        // console.log(Postcode)
    }


    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Tambah Kode POS</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="Postcode">
                            <Form.Label>Kodepos</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Pos..."
                                name="Postcode"
                                onChange={(e) => setKodeposCode(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="Kelurahan_Code">
                            <Form.Label>Kelurahan</Form.Label>
                            {/* <Form.Control
                                as="select"
                                custom
                                name="Kelurahan_Code"
                                onChange={handleChange}
                            >
                                <option value="">- Pilih Kelurahan -</option>
                                {kelurahan.map((data) => (
                                    <option key={data.ID_Kelurahan} value={data.Kelurahan_Code} >{data.Kelurahan_Name}</option>
                                ))}
                            </Form.Control> */}
                            <Typeahead
                                filterBy={filterBy}
                                id="Kelurahan_Code"
                                labelKey="Kelurahan_Name"
                                name="Kelurahan_Code"
                                options={kelurahan}
                                placeholder="Masukkan Kode Kelurahan..."
                                // onChange={handleChange}
                                onChange={setKelurahanCode}
                                selected={Kelurahan_Code}
                                renderMenuItemChildren={(opt) => (
                                    <div>
                                        <p className="font-weight-bold">{opt.Kelurahan_Name}</p>
                                    </div>
                                )}
                            />
                        </Form.Group>
                        <Form.Group controlId="Status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="Status"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">- Pilih Status -</option>
                                <option value="Y" >Aktif</option>
                                <option value="N" >Tidak Aktif</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Link to={'/location/kodepos'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div >
    )
}

export default KodeposTambah
