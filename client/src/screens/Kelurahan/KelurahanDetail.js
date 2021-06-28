import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { detailKelurahan } from '../../actions/kelurahanActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const KelurahanDetail = ({ match }) => {
    const kelurahanId = match.params.id;

    const dispatch = useDispatch();

    const kelurahanDetail = useSelector(state => state.kelurahanDetail);
    const { loading, error, kelurahan } = kelurahanDetail;

    useEffect(() => {
        dispatch(detailKelurahan(kelurahanId));
    }, [dispatch, kelurahanId])

    return (
        <div className="home">
            {loading ? <Loader />
                : error ? (<Message variant="danger" >{error}</Message>)
                    : (
                        <Card style={{ width: '20rem' }}>
                            <Card.Body>
                                <Card.Title>Detail Kelurahan</Card.Title>
                                <Card.Subtitle className="mb-3">Kode Kelurahan : {kelurahan.kelurahan?.kode}</Card.Subtitle>
                                <Card.Text>
                                    Nama Kelurahan : {kelurahan.kelurahan?.nama}
                                </Card.Text>
                                <Card.Text>
                                    Kode Kecamatan : {kelurahan.kelurahan?.kecamatanId}
                                </Card.Text>
                                <Link to={'/location/kelurahan'} className="btn btn-primary" >
                                    <i className="fas fa-arrow-left"></i>
                                </Link>
                            </Card.Body>
                        </Card>
                    )}
        </div>
    )
}

export default KelurahanDetail
