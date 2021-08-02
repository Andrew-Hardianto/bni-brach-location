import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { detailUser } from '../../actions/authActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const UserDetail = ({ match }) => {
    const userId = match.params.id;

    const dispatch = useDispatch();

    const { loading, error, user } = useSelector(state => state.userDetails);

    useEffect(() => {
        dispatch(detailUser(userId));
    }, [dispatch, userId])

    return (
        <div className="home">
            {loading ? <Loader />
                : error ? (<Message variant="danger" >{error}</Message>)
                    : (
                        <Card style={{ width: '35rem' }} className="shadow" >
                            <Card.Body>
                                <Card.Title className="text-center font-weight-bold">DETAIL USER</Card.Title>
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
                                                    : {user.Username}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Link to={'/user'} className="btn btn-primary" >
                                    <i className="fas fa-arrow-left"></i> Kembali
                                </Link>
                            </Card.Body>
                        </Card>
                    )}
        </div>
    )
}

export default UserDetail
