import { useGetProvinsisQuery, useDeleteProvinsiMutation } from '@/entities/provinsi/api/provinsiApi';
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import Loader from '@/shared/ui/Loader';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import Message from '@/shared/ui/Message';
import ModalDetail from '@/features/Provinsi/ModalDetail';
import ModalEdit from '@/features/Provinsi/ModalEdit';

const Provinsi = ({ history }) => {
    const { SearchBar } = Search;

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [provinsiId, setProvinsiId] = useState();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');

    const { data: queryData, isLoading: loading, error } = useGetProvinsisQuery({ page, limit, keyword });
    const provinsi = queryData?.provinsi || [];
    const pagination = queryData?.pagination || {};

    const [deleteProvinsiApi, { isLoading: loadingDelete, error: errorDelete }] = useDeleteProvinsiMutation();

    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setShowEdit(false);

    const handleShow = useCallback(data => {
        setProvinsiId(data);
        setShow(true);
    }, []);

    const handleShowEdit = useCallback(data => {
        setProvinsiId(data);
        setShowEdit(true);
    }, []);




    const handleTableChange = (type, { page, sizePerPage, searchText }) => {
        setPage(page);
        setLimit(sizePerPage);
        setKeyword(searchText || '');
    }


    const deletehandler = async (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            await deleteProvinsiApi(id);
        }
    }


    const columns = [{
        dataField: 'Provinsi_Code',
        text: 'Kode Provinsi',
        sort: true,
    }, {
        dataField: 'Provinsi_Name',
        text: 'Nama Provinsi'
    },
    {
        dataField: 'Status',
        text: 'Status',
        sort: true,
        formatter: (cell) => {
            return cell === 'Y' ? 'Aktif' : 'Tidak Aktif'
        }
    },
    {
        dataField: "link",
        text: 'Aksi',
        formatter: (rowContent, row) => {
            return (
                <div className="">
                    <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(row.ID_Provinsi)}>
                        <i className="fas fa-info"></i>
                    </Button>
                    <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(row.ID_Provinsi)}>
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
                    <Card className="mt-3 shadow-lg" >
                        <Card.Body>
                            <Card.Title className="text-center font-weight-bold">DATA PROVINSI</Card.Title>
                            {loading ? <TableSkeleton columns={5} rows={5} /> : error ? (<Message variant="danger">{(error as any)?.data?.message || (error as any)?.error || 'Terjadi kesalahan'}</Message>) : (

                                <>
                                    {loadingDelete && <Loader />}
                                    {errorDelete && <Message variant="danger">{(errorDelete as any)?.data?.message || 'Gagal menghapus'}</Message>}
                                    <ToolkitProvider
                                        bootstrap4
                                        keyField="Provinsi_Code"
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
                </Container>
                <Modal show={show} onHide={handleClose}>
                    <ModalDetail onClick={handleClose} provinsiId={provinsiId} />
                </Modal>
                <Modal show={showEdit} onHide={handleCloseEdit}>
                    <ModalEdit onClick={handleCloseEdit} provinsiId={provinsiId} />
                </Modal>
            </div>
        </div>
    )
}

export default Provinsi