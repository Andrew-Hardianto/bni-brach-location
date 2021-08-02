import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { detailUser, updateUser } from '../../actions/authActions';
import { USER_UPDATE_RESET } from '../../constants/authConstants';

const UserUbah = ({ match, history }) => {
    const userID = match.params.id

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.userUpdate);

    const { user } = useSelector(state => state.userDetails);

    useEffect(() => {
        if (success) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/user')
        } else {
            if (user.Username || user.ID_User !== userID) {
                dispatch(detailUser(userID))
                setUsername(user.Username)
            }
        }
    }, [history, success, history, success, userID, user.ID_User])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ ID_User: userID, username, password }))
    }

    return (
        <div className="home">
            <Card style={{ width: '25rem' }} className="mt-3" >
                <Card.Body>
                    <Card.Title>Ubah User</Card.Title>
                    {error && <Message variant="danger" >{error}</Message>}
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
