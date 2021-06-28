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

    return (
        <div className="home">
            {loading ? <Loader />
                : error ? (<Message variant="danger" >{error}</Message>)
                    : (
                        <Card style={{ width: '20rem' }} className="shadow" >
                            <Card.Body>
                                <Card.Title>Detail Kode POS</Card.Title>
                                <Card.Text>
                                    Kode POS : {kodepos.kodepos?.kode}
                                </Card.Text>
                                <Card.Text>
                                    Kode Kelurahan : {kodepos.kodepos?.kelurahanId}
                                </Card.Text>
                                <Link to={'/location/kodepos'} className="btn btn-primary" >
                                    <i className="fas fa-arrow-left"></i>
                                </Link>
                            </Card.Body>
                        </Card>
                    )}
        </div>
    )
}

export default KodeposDetail
