import React, { useState, useEffect } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { detailProvinsi } from '../../actions/provinsiActions';

const ModalDetail = ({ onClick, provinsiId }) => {
    const dispatch = useDispatch();

    const { provinsi } = useSelector(state => state.provinsiDetail);

    useEffect(() => {
        dispatch(detailProvinsi(provinsiId));
    }, [dispatch,])
    console.log(provinsi)
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
