import React, { useEffect, useState, useCallback } from 'react';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
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
import ModalDetailKelurahan from './ModalDetailKelurahan';
import ModalEditKelurahan from './ModalEditKelurahan';

const Kelurahan = ({ history }) => {
    const { SearchBar } = Search;

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [kelurahanId, setKelurahanId] = useState();

    const dispatch = useDispatch();

    const { loading, error, kelurahan } = useSelector(state => state.kelurahanList);

    const { loading: loadingDelete, error: errorDelete, success } = useSelector(state => state.kelurahanDelete);

    const { userInfo } = useSelector((state) => state.userLogin);

    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setShowEdit(false);

    const handleShow = useCallback(data => {
        setKelurahanId(data);
        setShow(true);
    });

    const handleShowEdit = useCallback(data => {
        setKelurahanId(data);
        setShowEdit(true);
    });

    useEffect(() => {
        if (userInfo) {
            dispatch({ type: KELURAHAN_CREATE_RESET })
            dispatch(listKelurahan())
        } else {
            history.push('/login')
        }
    }, [dispatch, success, history])

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
        dataField: 'kecamatan.Kecamatan_Name',
        text: 'Nama Kecamatan'
    }, {
        dataField: "link",
        text: 'Aksi',
        formatter: (rowContent, row) => {
            return (
                <div className="">
                    {/* <LinkContainer to={`/location/kelurahan/detail/${row.ID_Kelurahan}`}>
                        <Button variant="info" className="btn-sm">
                            <i className="fas fa-info"></i>
                        </Button>
                    </LinkContainer>
                    <LinkContainer to={`/location/kelurahan/edit/${row.ID_Kelurahan}`} className="ml-2">
                        <Button variant="success" className="btn-sm">
                            <i className="fas fa-edit"></i>
                        </Button>
                    </LinkContainer> */}
                    <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(row.ID_Kelurahan)}>
                        <i className="fas fa-info"></i>
                    </Button>
                    <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(row.ID_Kelurahan)}>
                        <i className="fas fa-edit"></i>
                    </Button>
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
            <div className="container-fluid">
                <Container>
                    {loading ? <Loader />
                        : error ? (<Message variant="danger" >{error}</Message>)
                            : (
                                <Card lg="2" className="mt-3 shadow-lg" >
                                    <Card.Body>
                                        <Card.Title className="font-weight-bold text-center">DATA KELURAHAN</Card.Title>
                                        {loadingDelete && <Loader />}
                                        {errorDelete && <Message variant="danger" >{error}</Message>}
                                        <ToolkitProvider
                                            bootstrap4
                                            keyField="ID_Kelurahan"
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
                                                                <SearchBar placeholder="Cari Kelurahan..." {...props.searchProps} />
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
                            )}
                    <Modal size="md" show={show} onHide={handleClose}>
                        <ModalDetailKelurahan onClick={handleClose} kelurahanId={kelurahanId} />
                    </Modal>
                    <Modal size="md" show={showEdit} onHide={handleCloseEdit}>
                        <ModalEditKelurahan onClick={handleCloseEdit} kelurahanId={kelurahanId} />
                    </Modal>
                </Container >
            </div >
        </div>
    )
}

export default Kelurahan;
