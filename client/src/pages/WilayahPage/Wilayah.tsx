import { useSelector } from 'react-redux';
import { useGetWilayahsQuery, useDeleteWilayahMutation } from '@/entities/wilayah/api/wilayahApi';
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import Loader from '@/shared/ui/Loader';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import Message from '@/shared/ui/Message';
import ModalDetailRegion from '@/features/Wilayah/ModalDetailRegion';
import ModalEditRegion from '@/features/Wilayah/ModalEditRegion';

const Wilayah = ({ history }) => {
    const { SearchBar } = Search;

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [wilayahId, setWilayahId] = useState();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');
    
    const { data: queryData, isLoading: loading, error } = useGetWilayahsQuery({ page, limit, keyword });
    const wilayah = queryData?.wilayah || [];
    const pagination = queryData?.pagination || {};
    
    const [deleteWilayahApi, { isLoading: loadingDelete, error: errorDelete }] = useDeleteWilayahMutation();

    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setShowEdit(false);

    const handleShow = useCallback(data => {
        setWilayahId(data);
        setShow(true);
    }, []);

    const handleShowEdit = useCallback(data => {
        setWilayahId(data);
        setShowEdit(true);
    }, []);

    // useEffect(() => {
    //     if (!userInfo) {
    //         history.push('/login')
    //     }
    // }, [userInfo, history])


    const handleTableChange = (type, { page, sizePerPage, searchText }) => {
        setPage(page);
        setLimit(sizePerPage);
        setKeyword(searchText || '');
    }


    const deletehandler = async (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            await deleteWilayahApi(id);
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
                    <Card className="mt-3 shadow-lg" >
                                    <Card.Body>
                                        <Card.Title className="font-weight-bold text-center">Data Region</Card.Title>
                                        {loading ? <TableSkeleton columns={5} rows={5} /> : error ? (<Message variant="danger">{(error as any)?.data?.message || (error as any)?.error || 'Terjadi kesalahan'}</Message>) : (
                                            
                                        <>
                                        {loadingDelete && <Loader />}
                                        {errorDelete && <Message variant="danger">{(errorDelete as any)?.data?.message || 'Gagal menghapus'}</Message>}
                                        <ToolkitProvider
                                            bootstrap4
                                            keyField="Region_Code"
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
                                                            remote={{ search: true, pagination: true }}
                                                            onTableChange={handleTableChange}
                                                            pagination={paginationFactory({ page: pagination?.currentPage || 1, sizePerPage: pagination?.limit || 10, totalSize: pagination?.totalItems || 0 })}
                                                            defaultSorted={defaultSortedBy}
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
                        <ModalDetailRegion onClick={handleClose} wilayahId={wilayahId} />
                    </Modal>
                    <Modal show={showEdit} onHide={handleCloseEdit}>
                        <ModalEditRegion onClick={handleCloseEdit} wilayahId={wilayahId} />
                    </Modal>
                </Container>
            </div>
        </div>
    )
}

export default Wilayah
