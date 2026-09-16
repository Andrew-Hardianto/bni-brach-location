import { useGetKodeposByIdQuery } from '@/entities/kodepos/api/kodeposApi';
import React from 'react';
import { Button, Modal, Card } from 'react-bootstrap';

const ModalDetailKodepos = ({ onClick, kodeposId }) => {

    const { data: queryData } = useGetKodeposByIdQuery(kodeposId, { skip: !kodeposId });
    const kodepos = queryData?.kodepos || queryData || {};

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
                                    : {kodepos?.Postcode}
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
                                    : {kodepos?.Status === 'Y' ? 'Aktif' : 'Tidak Aktif'}
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
                                    : {kodepos?.Kelurahan_Code}
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
                                    : {kodepos?.kelurahan?.Kelurahan_Name}
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
                                    : {kodepos?.Kecamatan_Code}
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
                                    : {kodepos?.kecamatan?.Kecamatan_Name}
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
                                    : {kodepos?.Kabkota_Code}
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
                                    : {kodepos?.kota?.Kabkota_Name}
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
                                    : {kodepos?.Provinsi_Code}
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
                                    : {kodepos?.provinsi?.Provinsi_Name}
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
