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
import { deleteOutlet, listOutlet } from '../../actions/outletActions';
import { OUTLET_CREATE_RESET } from '../../constants/outletConstants';

const Outlet = () => {
    const { SearchBar } = Search;

    const dispatch = useDispatch();

    const outletList = useSelector(state => state.outletList);
    const { loading, error, outlet } = outletList;

    const outletDelete = useSelector(state => state.outletDelete);
    const { loading: loadingDelete, error: errorDelete, success } = outletDelete;

    useEffect(() => {
        dispatch({ type: OUTLET_CREATE_RESET })
        dispatch(listOutlet())
    }, [dispatch, success])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteOutlet(id))
        }
    }

    const columns = [
        {
            dataField: 'kode',
            text: 'Kode Outlet'
        },
        {
            dataField: 'nama',
            text: 'Nama Outlet'
        },
        {
            dataField: 'status',
            text: 'Status'
        },
        {
            dataField: 'alamat',
            text: 'Alamat',
            style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
        },
        {
            dataField: "link",
            text: 'Aksi',
            formatter: (rowContent, row) => {
                return (
                    <div className="">
                        <LinkContainer to={`/location/outlet/detail/${row.id}`}>
                            <Button variant="info" className="btn-sm">
                                <i className="fas fa-info"></i>
                            </Button>
                        </LinkContainer>
                        <LinkContainer to={`/location/outlet/edit/${row.id}`} className="ml-2">
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
        }
    ];

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
                                        data={outlet}
                                        columns={columns}
                                        search
                                    >
                                        {
                                            props => (
                                                <div>
                                                    <Row className="mb-3">
                                                        <Col sm={9} className="mb-2">
                                                            <Link to="/location/outlet/tambah" className="btn btn-primary">Tambah Outlet</Link>
                                                        </Col>
                                                        <Col sm={3}>
                                                            <SearchBar placeholder="Cari ..." {...props.searchProps} />
                                                        </Col>
                                                    </Row>
                                                    <Card.Title>Data Outlet</Card.Title>
                                                    <BootstrapTable
                                                        {...props.baseProps}
                                                        pagination={paginationFactory()}
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

export default Outlet
