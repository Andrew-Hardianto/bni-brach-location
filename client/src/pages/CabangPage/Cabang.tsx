import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import Loader from '@/shared/ui/Loader';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import Message from '@/shared/ui/Message';
import ModalDetailBranch from '@/features/Cabang/ModalDetailBranch';
import ModalEditBranch from '@/features/Cabang/ModalEditBranch';
import { useGetCabangsQuery, useDeleteCabangMutation } from '@/entities/cabang/api/cabangApi';

const Cabang = ({ history }) => {
    const { SearchBar } = Search;

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [cabangId, setCabangId] = useState();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');

    const { data: queryData, isLoading: loading, error } = useGetCabangsQuery({ page, limit, keyword });
    const cabang = data?.cabang || [];
    const pagination = data?.pagination || {};

    const [deleteCabangApi, { isLoading: loadingDelete, error: errorDelete }] = useDeleteCabangMutation();


    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setShowEdit(false);

    const handleShow = useCallback(data => {
        setCabangId(data);
        setShow(true);
    }, []);

    const handleShowEdit = useCallback(data => {
        setCabangId(data);
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
            await deleteCabangApi(id);
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
            dataField: 'wilayah.Region_Name',
            text: 'Nama Region'
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
                        <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(row.ID_Branch)}>
                            <i className="fas fa-info"></i>
                        </Button>
                        <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(row.ID_Branch)}>
                            <i className="fas fa-edit"></i>
                        </Button>
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
        <div className="container-fluid">
            <Container>
                <Card className="mt-3 shadow-lg" >
                    <Card.Body>
                        <Card.Title className="font-weight-bold text-center">Data Branch</Card.Title>
                        {loading ? <TableSkeleton columns={5} rows={5} /> : error ? (<Message variant="danger">{error?.data?.message || error?.error || 'Terjadi kesalahan'}</Message>) : (
                            
                        <>
                        {loadingDelete && <Loader />}
                        {errorDelete && <Message variant="danger" >{errorDelete?.data?.message || 'Gagal menghapus'}</Message>}
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
                <Modal size="lg" show={show} onHide={handleClose}>
                    <ModalDetailBranch onClick={handleClose} cabangId={cabangId} />
                </Modal>
                <Modal size="lg" show={showEdit} onHide={handleCloseEdit}>
                    <ModalEditBranch onClick={handleCloseEdit} cabangId={cabangId} />
                </Modal>
            </Container>
        </div>
    )
}

export default Cabang
