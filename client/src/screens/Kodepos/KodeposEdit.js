import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listKelurahan } from '../../actions/kelurahanActions';
import { detailKodepos, editKodepos } from '../../actions/kodeposActions';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { KODEPOS_UPDATE_RESET } from '../../constants/kodeposConstants';

const initialState = { Kodepos_Code: '', Kelurahan_Code: '' }

const KodeposEdit = ({ history, match }) => {
    const kodeposId = match.params.id;
    const [data, setData] = useState(initialState);
    const [kode, setKode] = useState('');

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
            dispatch(detailKodepos(kodeposId));
            setData(kodepos?.kodepos)
        }
    }, [dispatch, history, kodeposId, success])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editKodepos({ ...data }))
    }

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
                                value={data?.Kodepos_Code}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="Kelurahan_Code">
                            <Form.Label>Kelurahan</Form.Label>
                            <Form.Control
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

export default KodeposEdit
