import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { detailWilayah } from '../../actions/wilayahActions';

const WilayahDetail = ({ match }) => {
    const wilayahId = match.params.id;

    const dispatch = useDispatch();

    const wilayahDetail = useSelector(state => state.wilayahDetail);
    const { loading, error, wilayah } = wilayahDetail;

    useEffect(() => {
        dispatch(detailWilayah(wilayahId));
    }, [dispatch, wilayahId,])

    return (
        <div className="home">
            {loading ? <Loader />
                : error ? (<Message variant="danger" >{error}</Message>)
                    : (
                        <Card style={{ width: '30rem' }} className="shadow">
                            <Card.Body>
                                <Card.Title className="text-center font-weight-bold">DETAIL WILAYAH</Card.Title>
                                <table className="table table-borderless">
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
                                                <Card.Text>
                                                    : {wilayah.wilayah?.Region_Name}
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
                                                <Card.Text>
                                                    : {wilayah.wilayah?.Region_Name}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Link to={'/location/region'} className="btn btn-primary" >
                                    <i className="fas fa-arrow-left"></i>
                                </Link>
                            </Card.Body>
                        </Card>
                    )
            }
        </div>
    )
}

export default WilayahDetail
