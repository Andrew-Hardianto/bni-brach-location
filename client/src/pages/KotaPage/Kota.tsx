import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import DataTable from '@/shared/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';

import Loader from '@/shared/ui/Loader';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import Message from '@/shared/ui/Message';
import ModalDetailKota from '@/features/Kota/ModalDetailKota';
import { useGetKotasQuery, useDeleteKotaMutation } from '@/entities/kota/api/kotaApi';
import ModalEditKota from '@/features/Kota/ModalEditKota';

const Kota = ({ history }) => {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [kotaId, setKotaId] = useState();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');

    const { data: queryData, isLoading: loading, error } = useGetKotasQuery({ page, limit, keyword });
    const kota = queryData?.kota || [];
    const pagination = queryData?.pagination || {};

    const [deleteKotaApi, { isLoading: loadingDelete, error: errorDelete }] = useDeleteKotaMutation();

    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setShowEdit(false);

    const handleShow = useCallback(data => {
        setKotaId(data);
        setShow(true);
    }, []);

    const handleShowEdit = useCallback(data => {
        setKotaId(data);
        setShowEdit(true);
    }, []);


    const deletehandler = async (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            await deleteKotaApi(id);
        }
    }

    const columns: ColumnDef<any>[] = [{
        accessorKey: 'Kabkota_Code',
        header: 'Kode Kota/Kabupaten',
        enableSorting: true
    }, {
        accessorKey: 'Kabkota_Name',
        header: 'Nama Kota'
    }, {
        accessorKey: 'BI_Location_Code',
        header: 'BI Location Code'
    }, {
        accessorKey: 'Antasena_Code',
        header: 'Antasena Code'
    }, {
        accessorKey: 'provinsi.Provinsi_Name',
        header: 'Nama Provinsi',
        // formatter: (cell) => {
        //     return cell === null && ''
        // }
    },
    {
        accessorKey: 'Status',
        header: 'Status',
        enableSorting: true,
        cell: ({ getValue }) => {
            const cell = getValue();
            return cell === 'Y' ? 'Aktif' : 'Tidak Aktif'
        }
    },
    {
        id: "link",
        header: 'Aksi',
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="">
                    <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(data.ID_Kabkota)}>
                        <i className="fas fa-info"></i>
                    </Button>
                    <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(data.ID_Kabkota)}>
                        <i className="fas fa-edit"></i>
                    </Button>
                    <Button variant="danger" className="btn-sm ml-2" onClick={() => deletehandler(data.ID_Kabkota)}>
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
                            <Card.Title className="text-center font-weight-bold">DATA KOTA/KABUPATEN</Card.Title>
                            {loading ? <TableSkeleton columns={5} rows={5} /> : error ? (<Message variant="danger">{(error as any)?.data?.message || (error as any)?.error || 'Terjadi kesalahan'}</Message>) : (

                                <>
                                    {loadingDelete && <Loader />}
                                    {errorDelete && <Message variant="danger">{(errorDelete as any)?.data?.message || 'Gagal menghapus'}</Message>}
                                    <DataTable
                                        data={kota}
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
                                        searchPlaceholder="Cari Kota/Kabupaten..."
                                        actionButtons={<Link to="/location/kota/tambah" className="btn btn-primary">Tambah Kota</Link>}
                                    />

                                </>
                            )}
                        </Card.Body>
                    </Card>
                    <Modal show={show} onHide={handleClose}>
                        <ModalDetailKota onClick={handleClose} kotaId={kotaId} />
                    </Modal>
                    <Modal show={showEdit} onHide={handleCloseEdit}>
                        <ModalEditKota onClick={handleCloseEdit} kotaId={kotaId} />
                    </Modal>
                </Container>
            </div>
        </div>
    )
}

export default Kota
