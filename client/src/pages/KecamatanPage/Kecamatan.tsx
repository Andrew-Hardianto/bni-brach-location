import React, { useState, useCallback, useEffect } from 'react';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import DataTable from '@/shared/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';

import Loader from '@/shared/ui/Loader';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import Message from '@/shared/ui/Message';
import ModalDetailKecamatan from '@/features/Kecamatan/ModalDetailKecamatan';
import { useGetKecamatansQuery, useDeleteKecamatanMutation } from '@/entities/kecamatan/api/kecamatanApi';
import ModalEditKecamatan from '@/features/Kecamatan/ModalEditKecamatan';

const Kecamatan = ({ history }) => {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [kecamatanId, setKecamatanId] = useState();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');
    
    const { data: queryData, isLoading: loading, error } = useGetKecamatansQuery({ page, limit, keyword });
    const kecamatan = queryData?.kecamatan || [];
    const pagination = queryData?.pagination || {};
    
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

    const deletehandler = async (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            await deleteKecamatanApi(id);
        }
    }
    
    const columns: ColumnDef<any>[] = [{
        accessorKey: 'Kecamatan_Code',
        header: 'Kode Kecamatan',
        enableSorting: true,
    }, {
        accessorKey: 'Kecamatan_Name',
        header: 'Nama Kecamatan'
    }, {
        accessorKey: 'kota.Kabkota_Name',
        header: 'Nama Kota/Kabupaten'
    }, {
        id: "link",
        header: 'Aksi',
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="">
                    <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(data.ID_Kecamatan)}>
                        <i className="fas fa-info"></i>
                    </Button>
                    <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(data.ID_Kecamatan)}>
                        <i className="fas fa-edit"></i>
                    </Button>
                    <Button
                        variant="danger"
                        className="btn-sm ml-2"
                        onClick={() => deletehandler(data.ID_Kecamatan)}
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
                            <Card.Title className="text-center font-weight-bold">DATA KECAMATAN</Card.Title>
                            {loading ? <TableSkeleton columns={4} rows={5} /> : error ? (<Message variant="danger">{(error as any)?.data?.message || (error as any)?.error || 'Terjadi kesalahan'}</Message>) : (
                                <>
                                    {loadingDelete && <Loader />}
                                    {errorDelete && <Message variant="danger">{(errorDelete as any)?.data?.message || 'Gagal menghapus'}</Message>}
                                    <DataTable
                                        data={kecamatan}
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
                                        searchPlaceholder="Cari Kecamatan..."
                                        actionButtons={<Link to="/location/kecamatan/tambah" className="btn btn-primary">Tambah Kecamatan</Link>}
                                    />
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Container>
                <Modal show={show} onHide={handleClose}>
                    <ModalDetailKecamatan onClick={handleClose} kecamatanId={kecamatanId} />
                </Modal>
                <Modal show={showEdit} onHide={handleCloseEdit}>
                    <ModalEditKecamatan onClick={handleCloseEdit} kecamatanId={kecamatanId} />
                </Modal>
            </div>
        </div>
    )
}

export default Kecamatan;
