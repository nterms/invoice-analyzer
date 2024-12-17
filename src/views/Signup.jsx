import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"
import axiosClient from "../axios-client"

export default function Signup() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const [errors, setErrors] = useState(null)
    const {setUser, setToken} = useStateContext()

    const onSubmit = (evt) => {
        evt.preventDefault()

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        axiosClient.post('/signup', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                console.log(err);
                const response = err.response

                if (response && response.status === 422) {
                    console.log(response.data.errors)
                    setErrors(response.data.errors)
                }
            })
    }

    return (
        <div className="card mx-auto p-5 login-signup-form animated fadeInDown">
            <div className="form">
                <h1 className="text-uppercase mb-4">Signup</h1>

                {errors && <div className="alert alert-danger">
                    {Object.keys(errors).map(key => (
                        <div>{errors[key][0]}</div>
                    ))}
                </div>}

                <form onSubmit={onSubmit}>
                    <div className="form-group mb-2">
                        <input ref={nameRef} type="text" placeholder="Full Name" className="form-control" />
                    </div>
                    <div className="form-group mb-2">
                        <input ref={emailRef} type="email" placeholder="Email" className="form-control" />
                    </div>
                    <div className="form-group mb-2">
                        <input ref={passwordRef} type="password" placeholder="Password" className="form-control" />
                    </div>
                    <div className="form-group mb-2">
                        <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" className="form-control" />
                    </div>
                    <div className="my-3">
                        <button type="submit" className="btn btn-primary d-block w-100">Signup</button>
                    </div>
                    <p className="message">
                        Already Registered? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}