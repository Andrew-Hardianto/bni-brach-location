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
import { deleteKota, listKota } from '../../actions/kotaActions';
import { KOTA_CREATE_RESET } from '../../constants/kotaConstants';

const Kota = ({ history }) => {
    const { SearchBar } = Search;

    const dispatch = useDispatch();

    const { loading, error, kota } = useSelector(state => state.kotaList);

    const { loading: loadingDelete, error: errorDelete, success } = useSelector(state => state.kotaDelete);

    const { userInfo } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (userInfo) {
            dispatch({ type: KOTA_CREATE_RESET })
            dispatch(listKota())
        } else {
            history.push('/login')
        }
    }, [dispatch, success, history])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteKota(id))
        }
    }

    const columns = [{
        dataField: 'Kabupaten_Code',
        text: 'Kode Kota/Kabupaten',
        sort: true
    }, {
        dataField: 'Kabupaten_Name',
        text: 'Nama Kota'
    }, {
        dataField: 'BI_Location_Code',
        text: 'BI Location Code'
    }, {
        dataField: 'Antasena_Code',
        text: 'Antasena Code'
    }, {
        dataField: 'Provinsi_Code',
        text: 'Kode Provinsi'
    }, {
        dataField: "link",
        text: 'Aksi',
        formatter: (rowContent, row) => {
            return (
                <div className="">
                    <LinkContainer to={`/location/kota/detail/${row.ID_Kabupaten}`}>
                        <Button variant="info" className="btn-sm">
                            <i className="fas fa-info"></i>
                        </Button>
                    </LinkContainer>
                    <LinkContainer to={`/location/kota/edit/${row.ID_Kabupaten}`} className="ml-2">
                        <Button variant="success" className="btn-sm">
                            <i className="fas fa-edit"></i>
                        </Button>
                    </LinkContainer>
                    <Button variant="danger" className="btn-sm ml-2" onClick={() => deletehandler(row.ID_Kabupaten)}>
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

    // const data = kota.map((data) => (
    //     {
    //         id: data.id, nama: data.nama, biCode: data.biCode, antasenaCode: data.antasenaCode, provinsiId: data.provinsi.nama
    //     }
    // ))

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
                                            keyField="ID_Kabupaten"
                                            data={kota}
                                            columns={columns}
                                            search
                                        >
                                            {
                                                props => (
                                                    <div>
                                                        <Row className="mb-3">
                                                            <Col sm={9} className="mb-2">
                                                                <Link to="/location/kota/tambah" className="btn btn-primary">Tambah Kota</Link>
                                                            </Col>
                                                            <Col sm={3}>
                                                                <SearchBar placeholder="Cari Kota/Kabupaten..." {...props.searchProps} />
                                                            </Col>
                                                        </Row>
                                                        <hr />
                                                        <Card.Title>Data Kota</Card.Title>
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
                            )}
                </Container>
            </div>
        </div>
    )
}

export default Kota
