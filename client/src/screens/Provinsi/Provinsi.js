import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import { deleteProvinsi, listProvinsi } from '../../actions/provinsiActions';
import { PROVINSI_CREATE_RESET } from '../../constants/provinsiConstants';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const Provinsi = () => {
    const { SearchBar } = Search;

    const dispatch = useDispatch();

    const provinsiList = useSelector(state => state.provinsiList);
    const { loading, error, provinsi } = provinsiList;

    const provinsiDelete = useSelector(state => state.provinsiDelete);
    const { loading: loadingDelete, error: errorDelete, success } = provinsiDelete;

    useEffect(() => {
        dispatch({ type: PROVINSI_CREATE_RESET })
        dispatch(listProvinsi())
    }, [dispatch, success])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteProvinsi(id))
        }
    }

    const columns = [{
        dataField: 'kode',
        text: 'Kode Provinsi',
        sort: true,
    }, {
        dataField: 'nama',
        text: 'Nama Provinsi'
    }, {
        dataField: "link",
        text: 'Aksi',
        formatter: (rowContent, row) => {
            return (
                <div className="">
                    <LinkContainer to={`/location/provinsi/detail/${row.id}`}>
                        <Button variant="info" className="btn-sm">
                            <i className="fas fa-info"></i>
                        </Button>
                    </LinkContainer>
                    <LinkContainer to={`/location/provinsi/edit/${row.id}`} className="ml-2">
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
                                    <Card.Title>Data Provinsi</Card.Title>
                                    {loadingDelete && <Loader />}
                                    {errorDelete && <Message variant="danger" >{error}</Message>}
                                    <ToolkitProvider
                                        bootstrap4
                                        keyField="id"
                                        data={provinsi}
                                        columns={columns}
                                        search
                                    >
                                        {
                                            props => (
                                                <div>
                                                    <Row className="mb-3">
                                                        <Col sm={9} className="mb-2">
                                                            <Link to="/location/provinsi/tambah" className="btn btn-primary">Tambah Provinsi</Link>
                                                        </Col>
                                                        <Col sm={3}>
                                                            <SearchBar placeholder="Cari ..." {...props.searchProps} />
                                                        </Col>
                                                    </Row>
                                                    <hr />
                                                    <Card.Title>Data Provinsi</Card.Title>
                                                    <hr />
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
                        )
                }
            </Container>
        </div>
    )
}

export default Provinsi