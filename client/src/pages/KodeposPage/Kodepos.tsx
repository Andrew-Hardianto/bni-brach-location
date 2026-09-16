import React, { useCallback, useState, useEffect } from 'react';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DataTable from '@/shared/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';

import Loader from '@/shared/ui/Loader';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import Message from '@/shared/ui/Message';
import ModalDetailKodepos from '@/features/Kodepos/ModalDetailKodepos';
import { useGetKodepossQuery, useDeleteKodeposMutation } from '@/entities/kodepos/api/kodeposApi';
import ModalEditKodepos from '@/features/Kodepos/ModalEditKodepos';

const Kodepos = ({ history }) => {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [kodeposId, setKodeposId] = useState();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');

    const { data: queryData, isLoading: loading, error } = useGetKodepossQuery({ page, limit, keyword });
    const kodepos = queryData?.kodepos || [];
    const pagination = queryData?.pagination || {};

    const [deleteKodeposApi, { isLoading: loadingDelete, error: errorDelete }] = useDeleteKodeposMutation();

    const { userInfo } = useSelector((state: any) => state.userLogin);

    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setShowEdit(false);

    const handleShow = useCallback(data => {
        setKodeposId(data);
        setShow(true);
    }, []);

    const handleShowEdit = useCallback(data => {
        setKodeposId(data);
        setShowEdit(true);
    }, []);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    }, [userInfo, history])

    const deletehandler = async (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            await deleteKodeposApi(id);
        }
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'Postcode',
            header: 'Kode Pos',
            enableSorting: true,
        },
        {
            accessorKey: 'Kelurahan_Code',
            header: 'Kode Kelurahan'
        },
        {
            id: "link",
            header: 'Aksi',
            cell: ({ row }) => {
                const data = row.original;
                return (
                    <div>
                        <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(data.ID_Postcode)}>
                            <i className="fas fa-info"></i>
                        </Button>
                        <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(data.ID_Postcode)}>
                            <i className="fas fa-edit"></i>
                        </Button>
                        <Button
                            variant="danger"
                            className="btn-sm ml-2"
                            onClick={() => deletehandler(data.ID_Postcode)}
                        >
                            <i className="fas fa-trash-alt"></i>
                        </Button>
                    </div>
                )
            }
        }];

    return (
        <div className="home">
            <div className="container-fluid">
                <Container>
                    <Card className="mt-3 shadow-lg" >
                        <Card.Body>
                            <Card.Title className="font-weight-bold text-center">DATA KODEPOS</Card.Title>
                            {loading ? <TableSkeleton columns={3} rows={5} /> : error ? (<Message variant="danger">{(error as any)?.data?.message || (error as any)?.error || 'Terjadi kesalahan'}</Message>) : (
                                <>
                                    {loadingDelete && <Loader />}
                                    {errorDelete && <Message variant="danger">{(errorDelete as any)?.data?.message || 'Gagal menghapus'}</Message>}
                                    <DataTable
                                        data={kodepos}
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
                                        searchPlaceholder="Cari Kodepos..."
                                        actionButtons={<Link to="/location/kodepos/tambah" className="btn btn-primary">Tambah Kodepos</Link>}
                                    />
                                </>
                            )}
                        </Card.Body>
                    </Card>
                    <Modal show={show} onHide={handleClose}>
                        <ModalDetailKodepos onClick={handleClose} kodeposId={kodeposId} />
                    </Modal>
                    <Modal show={showEdit} onHide={handleCloseEdit}>
                        <ModalEditKodepos onClick={handleCloseEdit} kodeposId={kodeposId} />
                    </Modal>
                </Container>
            </div>
        </div>
    )
}

export default Kodepos;
