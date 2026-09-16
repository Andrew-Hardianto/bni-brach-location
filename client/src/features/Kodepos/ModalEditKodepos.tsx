import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';
import { useGetKodeposByIdQuery, useUpdateKodeposMutation } from '@/entities/kodepos/api/kodeposApi';
import { useGetKelurahansQuery } from '@/entities/kelurahan/api/kelurahanApi';

const ModalEditKodepos = ({ onClick, kodeposId }) => {
    const [Postcode, setKodeposCode] = useState('');
    const [Kelurahan_Code, setKelurahanCode] = useState<any>([]);
    const [Status, setStatus] = useState('');
    const [nama, setNama] = useState('');
    
    const { data: queryData } = useGetKodeposByIdQuery(kodeposId, { skip: !kodeposId });
    const kodepos = queryData?.kodepos || queryData || {};
    
    const [updateKodeposApi, { isLoading: loading, error, isSuccess }] = useUpdateKodeposMutation();
    const { data: kelurahansData } = useGetKelurahansQuery({ limit: 1000 });
    const kelurahan = kelurahansData?.kelurahan || [];

    useEffect(() => {
        if (isSuccess) {
            window.location.reload();
            onClick();
        } else if (kodepos?.ID_Postcode) {
            setKelurahanCode([{ Kelurahan_Code: kodepos?.Kelurahan_Code, Kelurahan_Name: kodepos?.kelurahan?.Kelurahan_Name }]);
            setNama(kodepos?.kelurahan?.Kelurahan_Name || '');
            setKodeposCode(kodepos?.Postcode || '');
            setStatus(kodepos?.Status || '');
        }
    }, [kodepos, isSuccess, onClick]);

    function filterBy(option, state) {
        if (state.selected.length) {
            return true;
        }
        return option?.Kelurahan_Name.toLowerCase().indexOf(state.text.toLowerCase()) > -1;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const kelCode = Kelurahan_Code[0]?.Kelurahan_Code || Kelurahan_Code;
        await updateKodeposApi({ id: kodeposId, body: { Postcode, Kelurahan_Code: kelCode, Status } });
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
                            value={Postcode || ''}
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
                            value={Status || ''}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value={Status || ''}>{Status === 'Y' ? 'Aktif' : 'Tidak Aktif'}</option>
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
