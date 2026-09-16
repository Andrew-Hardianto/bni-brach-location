import { useGetKotaByIdQuery } from '@/entities/kota/api/kotaApi';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ModalDetailKota = ({ onClick, kotaId }) => {
    const { data: queryData, isLoading: loading, error } = useGetKotaByIdQuery(kotaId, { skip: !kotaId });
        const kota = queryData?.kota || queryData || {};


    useEffect(() => {
        dispatch(detailKota(kotaId));
    }, [dispatch,])
    console.log(kota)
    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Data Kota/Kabupaten</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-borderless table-striped">
                    <tbody>
                        <tr>
                            <td style={{ width: '30%' }}>
                                <Card.Text>
                                    Kode Kota
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text>
                                    : {kota.kota?.Kabkota_Code}
                                </Card.Text>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Card.Text>
                                    Nama Kota
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text className="font-weight-bold">
                                    : {kota.kota?.Kabkota_Name}
                                </Card.Text>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Card.Text>
                                    Kabupaten/Kotamadya
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text className="font-weight-bold">
                                    : {kota?.kota?.Kabkota_Flag}
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
                                    : {kota?.kota?.Status === 'Y' ? 'Aktif' : 'TIdak Aktif'}
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
                                    : {kota.kota?.Provinsi_Code}
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
                                    : {kota.kota?.provinsi?.Provinsi_Name}
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
                                <Card.Text>
                                    : {kota.kota?.BI_Location_Code}
                                </Card.Text>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Card.Text>
                                    Antasena Code
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text>
                                    : {kota.kota?.Antasena_Code}
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

export default ModalDetailKota
