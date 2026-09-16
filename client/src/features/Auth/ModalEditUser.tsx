import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';
import { useGetUserByIdQuery, useUpdateUserMutation } from '@/entities/user/api/authApi';

const ModalEditUser = ({ onClick, userId }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { data: user } = useGetUserByIdQuery(userId, { skip: !userId });
    const [updateUser, { isLoading: loading, error, isSuccess: success }] = useUpdateUserMutation();

    useEffect(() => {
        if (success) {
            onClick()
        }
        if (user) {
            setUsername(user.Username || '')
        }
    }, [success, user, onClick])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ id: userId, body: { username, password } }).unwrap();
        } catch (err) {
            // error is handled by the hook
        }
    }

    return (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>Edit Kelurahan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Message variant="danger" >{(error as any)?.data?.message || 'Error'}</Message>}
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
