import { useGetKotaByIdQuery } from '@/entities/kota/api/kotaApi';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';

const KotaDetail = ({ match }) => {

    const kotaId = match.params.id;

    const { data: queryData, isLoading: loading, error } = useGetKotaByIdQuery(kotaId, { skip: !kotaId });
    const kota = queryData?.kota || queryData || {};

    return (
        <div className="home">
            {loading ? <Loader />
                : error ? (<Message variant="danger" >{(error as any)?.data?.message || 'Error occurred'}</Message>)
                    : (
                        <Card style={{ width: '35rem' }} className="shadow" >
                            <Card.Body>
                                <Card.Title className="text-center font-weight-bold">DETAIL KOTA</Card.Title>
                                <table className="table table-borderless table-striped">
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '30%' }}>
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
                                                    Jenis Kabupaten/Kotamadya
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kota.kota?.Kabkota_Flag}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Card.Text>
                                                    Status
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {kota.kota?.Status}
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
                                                    : {kota.kota?.provinsi?.Provinsi_Name}
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
                                    <i className="fas fa-arrow-left"></i> Kembali
                                </Link>
                            </Card.Body>
                        </Card>
                    )
            }
        </div>
    )
}

export default KotaDetail
