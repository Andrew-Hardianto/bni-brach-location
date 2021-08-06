import React, { useState, useEffect } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { detailKota } from '../../actions/kotaActions';

const ModalDetailKota = ({ onClick, kotaId }) => {
    const dispatch = useDispatch();

    const { kota } = useSelector(state => state.kotaDetail);

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
                                    : {kota.kota?.Kabupaten_Code}
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
                                    : {kota.kota?.Kabupaten_Name}
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
                                    : {kota.kota?.provinsi.Provinsi_Name}
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
