import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { detailKelurahan, editKelurahan } from '../../actions/kelurahanActions';
import { listKecamatan } from '../../actions/kecamatanActions';
import { KELURAHAN_UPDATE_RESET } from '../../constants/kelurahanConstants';

const initialState = { Kelurahan_Code: '', Kelurahan_Name: '', Kecamatan_Code: '' }

const KelurahanEdit = ({ history, match }) => {
    const kelurahanId = match.params.id;

    const [data, setData] = useState(initialState);

    const dispatch = useDispatch();

    const kelurahanDetail = useSelector(state => state.kelurahanDetail);
    const { kelurahan } = kelurahanDetail;

    const kelurahanUpdate = useSelector(state => state.kelurahanUpdate);
    const { loading, error, success } = kelurahanUpdate;

    const kecamatanList = useSelector(state => state.kecamatanList);
    const { kecamatan } = kecamatanList;

    useEffect(() => {
        dispatch(listKecamatan())
        if (success) {
            dispatch({ type: KELURAHAN_UPDATE_RESET })
            history.push('/location/kelurahan')
        } else {
            if (!kelurahan?.kelurahan?.Kelurahan_Name || kelurahan?.kelurahan?.ID_Kelurahan !== kelurahanId) {
                dispatch(detailKelurahan(kelurahanId));
            }
            setData(kelurahan?.kelurahan)
        }
    }, [dispatch, history, kelurahanId, kelurahan?.kelurahan?.ID_Kelurahan, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editKelurahan({ ...data }))
    }

    // console.log(data)

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Edit Kelurahan</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="Kelurahan_Code">
                            <Form.Label>Kode Kelurahan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Kelurahan..."
                                name="Kelurahan_Code"
                                value={data?.Kelurahan_Code}
                                onChange={(e) => setData({ ...data, Kelurahan_Code: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="Kelurahan_Name">
                            <Form.Label>Nama Kelurahan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Kelurahan..."
                                name="Kelurahan_Name"
                                value={data?.Kelurahan_Name}
                                onChange={(e) => setData({ ...data, Kelurahan_Name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="Kecamatan_Code">
                            <Form.Label>Kecamatan</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="kecamatanId"
                                value={data?.Kecamatan_Code}
                                onChange={(e) => setData({ ...data, Kecamatan_Code: e.target.value })}
                            >
                                <option value="">- Pilih Kecamatan -</option>
                                {kecamatan.filter((kc) => kc.Kecamatan_Code.toString().includes(data?.Kelurahan_Code.toString().substring(0, 7)))
                                    .map((kc) => (
                                        <option key={kc.ID_Kecamatan} value={kc.Kecamatan_Code} >{kc.Kecamatan_Name}</option>
                                    ))}
                                {/* {kecamatan.filter((kc) => kc.Kecamatan_Code?.toString().includes(data?.Kelurahan_Code.toString().substring(0, 7)))
                                    .map((d) => (
                                        <option key={d.ID_Kecamatan} value={d.Kecamatan_Code} >{d.Kecamatan_Name}</option>
                                    ))} */}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Link to={'/location/kelurahan'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div >
    )
}

export default KelurahanEdit
