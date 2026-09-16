import { useGetProvinsisQuery, useDeleteProvinsiMutation } from '@/entities/provinsi/api/provinsiApi';
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import DataTable from '@/shared/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';

import Loader from '@/shared/ui/Loader';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import Message from '@/shared/ui/Message';
import ModalDetail from '@/features/Provinsi/ModalDetail';
import ModalEdit from '@/features/Provinsi/ModalEdit';

const Provinsi = ({ history }) => {

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







    const deletehandler = async (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            await deleteProvinsiApi(id);
        }
    }


    const columns: ColumnDef<any>[] = [{
        accessorKey: 'Provinsi_Code',
        header: 'Kode Provinsi',
        enableSorting: true,
    }, {
        accessorKey: 'Provinsi_Name',
        header: 'Nama Provinsi'
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
                    <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(data.ID_Provinsi)}>
                        <i className="fas fa-info"></i>
                    </Button>
                    <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(data.ID_Provinsi)}>
                        <i className="fas fa-edit"></i>
                    </Button>
                    <Button variant="danger" className="btn-sm ml-2" onClick={() => deletehandler(data.ID_Provinsi)}>
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
                            <Card.Title className="text-center font-weight-bold">DATA PROVINSI</Card.Title>
                            {loading ? <TableSkeleton columns={5} rows={5} /> : error ? (<Message variant="danger">{(error as any)?.data?.message || (error as any)?.error || 'Terjadi kesalahan'}</Message>) : (

                                <>
                                    {loadingDelete && <Loader />}
                                    {errorDelete && <Message variant="danger">{(errorDelete as any)?.data?.message || 'Gagal menghapus'}</Message>}
                                    <DataTable
                                        data={provinsi}
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
                                        searchPlaceholder="Cari Provinsi..."
                                        actionButtons={<Link to="/location/provinsi/tambah" className="btn btn-primary">Tambah Provinsi</Link>}
                                    />

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