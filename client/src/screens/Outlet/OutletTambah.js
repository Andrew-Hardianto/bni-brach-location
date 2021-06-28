import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { listCabang } from '../../actions/cabangActions';
import { createOutlet } from '../../actions/outletActions';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Apikey from '../../components/Apikey';
import { listKodepos } from '../../actions/kodeposActions';

const initialState = {
    kode: '',
    nama: '',
    alamat: '',
    namaCabang: '',
    kodeCabang: '',
    latitude: '',
    longitude: '',
    biLocationCode: '',
    kodepos: '',
}

const OutletTambah = ({ history }) => {
    // const [data, setData] = useState(initialState)

    const [kode, setKode] = useState('');
    const [nama, setNama] = useState('');
    const [alamat, setAlamat] = useState('');
    const [kodePos, setKodePos] = useState('');
    const [kodeCabang, setKodeCabang] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [biLocationCode, setBiLocationCode] = useState('');

    const dispatch = useDispatch();

    const outletCreate = useSelector(state => state.outletCreate);
    const { loading, error, success } = outletCreate;

    const cabangList = useSelector(state => state.cabangList);
    const { cabang } = cabangList;

    const kodeposList = useSelector(state => state.kodeposList);
    const { kodepos } = kodeposList;

    useEffect(() => {
        dispatch(listCabang())
        dispatch(listKodepos())
        if (success) {
            history.push('/location/outlet')
        }
    }, [history, success])

    // const handleChange = (e) => {
    //     setData({ ...data, [e.target.name]: e.target.value })
    // }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createOutlet(kode, nama, alamat, kodeCabang, kodePos, biLocationCode, latitude, longitude))
    }

    const coords = { lat: -6.241586, lng: 106.992416 };

    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        (e) => ({
            dragend() {
                const marker = markerRef.current.getLatLng()
                if (marker != null) {
                    // setPosition(marker.getLatLng())
                    // setData({ latitude: marker.lat, longitude: marker.lng })
                    setLatitude(marker.lat);
                    setLongitude(marker.lng);
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    console.log(kode, nama, alamat, kodeCabang, kodePos, biLocationCode, latitude, longitude)

    return (
        <div className="home">
            <Card style={{ width: '35rem' }} className="mt-3">
                <Card.Body>
                    <Card.Title>Tambah Outlet</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="id">
                            <Form.Label>Kode Outlet</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Outlet..."
                                name="kode"
                                onChange={(e) => setKode(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="nama">
                            <Form.Label>Nama Outlet</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Outlet..."
                                name="nama"
                                onChange={(e) => setNama(e.target.value)}
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
                                onChange={(e) => setAlamat(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="kodeCabang">
                                <Form.Label>Kode Cabang</Form.Label>
                                <Form.Control
                                    as="select"
                                    custom
                                    name="kodeCabang"
                                    onChange={(e) => setKodeCabang(e.target.value)}
                                >
                                    <option value="">- Pilih Cabang -</option>
                                    {cabang.map((data) => (
                                        <option value={data.kode} >{data.nama}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="kodepos">
                                <Form.Label>Kodepos</Form.Label>
                                <Form.Control
                                    as="select"
                                    custom
                                    name="kodepos"
                                    onChange={(e) => setKodePos(e.target.value)}
                                >
                                    <option value="">- Pilih Kodepos -</option>
                                    {kodepos.map((data) => (
                                        <option value={data.kode} >{data.kode}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="biLocationCode">
                            <Form.Label>BI Location Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan BI Location Code..."
                                name="biLocationCode"
                                onChange={(e) => setBiLocationCode(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="latitude">
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Latitude..."
                                    name="latitude"
                                    onChange={(e) => setLatitude(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="longitude">
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Longitude..."
                                    name="longitude"
                                    onChange={(e) => setLongitude(e.target.value)}
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

export default OutletTambah
