import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import { deleteProvinsi, listProvinsi } from '../../actions/provinsiActions';
import { PROVINSI_CREATE_RESET, PROVINSI_UPDATE_RESET } from '../../constants/provinsiConstants';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import ModalDetail from './ModalDetail';
import ModalEdit from './ModalEdit';

const Provinsi = ({ history }) => {
    const { SearchBar } = Search;

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [provinsiId, setProvinsiId] = useState();

    const dispatch = useDispatch();

    const { loading, error, provinsi } = useSelector(state => state.provinsiList);

    const { loading: loadingDelete, error: errorDelete, success } = useSelector(state => state.provinsiDelete);

    const { userInfo } = useSelector((state) => state.userLogin)

    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setShowEdit(false);

    const handleShow = useCallback(data => {
        setProvinsiId(data);
        setShow(true);
    });

    const handleShowEdit = useCallback(data => {
        setProvinsiId(data);
        setShowEdit(true);
    });

    useEffect(() => {
        if (userInfo) {
            dispatch({ type: PROVINSI_CREATE_RESET })
            dispatch({ type: PROVINSI_UPDATE_RESET })
            dispatch(listProvinsi())
        } else {
            history.push('/login')
        }
    }, [dispatch, success, history])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteProvinsi(id))
        }
    }

    const columns = [{
        dataField: 'Provinsi_Code',
        text: 'Kode Provinsi',
        sort: true,
    }, {
        dataField: 'Provinsi_Name',
        text: 'Nama Provinsi'
    }, {
        dataField: 'Status',
        text: 'Status',
        formatter: (cell) => {
            return cell === 'Y' ? 'Aktif' : 'Tidak Aktif'
        }
    }, {
        dataField: "link",
        text: 'Aksi',
        formatter: (rowContent, row) => {
            return (
                <div className="">
                    {/* <LinkContainer to={`/location/provinsi/detail/${row.ID_Provinsi}`}>
                        <Button variant="info" className="btn-sm">
                            <i className="fas fa-info"></i>
                        </Button>
                    </LinkContainer>
                    <LinkContainer to={`/location/provinsi/edit/${row.ID_Provinsi}`} className="ml-2">
                        <Button variant="success" className="btn-sm">
                            <i className="fas fa-edit"></i>
                        </Button>
                    </LinkContainer> */}
                    <Button variant="info" key={row.ID_Provinsi} className="btn-sm mr-2" onClick={() => handleShow(row.ID_Provinsi)}>
                        <i className="fas fa-info"></i>
                    </Button>
                    <Button variant="success" key={row.ID_Provinsi} className="btn-sm" onClick={() => handleShowEdit(row.ID_Provinsi)}>
                        <i className="fas fa-edit"></i>
                    </Button>
                    <Button variant="danger" className="btn-sm ml-2" onClick={() => deletehandler(row.ID_Provinsi)}>
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
                                        <Card.Title className="text-center font-weight-bold">DATA PROVINSI</Card.Title>
                                        {loadingDelete && <Loader />}
                                        {errorDelete && <Message variant="danger" >{error}</Message>}
                                        <ToolkitProvider
                                            bootstrap4
                                            keyField="ID_Provinsi"
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
                                                                <SearchBar placeholder="Cari Provinsi..." {...props.searchProps} />
                                                            </Col>
                                                        </Row>
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
                <Modal size="md" show={show} onHide={handleClose}>
                    <ModalDetail onClick={handleClose} provinsiId={provinsiId} />
                </Modal>
                <Modal size="md" show={showEdit} onHide={handleCloseEdit}>
                    <ModalEdit onClick={handleCloseEdit} provinsiId={provinsiId} />
                </Modal>
            </div>
        </div>
    )
}

export default Provinsi