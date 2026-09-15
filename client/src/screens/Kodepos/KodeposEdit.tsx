import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { listKelurahan, allKelurahan } from '../../actions/kelurahanActions';
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
    const [Code, setCode] = useState();
    const [nama, setNama] = useState('');
    const [display, setDisplay] = useState(false);
    const wrapperRef = useRef(null)

    const dispatch = useDispatch();

    const kodeposDetail = useSelector(state => state.kodeposDetail);
    const { kodepos } = kodeposDetail;

    const kodeposUpdate = useSelector(state => state.kodeposUpdate);
    const { loading, error, success } = kodeposUpdate;

    const kelurahanAll = useSelector(state => state.kelurahanAll);
    const { kelurahan } = kelurahanAll;

    useEffect(() => {
        // dispatch(listKelurahan())
        dispatch(allKelurahan(Kelurahan_Code))
        if (success) {
            dispatch({ type: KODEPOS_UPDATE_RESET })
            history.push('/location/kodepos')
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
    }, [dispatch, history, kodeposId, kodepos?.kodepos?.ID_Kodepos, success]);

    // useEffect(() => {
    //     window.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         window.removeEventListener("mousedown", handleClickOutside);
    //     };
    // });

    // const handleClickOutside = event => {
    //     const { current: wrap } = wrapperRef;
    //     if (wrap && !wrap.contains(event.target)) {
    //         setDisplay(false);
    //     }
    // };

    // const updatePokeDex = val => {
    //     setKelurahanCode(val);
    //     setDisplay(false);
    // };

    function filterBy(option, state) {
        if (state.selected.length) {
            return true;
        }
        return option?.Kelurahan_Name.toLowerCase().indexOf(state.text.toLowerCase()) > -1;
    }

    // const handleChange = (e) => {
    //     setData({ ...data, [e.target.name]: e.target.value })
    // }

    const submitHandler = (e) => {
        e.preventDefault();
        if (Kelurahan_Code[0]?.Kelurahan_Code == undefined) {
            dispatch(editKodepos({ ID_Kodepos: kodeposId, Kodepos_Code, Kelurahan_Code }))
        }
        dispatch(editKodepos({ ID_Kodepos: kodeposId, Kodepos_Code, Kelurahan_Code: Kelurahan_Code[0]?.Kelurahan_Code }))
        console.log(Kelurahan_Code)
    }

    // console.log(Kelurahan_Code)
    // console.log(Kodepos_Code)
    // console.log(nama)
    // console.log(Code)

    // const MenuList = ({ children, ...props }) => {
    //     return (
    //         <components.MenuList {...props}>
    //             {
    //                 Array.isArray(children)
    //                     ? children.slice(0, props.selectProps?.maxOptions)
    //                     : children
    //             }
    //         </components.MenuList>
    //     );
    // };
    // const initialOptions = options.slice(0, 10);
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
                        <Form.Group controlId="Kelurahan_Code" >
                            <Form.Label>Kelurahan</Form.Label>
                            {/* <Form.Control
                                type="text"
                                onClick={() => setDisplay(!display)}
                                placeholder="Masukkan Kode Kelurahan..."
                                name="Kelurahan_Code"
                                value={Kelurahan_Code}
                                onChange={(e) => setKelurahanCode(e.target.value)}
                                autoComplete="off"
                            /> */}
                            {/* {display && (
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
                                                    <p>{value.Kelurahan_Name}</p>
                                                </div>
                                            );
                                        })}
                                </div>
                            )} */}

                            {/* <Select
                                name="Kelurahan_Code"
                                // inputValue={Kelurahan_Code}
                                onChange={(e) => setKelurahanCode(e.target.value)}
                                options={kelurahan}
                                getOptionValue={(option) => option.Kelurahan_Code}
                                getOptionLabel={(option) => option.Kelurahan_Name}
                                components={{ MenuList }}
                                maxOptions={5}
                                filterOption={createFilter({ ignoreAccents: false })}
                            /> */}
                            {/* <AsyncPaginate
                                options={initialOptions}
                                loadOptions={loadOptions}
                                value={Kelurahan_Code}
                                onChange={(e) => setKelurahanCode(e)}
                                getOptionValue={(option) => option.Kelurahan_Code}
                                getOptionLabel={(option) => option.Kelurahan_Name}
                            /> */}
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
