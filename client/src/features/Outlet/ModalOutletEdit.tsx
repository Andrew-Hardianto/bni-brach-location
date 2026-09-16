import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Button, Modal, Col, Form } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';
import { useGetCabangsQuery } from '@/entities/cabang/api/cabangApi';
import { useGetOutletByIdQuery, useUpdateOutletMutation } from '@/entities/outlet/api/outletApi';
import Apikey from '@/shared/ui/Apikey';

const initialState = {
    Outlet_Code: '',
    Outlet_Name: '',
    Address: '',
    Branch_Code: '',
    Latitude: '',
    Longitude: '',
    Status: ''
}

const ModalOutletEdit = ({ onClick, outletId }) => {

    const [data, setData] = useState(initialState);

    const { data: queryData, isLoading: loadingDetail, error: errorDetail } = useGetOutletByIdQuery(outletId, { skip: !outletId });
    const outlet = queryData?.outlet || queryData || {};

    const [updateOutletApi, { isLoading: loadingUpdate, error: errorUpdate, isSuccess: success }] = useUpdateOutletMutation();

    const { data: cabangData } = useGetCabangsQuery({ limit: 100 });
    const cabang = cabangData?.cabang || [];

    useEffect(() => {
        if (success) {
            window.location.reload();
            onClick();
        } else {
            if (outlet && outlet.ID_Outlet === outletId) {
                setData(outlet);
            }
        }
    }, [outlet, outletId, success, onClick])

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
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Outlet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorUpdate && <Message variant="danger" >{(errorUpdate as any)?.data?.message || 'Gagal mengubah data'}</Message>}
                {(loadingUpdate || loadingDetail) && <Loader />}
                <Form>
                    <Form.Group controlId="Outlet_Code">
                        <Form.Label>Kode Outlet</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Kode Outlet..."
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
                    <Form.Group controlId="Status">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            name="Status"
                            value={data?.Status || ''}
                            onChange={(e) => setData({ ...data, Status: e.target.value })}
                        >
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

export default ModalOutletEdit
