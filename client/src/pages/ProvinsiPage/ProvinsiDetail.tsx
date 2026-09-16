import { useGetProvinsiByIdQuery } from '@/entities/provinsi/api/provinsiApi';
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';

const ProvinsiDetail = ({ match }) => {
    const provinsiId = match.params.id;

    const { data: queryData, isLoading: loading, error } = useGetProvinsiByIdQuery(provinsiId, { skip: !provinsiId });
        const provinsi = queryData?.provinsi || queryData || {};

    

    useEffect(() => {
        dispatch(detailProvinsi(provinsiId));
    }, [dispatch, provinsiId])

    return (
        <div className="home">
            {
                loading ? <Loader />
                    : error ? (<Message variant="danger" >{error}</Message>)
                        : (
                            <Card style={{ width: '35rem' }} className="shadow">
                                <Card.Body>
                                    <Card.Title className="text-center font-weight-bold">DETAIL PROVINSI</Card.Title>
                                    <table className="table table-borderless table-striped">
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '30%' }}>
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
                                        <i className="fas fa-arrow-left"></i> Kembali
                                    </Link>
                                </Card.Body>
                            </Card>
                        )
            }
        </div>
    )
}

export default ProvinsiDetail
