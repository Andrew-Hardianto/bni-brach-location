import React, { useEffect } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { detailWilayah } from '../../actions/wilayahActions';

const ModalDetailRegion = ({ onClick, wilayahId }) => {

    const dispatch = useDispatch();

    const { loading, error, wilayah } = useSelector(state => state.wilayahDetail);

    useEffect(() => {
        dispatch(detailWilayah(wilayahId));
    }, [dispatch, wilayahId,])

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
                                    : {wilayah.wilayah?.Region_Code}
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
                                    : {wilayah.wilayah?.Region_Subname}
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
                                    : {wilayah.wilayah?.Region_Name}
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
