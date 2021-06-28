import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { listWilayah, deleteWilayah } from '../../actions/wilayahActions';
import { WILAYAH_CREATE_RESET } from '../../constants/wilayahConstants';

const Wilayah = () => {
    const { SearchBar } = Search;

    const dispatch = useDispatch();

    const wilayahList = useSelector(state => state.wilayahList);
    const { loading, error, wilayah } = wilayahList;

    const wilayahDelete = useSelector(state => state.wilayahDelete);
    const { loading: loadingDelete, error: errorDelete, success } = wilayahDelete;

    useEffect(() => {
        dispatch({ type: WILAYAH_CREATE_RESET })
        dispatch(listWilayah())
    }, [dispatch, success])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteWilayah(id))
        }
    }

    const columns = [{
        dataField: 'kode',
        text: 'Kode Wilayah'
    }, {
        dataField: 'nama',
        text: 'Nama Wilayah'
    }, {
        dataField: "link",
        text: 'Aksi',
        formatter: (rowContent, row) => {
            return (
                <div className="">
                    <LinkContainer to={`/location/region/detail/${row.id}`}>
                        <Button variant="info" className="btn-sm">
                            <i className="fas fa-info"></i>
                        </Button>
                    </LinkContainer>
                    <LinkContainer to={`/location/region/edit/${row.id}`} className="ml-2">
                        <Button variant="success" className="btn-sm">
                            <i class="fas fa-edit"></i>
                        </Button>
                    </LinkContainer>
                    <Button variant="danger" className="btn-sm ml-2" onClick={() => deletehandler(row.id)}>
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
                                        data={wilayah}
                                        columns={columns}
                                        search
                                    >
                                        {
                                            props => (
                                                <div>
                                                    <Row className="mb-3">
                                                        <Col sm={9} className="mb-2">
                                                            <Link to="/location/region/tambah" className="btn btn-primary">Tambah Region</Link>
                                                        </Col>
                                                        <Col sm={3}>
                                                            <SearchBar placeholder="Cari ..." {...props.searchProps} />
                                                        </Col>
                                                    </Row>
                                                    <Card.Title>Data Region</Card.Title>
                                                    <BootstrapTable
                                                        {...props.baseProps}
                                                        pagination={paginationFactory()}
                                                        defaultSorted={defaultSortedBy}
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

export default Wilayah
