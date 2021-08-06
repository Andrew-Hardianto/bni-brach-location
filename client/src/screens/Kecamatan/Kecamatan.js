import React, { useState, useCallback, useEffect } from 'react';
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
import { deleteKecamatan, listKecamatan } from '../../actions/kecamatanActions';
import { KECAMATAN_CREATE_RESET, KECAMATAN_UPDATE_RESET } from '../../constants/kecamatanConstants';
import ModalDetailKecamatan from './ModalDetailKecamatan';
import ModalEditKecamatan from './ModalEditKecamatan';

const Kecamatan = ({ history }) => {
    const { SearchBar } = Search;

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [kecamatanId, setKecamatanId] = useState();

    const dispatch = useDispatch();

    const { loading, error, kecamatan } = useSelector(state => state.kecamatanList);

    const { loading: loadingDelete, error: errorDelete, success } = useSelector(state => state.kecamatanDelete);

    const { userInfo } = useSelector((state) => state.userLogin)

    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setShowEdit(false);

    const handleShow = useCallback(data => {
        setKecamatanId(data);
        setShow(true);
    });

    const handleShowEdit = useCallback(data => {
        setKecamatanId(data);
        setShowEdit(true);
    });

    useEffect(() => {
        if (userInfo) {
            dispatch({ type: KECAMATAN_CREATE_RESET })
            dispatch({ type: KECAMATAN_UPDATE_RESET })
            dispatch(listKecamatan())
        } else {
            history.push('/login')
        }
    }, [dispatch, success, history])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteKecamatan(id))
        }
    }

    const columns = [{
        dataField: 'Kecamatan_Code',
        text: 'Kode Kecamatan',
        sort: true,
    }, {
        dataField: 'Kecamatan_Name',
        text: 'Nama Kecamatan'
    }, {
        dataField: 'Kabupaten_Code',
        text: 'Kode Kota'
    }, {
        dataField: "link",
        text: 'Aksi',
        formatter: (rowContent, row) => {
            return (
                <div className="">
                    {/* <LinkContainer to={`/location/kecamatan/detail/${row.ID_Kecamatan}`}>
                        <Button variant="info" className="btn-sm">
                            <i className="fas fa-info"></i>
                        </Button>
                    </LinkContainer>
                    <LinkContainer to={`/location/kecamatan/edit/${row.ID_Kecamatan}`} className="ml-2">
                        <Button variant="success" className="btn-sm">
                            <i className="fas fa-edit"></i>
                        </Button>
                    </LinkContainer> */}
                    <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(row.ID_Kecamatan)}>
                        <i className="fas fa-info"></i>
                    </Button>
                    <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(row.ID_Kecamatan)}>
                        <i className="fas fa-edit"></i>
                    </Button>
                    <Button
                        variant="danger"
                        className="btn-sm ml-2"
                        onClick={() => deletehandler(row.ID_Kecamatan)}
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
                        : error ? <Message variant="danger">{error}</Message>
                            : (
                                <Card lg="2" className="mt-3 shadow-lg" >
                                    <Card.Body>
                                        {loadingDelete && <Loader />}
                                        {errorDelete && <Message variant="danger" >{error}</Message>}
                                        <ToolkitProvider
                                            bootstrap4
                                            keyField="ID_Kecamatan"
                                            data={kecamatan}
                                            columns={columns}
                                            search
                                        >
                                            {
                                                props => (
                                                    <div>
                                                        <Row className="mb-3">
                                                            <Col sm={9} className="mb-2">
                                                                <Link to="/location/kecamatan/tambah" className="btn btn-primary">Tambah Kecamatan</Link>
                                                            </Col>
                                                            <Col sm={3}>
                                                                <SearchBar placeholder="Cari Kecamatan..." {...props.searchProps} />
                                                            </Col>
                                                        </Row>
                                                        <hr />
                                                        <Card.Title>Data Kecamatan</Card.Title>
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
                        <ModalDetailKecamatan onClick={handleClose} kecamatanId={kecamatanId} />
                    </Modal>
                    <Modal size="md" show={showEdit} onHide={handleCloseEdit}>
                        <ModalEditKecamatan onClick={handleCloseEdit} kecamatanId={kecamatanId} />
                    </Modal>
                </Container >
            </div >
        </div>
    )
}

export default Kecamatan
