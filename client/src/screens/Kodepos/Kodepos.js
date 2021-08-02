import React, { useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { deleteKodepos, listKodepos } from '../../actions/kodeposActions';
import { KODEPOS_CREATE_RESET } from '../../constants/kodeposConstants';

const Kodepos = ({ history }) => {
    const { SearchBar } = Search;

    const dispatch = useDispatch();

    const { loading, error, kodepos } = useSelector(state => state.kodeposList);

    const { loading: loadingDelete, error: errorDelete, success } = useSelector(state => state.kelurahanDelete);

    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (userInfo) {
            dispatch({ type: KODEPOS_CREATE_RESET })
            dispatch(listKodepos())
        } else {
            history.push('/login')
        }
    }, [dispatch, success, history])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteKodepos(id))
        }
    }

    const columns = [
        {
            dataField: 'Kodepos_Code',
            text: 'Kode Pos'
        },
        {
            dataField: 'Kelurahan_Code',
            text: 'Kode Kelurahan'
        },
        {
            dataField: "link",
            text: 'Aksi',
            formatter: (rowContent, row) => {
                return (
                    <div>
                        <LinkContainer to={`/location/kodepos/detail/${row.ID_Kodepos}`}>
                            <Button variant="info" className="btn-sm">
                                <i className="fas fa-info"></i>
                            </Button>
                        </LinkContainer>
                        <LinkContainer to={`/location/kodepos/edit/${row.ID_Kodepos}`} className="ml-2">
                            <Button variant="success" className="btn-sm">
                                <i className="fas fa-edit"></i>
                            </Button>
                        </LinkContainer>
                        <Button
                            variant="danger"
                            className="btn-sm ml-2"
                            onClick={() => deletehandler(row.ID_Kodepos)}
                        >
                            <i className="fas fa-trash-alt"></i>
                        </Button>
                    </div>
                )
            }
        }];

    const defaultSortedBy = [{
        dataField: "kode",
        order: "asc"  // or desc
    }];

    return (
        <div className="home">
            <div className="container-fluid">
                <Container>
                    {loading ? <Loader />
                        : error ? (<Message variant="danger" >{error}</Message>)
                            : (
                                <Card lg="2" className="mt-3 shadow-lg" >
                                    <Card.Body>
                                        {loadingDelete && <Loader />}
                                        {errorDelete && <Message variant="danger" >{error}</Message>}
                                        <ToolkitProvider
                                            bootstrap4
                                            keyField="ID_Kodepos"
                                            data={kodepos}
                                            columns={columns}
                                            search
                                        >
                                            {
                                                props => (
                                                    <div>
                                                        <Row className="mb-3">
                                                            <Col sm={9} className="mb-2">
                                                                <Link to="/location/kodepos/tambah" className="btn btn-primary">Tambah Kodepos</Link>
                                                            </Col>
                                                            <Col sm={3}>
                                                                <SearchBar placeholder="Cari Kodepos..." {...props.searchProps} />
                                                            </Col>
                                                        </Row>
                                                        <hr />
                                                        <Card.Title>Data Kodepos</Card.Title>
                                                        <BootstrapTable
                                                            {...props.baseProps}
                                                            pagination={paginationFactory()}
                                                            defaultSorted={defaultSortedBy}
                                                            wrapperClasses="table-responsive"
                                                            rowClasses="text-nowrap"
                                                        />
                                                    </div>
                                                )
                                            }
                                        </ToolkitProvider>
                                    </Card.Body>
                                </Card>
                            )}
                </Container>
            </div>
        </div>
    )
}

export default Kodepos
