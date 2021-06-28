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

const Kodepos = () => {
    const { SearchBar } = Search;

    const dispatch = useDispatch();

    const kodeposList = useSelector(state => state.kodeposList);
    const { loading, error, kodepos } = kodeposList;

    const kelurahanDelete = useSelector(state => state.kelurahanDelete);
    const { loading: loadingDelete, error: errorDelete, success } = kelurahanDelete;

    useEffect(() => {
        dispatch({ type: KODEPOS_CREATE_RESET })
        dispatch(listKodepos())
    }, [dispatch, success])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteKodepos(id))
        }
    }

    const columns = [
        {
            dataField: 'kode',
            text: 'Kode Pos'
        },
        {
            dataField: 'kelurahanId',
            text: 'Kode Kelurahan'
        },
        {
            dataField: "link",
            text: 'Aksi',
            formatter: (rowContent, row) => {
                return (
                    <div>
                        <LinkContainer to={`/location/kodepos/detail/${row.id}`}>
                            <Button variant="info" className="btn-sm">
                                <i className="fas fa-info"></i>
                            </Button>
                        </LinkContainer>
                        <LinkContainer to={`/location/kodepos/edit/${row.id}`} className="ml-2">
                            <Button variant="success" className="btn-sm">
                                <i class="fas fa-edit"></i>
                            </Button>
                        </LinkContainer>
                        <Button
                            variant="danger"
                            className="btn-sm ml-2"
                            onClick={() => deletehandler(row.id)}
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
                                        keyField="id"
                                        data={kodepos}
                                        columns={columns}
                                        search
                                    >
                                        {
                                            props => (
                                                <div>
                                                    <Row className="mb-3">
                                                        <Col sm={9} className="mb-2">
                                                            <Link to="/location/kodepos/tambah" className="btn btn-primary">Tambah Kode POS</Link>
                                                        </Col>
                                                        <Col sm={3}>
                                                            <SearchBar placeholder="Cari ..." {...props.searchProps} />
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
    )
}

export default Kodepos
