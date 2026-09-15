import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { detailKodepos } from '../../actions/kodeposActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const KodeposDetail = ({ match }) => {
    const kodeposId = match.params.id;

    const dispatch = useDispatch();

    const kodeposDetail = useSelector(state => state.kodeposDetail);
    const { loading, error, kodepos } = kodeposDetail;

    useEffect(() => {
        dispatch(detailKodepos(kodeposId));
    }, [dispatch, kodeposId])

    console.log(kodepos?.kodepos)

    return (
        <div className="home">
            {loading ? <Loader />
                : error ? (<Message variant="danger" >{error}</Message>)
                    : (
                        <Card style={{ width: '40rem' }} className="shadow" >
                            <Card.Body>
                                <Card.Title className="text-center font-weight-bold">DETAIL KODEPOS</Card.Title>
                                <table className="table table-borderless table-striped">
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '30%' }}>
                                                <Card.Text>
                                                    Kodepos
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kodepos.kodepos?.Kodepos_Code}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '30%' }}>
                                                <Card.Text>
                                                    Status
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kodepos.kodepos?.Kodepos_Code}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '30%' }}>
                                                <Card.Text>
                                                    Kode Kelurahan
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kodepos.kodepos?.Kelurahan_Code}
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
                                                    : {kodepos.kodepos?.kelurahan?.Kelurahan_Name}
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
                                                    : {kodepos.kodepos?.Kecamatan_Code}
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
                                                    : {kodepos.kodepos?.kecamatan?.Kecamatan_Name}
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
                                                    : {kodepos.kodepos?.Kabkota_Code}
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
                                                    : {kodepos.kodepos?.kota?.Kabkota_Name}
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
                                                    : {kodepos.kodepos?.Provinsi_Code}
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
                                                    : {kodepos.kodepos?.provinsi?.Provinsi_Name}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Link to={'/location/kodepos'} className="btn btn-primary" >
                                    <i className="fas fa-arrow-left"></i> Kembali
                                </Link>
                            </Card.Body>
                        </Card>
                    )}
        </div>
    )
}

export default KodeposDetail
