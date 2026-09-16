import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DataTable from '@/shared/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';

import Loader from '@/shared/ui/Loader';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import Message from '@/shared/ui/Message';
import ModalDetailBranch from '@/features/Cabang/ModalDetailBranch';
import ModalEditBranch from '@/features/Cabang/ModalEditBranch';
import { useGetCabangsQuery, useDeleteCabangMutation } from '@/entities/cabang/api/cabangApi';

const Cabang = ({ history }) => {
    const { userInfo } = useSelector((state: any) => state.userLogin);

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [cabangId, setCabangId] = useState();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');

    const { data: queryData, isLoading: loading, error } = useGetCabangsQuery({ page, limit, keyword });
    const cabang = queryData?.cabang || [];
    const pagination = queryData?.pagination || {};

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

    const deletehandler = async (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            await deleteCabangApi(id);
        }
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'Branch_Code',
            header: 'Kode Cabang'
        },
        {
            accessorKey: 'Branch_Name',
            header: 'Nama Cabang'
        },
        {
            accessorKey: 'wilayah.Region_Name',
            header: 'Nama Region'
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
                        <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(data.ID_Branch)}>
                            <i className="fas fa-info"></i>
                        </Button>
                        <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(data.ID_Branch)}>
                            <i className="fas fa-edit"></i>
                        </Button>
                        <Button variant="danger" size="sm" className="ml-2" onClick={() => deletehandler(data.ID_Branch)}>
                            <i className="fas fa-trash-alt"></i>
                        </Button>
                    </div>
                )
            }
        }
    ];

    return (
        <div className="container-fluid">
            <Container>
                <Card className="mt-3 shadow-lg" >
                    <Card.Body>
                        <Card.Title className="font-weight-bold text-center">Data Branch</Card.Title>
                        {loading ? <TableSkeleton columns={5} rows={5} /> : error ? (<Message variant="danger">{(error as any)?.data?.message || (error as any)?.error || 'Terjadi kesalahan'}</Message>) : (

                            <>
                                {loadingDelete && <Loader />}
                                {errorDelete && <Message variant="danger" >{(errorDelete as any)?.data?.message || 'Gagal menghapus'}</Message>}
                                <DataTable
                                    data={cabang}
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
                                    searchPlaceholder="Cari Branch.."
                                    actionButtons={<Link to="/location/branch/tambah" className="btn btn-primary">Tambah Branch</Link>}
                                />
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
