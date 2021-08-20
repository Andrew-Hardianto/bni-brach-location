import React, { useEffect } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { detailKodepos } from '../../actions/kodeposActions';

const ModalDetailKodepos = ({ onClick, kodeposId }) => {

    const dispatch = useDispatch();

    const { loading, error, kodepos } = useSelector(state => state.kodeposDetail);

    useEffect(() => {
        dispatch(detailKodepos(kodeposId));
    }, [dispatch, kodeposId])

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Data Kodepos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-borderless table-striped">
                    <tbody>
                        <tr>
                            <td style={{ width: '40%' }}>
                                <Card.Text>
                                    Kodepos
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text>
                                    : {kodepos?.kodepos?.Postcode}
                                </Card.Text>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: '40%' }}>
                                <Card.Text>
                                    Status
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text className="font-weight-bold">
                                    : {kodepos?.kodepos?.Status === 'Y' ? 'Aktif' : 'Tidak Aktif'}
                                </Card.Text>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: '40%' }}>
                                <Card.Text>
                                    Kode Kelurahan
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text>
                                    : {kodepos?.kodepos?.Kelurahan_Code}
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
                                    : {kodepos?.kodepos?.kelurahan?.Kelurahan_Name}
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
                                    : {kodepos?.kodepos?.Kecamatan_Code}
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
                                    : {kodepos?.kodepos?.kecamatan?.Kecamatan_Name}
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
                                    : {kodepos?.kodepos?.Kabkota_Code}
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
                                    : {kodepos?.kodepos?.kota?.Kabkota_Name}
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
                                    : {kodepos?.kodepos?.Provinsi_Code}
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
                                    : {kodepos?.kodepos?.provinsi?.Provinsi_Name}
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

export default ModalDetailKodepos
