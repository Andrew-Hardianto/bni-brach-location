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
                                    <Card.Title className="text-center font-weight-bold">DETAIL PROVINSI</Card.Title>
                                    <table className="table table-borderless">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Card.Text>
                                                        Kode Provinsi
                                                    </Card.Text>
                                                </td>
                                                <td>
                                                    <Card.Text>
                                                        : {provinsi.Provinsi_Code}
                                                    </Card.Text>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Card.Text>
                                                        Nama Provinsi
                                                    </Card.Text>
                                                </td>
                                                <td>
                                                    <Card.Text>
                                                        : {provinsi.Provinsi_Name}
                                                    </Card.Text>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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
