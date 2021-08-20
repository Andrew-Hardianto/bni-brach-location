import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { USER_CREATE_RESET } from '../../constants/authConstants';
import { deleteUser, listUsers } from '../../actions/authActions';
import ModalDetailUser from './ModalDetailUser';
import ModalEditUser from './ModalEditUser';

const User = () => {
    const { SearchBar } = Search;

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [userId, setUserId] = useState();

    const dispatch = useDispatch();

    const { loading, error, users } = useSelector(state => state.userList);
    const { userInfo } = useSelector(state => state.userLogin);

    const { loading: loadingDelete, error: errorDelete, success } = useSelector(state => state.userDelete);

    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setShowEdit(false);

    const handleShow = useCallback(data => {
        setUserId(data);
        setShow(true);
    });

    const handleShowEdit = useCallback(data => {
        setUserId(data);
        setShowEdit(true);
    });

    useEffect(() => {

        dispatch({ type: USER_CREATE_RESET })
        dispatch(listUsers())
    }, [dispatch, success])

    const deletehandler = (id) => {
        if (window.confirm('Apa anda yakin ?')) {
            dispatch(deleteUser(id))
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
                            userInfo.user.Username !== row.ID_User ? (
                                <>
                                    {/* <LinkContainer to={`/user/detail/${row.ID_User}`}>
                                        <Button variant="info" size="sm">
                                            <i className="fas fa-info"></i>
                                        </Button>
                                    </LinkContainer>
                                    <LinkContainer to={`/user/edit/${row.ID_User}`} className="ml-2">
                                        <Button variant="success" size="sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer> */}
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
                                    {/* <LinkContainer to={`/user/detail/${row.ID_User}`}>
                                        <Button variant="info" size="sm">
                                            <i className="fas fa-info"></i>
                                        </Button>
                                    </LinkContainer> */}
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
        order: "asc"  // or desc
    }];

    return (
        <div className="home">
            <div className="container-fluid">
                <Container>
                    {loading ? <Loader />
                        : error ? (<Message variant="danger" >{error}</Message>)
                            : (
                                <Card lg="2" className="mt-3 shadow-lg" >
                                    <Card.Body>
                                        {loadingDelete && <Loader />}
                                        {errorDelete && <Message variant="danger" >{error}</Message>}
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
                    <Modal size="md" show={show} onHide={handleClose}>
                        <ModalDetailUser onClick={handleClose} userId={userId} />
                    </Modal>
                    <Modal size="md" show={showEdit} onHide={handleCloseEdit}>
                        <ModalEditUser onClick={handleCloseEdit} userId={userId} />
                    </Modal>
                </Container>
            </div>
        </div>
    )
}

export default User
