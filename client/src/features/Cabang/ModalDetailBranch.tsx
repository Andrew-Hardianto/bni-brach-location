import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';

import { useGetCabangByIdQuery } from '@/entities/cabang/api/cabangApi';
import Apikey from '@/shared/ui/Apikey';
import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';

const ModalDetailBranch = ({ onClick, cabangId }) => {

    const { data: queryData, isLoading: loading, error } = useGetCabangByIdQuery(cabangId);
    const cabang = queryData?.cabang;

    const coords = [isNaN(cabang?.Latitude) ? -6.241586 : cabang?.Latitude, isNaN(cabang?.Longitude) ? 106.992416 : cabang?.Longitude] as [number, number];

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Data Branch</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading && <Loader />}
                {error && <Message variant="danger">{typeof error === 'string' ? error : 'An error occurred'}</Message>}
                {cabang && (
                    <>
                        <table className="table table-borderless table-striped">
                            <tbody>
                                <tr>
                                    <td width="150px">Kode Cabang</td>
                                    <td width="30px"> : </td>
                                    <td>{cabang?.Branch_Code}</td>
                                </tr>
                                <tr>
                                    <td width="150px">Nama Cabang</td>
                                    <td width="30px"> : </td>
                                    <td className="font-weight-bold">{cabang?.Branch_Name}</td>
                                </tr>
                                <tr>
                                    <td width="150px">Status</td>
                                    <td width="30px"> : </td>
                                    <td className="font-weight-bold">{cabang?.Status === 'Y' ? 'Aktif' : 'Tidak Aktif'}</td>
                                </tr>
                                <tr>
                                    <td width="150px">BI Location Code</td>
                                    <td width="30px"> : </td>
                                    <td>{cabang?.BI_Location_Code}</td>
                                </tr>
                                <tr>
                                    <td width="150px">Kode Wilayah</td>
                                    <td width="30px"> : </td>
                                    <td>{cabang?.Region_Code}</td>
                                </tr>
                                <tr>
                                    <td width="150px">Sub Nama Wilayah</td>
                                    <td width="30px"> : </td>
                                    <td className="font-weight-bold">{cabang?.wilayah?.Region_Subname}</td>
                                </tr>
                                <tr>
                                    <td width="150px">Nama Wilayah</td>
                                    <td width="30px"> : </td>
                                    <td className="font-weight-bold">{cabang?.wilayah?.Region_Name}</td>
                                </tr>
                                <tr>
                                    <td width="150px">Alamat</td>
                                    <td width="30px"> : </td>
                                    <td className="text-wrap"><p>{cabang?.Address}</p></td>
                                </tr>
                            </tbody>
                        </table>
                        <MapContainer style={{ width: "600px", height: "400px" }} center={coords} zoom={14} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url={Apikey.maptiler.url}
                            />
                            <Marker
                                position={coords}>
                                <Tooltip>{cabang?.Address}</Tooltip>
                            </Marker>
                        </MapContainer>
                    </>
                )}


            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onClick}>
                    Tutup
                </Button>
            </Modal.Footer>
        </div>
    )
}

export default ModalDetailBranch;
