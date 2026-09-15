import React, { useEffect } from 'react';
import { Modal, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';

import { detailCabang } from '../../actions/cabangActions';
import Apikey from '../../components/Apikey';

const ModalDetailBranch = ({ onClick, cabangId }) => {

    const dispatch = useDispatch();

    const { loading, error, cabang } = useSelector(state => state.cabangDetail);

    useEffect(() => {
        dispatch(detailCabang(cabangId));
    }, [dispatch, cabangId])

    // const coords = [cabang.cabang?.latitude, cabang.cabang?.longitude];
    const coords = [isNaN(cabang?.cabang?.Latitude) ? -6.241586 : cabang?.cabang?.Latitude, isNaN(cabang?.cabang?.Longitude) ? 106.992416 : cabang?.cabang?.Longitude];

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Data Branch</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-borderless table-striped">
                    <tbody>
                        <tr>
                            <td width="150px">Kode Cabang</td>
                            <td width="30px"> : </td>
                            <td>{cabang?.cabang?.Branch_Code}</td>
                        </tr>
                        <tr>
                            <td width="150px">Nama Cabang</td>
                            <td width="30px"> : </td>
                            <td className="font-weight-bold">{cabang?.cabang?.Branch_Name}</td>
                        </tr>
                        <tr>
                            <td width="150px">Nama Cabang</td>
                            <td width="30px"> : </td>
                            <td className="font-weight-bold">{cabang?.cabang?.Status === 'Y' ? 'Aktif' : 'Tidak Aktif'}</td>
                        </tr>
                        <tr>
                            <td width="150px">BI Location Code</td>
                            <td width="30px"> : </td>
                            <td>{cabang?.cabang?.BI_Location_Code}</td>
                        </tr>
                        <tr>
                            <td width="150px">Kode Wilayah</td>
                            <td width="30px"> : </td>
                            <td>{cabang?.cabang?.Region_Code}</td>
                        </tr>
                        <tr>
                            <td width="150px">Sub Nama Wilayah</td>
                            <td width="30px"> : </td>
                            <td className="font-weight-bold">{cabang?.cabang?.wilayah?.Region_Subname}</td>
                        </tr>
                        <tr>
                            <td width="150px">Nama Wilayah</td>
                            <td width="30px"> : </td>
                            <td className="font-weight-bold">{cabang?.cabang?.wilayah?.Region_Name}</td>
                        </tr>
                        <tr>
                            <td width="150px">Alamat</td>
                            <td width="30px"> : </td>
                            <td className="text-wrap"><p>{cabang?.cabang?.Address}</p></td>
                        </tr>
                    </tbody>
                </table>
                <MapContainer style={{ width: "600px", height: "400px" }} center={coords} zoom={14} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://legal.here.com/en-gb/privacy">HERE 2021</a>'
                        url={Apikey.maptiler.url}
                    />
                    <Marker
                        position={coords}>
                        <Tooltip>{cabang?.cabang?.Address}</Tooltip>
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

export default ModalDetailBranch
