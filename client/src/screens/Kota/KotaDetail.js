import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { detailKota } from '../../actions/kotaActions';

const KotaDetail = ({ match }) => {

    const kotaId = match.params.id;

    const dispatch = useDispatch();

    const kotaDetail = useSelector(state => state.kotaDetail);
    const { loading, error, kota } = kotaDetail;

    useEffect(() => {
        dispatch(detailKota(kotaId));
    }, [dispatch, kotaId])

    return (
        <div className="home">
            {loading ? <Loader />
                : error ? (<Message variant="danger" >{error}</Message>)
                    : (
                        <Card style={{ width: '20rem' }} className="shadow" >
                            <Card.Body>
                                <Card.Title>Detail Kota</Card.Title>
                                <Card.Subtitle className="mb-3">Kode Kota : {kota.kota?.kode}</Card.Subtitle>
                                <Card.Text>
                                    Nama Kota : {kota.kota?.nama}
                                </Card.Text>
                                <Card.Text>
                                    Kode Provinsi : {kota.kota?.provinsiId}
                                </Card.Text>
                                <Link to={'/location/kota'} className="btn btn-primary" >
                                    <i className="fas fa-arrow-left"></i>
                                </Link>
                            </Card.Body>
                        </Card>
                    )
            }
        </div>
    )
}

export default KotaDetail
