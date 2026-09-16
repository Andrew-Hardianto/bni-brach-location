import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import Loader from '@/shared/ui/Loader';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import Message from '@/shared/ui/Message';
import ModalDetailOutlet from '@/features/Outlet/ModalDetailOutlet';
import { useGetOutletsQuery, useDeleteOutletMutation } from '@/entities/outlet/api/outletApi';
import ModalOutletEdit from '@/features/Outlet/ModalOutletEdit';

const Outlet = ({ history }) => {
    const { SearchBar } = Search;

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [outletId, setOutletId] = useState();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');
    
    const { data: queryData, isLoading: loading, error } = useGetOutletsQuery({ page, limit, keyword });
    const outlet = queryData?.outlet || [];
    const pagination = queryData?.pagination || {};
    
    const [deleteOutletApi, { isLoading: loadingDelete, error: errorDelete }] = useDeleteOutletMutation();
    
    const userLogin = useSelector((state: any) => state.userLogin);
    const { userInfo } = useSelector((state: any) => state.userLogin);

    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setShowEdit(false);

    const handleShow = useCallback(data => {
        setOutletId(data);
        setShow(true);
    }, []);

    const handleShowEdit = useCallback(data => {
        setOutletId(data);
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
            await deleteOutletApi(id);
        }
    }
    

    const columns = [
        {
            dataField: 'Outlet_Code',
            text: 'Kode Outlet'
        },
        {
            dataField: 'Outlet_Name',
            text: 'Nama Outlet'
        },
        {
            dataField: 'cabang.Branch_Name',
            text: 'Nama Branch'
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
                        <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(row.ID_Outlet)}>
                            <i className="fas fa-info"></i>
                        </Button>
                        <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(row.ID_Outlet)}>
                            <i className="fas fa-edit"></i>
                        </Button>
                        <Button variant="danger" className="btn-sm ml-2" onClick={() => deletehandler(row.ID_Outlet)}>
                            <i className="fas fa-trash-alt"></i>
                        </Button>
                    </div>
                )
            }
        }
    ];

    return (
        <div className="home">
            <div className="container-fluid">
                <Container>
                    <Card className="mt-3 shadow-lg" >
                        <Card.Body>
                            <Card.Title className="font-weight-bold text-center">Data Outlet</Card.Title>
                            {loading ? <TableSkeleton columns={5} rows={5} /> : error ? (<Message variant="danger">{(error as any)?.data?.message || (error as any)?.error || 'Terjadi kesalahan'}</Message>) : (
                                
                            <>
                            {loadingDelete && <Loader />}
                            {errorDelete && <Message variant="danger">{(errorDelete as any)?.data?.message || 'Gagal menghapus'}</Message>}
                            <ToolkitProvider
                                bootstrap4
                                keyField="Outlet_Code"
                                data={outlet}
                                columns={columns}
                                search
                            >
                                {
                                    props => (
                                        <div>
                                            <Row className="mb-3">
                                                <Col sm={9} className="mb-2">
                                                    <Link to="/location/outlet/tambah" className="btn btn-primary">Tambah Outlet</Link>
                                                </Col>
                                                <Col sm={3}>
                                                    <SearchBar placeholder="Cari Outlet..." {...props.searchProps} />
                                                </Col>
                                            </Row>
                                            <Card.Title>Data Outlet</Card.Title>
                                            <BootstrapTable
                                                {...props.baseProps}
                                                remote={{ search: true, pagination: true }}
                                                onTableChange={handleTableChange}
                                                pagination={paginationFactory({ page: pagination?.currentPage || 1, sizePerPage: pagination?.limit || 10, totalSize: pagination?.totalItems || 0 })}
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
                        <ModalDetailOutlet onClick={handleClose} outletId={outletId} />
                    </Modal>
                    <Modal size="lg" show={showEdit} onHide={handleCloseEdit}>
                        <ModalOutletEdit onClick={handleCloseEdit} outletId={outletId} />
                    </Modal>
                </Container>
            </div>
        </div>
    )
}

export default Outlet
