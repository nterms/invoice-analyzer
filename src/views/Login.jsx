import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"
import axiosClient from "../axios-client"

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [errors, setErrors] = useState(null)
    const {setUser, setToken} = useStateContext()

    const onSubmit = (evt) => {
        evt.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                console.log(err);
                const response = err.response

                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors)
                    } else {
                        setErrors({
                            email: [response.data.message]
                        })
                    }
                }
            })
    }

    return (
        <div className="card mx-auto p-5 login-signup-form animated fadeInDown">
            <div className="form">
                <h1 className="text-uppercase mb-4">Login</h1>

                {errors && <div className="alert alert-danger">
                    {Object.keys(errors).map(key => (
                        <div>{errors[key][0]}</div>
                    ))}
                </div>}

                <form onSubmit={onSubmit}>
                    <div className="form-group mb-2">
                        <input ref={emailRef} type="email" placeholder="Email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <input ref={passwordRef} type="password" placeholder="Password" className="form-control" />
                    </div>
                    <div className="my-3">
                        <button className="btn btn-primary d-block w-100">Login</button>
                    </div>
                    <p className="message">
                        Not Registered? <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}