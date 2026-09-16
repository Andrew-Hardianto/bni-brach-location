import { useGetKodeposByIdQuery, useUpdateKodeposMutation } from '@/entities/kodepos/api/kodeposApi';
import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useGetKelurahansQuery } from '@/entities/kelurahan/api/kelurahanApi';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';


const KodeposEdit = ({ history, match }) => {
    const kodeposId = match.params.id;

    const [Kodepos_Code, setKodeposCode] = useState('');
    const [Kelurahan_Code, setKelurahanCode] = useState<any>([]);
    const [nama, setNama] = useState('');

    const { data: queryData, isLoading: loadingDetail, error: errorDetail } = useGetKodeposByIdQuery(kodeposId, { skip: !kodeposId });
    const kodepos = queryData?.kodepos || queryData || {};
    const [updateKodeposApi, { isLoading: loadingUpdate, error: errorUpdate, isSuccess: successUpdate }] = useUpdateKodeposMutation();

    const { data: kelurahanData } = useGetKelurahansQuery({ limit: 1000 });
    const kelurahan = kelurahanData?.kelurahan || [];

    useEffect(() => {
        if (successUpdate) {
            history.push('/location/kodepos')
        } else if (kodepos?.ID_Kodepos) {
            setKelurahanCode([{ Kelurahan_Code: kodepos?.Kelurahan_Code, Kelurahan_Name: kodepos?.kelurahan?.Kelurahan_Name }]);
            setNama(kodepos?.kelurahan?.Kelurahan_Name || '')
            setKodeposCode(kodepos?.Kodepos_Code || '')
        }
    }, [history, kodepos, successUpdate]);


    function filterBy(option, state) {
        if (state.selected.length) {
            return true;
        }
        return option?.Kelurahan_Name.toLowerCase().indexOf(state.text.toLowerCase()) > -1;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const kelCode = Kelurahan_Code[0]?.Kelurahan_Code || Kelurahan_Code;
        await updateKodeposApi({ id: kodeposId, body: { Kodepos_Code, Kelurahan_Code: kelCode } });
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
                                value={Kodepos_Code || ''}
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
                                value={Kelurahan_Code || ''}
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
                                value={Kelurahan_Code || ''}
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
