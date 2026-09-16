import React from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import { useGetProvinsiByIdQuery } from '@/entities/provinsi/api/provinsiApi';

const ModalDetail = ({ onClick, provinsiId }) => {
    const { data: queryData } = useGetProvinsiByIdQuery(provinsiId, { skip: !provinsiId });
    const provinsi = queryData?.provinsi || queryData || {};

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Data Provinsi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-borderless table-striped">
                    <tbody>
                        <tr>
                            <td style={{ width: '30%' }}>
                                <Card.Text>
                                    Kode Provinsi
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text>
                                    : {provinsi?.Provinsi_Code}
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
                                    : {provinsi?.Provinsi_Name}
                                </Card.Text>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Card.Text>
                                    BI Location Code
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text className="font-weight-bold">
                                    : {provinsi?.BI_Location_Code}
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
                                    : {provinsi?.Status === 'Y' ? 'Aktif' : 'Tidak Aktif'}
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

export default ModalDetail
