import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DataTable from '@/shared/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';

import Loader from '@/shared/ui/Loader';
import Message from '@/shared/ui/Message';
import { useGetUsersQuery, useDeleteUserMutation } from '@/entities/user/api/authApi';
import ModalDetailUser from '@/features/Auth/ModalDetailUser';
import ModalEditUser from '@/features/Auth/ModalEditUser';

const User = () => {
    const { userInfo } = useSelector((state: any) => state.userLogin);

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [userId, setUserId] = useState();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [keyword, setKeyword] = useState('');

    const { data: usersData = [], isLoading: loading, error } = useGetUsersQuery();
    
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

    const filteredUsers = (usersData || []).filter((u: any) => u.Username?.toLowerCase().includes(keyword.toLowerCase()));
    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / limit) || 1;
    const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

    const pagination = {
        currentPage: page,
        limit: limit,
        totalItems: totalItems,
        totalPages: totalPages
    };

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'Username',
            header: 'Username',
            enableSorting: true
        },
        {
            id: "link",
            header: 'Aksi',
            cell: ({ row }) => {
                const data = row.original;
                return (
                    <div className="">
                        {
                            userInfo?.user?.ID_User !== data.ID_User ? (
                                <>
                                    <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(data.ID_User)}>
                                        <i className="fas fa-info"></i>
                                    </Button>
                                    <Button variant="success" className="btn-sm" onClick={() => handleShowEdit(data.ID_User)}>
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                    <Button variant="danger" size="sm" className="ml-2" onClick={() => deletehandler(data.ID_User)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="info" className="btn-sm mr-2" onClick={() => handleShow(data.ID_User)}>
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

    return (
        <div className="home">
            <div className="container-fluid">
                <Container>
                    {loading ? <Loader />
                        : error ? (<Message variant="danger" >{(error as any)?.data?.message || 'Error'}</Message>)
                            : (
                                <Card className="mt-3 shadow-lg" >
                                    <Card.Body>
                                        <Card.Title className="text-center font-weight-bold">DATA USER</Card.Title>
                                        {loadingDelete && <Loader />}
                                        {errorDelete && <Message variant="danger" >{(errorDelete as any)?.data?.message || 'Error deleting user'}</Message>}
                                        <DataTable
                                            data={paginatedUsers}
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
                                            searchPlaceholder="Cari Username..."
                                            actionButtons={<Link to="/user/tambah" className="btn btn-primary">Tambah User</Link>}
                                        />
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
