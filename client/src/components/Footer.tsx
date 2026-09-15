import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { logout } from '../actions/authActions'

const Footer = () => {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3" >
                        <span className="font-weight-bold">Copyright &copy; BNI</span>
                    </Col>
                </Row>
            </Container>
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>
            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Anda ingi keluar?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Pilih Logout jika ingin mengakhiri sesi ini.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <a className="btn btn-primary" onClick={logoutHandler}>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
