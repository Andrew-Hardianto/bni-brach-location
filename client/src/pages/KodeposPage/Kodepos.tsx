import React, { useCallback, useState, useEffect } from 'react';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import Loader from '@/shared/ui/Loader';
import TableSkeleton from '@/shared/ui/TableSkeleton';
import Message from '@/shared/ui/Message';
import ModalDetailKodepos from '@/features/Kodepos/ModalDetailKodepos';
import { useGetKodepossQuery, useDeleteKodeposMutation } from '@/entities/kodepos/api/kodeposApi';
import ModalEditKodepos from '@/features/Kodepos/ModalEditKodepos';
import { useSelector } from 'react-redux';

const Kodepos = ({ history }) => {
    const { SearchBar } = Search;

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



    const handleTableChange = (type, { page, sizePerPage, searchText }) => {
        setPage(page);
        setLimit(sizePerPage);
        setKeyword(searchText || '');
    }


    const deletehandler = async (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            await deleteKodeposApi(id);
        }
    }


    const columns = [
        {
            dataField: 'Postcode',
            text: 'Kode Pos'
        },
        {
            dataField: 'Kelurahan_Code',
            text: 'Kode Kelurahan'
        },
        {
            dataField: "link",
            text: 'Aksi',
            formatter: (rowContent, row) => {
                return (
                    <div>
                        {/* <LinkContainer to={`/location/kodepos/detail/${row.ID_Kodepos}`}>
                            <Button variant="info" className="btn-sm">
                                <i className="fas fa-info"></i>
                            </Button>
                        </LinkContainer>
                        <LinkContainer to={`/location/kodepos/edit/${row.ID_Kodepos}`} className="ml-2">
                            <Button variant="success" className="btn-sm">
                                <i className="fas fa-edit"></i>
                            </Button>
                        </LinkContainer> */}
                        <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(row.ID_Postcode)}>
                            <i className="fas fa-info"></i>
                        </Button>
                        <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(row.ID_Postcode)}>
                            <i className="fas fa-edit"></i>
                        </Button>
                        <Button
                            variant="danger"
                            className="btn-sm ml-2"
                            onClick={() => deletehandler(row.ID_Postcode)}
                        >
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

    return (
        <div className="home">
            <div className="container-fluid">
                <Container>
                    <Card className="mt-3 shadow-lg" >
                        <Card.Body>
                            <Card.Title className="font-weight-bold text-center">DATA KODEPOS</Card.Title>
                            {loading ? <TableSkeleton columns={5} rows={5} /> : error ? (<Message variant="danger">{(error as any)?.data?.message || (error as any)?.error || 'Terjadi kesalahan'}</Message>) : (

                                <>
                                    {loadingDelete && <Loader />}
                                    {errorDelete && <Message variant="danger">{(errorDelete as any)?.data?.message || 'Gagal menghapus'}</Message>}
                                    <ToolkitProvider
                                        bootstrap4
                                        keyField="Postcode"
                                        data={kodepos}
                                        columns={columns}
                                        search
                                    >
                                        {
                                            props => (
                                                <div>
                                                    <Row className="mb-3">
                                                        <Col sm={9} className="mb-2">
                                                            <Link to="/location/kodepos/tambah" className="btn btn-primary">Tambah Kodepos</Link>
                                                        </Col>
                                                        <Col sm={3}>
                                                            <SearchBar placeholder="Cari Kodepos..." {...props.searchProps} />
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

export default Kodepos
