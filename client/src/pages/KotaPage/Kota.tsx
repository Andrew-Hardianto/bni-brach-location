import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import Loader from '@/shared/ui/Loader';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import Message from '@/shared/ui/Message';
import ModalDetailKota from '@/features/Kota/ModalDetailKota';
import { useGetKotasQuery, useDeleteKotaMutation } from '@/entities/kota/api/kotaApi';
import { useGetKotasQuery, useDeleteKotaMutation } from '@/entities/kota/api/kotaApi';
import ModalEditKota from '@/features/Kota/ModalEditKota';

const Kota = ({ history }) => {
    const { SearchBar } = Search;
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [kotaId, setKotaId] = useState();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');
    
    const { data: queryData, isLoading: loading, error } = useGetKotasQuery({ page, limit, keyword });
    const kota = data?.kota || [];
    const pagination = data?.pagination || {};
    
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
            await deleteKotaApi(id);
        }
    }

    const columns = [{
        dataField: 'Kabkota_Code',
        text: 'Kode Kota/Kabupaten',
        sort: true
    }, {
        dataField: 'Kabkota_Name',
        text: 'Nama Kota'
    }, {
        dataField: 'BI_Location_Code',
        text: 'BI Location Code'
    }, {
        dataField: 'Antasena_Code',
        text: 'Antasena Code'
    }, {
        dataField: 'provinsi.Provinsi_Name',
        text: 'Nama Provinsi',
        // formatter: (cell) => {
        //     return cell === null && ''
        // }
    },
    {
        dataField: 'Status',
        text: 'Status',
        sort: true,
        formatter: (cell) => {
            return cell === 'Y' ? 'Aktif' : 'Tidak Aktif'
        }
    },
    {
        dataField: "link",
        text: 'Aksi',
        formatter: (rowContent, row) => {
            return (
                <div className="">
                    {/* <LinkContainer to={`/location/kota/detail/${row.ID_Kabupaten}`}>
                        <Button variant="info" className="btn-sm">
                            <i className="fas fa-info"></i>
                        </Button>
                    </LinkContainer>
                    <LinkContainer to={`/location/kota/edit/${row.ID_Kabupaten}`} className="ml-2">
                        <Button variant="success" className="btn-sm">
                            <i className="fas fa-edit"></i>
                        </Button>
                    </LinkContainer> */}
                    <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(row.ID_Kabkota)}>
                        <i className="fas fa-info"></i>
                    </Button>
                    <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(row.ID_Kabkota)}>
                        <i className="fas fa-edit"></i>
                    </Button>
                    <Button variant="danger" className="btn-sm ml-2" onClick={() => deletehandler(row.ID_Kabkota)}>
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </div>
            )
        }
    }];

    const defaultSortedBy = [{
        dataField: "kode",
        order: "asc"  // or desc
    }];

    // const data = kota.map((data) => (
    //     {
    //         id: data.id, nama: data.nama, biCode: data.biCode, antasenaCode: data.antasenaCode, provinsiId: data.provinsi.nama
    //     }
    // ))

    return (
        <div className="home">
            <div className="container-fluid">
                <Container>
                    <Card className="mt-3 shadow-lg" >
                                    <Card.Body>
                                        <Card.Title className="text-center font-weight-bold">DATA KOTA/KABUPATEN</Card.Title>
                                        {loading ? <TableSkeleton columns={5} rows={5} /> : error ? (<Message variant="danger">{error?.data?.message || error?.error || 'Terjadi kesalahan'}</Message>) : (
                                            
                                        <>
                                        {loadingDelete && <Loader />}
                                        {errorDelete && <Message variant="danger">{errorDelete?.data?.message || 'Gagal menghapus'}</Message>}
                                        <ToolkitProvider
                                            bootstrap4
                                            keyField="ID_Kabkota"
                                            data={kota}
                                            columns={columns}
                                            search
                                        >
                                            {
                                                props => (
                                                    <div>
                                                        <Row className="mb-3">
                                                            <Col sm={9} className="mb-2">
                                                                <Link to="/location/kota/tambah" className="btn btn-primary">Tambah Kota</Link>
                                                            </Col>
                                                            <Col sm={3}>
                                                                <SearchBar placeholder="Cari Kota/Kabupaten..." {...props.searchProps} />
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
