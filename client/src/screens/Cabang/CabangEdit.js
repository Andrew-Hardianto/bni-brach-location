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
import Apikey from '../../components/Apikey';;

const initialState = {
    Branch_Code: '',
    Branch_Name: '',
    Address: '',
    BI_Location_Code: '',
    Region_Code: '',
    Latitude: '',
    Longitude: ''
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

    useEffect(() => {
        dispatch(listWilayah());
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
    const coords = [isNaN(cabang?.cabang?.Latitude) ? -6.241586 : cabang?.cabang?.Latitude, isNaN(cabang?.cabang?.Longitude) ? 106.992416 : cabang?.cabang?.Longitude];

    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        (e) => ({
            dragend() {
                const marker = markerRef.current?.getLatLng()
                if (marker != null) {
                    // setPosition(marker.getLatLng())
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
        <div className="home">
            <Card style={{ width: '35rem' }} className="mt-3">
                <Card.Body>
                    <Card.Title>Edit Branch</Card.Title>
                    {loading && <Loader />}
                    {error && <Message variant="danger" >{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="Branch_Code">
                            <Form.Label>Kode Cabang</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Kode Cabang..."
                                name="Branch_Code"
                                value={data?.Branch_Code}
                                onChange={(e) => setData({ ...data, Branch_Code: e.target.value })}
                            // onChange={(e) => setKode(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="Branch_Name">
                            <Form.Label>Nama Cabang</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nama Cabang..."
                                name="Branch_Name"
                                value={data?.Branch_Name}
                                onChange={(e) => setData({ ...data, Branch_Name: e.target.value })}
                            // onChange={(e) => setNama(e.target.value)}
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
                            // onChange={(e) => setAlamat(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="Region_Code">
                            <Form.Label>Kode Wilayah</Form.Label>
                            <Form.Control
                                as="select"
                                custom
                                name="Region_Code"
                                value={data?.Region_Code}
                                onChange={(e) => setData({ ...data, Region_Code: e.target.value })}
                            // onChange={(e) => setKodeWilayah(e.target.value)}
                            >
                                <option value="">- Pilih Wilayah -</option>
                                {wilayah.map((data) => (
                                    <option key={data.ID_Region} value={data.Region_Code} >{data.Region_Name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="BI_Location_Code">
                            <Form.Label>BI Location Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan BI Location Code..."
                                name="BI_Location_Code"
                                value={data?.BI_Location_Code}
                                onChange={(e) => setData({ ...data, BI_Location_Code: e.target.value })}
                            // onChange={(e) => setBiLocationCode(e.target.value)}
                            />
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
                                // onChange={(e) => setLatitude(e.target.value)}
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
