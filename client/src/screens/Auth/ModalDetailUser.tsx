import React, { useEffect } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { detailUser } from '../../actions/authActions';

const ModalDetailUser = ({ onClick, userId }) => {

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.userDetails);

    useEffect(() => {
        dispatch(detailUser(userId));
    }, [dispatch, userId])

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Data User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-borderless table-striped">
                    <tbody>
                        <tr>
                            <td style={{ width: '40%' }}>
                                <Card.Text>
                                    Username
                                </Card.Text>
                            </td>
                            <td>
                                <Card.Text>
                                    : {user?.Username}
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

export default ModalDetailUser
