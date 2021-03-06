import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { createCabang } from '../../actions/cabangActions';
import { listWilayah } from '../../actions/wilayahActions';
import Apikey from '../../components/Apikey';

const initialState = {
    Branch_Code: '',
    Branch_Name: '',
    Address: '',
    BI_Location_Code: '',
    kodeWilayah: '',
    Latitude: '',
    Longitude: ''
}

const CabangTambah = ({ history }) => {
    // const [data, setData] = useState(initialState)

    const [Branch_Code, setKode] = useState('');
    const [Branch_Name, setNama] = useState('');
    const [Address, setAlamat] = useState('');
    const [Region_Code, setKodeWilayah] = useState('');
    const [Latitude, setLatitude] = useState('');
    const [Longitude, setLongitude] = useState('');
    const [Status, setStatus] = useState('');
    const [BI_Location_Code, setBiLocationCode] = useState('');

    const dispatch = useDispatch();

    const cabangCreate = useSelector(state => state.cabangCreate);
    const { loading, error, success } = cabangCreate;

    const wilayahList = useSelector(state => state.wilayahList);
    const { wilayah } = wilayahList;

    useEffect(() => {
        dispatch(listWilayah())
        if (success) {
            history.push('/location/branch')
        }
    }, [history, success])

    // const handleChange = (e) => {
    //     setData({ ...data, [e.target.name]: e.target.value })
    // }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createCabang(Branch_Code, Branch_Name, BI_Location_Code, Address, Region_Code, Latitude, Longitude, Status))
    }

    const coords = { lat: -6.241586, lng: 106.992416 };

    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(coords)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        (e) => ({
            dragend() {
                const marker = markerRef.current.getLatLng()
                if (marker != null) {
                    // setPosition(marker.getLatLng())
                    // setData({ latitude: marker.lat, longitude: marker.lng })
                    setLatitude(marker.lat)
                    setLongitude(marker.lng)
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, []);

    // console.log(Branch_Code)
    // console.log(Region_Code)

    return (
        <div className="home">
            <Card style={{ width: '35rem' }} className="mt-3">
                <Card.Body>
                    <Card.Title>Tambah Branch</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="Branch_Code">
                            <Form.Label>Kode Cabang</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Cabang..."
                                name="Branch_Code"
                                onChange={(e) => setKode(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="Branch_Name">
                            <Form.Label>Nama Cabang</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Cabang..."
                                name="Branch_Name"
                                onChange={(e) => setNama(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="Address">
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Alamat..."
                                as="textarea"
                                rows={3}
                                name="Address"
                                onChange={(e) => setAlamat(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="Region_Code">
                            <Form.Label>Kode Wilayah</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="Region_Code"
                                onChange={(e) => setKodeWilayah(e.target.value)}
                            >
                                <option value="">- Pilih Wilayah -</option>
                                {wilayah.map((data) => (
                                    <option key={data.ID_Region} value={data.Region_Code} >{data.Region_Name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
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
                        <Form.Group controlId="Status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="Status"
                                value={Status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">- Pilih Status -</option>
                                <option value="Y" >Aktif</option>
                                <option value="N" >Tidak Aktif</option>
                            </Form.Control>
                        </Form.Group>
                        <MapContainer style={{ width: "520px", height: "400px" }} center={coords} zoom={14} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://legal.here.com/en-gb/privacy">HERE 2021</a>'
                                url={Apikey.maptiler.url}
                            />
                            <Marker
                                draggable={draggable}
                                eventHandlers={eventHandlers}
                                position={position}
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

export default CabangTambah
