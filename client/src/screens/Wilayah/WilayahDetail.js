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
                        <Card style={{ width: '20rem' }} className="shadow">
                            <Card.Body>
                                <Card.Title>Detail Region</Card.Title>
                                <Card.Subtitle className="mb-3">Kode Wilayah : {wilayah.wilayah?.kode}</Card.Subtitle>
                                <Card.Text>
                                    Nama Wilayah : {wilayah.wilayah?.nama}
                                </Card.Text>
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
