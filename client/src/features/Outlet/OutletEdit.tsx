import { useGetOutletByIdQuery, useUpdateOutletMutation } from '@/entities/outlet/api/outletApi';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';
import { useGetCabangsQuery } from '@/entities/cabang/api/cabangApi';
import Apikey from '@/shared/ui/Apikey';

const initialState = {
    Outlet_Code: '',
    Outlet_Name: '',
    Address: '',
    Branch_Code: '',
    Latitude: '',
    Longitude: '',
}

const OutletEdit = ({ history, match }) => {
    const outletId = match.params.id;

    const [data, setData] = useState(initialState);

    const { data: queryData, isLoading: loadingDetail, error: errorDetail } = useGetOutletByIdQuery(outletId, { skip: !outletId });
    const outlet = queryData?.outlet || queryData || {};
    const [updateOutletApi, { isLoading: loadingUpdate, error: errorUpdate, isSuccess: successUpdate }] = useUpdateOutletMutation();

    const { data: cabangData } = useGetCabangsQuery({ limit: 100 });
    const cabang = cabangData?.cabang || [];

    useEffect(() => {
        if (successUpdate) {
            history.push('/location/outlet')
        } else {
            if (outlet && outlet.ID_Outlet === outletId) {
                setData(outlet)
            }
        }
    }, [history, outletId, outlet, successUpdate])

    const submitHandler = async (e) => {
        e.preventDefault();
        await updateOutletApi({ id: outletId, body: { ...data } });
    }

    const coords = [isNaN(outlet?.Latitude) ? -6.241586 : outlet?.Latitude, isNaN(outlet?.Longitude) ? 106.992416 : outlet?.Longitude] as [number, number];

    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        (e) => ({
            dragend() {
                const marker = markerRef.current?.getLatLng()
                if (marker != null) {
                    setData(prev => ({ ...prev, Latitude: marker.lat, Longitude: marker.lng }))
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
            <Card style={{ width: '35rem' }} className="mt-5">
                <Card.Body>
                    <Card.Title>Edit Outlet</Card.Title>
                    {(loadingUpdate || loadingDetail) && <Loader />}
                    {errorUpdate && <Message variant="danger" >{(errorUpdate as any)?.data?.message || 'Gagal mengubah data'}</Message>}
                    {errorDetail && <Message variant="danger" >{(errorDetail as any)?.data?.message || 'Gagal memuat data'}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="Outlet_Code">
                            <Form.Label>Kode Cabang</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Cabang..."
                                name="Outlet_Code"
                                value={data?.Outlet_Code || ''}
                                onChange={(e) => setData({ ...data, Outlet_Code: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="Outlet_Name">
                            <Form.Label>Nama Outlet</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Outlet..."
                                name="Outlet_Name"
                                value={data?.Outlet_Name || ''}
                                onChange={(e) => setData({ ...data, Outlet_Name: e.target.value })}
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
                                value={data?.Address || ''}
                                onChange={(e) => setData({ ...data, Address: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="Branch_Code">
                            <Form.Label>Kode Cabang</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="Branch_Code"
                                value={data?.Branch_Code || ''}
                                onChange={(e) => setData({ ...data, Branch_Code: e.target.value })}
                            >
                                <option value="">- Pilih Cabang -</option>
                                {cabang
                                    .filter(cab => cab.Branch_Code.toString().includes(data.Outlet_Code.toString().substring(0, 4)))
                                    .map((cab) => (
                                        <option key={cab.ID_Branch} value={cab.Branch_Code || ''} >{cab.Branch_Name}</option>
                                    ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="Latitude">
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Latitude..."
                                    name="Latitude"
                                    value={data?.Latitude || ''}
                                    onChange={(e) => setData({ ...data, Latitude: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="Longitude">
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Longitude..."
                                    name="Longitude"
                                    value={data?.Longitude || ''}
                                    onChange={(e) => setData({ ...data, Longitude: e.target.value })}
                                />
                            </Form.Group>
                        </Form.Row>
                        <MapContainer style={{ width: "520px", height: "400px" }} center={coords} zoom={14} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
