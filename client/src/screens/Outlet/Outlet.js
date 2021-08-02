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

const Outlet = ({ history }) => {
    const { SearchBar } = Search;

    const dispatch = useDispatch();

    const { loading, error, outlet } = useSelector(state => state.outletList);

    const { loading: loadingDelete, error: errorDelete, success } = useSelector(state => state.outletDelete);

    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (userInfo) {
            dispatch({ type: OUTLET_CREATE_RESET })
            dispatch(listOutlet())
        } else {
            history.push('/login')
        }
    }, [dispatch, success, history])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteOutlet(id))
        }
    }

    const columns = [
        {
            dataField: 'Outlet_Code',
            text: 'Kode Outlet'
        },
        {
            dataField: 'Outlet_Name',
            text: 'Nama Outlet'
        },
        {
            dataField: 'Address',
            text: 'Alamat',
            style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
        },
        {
            dataField: "link",
            text: 'Aksi',
            formatter: (rowContent, row) => {
                return (
                    <div className="">
                        <LinkContainer to={`/location/outlet/detail/${row.ID_Outlet}`}>
                            <Button variant="info" className="btn-sm">
                                <i className="fas fa-info"></i>
                            </Button>
                        </LinkContainer>
                        <LinkContainer to={`/location/outlet/edit/${row.ID_Outlet}`} className="ml-2">
                            <Button variant="success" className="btn-sm">
                                <i className="fas fa-edit"></i>
                            </Button>
                        </LinkContainer>
                        <Button variant="danger" className="btn-sm ml-2" onClick={() => deletehandler(row.ID_Outlet)}>
                            <i className="fas fa-trash-alt"></i>
                        </Button>
                    </div>
                )
            }
        }
    ];

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
                                            keyField="ID_Outlet"
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
                                                                <SearchBar placeholder="Cari Outlet..." {...props.searchProps} />
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
        </div>
    )
}

export default Outlet
