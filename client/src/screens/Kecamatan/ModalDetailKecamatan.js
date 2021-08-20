import React, { useState, useEffect } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { detailKecamatan } from '../../actions/kecamatanActions';

const ModalDetailKecamatan = ({ onClick, kecamatanId }) => {
    const dispatch = useDispatch();

    const { kecamatan } = useSelector(state => state.kecamatanDetail);

    useEffect(() => {
        dispatch(detailKecamatan(kecamatanId));
    }, [dispatch, kecamatanId])


    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Data Kecamatan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-borderless table-striped">
                    <tbody>
                        <tr>
                            <td style={{ width: '40%' }}>
                                <Card.Text>
                                    Kode Kecamatan
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text>
                                    : {kecamatan.kecamatan?.Kecamatan_Code}
                                </Card.Text>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Card.Text>
                                    Nama kecamatan
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text className="font-weight-bold">
                                    : {kecamatan.kecamatan?.Kecamatan_Name}
                                </Card.Text>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Card.Text>
                                    Status
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text className="font-weight-bold">
                                    : {kecamatan.kecamatan?.Status === 'Y' ? 'Aktif' : 'Tidak Aktif'}
                                </Card.Text>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Card.Text>
                                    Kode Kota/ Kabupaten
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text>
                                    : {kecamatan.kecamatan?.Kabkota_Code}
                                </Card.Text>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Card.Text>
                                    Nama Kota/ Kabupaten
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text className="font-weight-bold">
                                    : {kecamatan.kecamatan?.kota.Kabkota_Name}
                                </Card.Text>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Card.Text>
                                    Kode Provinsi
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text>
                                    : {kecamatan.kecamatan?.Provinsi_Code}
                                </Card.Text>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Card.Text>
                                    Nama Provinsi
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text className="font-weight-bold">
                                    : {kecamatan.kecamatan?.provinsi.Provinsi_Name}
                                </Card.Text>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onClick}>
                    Tutup
                </Button>
            </Modal.Footer>
        </div>
    )
}

export default ModalDetailKecamatan
