import { useState } from "react"
import { Navigate } from "react-router-dom"
import axiosClient from "../axios-client"

export default function InvoiceUploader() {
    const [file, setFile] = useState()
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)

    const onFileChange = (evt) => {
        setErrors(null)
        setFile(evt.target.files[0])
    }

    const onFileUpload = () => {
        const formData = new FormData()
        formData.append('file', file, file.name)

        axiosClient.post('/invoices/import', formData)
            .then(response => {
                if (response && response.status === 200) {
                    return <Navigate to='/invoices' />
                }
            })
            .catch(err => {
                console.log(err);
                const response = err.response

                if (response && response.status === 422) {
                    if (response.data.error) {
                        setErrors({
                            error: [response.data.error]
                        })
                    }
                }
            })
    }

    return (
        <div>
            <h1 className="mb-3">Import Invoice</h1>
            <div>
                {errors && <div className="alert alert-danger">
                    {Object.keys(errors).map(key => (
                        <div>{errors[key][0]}</div>
                    ))}
                </div>}
            </div>
            <div className="actions mb-3">
                <div className="form-group mb-2">
                    <input type="file" onChange={onFileChange}/>
                </div>
                <button className="btn btn-primary" onClick={onFileUpload}>Import</button>
            </div>
        </div>
    )
}