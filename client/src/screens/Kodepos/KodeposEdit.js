import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { listKelurahan } from '../../actions/kelurahanActions';
import { detailKodepos, editKodepos } from '../../actions/kodeposActions';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { KODEPOS_UPDATE_RESET } from '../../constants/kodeposConstants';

const initialState = { Kodepos_Code: '', Kelurahan_Code: '' }

const KodeposEdit = ({ history, match }) => {
    const kodeposId = match.params.id;

    const [data, setData] = useState(initialState);
    const [Kodepos_Code, setKodeposCode] = useState('');
    const [Kelurahan_Code, setKelurahanCode] = useState('');
    const [Code, setCode] = useState('');
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const wrapperRef = useRef(null)

    const dispatch = useDispatch();

    const kodeposDetail = useSelector(state => state.kodeposDetail);
    const { kodepos } = kodeposDetail;

    const kodeposUpdate = useSelector(state => state.kodeposUpdate);
    const { loading, error, success } = kodeposUpdate;

    const kelurahanList = useSelector(state => state.kelurahanList);
    const { kelurahan } = kelurahanList;

    useEffect(() => {
        dispatch(listKelurahan())
        if (success) {
            dispatch({ type: KODEPOS_UPDATE_RESET })
            history.push('/location/kodepos')
        } else {
            if (kodepos?.kodepos?.ID_Kodepos !== kodeposId) {
                dispatch(detailKodepos(kodeposId));
            }
            // setData(kodepos?.kodepos)
            setKelurahanCode(kodepos?.kodepos?.Kelurahan_Code)
            // setCode(kodepos?.kodepos?.kelurahan?.Kelurahan_Name)
            setKodeposCode(kodepos?.kodepos?.Kodepos_Code)
        }
    }, [dispatch, history, kodeposId, kodepos?.kodepos?.ID_Kodepos, success]);

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false);
        }
    };

    const updatePokeDex = val => {
        setKelurahanCode(val);
        setDisplay(false);
    };

    function filterBy(option, state) {
        if (state.selected.length) {
            return true;
        }
        return option?.Kelurahan_Name.toLowerCase().indexOf(state.text.toLowerCase()) > -1;
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(editKodepos({ ...data }))
        dispatch(editKodepos({ ID_Kodepos: kodeposId, Kodepos_Code, Kelurahan_Code }))
    }

    console.log(Kelurahan_Code)
    console.log(Kodepos_Code)

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Edit Kode POS</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
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
                        <Form.Group controlId="Kelurahan_Code" ref={wrapperRef}>
                            <Form.Label>Kelurahan</Form.Label>
                            {/* <Form.Control
                                as="select"
                                custom
                                name="Kelurahan_Code"
                                value={data?.Kelurahan_Code}
                                onChange={handleChange}
                            >
                                <option value="">- Pilih Kelurahan -</option>
                                {kelurahan.map((data) => (
                                    <option key={data.ID_Kelurahan} value={data.Kelurahan_Code} >{data.Kelurahan_Name}</option>
                                ))}
                            </Form.Control> */}
                            <Form.Control
                                type="text"
                                onClick={() => setDisplay(!display)}
                                placeholder="Masukkan Kode Kelurahan..."
                                name="Kelurahan_Code"
                                value={Kelurahan_Code}
                                onChange={(e) => setKelurahanCode(e.target.value)}
                                autocomplete="off"
                            />
                            {display && (
                                <div className="autoContainer">
                                    {kelurahan
                                        ?.filter((kl) => kl.Kelurahan_Name?.indexOf(Kelurahan_Code.toLowerCase()) > -1)
                                        .map((value, i) => {
                                            return (
                                                <div
                                                    onClick={() => updatePokeDex(value.Kelurahan_Code)}
                                                    className="option"
                                                    key={i}
                                                    tabIndex="0"
                                                >
                                                    <span>{value.Kelurahan_Name}</span>
                                                </div>
                                            );
                                        })}
                                </div>
                            )}
                            {/* <Typeahead
                                filterBy={filterBy}
                                id="Kelurahan_Code"
                                labelKey="Kelurahan_Name"
                                name="Kelurahan_Code"
                                options={kelurahan}
                                // onChange={handleChange}
                                onChange={setKelurahanCode}
                                selected={Kelurahan_Code.Kodepos_Code}
                                defaultInputValue={Code}
                                renderMenuItemChildren={(opt) => (
                                    <div>
                                        <p className="font-weight-bold">{opt.Kelurahan_Name}</p>
                                    </div>
                                )}
                            /> */}
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

export default KodeposEdit
