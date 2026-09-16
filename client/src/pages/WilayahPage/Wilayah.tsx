import { useSelector } from 'react-redux';
import { useGetWilayahsQuery, useDeleteWilayahMutation } from '@/entities/wilayah/api/wilayahApi';
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import DataTable from '@/shared/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';

import Loader from '@/shared/ui/Loader';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import Message from '@/shared/ui/Message';
import ModalDetailRegion from '@/features/Wilayah/ModalDetailRegion';
import ModalEditRegion from '@/features/Wilayah/ModalEditRegion';

const Wilayah = ({ history }) => {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [wilayahId, setWilayahId] = useState();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');
    
    const { data: queryData, isLoading: loading, error } = useGetWilayahsQuery({ page, limit, keyword });
    const wilayah = queryData?.wilayah || [];
    const pagination = queryData?.pagination || {};
    
    const [deleteWilayahApi, { isLoading: loadingDelete, error: errorDelete }] = useDeleteWilayahMutation();

    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setShowEdit(false);

    const handleShow = useCallback(data => {
        setWilayahId(data);
        setShow(true);
    }, []);

    const handleShowEdit = useCallback(data => {
        setWilayahId(data);
        setShowEdit(true);
    }, []);

    // useEffect(() => {
    //     if (!userInfo) {
    //         history.push('/login')
    //     }
    // }, [userInfo, history])

    const deletehandler = async (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            await deleteWilayahApi(id);
        }
    }
    
    const columns: ColumnDef<any>[] = [{
        accessorKey: 'Region_Code',
        header: 'Kode Wilayah'
    }, {
        accessorKey: 'Region_Subname',
        header: 'Sub Nama Wilayah'
    }, {
        accessorKey: 'Region_Name',
        header: 'Nama Wilayah'
    }, {
        id: "link",
        header: 'Aksi',
        cell: ({ row }) => {
            const data = row.original;
            return (
                <div className="">
                    {/* <LinkContainer to={`/location/region/detail/${data.ID_Region}`}>
                        <Button variant="info" className="btn-sm">
                            <i className="fas fa-info"></i>
                        </Button>
                    </LinkContainer>
                    <LinkContainer to={`/location/region/edit/${data.ID_Region}`} className="ml-2">
                        <Button variant="success" className="btn-sm">
                            <i className="fas fa-edit"></i>
                        </Button>
                    </LinkContainer> */}
                    <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(data.ID_Region)}>
                        <i className="fas fa-info"></i>
                    </Button>
                    <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(data.ID_Region)}>
                        <i className="fas fa-edit"></i>
                    </Button>
                    <Button variant="danger" className="btn-sm ml-2" onClick={() => deletehandler(data.ID_Region)}>
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
                                        <Card.Title className="font-weight-bold text-center">Data Region</Card.Title>
                                        {loading ? <TableSkeleton columns={5} rows={5} /> : error ? (<Message variant="danger">{(error as any)?.data?.message || (error as any)?.error || 'Terjadi kesalahan'}</Message>) : (
                                            
                                        <>
                                        {loadingDelete && <Loader />}
                                        {errorDelete && <Message variant="danger">{(errorDelete as any)?.data?.message || 'Gagal menghapus'}</Message>}
                                        
                                        <DataTable
                                            data={wilayah}
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
                                            searchPlaceholder="Cari Wilayah..."
                                            actionButtons={<Link to="/location/region/tambah" className="btn btn-primary">Tambah Region</Link>}
                                        />
                                    
                                        </>
                                        )}
                                    </Card.Body>
                                </Card>
                    <Modal show={show} onHide={handleClose}>
                        <ModalDetailRegion onClick={handleClose} wilayahId={wilayahId} />
                    </Modal>
                    <Modal show={showEdit} onHide={handleCloseEdit}>
                        <ModalEditRegion onClick={handleCloseEdit} wilayahId={wilayahId} />
                    </Modal>
                </Container>
            </div>
        </div>
    )
}

export default Wilayah
