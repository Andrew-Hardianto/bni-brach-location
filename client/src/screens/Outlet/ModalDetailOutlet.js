import React, { useEffect } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';

import { detailOutlet } from '../../actions/outletActions';
import Apikey from '../../components/Apikey';

const ModalDetailOutlet = ({ onClick, outletId }) => {

    const dispatch = useDispatch();

    const { outlet } = useSelector(state => state.outletDetail);

    useEffect(() => {
        dispatch(detailOutlet(outletId));
    }, [dispatch, outletId])

    // const coords = { lat: outlet.outlet?.latitude, lng: outlet.outlet?.longitude };
    const coords = [isNaN(outlet.outlet?.Latitude) ? -6.241586 : outlet?.outlet?.Latitude, isNaN(outlet.outlet?.Longitude) ? 106.992416 : outlet?.outlet?.Longitude];

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Data Outlet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table hover borderless striped responsive>
                    <tbody>
                        <tr>
                            <td width="150px">Kode Outlet</td>
                            <td width="30px"> : </td>
                            <td>{outlet?.outlet?.Outlet_Code}</td>
                        </tr>
                        <tr>
                            <td width="150px">Nama Outlet</td>
                            <td width="30px"> : </td>
                            <td className="font-weight-bold">{outlet?.outlet?.Outlet_Name}</td>
                        </tr>
                        <tr>
                            <td width="150px">Kode Cabang</td>
                            <td width="30px"> : </td>
                            <td>{outlet?.outlet?.Branch_Code}</td>
                        </tr>
                        <tr>
                            <td width="150px">Nama Cabang</td>
                            <td width="30px"> : </td>
                            <td className="font-weight-bold">{outlet?.outlet?.cabang.Branch_Name}</td>
                        </tr>
                        <tr>
                            <td width="150px">Kode Wilayah</td>
                            <td width="30px"> : </td>
                            <td>{outlet?.outlet?.Region_Code}</td>
                        </tr>
                        <tr>
                            <td width="150px">Nama Wilayah</td>
                            <td width="30px"> : </td>
                            <td className="font-weight-bold">{outlet?.outlet?.wilayah.Region_Name}</td>
                        </tr>
                        <tr>
                            <td width="150px">Alamat</td>
                            <td width="30px"> : </td>
                            <td className="text-wrap font-weight-bold">{outlet?.outlet?.Address}</td>
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
                        <Tooltip>{outlet.outlet?.Address}</Tooltip>
                    </Marker>
                </MapContainer>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onClick}>
                    Tutup
                </Button>
            </Modal.Footer>
        </div>
    )
}

export default ModalDetailOutlet
