import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';
import { useGetUsersQuery, useDeleteUserMutation } from '@/entities/user/api/authApi';
import ModalDetailUser from '@/features/Auth/ModalDetailUser';
import ModalEditUser from '@/features/Auth/ModalEditUser';

const User = () => {
    const { userInfo } = useSelector((state: any) => state.userLogin);

    const { SearchBar } = Search;

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [userId, setUserId] = useState();

    const { data: users = [], isLoading: loading, error } = useGetUsersQuery();
    const [deleteUser, { isLoading: loadingDelete, error: errorDelete }] = useDeleteUserMutation();

    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setShowEdit(false);

    const handleShow = useCallback(data => {
        setUserId(data);
        setShow(true);
    }, []);

    const handleShowEdit = useCallback(data => {
        setUserId(data);
        setShowEdit(true);
    }, []);

    const deletehandler = async (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            try {
                await deleteUser(id).unwrap();
            } catch (err) {
                // error is handled by the hook
            }
        }
    }

    const columns = [
        {
            dataField: 'Username',
            text: 'Username'
        },
        {
            dataField: "link",
            text: 'Aksi',
            formatter: (rowContent, row) => {
                return (
                    <div className="">
                        {
                            userInfo?.user?.ID_User !== row.ID_User ? (
                                <>
                                    <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(row.ID_User)}>
                                        <i className="fas fa-info"></i>
                                    </Button>
                                    <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(row.ID_User)}>
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                    <Button variant="danger" size="sm" className="ml-2" onClick={() => deletehandler(row.ID_User)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(row.ID_User)}>
                                        <i className="fas fa-info"></i>
                                    </Button>
                                </>
                            )
                        }
                    </div>
                )
            }
        }
    ];

    const defaultSortedBy = [{
        dataField: "Username",
        order: "asc" as const // or desc
    }];

    return (
        <div className="home">
            <div className="container-fluid">
                <Container>
                    {loading ? <Loader />
                        : error ? (<Message variant="danger" >{(error as any)?.data?.message || 'Error'}</Message>)
                            : (
                                <Card className="mt-3 shadow-lg" >
                                    <Card.Body>
                                        {loadingDelete && <Loader />}
                                        {errorDelete && <Message variant="danger" >{(errorDelete as any)?.data?.message || 'Error deleting user'}</Message>}
                                        <ToolkitProvider
                                            bootstrap4
                                            keyField="ID_User"
                                            data={users}
                                            columns={columns}
                                            search
                                        >
                                            {
                                                props => (
                                                    <div>
                                                        <Row className="mb-3">
                                                            <Col sm={9} className="mb-2">
                                                                <Link to="/user/tambah" className="btn btn-primary">Tambah User</Link>
                                                            </Col>
                                                            <Col sm={3}>
                                                                <SearchBar placeholder="Cari Branch.." {...props.searchProps} />
                                                            </Col>
                                                        </Row>
                                                        <Card.Title>Data User</Card.Title>
                                                        <BootstrapTable
                                                            {...props.baseProps}
                                                            pagination={paginationFactory()}
                                                            defaultSorted={defaultSortedBy}
                                                            wrapperClasses="table-responsive"
                                                            rowClasses="text-nowrap"
                                                        />
                                                    </div>
                                                )
                                            }
                                        </ToolkitProvider>
                                    </Card.Body>
                                </Card>
                            )}
                    <Modal show={show} onHide={handleClose}>
                        <ModalDetailUser onClick={handleClose} userId={userId} />
                    </Modal>
                    <Modal show={showEdit} onHide={handleCloseEdit}>
                        <ModalEditUser onClick={handleCloseEdit} userId={userId} />
                    </Modal>
                </Container>
            </div>
        </div>
    )
}

export default User
