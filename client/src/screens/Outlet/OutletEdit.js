import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { OUTLET_UPDATE_RESET } from '../../constants/outletConstants';
import { detailOutlet, editOutlet } from '../../actions/outletActions';
import { listCabang } from '../../actions/cabangActions';
import { listKodepos } from '../../actions/kodeposActions';
import Apikey from '../../components/Apikey';

const initialState = {
    kode: '',
    nama: '',
    alamat: '',
    status: '',
    namaCabang: '',
    kodeCabang: '',
    biLocationCode: '',
    kodepos: '',
    latitude: '',
    longitude: '',
}

const OutletEdit = ({ history, match }) => {
    const outletId = match.params.id;

    const [data, setData] = useState(initialState);

    const dispatch = useDispatch();

    const outletDetail = useSelector(state => state.outletDetail);
    const { outlet } = outletDetail;

    const outletUpdate = useSelector(state => state.outletUpdate);
    const { loading, error, success } = outletUpdate;

    const cabangList = useSelector(state => state.cabangList);
    const { cabang } = cabangList;

    const kodeposList = useSelector(state => state.kodeposList);
    const { kodepos } = kodeposList;

    useEffect(() => {
        dispatch(listCabang())
        dispatch(listKodepos())
        if (success) {
            dispatch({ type: OUTLET_UPDATE_RESET })
            history.push('/location/outlet')
        } else {
            if (!outlet.outlet?.nama || outlet.outlet?.kode !== outletId) {
                dispatch(detailOutlet(outletId));
            }
            setData(outlet?.outlet)
        }
    }, [dispatch, history, outletId, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editOutlet({ ...data }))
    }

    const coords = [isNaN(outlet?.outlet?.latitude) ? -6.241586 : outlet?.outlet?.latitude, isNaN(cabang?.cabang?.longitude) ? 106.992416 : cabang?.cabang?.longitude];

    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        (e) => ({
            dragend() {
                const marker = markerRef.current?.getLatLng()
                if (marker != null) {
                    setData({ latitude: marker.lat, longitude: marker.lng })
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    console.log(data)

    return (
        <div className="home">
            <Card style={{ width: '35rem' }} className="mt-3">
                <Card.Body>
                    <Card.Title>Edit Outlet</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="kode">
                            <Form.Label>Kode Cabang</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Cabang..."
                                name="kode"
                                value={data?.kode}
                                onChange={(e) => setData({ ...data, kode: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="nama">
                            <Form.Label>Nama Outlet</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Outlet..."
                                name="nama"
                                value={data?.nama}
                                onChange={(e) => setData({ ...data, nama: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="alamat">
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Alamat..."
                                as="textarea"
                                rows={3}
                                name="alamat"
                                value={data?.alamat}
                                onChange={(e) => setData({ ...data, alamat: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="kodeCabang">
                                <Form.Label>Kode Cabang</Form.Label>
                                <Form.Control
                                    as="select"
                                    custom
                                    name="kodeCabang"
                                    value={data?.kodeCabang}
                                    onChange={(e) => setData({ ...data, kodeCabang: e.target.value })}
                                >
                                    <option value="">- Pilih Cabang -</option>
                                    {cabang.map((data, index) => (
                                        <option key={index} value={data.kode} >{data.nama}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="kodepos">
                                <Form.Label>Kodepos</Form.Label>
                                <Form.Control
                                    as="select"
                                    custom
                                    name="kodepos"
                                    value={data?.kodepos}
                                    onChange={(e) => setData({ ...data, kodepos: e.target.value })}
                                >
                                    <option value="">- Pilih Kodepos -</option>
                                    {kodepos?.map((data) => (
                                        <option value={data.kode} >{data.kode}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="status"
                                value={data?.status}
                                onChange={(e) => setData({ ...data, status: e.target.value })}
                            >
                                <option value="">- Pilih Status -</option>
                                <option value="Aktif" >Aktif</option>
                                <option value="Tidak Aktif" >Tidak Aktif</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="biLocationCode">
                            <Form.Label>BI Location Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan BI Location Code..."
                                name="biLocationCode"
                                value={data?.biLocationCode}
                                onChange={(e) => setData({ ...data, biLocationCode: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="latitude">
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Latitude..."
                                    name="latitude"
                                    value={data?.latitude}
                                    onChange={(e) => setData({ ...data, latitude: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="longitude">
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Longitude..."
                                    name="longitude"
                                    value={data?.longitude}
                                    onChange={(e) => setData({ ...data, longitude: e.target.value })}
                                />
                            </Form.Group>
                        </Form.Row>
                        <MapContainer style={{ width: "520px", height: "400px" }} center={coords} zoom={14} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://legal.here.com/en-gb/privacy">HERE 2021</a>'
                                url={Apikey.maptiler.url}
                            />
                            <Marker
                                draggable={draggable}
                                eventHandlers={eventHandlers}
                                position={coords}
                                ref={markerRef}>
                                <Popup minWidth={90}>
                                    <span onClick={toggleDraggable}>
                                        {draggable
                                            ? 'Marker is draggable'
                                            : 'Click here to make marker draggable'}
                                    </span>
                                </Popup>
                            </Marker>
                        </MapContainer>
                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                        <Link to={'/location/outlet'} className="btn btn-warning ml-3 mt-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default OutletEdit
