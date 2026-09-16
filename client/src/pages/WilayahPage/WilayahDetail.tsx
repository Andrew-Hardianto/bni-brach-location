import { useGetWilayahByIdQuery } from '@/entities/wilayah/api/wilayahApi';
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';

const WilayahDetail = ({ match }) => {
    const wilayahId = match.params.id;

    const { data: queryData, isLoading: loading, error } = useGetWilayahByIdQuery(wilayahId, { skip: !wilayahId });
        const wilayah = queryData?.wilayah || queryData || {};

    

    useEffect(() => {
        dispatch(detailWilayah(wilayahId));
    }, [dispatch, wilayahId,])

    return (
        <div className="home">
            {loading ? <Loader />
                : error ? (<Message variant="danger" >{error}</Message>)
                    : (
                        <Card style={{ width: '30rem' }} className="shadow">
                            <Card.Body>
                                <Card.Title className="text-center font-weight-bold">DETAIL WILAYAH</Card.Title>
                                <table className="table table-borderless table-striped">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Card.Text>
                                                    Kode Wilayah
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {wilayah.wilayah?.Region_Code}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Card.Text>
                                                    Sub Nama Wilayah
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {wilayah.wilayah?.Region_Subname}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Card.Text>
                                                    Nama Wilayah
                                                </Card.Text>
                                            </td>
                                            <td>
                                                <Card.Text>
                                                    : {wilayah.wilayah?.Region_Name}
                                                </Card.Text>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Link to={'/location/region'} className="btn btn-primary" >
                                    <i className="fas fa-arrow-left"></i> Kembali
                                </Link>
                            </Card.Body>
                        </Card>
                    )
            }
        </div>
    )
}

export default WilayahDetail
