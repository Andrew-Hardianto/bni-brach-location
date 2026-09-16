import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import DataTable from '@/shared/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';

import Loader from '@/shared/ui/Loader';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import Message from '@/shared/ui/Message';
import ModalDetailOutlet from '@/features/Outlet/ModalDetailOutlet';
import { useGetOutletsQuery, useDeleteOutletMutation } from '@/entities/outlet/api/outletApi';
import ModalOutletEdit from '@/features/Outlet/ModalOutletEdit';

const Outlet = ({ history }) => {
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

    const deletehandler = async (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            await deleteOutletApi(id);
        }
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'Outlet_Code',
            header: 'Kode Outlet'
        },
        {
            accessorKey: 'Outlet_Name',
            header: 'Nama Outlet'
        },
        {
            accessorKey: 'cabang.Branch_Name',
            header: 'Nama Branch'
        },
        {
            accessorKey: 'Address',
            header: 'Alamat',
            cell: ({ getValue }) => {
                const cell = getValue() as string;
                return <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cell}</div>;
            }
        },
        {
            id: "link",
            header: 'Aksi',
            cell: ({ row }) => {
                const data = row.original;
                return (
                    <div className="">
                        <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(data.ID_Outlet)}>
                            <i className="fas fa-info"></i>
                        </Button>
                        <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(data.ID_Outlet)}>
                            <i className="fas fa-edit"></i>
                        </Button>
                        <Button variant="danger" className="btn-sm ml-2" onClick={() => deletehandler(data.ID_Outlet)}>
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
                            
                            <DataTable
                                data={outlet}
                                columns={columns}
                                pagination={{
                                    currentPage: pagination?.currentPage || 1,
                                    limit: pagination?.limit || 10,
                                    totalItems: pagination?.totalItems || 0,
                                    totalPages: pagination?.totalPages || 1
                                }}
                                onPaginationChange={(p, l) => { setPage(p); setLimit(l); }}
                                onSearch={(kw) => setKeyword(kw)}
                                keyword={keyword}
                                searchPlaceholder="Cari Outlet..."
                                actionButtons={<Link to="/location/outlet/tambah" className="btn btn-primary">Tambah Outlet</Link>}
                            />
                        
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
