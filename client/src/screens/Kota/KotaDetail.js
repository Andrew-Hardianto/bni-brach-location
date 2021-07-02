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
                                <Card.Title className="text-center font-weight-bold">DETAIL KOTA</Card.Title>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Card.Text>
                                                    Kode Kota
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kota.kota?.Kabupaten_Code}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Card.Text>
                                                    Nama Kota
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kota.kota?.Kabupaten_Name}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Card.Text>
                                                    Kode Provinsi
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kota.kota?.Provinsi_Code}
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
                                                    : {kota.kota?.provinsi.Provinsi_Name}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Card.Text>
                                                    BI Location Code
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kota.kota?.BI_Location_Code}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Card.Text>
                                                    Antasena Code
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kota.kota?.Antasena_Code}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
