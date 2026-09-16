import { useGetWilayahByIdQuery } from '@/entities/wilayah/api/wilayahApi';
import React from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';

const ModalDetailRegion = ({ onClick, wilayahId }) => {
    const { data: queryData, isLoading, error } = useGetWilayahByIdQuery(wilayahId, { skip: !wilayahId });
    const wilayah = queryData?.wilayah || {};

    if (isLoading) return <Loader />;
    if (error) return <Message variant="danger">{(error as any)?.data?.message || (error as any)?.error || 'Terjadi kesalahan'}</Message>;

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Data Region</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-borderless table-striped">
                    <tbody>
                        <tr>
                            <td>
                                <Card.Text>
                                    Kode Wilayah
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text>
                                    : {wilayah?.Region_Code}
                                </Card.Text>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Card.Text>
                                    Sub Nama Wilayah
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text className="font-weight-bold">
                                    : {wilayah?.Region_Subname}
                                </Card.Text>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Card.Text>
                                    Nama Wilayah
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text className="font-weight-bold">
                                    : {wilayah?.Region_Name}
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
                                    : {wilayah?.Status === 'Y' ? 'Aktif' : 'Tidak Aktif'}
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

export default ModalDetailRegion
