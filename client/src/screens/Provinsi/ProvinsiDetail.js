import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailProvinsi } from '../../actions/provinsiActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const ProvinsiDetail = ({ match }) => {
    const provinsiId = match.params.id;

    const dispatch = useDispatch();

    const provinsiDetail = useSelector(state => state.provinsiDetail);
    const { loading, error, provinsi } = provinsiDetail;

    useEffect(() => {
        dispatch(detailProvinsi(provinsiId));
    }, [dispatch, provinsiId])

    return (
        <div className="home">
            {
                loading ? <Loader />
                    : error ? (<Message variant="danger" >{error}</Message>)
                        : (
                            <Card style={{ width: '20rem' }} className="shadow">
                                <Card.Body>
                                    <Card.Title>Detail Provinsi</Card.Title>
                                    <Card.Subtitle className="mb-2">Kode Provinsi : {provinsi.provinsi?.kode}</Card.Subtitle>
                                    <Card.Text>
                                        Nama Provinsi : {provinsi.provinsi?.nama}
                                    </Card.Text>
                                    <Link to={'/location/provinsi'} className="btn btn-primary" >
                                        <i className="fas fa-arrow-left"></i>
                                    </Link>
                                </Card.Body>
                            </Card>
                        )
            }
        </div>
    )
}

export default ProvinsiDetail
