import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { detailKecamatan } from '../../actions/kecamatanActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const KecamatanDetail = ({ match }) => {
    const kecamatanId = match.params.id;

    const dispatch = useDispatch();

    const kecamatanDetail = useSelector(state => state.kecamatanDetail);
    const { loading, error, kecamatan } = kecamatanDetail;

    useEffect(() => {
        dispatch(detailKecamatan(kecamatanId));
    }, [dispatch, kecamatanId])

    return (
        <div className="home">
            {loading ? <Loader />
                : error ? (<Message variant="danger" >{error}</Message>)
                    : (
                        <Card style={{ width: '35rem' }} className="shadow" >
                            <Card.Body>
                                <Card.Title className="text-center font-weight-bold">DETAIL KECAMATAN</Card.Title>
                                <table className="table table-borderless table-striped">
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '40%' }}>
                                                <Card.Text>
                                                    Kode Kecamatan
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kecamatan.kecamatan?.Kecamatan_Code}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Card.Text>
                                                    Nama kecamatan
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kecamatan.kecamatan?.Kecamatan_Name}
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
                                                    : {kecamatan.kecamatan?.Kabupaten_Code}
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
                                                    : {kecamatan.kecamatan?.kota.Kabupaten_Name}
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
                                                    : {kecamatan.kecamatan?.Provinsi_Code}
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
                                                    : {kecamatan.kecamatan?.provinsi.Provinsi_Name}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Link to={'/location/kecamatan'} className="btn btn-primary" >
                                    <i className="fas fa-arrow-left"></i> Kembali
                                </Link>
                            </Card.Body>
                        </Card>
                    )}
        </div>
    )
}

export default KecamatanDetail
