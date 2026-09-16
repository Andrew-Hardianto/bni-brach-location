import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Button, Modal, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';
import { useGetWilayahsQuery } from '@/entities/wilayah/api/wilayahApi';
import Apikey from '@/shared/ui/Apikey';
import { useGetCabangByIdQuery, useUpdateCabangMutation } from '@/entities/cabang/api/cabangApi';

const initialState = {
    Branch_Code: '',
    Branch_Name: '',
    Address: '',
    BI_Location_Code: '',
    Region_Code: '',
    Latitude: '',
    Longitude: '',
    Status: ''
}

const ModalEditBranch = ({ onClick, cabangId }) => {

    const [data, setData] = useState(initialState);

    const dispatch = useDispatch();

    const { data: cabangData, isLoading: loadingDetail, error: errorDetail } = useGetCabangByIdQuery(cabangId);
    
    const [updateCabang, { isLoading: loadingUpdate, error: errorUpdate, isSuccess: successUpdate }] = useUpdateCabangMutation();

    const { data: wilayahData } = useGetWilayahsQuery({ limit: 100 });
    const wilayah = wilayahData?.wilayah || [];

    useEffect(() => {
        ;
    }, [dispatch]);
    
    useEffect(() => {
        if (cabangData?.cabang) {
            setData(cabangData.cabang);
        }
    }, [cabangData]);

    useEffect(() => {
        if (successUpdate) {
            window.location.reload();
            onClick();
        }
    }, [successUpdate, onClick]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateCabang({ id: cabangId, body: { ...data } }).unwrap();
        } catch (err) {
            console.error(err);
        }
    }

    const coords = [isNaN(data?.Latitude) ? -6.241586 : data?.Latitude, isNaN(data?.Longitude) ? 106.992416 : data?.Longitude];

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

    const loading = loadingDetail || loadingUpdate;
    const error = errorDetail || errorUpdate;

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Kelurahan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Message variant="danger" >{typeof error === 'string' ? error : 'An error occurred'}</Message>}
                {loading && <Loader />}
                <Form>
                    <Form.Group controlId="Branch_Code">
                        <Form.Label>Kode Cabang</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Kode Cabang..."
                            name="Branch_Code"
                            value={data?.Branch_Code || ''}
                            onChange={(e) => setData({ ...data, Branch_Code: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="Branch_Name">
                        <Form.Label>Nama Cabang</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Nama Cabang..."
                            name="Branch_Name"
                            value={data?.Branch_Name || ''}
                            onChange={(e) => setData({ ...data, Branch_Name: e.target.value })}
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
                    <Form.Group controlId="Region_Code">
                        <Form.Label>Kode Wilayah</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            name="Region_Code"
                            value={data?.Region_Code || ''}
                            onChange={(e) => setData({ ...data, Region_Code: e.target.value })}
                        >
                            <option value="">- Pilih Wilayah -</option>
                            {wilayah
                                ?.filter(wil => wil?.Region_Code.toString().includes(data?.Branch_Code?.toString().substring(0, 2) || ''))
                                .map((item) => (
                                    <option key={item.ID_Region} value={item.Region_Code} >{item.Region_Name}</option>
                                ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="BI_Location_Code">
                        <Form.Label>BI Location Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan BI Location Code..."
                            name="BI_Location_Code"
                            value={data?.BI_Location_Code || ''}
                            onChange={(e) => setData({ ...data, BI_Location_Code: e.target.value })}
                        />
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
                            <option value={data?.Status || ''}>{data?.Status === 'Y' ? 'Aktif' : 'Tidak Aktif'}</option>
                            <option value="Y" >Aktif</option>
                            <option value="N" >Tidak Aktif</option>
                        </Form.Control>
                    </Form.Group>
                    <MapContainer style={{ width: "550px", height: "400px" }} center={coords} zoom={14} scrollWheelZoom={false}>
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

export default ModalEditBranch;
