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
import { CABANG_CREATE_RESET } from '../../constants/cabangConstants';
import { deleteCabang, listCabang } from '../../actions/cabangActions';

const Cabang = ({ history }) => {
    const { SearchBar } = Search;

    const dispatch = useDispatch();

    const cabangList = useSelector(state => state.cabangList);
    const { loading, error, cabang } = cabangList;

    const cabangDelete = useSelector(state => state.cabangDelete);
    const { loading: loadingDelete, error: errorDelete, success } = cabangDelete;

    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (userInfo) {
            dispatch({ type: CABANG_CREATE_RESET })
            dispatch(listCabang())
        } else {
            history.push('/login')
        }
    }, [dispatch, success, history])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteCabang(id))
        }
    }

    const columns = [
        {
            dataField: 'Branch_Code',
            text: 'Kode Cabang'
        },
        {
            dataField: 'Branch_Name',
            text: 'Nama Cabang'
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
                        <LinkContainer to={`/location/branch/detail/${row.ID_Branch}`}>
                            <Button variant="info" size="sm">
                                <i className="fas fa-info"></i>
                            </Button>
                        </LinkContainer>
                        <LinkContainer to={`/location/branch/edit/${row.ID_Branch}`} className="ml-2">
                            <Button variant="success" size="sm">
                                <i className="fas fa-edit"></i>
                            </Button>
                        </LinkContainer>
                        <Button variant="danger" size="sm" className="ml-2" onClick={() => deletehandler(row.ID_Branch)}>
                            <i className="fas fa-trash-alt"></i>
                        </Button>
                    </div>
                )
            }
        }
    ];

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
                                            keyField="ID_Cabang"
                                            data={cabang}
                                            columns={columns}
                                            search
                                        >
                                            {
                                                props => (
                                                    <div>
                                                        <Row className="mb-3">
                                                            <Col sm={9} className="mb-2">
                                                                <Link to="/location/branch/tambah" className="btn btn-primary">Tambah Branch</Link>
                                                            </Col>
                                                            <Col sm={3}>
                                                                <SearchBar placeholder="Cari Branch.." {...props.searchProps} />
                                                            </Col>
                                                        </Row>
                                                        <Card.Title>Data Branch</Card.Title>
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

export default Cabang
