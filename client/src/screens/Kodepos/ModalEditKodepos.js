import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { listKelurahan, allKelurahan } from '../../actions/kelurahanActions';
import { detailKodepos, editKodepos } from '../../actions/kodeposActions';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { KODEPOS_UPDATE_RESET } from '../../constants/kodeposConstants';

const ModalEditKodepos = ({ onClick, kodeposId }) => {

    const [Postcode, setKodeposCode] = useState('');
    const [Kelurahan_Code, setKelurahanCode] = useState('');
    const [Status, setStatus] = useState('');
    const [Code, setCode] = useState();
    const [nama, setNama] = useState('');
    const [display, setDisplay] = useState(false);
    const wrapperRef = useRef(null)

    const dispatch = useDispatch();

    const { kodepos } = useSelector(state => state.kodeposDetail);

    const { loading, error, success } = useSelector(state => state.kodeposUpdate);

    const { kelurahan } = useSelector(state => state.kelurahanAll);

    useEffect(() => {
        dispatch(allKelurahan(Kelurahan_Code))
        if (success) {
            dispatch({ type: KODEPOS_UPDATE_RESET })
            window.location.reload(false)
            onClick()
        } else {
            if (kodepos?.kodepos?.ID_Postcode !== kodeposId) {
                dispatch(detailKodepos(kodeposId));
            }
            // setData(kodepos?.kodepos)
            setKelurahanCode(kodepos?.kodepos?.Kelurahan_Code)
            setNama(kodepos?.kodepos?.kelurahan?.Kelurahan_Name)
            setCode(kodepos?.kodepos?.Kelurahan_Code)
            setKodeposCode(kodepos?.kodepos?.Postcode)
            setStatus(kodepos?.kodepos?.Status)
        }
    }, [dispatch, kodeposId, kodepos?.kodepos?.ID_Postcode, success]);

    function filterBy(option, state) {
        if (state.selected.length) {
            return true;
        }
        return option?.Kelurahan_Name.toLowerCase().indexOf(state.text.toLowerCase()) > -1;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (Kelurahan_Code[0]?.Kelurahan_Code == undefined) {
            dispatch(editKodepos({ ID_Postcode: kodeposId, Postcode, Kelurahan_Code, Status }))
        }
        dispatch(editKodepos({ ID_Postcode: kodeposId, Postcode, Status, Kelurahan_Code: Kelurahan_Code[0]?.Kelurahan_Code }))
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Kodepos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Message variant="danger" >{error}</Message>}
                {loading && <Loader />}
                <Form>
                    <Form.Group controlId="Postcode">
                        <Form.Label>Kodepos</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Kode Pos..."
                            name="Postcode"
                            value={Postcode}
                            onChange={(e) => setKodeposCode(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="Kelurahan_Code" >
                        <Form.Label>Kelurahan</Form.Label>
                        <Typeahead
                            filterBy={filterBy}
                            id="Kelurahan_Code"
                            labelKey="Kelurahan_Name"
                            name="Kelurahan_Code"
                            options={kelurahan}
                            placeholder={nama}
                            onChange={setKelurahanCode}
                            selected={Kelurahan_Code?.Kelurahan_Code}
                            // defaultInputValue={Code}
                            renderMenuItemChildren={(opt) => (
                                <div>
                                    <p className="font-weight-bold">{opt.Kelurahan_Code} - {opt.Kelurahan_Name}</p>
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

export default ModalEditKodepos
