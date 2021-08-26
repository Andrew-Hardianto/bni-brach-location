import React, { useEffect } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { detailKelurahan } from '../../actions/kelurahanActions';

const ModalDetailKelurahan = ({ onClick, kelurahanId }) => {
    const dispatch = useDispatch();

    const { kelurahan } = useSelector(state => state.kelurahanDetail);

    useEffect(() => {
        dispatch(detailKelurahan(kelurahanId));
    }, [dispatch, kelurahanId])


    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Data Kelurahan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-borderless table-striped">
                    <tbody>
                        <tr>
                            <td style={{ width: '40%' }}>
                                <Card.Text>
                                    Kode Kelurahan
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text>
                                    : {kelurahan?.kelurahan?.Kelurahan_Code}
                                </Card.Text>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Card.Text>
                                    Nama Kelurahan
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text className="font-weight-bold">
                                    : {kelurahan?.kelurahan?.Kelurahan_Name}
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
                                    : {kelurahan?.kelurahan?.Status === 'Y' ? 'Aktif' : 'Tidak Aktif'}
                                </Card.Text>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Card.Text>
                                    Kode Kecamatan
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text>
                                    : {kelurahan?.kelurahan?.Kecamatan_Code}
                                </Card.Text>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Card.Text>
                                    Nama Kecamatan
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text className="font-weight-bold">
                                    : {kelurahan?.kelurahan?.kecamatan?.Kecamatan_Name}
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
                                    : {kelurahan?.kelurahan?.Kabkota_Code}
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
                                    : {kelurahan?.kelurahan?.kota?.Kabkota_Name}
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
                                    : {kelurahan?.kelurahan?.Provinsi_Code}
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
                                    : {kelurahan?.kelurahan?.provinsi?.Provinsi_Name}
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

export default ModalDetailKelurahan
