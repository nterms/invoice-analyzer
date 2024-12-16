import { useRef } from "react"
import { Link } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"

export default function Signup() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()

    const {setUser, setToken} = useStateContext()

    const onSubmit = (evt) => {
        evt.preventDefault()
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1 >Login</h1>
                <form onSubmit={onSubmit}>
                    <input ref={nameRef} type="text" placeholder="Full Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Already Registered? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}