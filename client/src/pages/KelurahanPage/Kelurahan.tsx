import React, { useEffect, useState, useCallback } from 'react';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import Loader from '@/shared/ui/Loader';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import Message from '@/shared/ui/Message';
import ModalDetailKelurahan from '@/features/Kelurahan/ModalDetailKelurahan';
import { useGetKelurahansQuery, useDeleteKelurahanMutation } from '@/entities/kelurahan/api/kelurahanApi';
import ModalEditKelurahan from '@/features/Kelurahan/ModalEditKelurahan';

const Kelurahan = ({ history }) => {
    const { SearchBar } = Search;

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [kelurahanId, setKelurahanId] = useState();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');
    
    const userLogin = useSelector((state: any) => state.userLogin);
    const { userInfo } = useSelector((state: any) => state.userLogin);

    const { data: queryData, isLoading: loading, error } = useGetKelurahansQuery({ page, limit, keyword });
    const kelurahan = queryData?.kelurahan || [];
    const pagination = queryData?.pagination || {};
    
    const [deleteKelurahanApi, { isLoading: loadingDelete, error: errorDelete }] = useDeleteKelurahanMutation();
    

    

    


    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setShowEdit(false);

    const handleShow = useCallback(data => {
        setKelurahanId(data);
        setShow(true);
    }, []);

    const handleShowEdit = useCallback(data => {
        setKelurahanId(data);
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
            await deleteKelurahanApi(id);
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
                    <Card className="mt-3 shadow-lg" >
                                    <Card.Body>
                                        <Card.Title className="font-weight-bold text-center">DATA KELURAHAN</Card.Title>
                                        {loading ? <TableSkeleton columns={5} rows={5} /> : error ? (<Message variant="danger">{(error as any)?.data?.message || (error as any)?.error || 'Terjadi kesalahan'}</Message>) : (
                                            
                                        <>
                                        {loadingDelete && <Loader />}
                                        {errorDelete && <Message variant="danger">{(errorDelete as any)?.data?.message || 'Gagal menghapus'}</Message>}
                                        <ToolkitProvider
                                            bootstrap4
                                            keyField="Kelurahan_Code"
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
                                    
                                        </>
                                        )}
                                    </Card.Body>
                                </Card>
                    <Modal show={show} onHide={handleClose}>
                        <ModalDetailKelurahan onClick={handleClose} kelurahanId={kelurahanId} />
                    </Modal>
                    <Modal show={showEdit} onHide={handleCloseEdit}>
                        <ModalEditKelurahan onClick={handleCloseEdit} kelurahanId={kelurahanId} />
                    </Modal>
                </Container >
            </div >
        </div>
    )
}

export default Kelurahan;
