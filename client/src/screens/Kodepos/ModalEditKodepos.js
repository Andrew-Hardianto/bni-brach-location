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

    const [Kodepos_Code, setKodeposCode] = useState('');
    const [Kelurahan_Code, setKelurahanCode] = useState('');
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
            if (kodepos?.kodepos?.ID_Kodepos !== kodeposId) {
                dispatch(detailKodepos(kodeposId));
            }
            // setData(kodepos?.kodepos)
            setKelurahanCode(kodepos?.kodepos?.Kelurahan_Code)
            setNama(kodepos?.kodepos?.kelurahan?.Kelurahan_Name)
            setCode(kodepos?.kodepos?.Kelurahan_Code)
            setKodeposCode(kodepos?.kodepos?.Kodepos_Code)
        }
    }, [dispatch, kodeposId, kodepos?.kodepos?.ID_Kodepos, success]);

    function filterBy(option, state) {
        if (state.selected.length) {
            return true;
        }
        return option?.Kelurahan_Name.toLowerCase().indexOf(state.text.toLowerCase()) > -1;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (Kelurahan_Code[0]?.Kelurahan_Code == undefined) {
            dispatch(editKodepos({ ID_Kodepos: kodeposId, Kodepos_Code, Kelurahan_Code }))
        }
        dispatch(editKodepos({ ID_Kodepos: kodeposId, Kodepos_Code, Kelurahan_Code: Kelurahan_Code[0]?.Kelurahan_Code }))
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
                    <Form.Group controlId="Kodepos_Code">
                        <Form.Label>Kodepos</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Kode Pos..."
                            name="Kodepos_Code"
                            value={Kodepos_Code}
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
