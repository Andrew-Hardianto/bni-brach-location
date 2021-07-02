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
import { deleteKelurahan, listKelurahan } from '../../actions/kelurahanActions';
import { KELURAHAN_CREATE_RESET } from '../../constants/kelurahanConstants';

const Kelurahan = () => {
    const { SearchBar } = Search;

    const dispatch = useDispatch();

    const kelurahanList = useSelector(state => state.kelurahanList);
    const { loading, error, kelurahan } = kelurahanList;

    const kelurahanDelete = useSelector(state => state.kelurahanDelete);
    const { loading: loadingDelete, error: errorDelete, success } = kelurahanDelete;

    useEffect(() => {
        dispatch({ type: KELURAHAN_CREATE_RESET })
        dispatch(listKelurahan())
    }, [dispatch, success])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteKelurahan(id))
        }
    }

    const columns = [{
        dataField: 'Kelurahan_Code',
        text: 'Kode Kelurahan'
    }, {
        dataField: 'Kelurahan_Name',
        text: 'Nama Kelurahan'
    }, {
        dataField: 'Kecamatan_Code',
        text: 'Kode Kecamatan'
    }, {
        dataField: "link",
        text: 'Aksi',
        formatter: (rowContent, row) => {
            return (
                <div className="">
                    <LinkContainer to={`/location/kelurahan/detail/${row.ID_Kelurahan}`}>
                        <Button variant="info" className="btn-sm">
                            <i className="fas fa-info"></i>
                        </Button>
                    </LinkContainer>
                    <LinkContainer to={`/location/kelurahan/edit/${row.ID_Kelurahan}`} className="ml-2">
                        <Button variant="success" className="btn-sm">
                            <i class="fas fa-edit"></i>
                        </Button>
                    </LinkContainer>
                    <Button
                        variant="danger"
                        className="btn-sm ml-2"
                        onClick={() => deletehandler(row.ID_Kelurahan)}
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
                                        data={kelurahan}
                                        columns={columns}
                                        search
                                    >
                                        {
                                            props => (
                                                <div>
                                                    <Row className="mb-3">
                                                        <Col sm={9} className="mb-2">
                                                            <Link to="/location/kelurahan/tambah" className="btn btn-primary">Tambah Kelurahan</Link>
                                                        </Col>
                                                        <Col sm={3}>
                                                            <SearchBar placeholder="Cari ..." {...props.searchProps} />
                                                        </Col>
                                                    </Row>
                                                    <hr />
                                                    <Card.Title>Data Kelurahan</Card.Title>
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
            </Container >
        </div >
    )
}

export default Kelurahan;
