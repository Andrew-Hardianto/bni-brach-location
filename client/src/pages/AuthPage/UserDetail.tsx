import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useGetUserByIdQuery } from '@/entities/user/api/authApi';
import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';

const UserDetail = ({ match }) => {
    const userId = match.params.id;

    const { data: user, isLoading: loading, error } = useGetUserByIdQuery(userId);

    return (
        <div className="home">
            {loading ? <Loader />
                : error ? (<Message variant="danger" >{(error as any)?.data?.message || 'Error'}</Message>)
                    : user ? (
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
                    ) : null}
        </div>
    )
}

export default UserDetail
