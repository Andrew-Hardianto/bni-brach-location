import React, { useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { detailOutlet } from '../../actions/outletActions';
import Apikey from '../../components/Apikey';

const OutletDetail = ({ match }) => {
    const outletId = match.params.id;

    const dispatch = useDispatch();

    const outletDetail = useSelector(state => state.outletDetail);
    const { loading, error, outlet } = outletDetail;

    useEffect(() => {
        dispatch(detailOutlet(outletId));
    }, [dispatch, outletId])

    // const coords = { lat: outlet.outlet?.latitude, lng: outlet.outlet?.longitude };
    const coords = [isNaN(outlet.outlet?.latitude) ? -6.241586 : outlet?.outlet?.latitude, isNaN(outlet.outlet?.longitude) ? 106.992416 : outlet?.outlet?.longitude];

    return (
        <div className="home">
            {loading ? <Loader />
                : error ? (<Message variant="danger" >{error}</Message>)
                    : (
                        <Card style={{ width: '40rem' }} className="shadow" >
                            <Card.Body>
                                <Link to={'/location/outlet'} className="btn btn-primary mb-3" >
                                    <i className="fas fa-arrow-left"></i>
                                </Link>
                                <Card.Title>Detail Outlet</Card.Title>
                                <Table hover borderless responsive>
                                    <tbody>
                                        <tr>
                                            <td width="150px">Kode Outlet</td>
                                            <td width="30px"> : </td>
                                            <td>{outlet.outlet?.kode}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Nama Outlet</td>
                                            <td width="30px"> : </td>
                                            <td>{outlet.outlet?.nama}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Status</td>
                                            <td width="30px"> : </td>
                                            <td>{outlet.outlet?.status}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Kode Cabang</td>
                                            <td width="30px"> : </td>
                                            <td>{outlet.outlet?.kodeCabang}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Nama Cabang</td>
                                            <td width="30px"> : </td>
                                            <td>{outlet.outlet?.namaCabang}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Kode Wilayah</td>
                                            <td width="30px"> : </td>
                                            <td>{outlet.outlet?.cabang.kode}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Nama Wilayah</td>
                                            <td width="30px"> : </td>
                                            <td>{outlet.outlet?.cabang.nama}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <MapContainer style={{ width: "600px", height: "400px" }} center={coords} zoom={14} scrollWheelZoom={false}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://legal.here.com/en-gb/privacy">HERE 2021</a>'
                                        url={Apikey.maptiler.url}
                                    />
                                    <Marker
                                        position={coords}>
                                        <Tooltip>{outlet.outlet?.alamat}</Tooltip>
                                    </Marker>
                                </MapContainer>
                            </Card.Body>
                        </Card>
                    )}
        </div>
    )
}

export default OutletDetail
