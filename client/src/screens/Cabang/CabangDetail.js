import React, { useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';

import { detailCabang } from '../../actions/cabangActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Apikey from '../../components/Apikey';

const CabangDetail = ({ match }) => {
    const cabangId = match.params.id;

    const dispatch = useDispatch();

    const cabangDetail = useSelector(state => state.cabangDetail);
    const { loading, error, cabang } = cabangDetail;

    useEffect(() => {
        dispatch(detailCabang(cabangId));
    }, [dispatch, cabangId])

    // const coords = [cabang.cabang?.latitude, cabang.cabang?.longitude];
    const coords = [isNaN(cabang?.cabang?.Latitude) ? -6.241586 : cabang?.cabang?.Latitude, isNaN(cabang?.cabang?.Longitude) ? 106.992416 : cabang?.cabang?.Longitude];

    return (
        <div className="home">
            {loading ? <Loader />
                : error ? (<Message variant="danger" >{error}</Message>)
                    : (
                        <Card style={{ width: '40rem' }} className="shadow mt-3">
                            <Card.Body>
                                <Link to={'/location/branch'} className="btn btn-primary mb-3" >
                                    <i className="fas fa-arrow-left"></i> Kembali
                                </Link>
                                <Card.Title className="text-center font-weight-bold" >Detail Branch</Card.Title>
                                <Table hover borderless striped responsive>
                                    <tbody>
                                        <tr>
                                            <td width="150px">Kode Cabang</td>
                                            <td width="30px"> : </td>
                                            <td>{cabang.cabang?.Branch_Code}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Nama Cabang</td>
                                            <td width="30px"> : </td>
                                            <td>{cabang.cabang?.Branch_Name}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">BI Location Code</td>
                                            <td width="30px"> : </td>
                                            <td>{cabang.cabang?.BI_Location_Code}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Kode Wilayah</td>
                                            <td width="30px"> : </td>
                                            <td>{cabang.cabang?.Region_Code}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Sub Nama Wilayah</td>
                                            <td width="30px"> : </td>
                                            <td>{cabang.cabang?.wilayah.Region_Subname}</td>
                                        </tr>
                                        <tr>
                                            <td width="150px">Nama Wilayah</td>
                                            <td width="30px"> : </td>
                                            <td>{cabang.cabang?.wilayah.Region_Name}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <div>
                                    <MapContainer style={{ width: "600px", height: "400px" }} center={coords} zoom={14} scrollWheelZoom={false}>
                                        <TileLayer
                                            attribution='&copy; <a href="https://legal.here.com/en-gb/privacy">HERE 2021</a>'
                                            url={Apikey.maptiler.url}
                                        />
                                        <Marker
                                            position={coords}>
                                            <Tooltip>{cabang.cabang?.Address}</Tooltip>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
        </div>
    )
}

export default CabangDetail
