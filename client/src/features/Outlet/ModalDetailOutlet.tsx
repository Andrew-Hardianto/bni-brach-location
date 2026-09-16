import { useGetOutletByIdQuery } from '@/entities/outlet/api/outletApi';
import React from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';

import Apikey from '@/shared/ui/Apikey';

const ModalDetailOutlet = ({ onClick, outletId }) => {

    const { data: queryData, isLoading: loading, error } = useGetOutletByIdQuery(outletId, { skip: !outletId });
    const outlet = queryData?.outlet || queryData || {};

    const coords = [isNaN(outlet.outlet?.Latitude) ? -6.241586 : outlet?.outlet?.Latitude, isNaN(outlet.outlet?.Longitude) ? 106.992416 : outlet?.outlet?.Longitude] as [number, number];

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
                            <td>{outlet?.Outlet_Code}</td>
                        </tr>
                        <tr>
                            <td width="150px">Nama Outlet</td>
                            <td width="30px"> : </td>
                            <td className="font-weight-bold">{outlet?.Outlet_Name}</td>
                        </tr>
                        <tr>
                            <td width="150px">Status</td>
                            <td width="30px"> : </td>
                            <td className="font-weight-bold">{outlet?.Status === 'Y' ? 'Aktif' : 'Tidak Aktif'}</td>
                        </tr>
                        <tr>
                            <td width="150px">Kode Cabang</td>
                            <td width="30px"> : </td>
                            <td>{outlet?.Branch_Code}</td>
                        </tr>
                        <tr>
                            <td width="150px">Nama Cabang</td>
                            <td width="30px"> : </td>
                            <td className="font-weight-bold">{outlet?.cabang?.Branch_Name}</td>
                        </tr>
                        <tr>
                            <td width="150px">Kode Wilayah</td>
                            <td width="30px"> : </td>
                            <td>{outlet?.Region_Code}</td>
                        </tr>
                        <tr>
                            <td width="150px">Sub Nama Wilayah</td>
                            <td width="30px"> : </td>
                            <td className="font-weight-bold">{outlet?.wilayah?.Region_Subname}</td>
                        </tr>
                        <tr>
                            <td width="150px">Nama Wilayah</td>
                            <td width="30px"> : </td>
                            <td className="font-weight-bold">{outlet?.wilayah?.Region_Name}</td>
                        </tr>
                        <tr>
                            <td width="150px">Alamat</td>
                            <td width="30px"> : </td>
                            <td className="text-wrap font-weight-bold">{outlet?.Address}</td>
                        </tr>
                    </tbody>
                </Table>
                <MapContainer style={{ width: "600px", height: "400px" }} center={coords} zoom={14} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url={Apikey.maptiler.url}
                    />
                    <Marker
                        position={coords}>
                        <Tooltip>{outlet?.Address}</Tooltip>
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
