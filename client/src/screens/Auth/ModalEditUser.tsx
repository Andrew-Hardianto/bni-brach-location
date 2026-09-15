import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { detailUser, updateUser } from '../../actions/authActions';
import { USER_UPDATE_RESET } from '../../constants/authConstants';

const ModalEditUser = ({ onClick, userId }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.userUpdate);

    const { user } = useSelector(state => state.userDetails);

    useEffect(() => {
        if (success) {
            dispatch({ type: USER_UPDATE_RESET })
            window.location.reload(false)
            onClick()
        } else {
            if (user.Username || user.ID_User !== userId) {
                dispatch(detailUser(userId))
                setUsername(user.Username)
            }
        }
    }, [dispatch, success, success, userId, user.ID_User])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ ID_User: userId, username, password }))
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Kelurahan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Message variant="danger" >{error}</Message>}
                {loading && <Loader />}
                <Form>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="button" onClick={submitHandler}>
                    Submit
                </Button>
                <Button variant="danger" onClick={onClick}>
                    Tutup
                </Button>
            </Modal.Footer>
        </div>
    )
}

export default ModalEditUser
