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
                        <Card style={{ width: '40rem' }}>
                            <Card.Body>
                                <Card.Title className="text-center font-weight-bold">DETAIL KELURAHAN</Card.Title>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '30%' }}>
                                                <Card.Text>
                                                    Kode Kelurahan
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kelurahan.kelurahan?.Kelurahan_Code}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Card.Text>
                                                    Nama Kelurahan
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kelurahan.kelurahan?.Kelurahan_Name}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Card.Text>
                                                    Kode Kecamatan
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kelurahan.kelurahan?.Kecamatan_Code}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Card.Text>
                                                    Nama Kecamatan
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kelurahan.kelurahan?.kecamatan.Kecamatan_Name}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Card.Text>
                                                    Kode Kota/ Kabupaten
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kelurahan.kelurahan?.Kabupaten_Code}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Card.Text>
                                                    Nama Kota/ Kabupaten
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kelurahan.kelurahan?.kota.Kabupaten_Name}
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
                                                    : {kelurahan.kelurahan?.Provinsi_Code}
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
                                                    : {kelurahan.kelurahan?.provinsi.Provinsi_Name}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
