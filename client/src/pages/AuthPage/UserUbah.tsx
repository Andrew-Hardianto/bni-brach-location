import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';
import { useGetUserByIdQuery, useUpdateUserMutation } from '@/entities/user/api/authApi';

const UserUbah = ({ match, history }) => {
    const userID = match.params.id

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { data: user } = useGetUserByIdQuery(userID);
    const [updateUser, { isLoading: loading, error, isSuccess: success }] = useUpdateUserMutation();

    useEffect(() => {
        if (success) {
            history.push('/user')
        }
        if (user) {
            setUsername(user.Username || '')
        }
    }, [history, success, user])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ id: userID, body: { username, password } }).unwrap();
        } catch (err) {
            // error is handled by the hook
        }
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Ubah User</Card.Title>
                    {error && <Message variant="danger" >{(error as any)?.data?.message || 'Error'}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
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
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Link to={'/user'} className="btn btn-warning ml-3" >
                            <i className="fas fa-arrow-left"></i> Kembali
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div >
    )
}

export default UserUbah
