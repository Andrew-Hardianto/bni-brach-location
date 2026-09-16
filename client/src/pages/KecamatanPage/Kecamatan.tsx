import React, { useState, useCallback, useEffect } from 'react';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { LinkContainer } from 'react-router-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import Loader from '@/shared/ui/Loader';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import Message from '@/shared/ui/Message';
import ModalDetailKecamatan from '@/features/Kecamatan/ModalDetailKecamatan';
import { useGetKecamatansQuery, useDeleteKecamatanMutation } from '@/entities/kecamatan/api/kecamatanApi';
import { useGetKecamatansQuery, useDeleteKecamatanMutation } from '@/entities/kecamatan/api/kecamatanApi';
import ModalEditKecamatan from '@/features/Kecamatan/ModalEditKecamatan';

const Kecamatan = ({ history }) => {
    const { SearchBar } = Search;

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [kecamatanId, setKecamatanId] = useState();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');
    
    const { data: queryData, isLoading: loading, error } = useGetKecamatansQuery({ page, limit, keyword });
    const kecamatan = data?.kecamatan || [];
    const pagination = data?.pagination || {};
    
    const [deleteKecamatanApi, { isLoading: loadingDelete, error: errorDelete }] = useDeleteKecamatanMutation();
    

    

    


    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setShowEdit(false);

    const handleShow = useCallback(data => {
        setKecamatanId(data);
        setShow(true);
    }, []);

    const handleShowEdit = useCallback(data => {
        setKecamatanId(data);
        setShowEdit(true);
    }, []);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    }, [userInfo, history])


    const handleTableChange = (type, { page, sizePerPage, searchText }) => {
        setPage(page);
        setLimit(sizePerPage);
        setKeyword(searchText || '');
    }


    const deletehandler = async (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            await deleteKecamatanApi(id);
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
        dataField: 'kota.Kabkota_Name',
        text: 'Nama Kota/Kabupaten'
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
                        : error ? <Message variant="danger">{error?.data?.message || error?.error || 'Terjadi kesalahan'}</Message>
                            : (
                                <Card className="mt-3 shadow-lg" >
                                    <Card.Body>
                                        {loadingDelete && <Loader />}
                                        {errorDelete && <Message variant="danger">{errorDelete?.data?.message || 'Gagal menghapus'}</Message>}
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
                                                            remote={{ search: true, pagination: true }}
                                                            onTableChange={handleTableChange}
                                                            pagination={paginationFactory({ page: pagination?.currentPage || 1, sizePerPage: pagination?.limit || 10, totalSize: pagination?.totalItems || 0 })}
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
                    <Modal show={show} onHide={handleClose}>
                        <ModalDetailKecamatan onClick={handleClose} kecamatanId={kecamatanId} />
                    </Modal>
                    <Modal show={showEdit} onHide={handleCloseEdit}>
                        <ModalEditKecamatan onClick={handleCloseEdit} kecamatanId={kecamatanId} />
                    </Modal>
                </Container >
            </div >
        </div>
    )
}

export default Kecamatan
