import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Button, Modal, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { OUTLET_UPDATE_RESET } from '../../constants/outletConstants';
import { detailOutlet, editOutlet } from '../../actions/outletActions';
import { listCabang } from '../../actions/cabangActions';
import Apikey from '../../components/Apikey';

const initialState = {
    Outlet_Code: '',
    Outlet_Name: '',
    Address: '',
    Branch_Code: '',
    Latitude: '',
    Longitude: '',
}

const ModalOutletEdit = ({ onClick, outletId }) => {

    const [data, setData] = useState(initialState);

    const dispatch = useDispatch();

    const { outlet } = useSelector(state => state.outletDetail);

    const { loading, error, success } = useSelector(state => state.outletUpdate);

    const { cabang } = useSelector(state => state.cabangList);

    useEffect(() => {
        dispatch(listCabang());
        if (success) {
            dispatch({ type: OUTLET_UPDATE_RESET })
            window.location.reload(false)
            onClick()
        } else {
            if (!outlet.outlet?.Outlet_Name || outlet.outlet?.ID_Outlet !== outletId) {
                dispatch(detailOutlet(outletId));
            }
            setData(outlet?.outlet)
        }
    }, [dispatch, outletId, outlet.outlet?.ID_Outlet, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editOutlet({ ...data }))
    }

    const coords = [isNaN(outlet?.outlet?.Latitude) ? -6.241586 : outlet?.outlet?.Latitude, isNaN(cabang?.cabang?.Longitude) ? 106.992416 : cabang?.cabang?.Longitude];

    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        (e) => ({
            dragend() {
                const marker = markerRef.current?.getLatLng()
                if (marker != null) {
                    setData({ Latitude: marker.lat, Longitude: marker.lng })
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
                <Modal.Title>Edit Kelurahan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Message variant="danger" >{error}</Message>}
                {loading && <Loader />}
                <Form>
                    <Form.Group controlId="Outlet_Code">
                        <Form.Label>Kode Cabang</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Kode Cabang..."
                            name="Outlet_Code"
                            value={data?.Outlet_Code}
                            onChange={(e) => setData({ ...data, Outlet_Code: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="Outlet_Name">
                        <Form.Label>Nama Outlet</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan Nama Outlet..."
                            name="Outlet_Name"
                            value={data?.Outlet_Name}
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
                            value={data?.Address}
                            onChange={(e) => setData({ ...data, Address: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="Branch_Code">
                        <Form.Label>Kode Cabang</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            name="Branch_Code"
                            value={data?.Branch_Code}
                            onChange={(e) => setData({ ...data, Branch_Code: e.target.value })}
                        >
                            <option value="">- Pilih Cabang -</option>
                            {cabang
                                .filter(cab => cab.Branch_Code.toString().includes(data?.Outlet_Code.toString().substring(0, 4)))
                                .map((data) => (
                                    <option key={data.ID_Branch} value={data.Branch_Code} >{data.Branch_Name}</option>
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
                                value={data?.Latitude}
                                onChange={(e) => setData({ ...data, Latitude: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="Longitude">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Longitude..."
                                name="Longitude"
                                value={data?.Longitude}
                                onChange={(e) => setData({ ...data, Longitude: e.target.value })}
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
