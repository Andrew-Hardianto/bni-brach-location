import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { login } from '../../actions/authActions'

const Login = ({ location, history }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const { loading, error, userInfo } = useSelector((state) => state.userLogin)

    const redirect = location.search ? location.search.split('=')[1] : '/location/provinsi'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    return (
        <div className="home">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row justify-content-center">
                                    <div className="col-lg-9">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 font-weight-bold mb-4">LOGIN</h1>
                                            </div>
                                            {error && <Message variant='danger'>{error}</Message>}
                                            {loading && <Loader />}
                                            <form className="user" onSubmit={submitHandler}>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-user"
                                                        id="username"
                                                        placeholder="Username"
                                                        name="username"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        className="form-control form-control-user"
                                                        id="password"
                                                        placeholder="Password"
                                                        name="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                                    Login
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Login
