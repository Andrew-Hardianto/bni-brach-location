import React, { useEffect, useState, useCallback } from 'react';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DataTable from '@/shared/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';

import Loader from '@/shared/ui/Loader';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import Message from '@/shared/ui/Message';
import ModalDetailKelurahan from '@/features/Kelurahan/ModalDetailKelurahan';
import { useGetKelurahansQuery, useDeleteKelurahanMutation } from '@/entities/kelurahan/api/kelurahanApi';
import ModalEditKelurahan from '@/features/Kelurahan/ModalEditKelurahan';

const Kelurahan = ({ history }) => {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [kelurahanId, setKelurahanId] = useState();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');
    
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

    const deletehandler = async (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            await deleteKelurahanApi(id);
        }
    }
    
    const columns: ColumnDef<any>[] = [{
        accessorKey: 'Kelurahan_Code',
        header: 'Kode Kelurahan',
        enableSorting: true,
    }, {
        accessorKey: 'Kelurahan_Name',
        header: 'Nama Kelurahan'
    }, {
        accessorKey: 'kecamatan.Kecamatan_Name',
        header: 'Nama Kecamatan'
    }, {
        id: "link",
        header: 'Aksi',
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="">
                    <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(data.ID_Kelurahan)}>
                        <i className="fas fa-info"></i>
                    </Button>
                    <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(data.ID_Kelurahan)}>
                        <i className="fas fa-edit"></i>
                    </Button>
                    <Button
                        variant="danger"
                        className="btn-sm ml-2"
                        onClick={() => deletehandler(data.ID_Kelurahan)}
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
                            <Card.Title className="font-weight-bold text-center">DATA KELURAHAN</Card.Title>
                            {loading ? <TableSkeleton columns={4} rows={5} /> : error ? (<Message variant="danger">{(error as any)?.data?.message || (error as any)?.error || 'Terjadi kesalahan'}</Message>) : (
                                <>
                                    {loadingDelete && <Loader />}
                                    {errorDelete && <Message variant="danger">{(errorDelete as any)?.data?.message || 'Gagal menghapus'}</Message>}
                                    <DataTable
                                        data={kelurahan}
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
                                        searchPlaceholder="Cari Kelurahan..."
                                        actionButtons={<Link to="/location/kelurahan/tambah" className="btn btn-primary">Tambah Kelurahan</Link>}
                                    />
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
