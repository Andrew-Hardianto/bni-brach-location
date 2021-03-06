import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Modal } from 'react-bootstrap';
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
import ModalDetailRegion from './ModalDetailRegion';
import ModalEditRegion from './ModalEditRegion';

const Wilayah = ({ history }) => {
    const { SearchBar } = Search;

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [wilayahId, setWilayahId] = useState();

    const dispatch = useDispatch();

    const { loading, error, wilayah } = useSelector(state => state.wilayahList);

    const { loading: loadingDelete, error: errorDelete, success } = useSelector(state => state.wilayahDelete);

    const { userInfo } = useSelector((state) => state.userLogin)

    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setShowEdit(false);

    const handleShow = useCallback(data => {
        setWilayahId(data);
        setShow(true);
    });

    const handleShowEdit = useCallback(data => {
        setWilayahId(data);
        setShowEdit(true);
    });

    useEffect(() => {
        if (userInfo) {
            dispatch({ type: WILAYAH_CREATE_RESET })
            dispatch(listWilayah())
        } else {
            history.push('/login')
        }
    }, [dispatch, success, history])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteWilayah(id))
        }
    }

    const columns = [{
        dataField: 'Region_Code',
        text: 'Kode Wilayah'
    }, {
        dataField: 'Region_Subname',
        text: 'Sub Nama Wilayah'
    }, {
        dataField: 'Region_Name',
        text: 'Nama Wilayah'
    }, {
        dataField: "link",
        text: 'Aksi',
        formatter: (rowContent, row) => {
            return (
                <div className="">
                    {/* <LinkContainer to={`/location/region/detail/${row.ID_Region}`}>
                        <Button variant="info" className="btn-sm">
                            <i className="fas fa-info"></i>
                        </Button>
                    </LinkContainer>
                    <LinkContainer to={`/location/region/edit/${row.ID_Region}`} className="ml-2">
                        <Button variant="success" className="btn-sm">
                            <i className="fas fa-edit"></i>
                        </Button>
                    </LinkContainer> */}
                    <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(row.ID_Region)}>
                        <i className="fas fa-info"></i>
                    </Button>
                    <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(row.ID_Region)}>
                        <i className="fas fa-edit"></i>
                    </Button>
                    <Button variant="danger" className="btn-sm ml-2" onClick={() => deletehandler(row.ID_Region)}>
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
                                        <Card.Title className="font-weight-bold text-center">Data Region</Card.Title>
                                        {loadingDelete && <Loader />}
                                        {errorDelete && <Message variant="danger" >{error}</Message>}
                                        <ToolkitProvider
                                            bootstrap4
                                            keyField="ID_Region"
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
                                                                <SearchBar placeholder="Cari Wilayah..." {...props.searchProps} />
                                                            </Col>
                                                        </Row>

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
                    <Modal size="md" show={show} onHide={handleClose}>
                        <ModalDetailRegion onClick={handleClose} wilayahId={wilayahId} />
                    </Modal>
                    <Modal size="md" show={showEdit} onHide={handleCloseEdit}>
                        <ModalEditRegion onClick={handleCloseEdit} wilayahId={wilayahId} />
                    </Modal>
                </Container>
            </div>
        </div>
    )
}

export default Wilayah
