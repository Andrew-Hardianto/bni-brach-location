import React, { useEffect } from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useGetProfileQuery } from '@/entities/user/api/authApi';
import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';

const UserProfile = ({ history }) => {
    const { userInfo } = useSelector((state: any) => state.userLogin);



    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    }, [userInfo, history])

    const { data: user, isLoading: loading, error } = useGetProfileQuery(undefined, {
        skip: !userInfo,
    });

    return (
        <div className="home">
            {loading ? <Loader />
                : error ? (<Message variant="danger" >{(error as any)?.data?.message || 'Error'}</Message>)
                    : (
                        <Card style={{ width: '35rem' }} className="shadow" >
                            <Card.Header>
                                <Card.Title className="text-center font-weight-bold">PROFILE USER</Card.Title>
                                <Row>
                                    <Col>
                                        <Card.Body>
                                            <Image src="/assets/img/undraw_profile.svg" alt="img" />
                                        </Card.Body>
                                    </Col>
                                    <Col>
                                        <Card.Body>

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
                                            <Link to={'/user'} className="btn btn-primary" >
                                                <i className="fas fa-arrow-left"></i> Kembali
                                            </Link>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card.Header>
                        </Card>
                    )
            }
        </div >
    )
}

export default UserProfile
