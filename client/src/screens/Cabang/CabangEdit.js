import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { detailCabang, editCabang } from '../../actions/cabangActions';
import { CABANG_UPDATE_RESET } from '../../constants/cabangConstants';
import { listWilayah } from '../../actions/wilayahActions';
import Apikey from '../../components/Apikey';
import { listKodepos } from '../../actions/kodeposActions';

const initialState = {
    kode: '',
    nama: '',
    alamat: '',
    status: '',
    biLocationCode: '',
    kodepos: '',
    namaWilayah: '',
    kodeWilayah: '',
    latitude: '',
    longitude: '',
}

const CabangEdit = ({ history, match }) => {
    const cabangId = match.params.id;

    const [data, setData] = useState(initialState);

    const dispatch = useDispatch();

    const cabangDetail = useSelector(state => state.cabangDetail);
    const { cabang } = cabangDetail;

    const cabangUpdate = useSelector(state => state.cabangUpdate);
    const { loading, error, success } = cabangUpdate;

    const wilayahList = useSelector(state => state.wilayahList);
    const { wilayah } = wilayahList;

    const kodeposList = useSelector(state => state.kodeposList);
    const { kodepos } = kodeposList;

    useEffect(() => {
        dispatch(listWilayah())
        dispatch(listKodepos())
        if (success) {
            dispatch({ type: CABANG_UPDATE_RESET })
            history.push('/location/branch')
        } else {
            if (!cabang?.cabang?.nama || cabang?.cabang?.kode !== cabangId) {
                dispatch(detailCabang(cabangId));
            }
            setData(cabang?.cabang)
        }
    }, [dispatch, history, cabangId, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editCabang({ ...data }))
    }

    // const coords = [cabang?.cabang?.latitude, cabang?.cabang?.longitude]
    const coords = [isNaN(cabang?.cabang?.latitude) ? -6.241586 : cabang?.cabang?.latitude, isNaN(cabang?.cabang?.longitude) ? 106.992416 : cabang?.cabang?.longitude];

    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        (e) => ({
            dragend() {
                const marker = markerRef.current?.getLatLng()
                if (marker != null) {
                    // setPosition(marker.getLatLng())
                    setData({ latitude: marker.lat, longitude: marker.lng })
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    return (
        <div className="home">
            <Card style={{ width: '35rem' }} className="mt-3">
                <Card.Body>
                    <Card.Title>Edit Branch</Card.Title>
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
                            // onChange={(e) => setKode(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="nama">
                            <Form.Label>Nama Cabang</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Cabang..."
                                name="nama"
                                value={data?.nama}
                                onChange={(e) => setData({ ...data, nama: e.target.value })}
                            // onChange={(e) => setNama(e.target.value)}
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
                            // onChange={(e) => setAlamat(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="status"
                                value={data?.status}
                                onChange={(e) => setData({ ...data, status: e.target.value })}
                            // onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">- Pilih Status -</option>
                                <option value="Aktif" >Aktif</option>
                                <option value="Tidak Aktif" >Tidak Aktif</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="kodeWilayah">
                                <Form.Label>Kode Wilayah</Form.Label>
                                <Form.Control
                                    as="select"
                                    custom
                                    name="kodeWilayah"
                                    value={data?.kodeWilayah}
                                    onChange={(e) => setData({ ...data, kodeWilayah: e.target.value })}
                                // onChange={(e) => setKodeWilayah(e.target.value)}
                                >
                                    <option value="">- Pilih Wilayah -</option>
                                    {wilayah.map((data) => (
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
                                    value={data?.kodepos}
                                    onChange={(e) => setData({ ...data, kodepos: e.target.value })}
                                // onChange={(e) => setKodePos(e.target.value)}
                                >
                                    <option value="">- Pilih Kodepos -</option>
                                    {kodepos?.map((data) => (
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
                                value={data?.biLocationCode}
                                onChange={(e) => setData({ ...data, biLocationCode: e.target.value })}
                            // onChange={(e) => setBiLocationCode(e.target.value)}
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
                                // onChange={(e) => setLatitude(e.target.value)}
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
                                // onChange={(e) => setLongitude(e.target.value)}
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
                        <Link to={'/location/branch'} className="btn btn-warning ml-3 mt-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CabangEdit
