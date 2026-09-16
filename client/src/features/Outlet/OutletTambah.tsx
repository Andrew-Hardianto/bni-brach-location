import { useCreateOutletMutation } from '@/entities/outlet/api/outletApi';
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { useGetCabangsQuery } from '@/entities/cabang/api/cabangApi';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';
import Apikey from '@/shared/ui/Apikey';

const OutletTambah = ({ history }) => {
    const [Outlet_Code, setKode] = useState('');
    const [Outlet_Name, setNama] = useState('');
    const [Address, setAlamat] = useState('');
    const [Branch_Code, setKodeCabang] = useState('');
    const [Latitude, setLatitude] = useState('');
    const [Longitude, setLongitude] = useState('');
    const [Status, setStatus] = useState('');

    const [createOutletApi, { isLoading: loading, error, isSuccess: success }] = useCreateOutletMutation();

    const { data: cabangData } = useGetCabangsQuery({ limit: 100 });
    const cabang = cabangData?.cabang || [];

    useEffect(() => {
        if (success) {
            history.push('/location/outlet')
        }
    }, [history, success])

    const submitHandler = async (e) => {
        e.preventDefault();
        await createOutletApi({ Outlet_Code, Outlet_Name, Address, Branch_Code, Latitude, Longitude, Status });
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
                    setPosition(marker)
                    setLatitude(marker.lat);
                    setLongitude(marker.lng);
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, []);

    return (
        <div className="home">
            <Card style={{ width: '35rem' }} className="mt-3">
                <Card.Body>
                    <Card.Title>Tambah Outlet</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{(error as any)?.data?.message || 'Gagal menambahkan'}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="Outlet_Code">
                            <Form.Label>Kode Outlet</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Outlet..."
                                name="Outlet_Code"
                                onChange={(e) => setKode(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="Outlet_Name">
                            <Form.Label>Nama Outlet</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Outlet..."
                                name="Outlet_Name"
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
                        <Form.Group controlId="Branch_Code">
                            <Form.Label>Kode Cabang</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="Branch_Code"
                                onChange={(e) => setKodeCabang(e.target.value)}
                            >
                                <option value="">- Pilih Cabang -</option>
                                {cabang
                                    .map((cab) => (
                                        <option key={cab.ID_Branch} value={cab.Branch_Code || ''} >{cab.Branch_Name}</option>
                                    ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="latitude">
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Latitude..."
                                    name="latitude"
                                    value={Latitude || ''}
                                    onChange={(e) => setLatitude(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="longitude">
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Longitude..."
                                    name="longitude"
                                    value={Longitude || ''}
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
                                value={Status || ''}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">- Pilih Status -</option>
                                <option value="Y" >Aktif</option>
                                <option value="N" >Tidak Aktif</option>
                            </Form.Control>
                        </Form.Group>
                        <MapContainer style={{ width: "520px", height: "400px" }} center={coords} zoom={14} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
