import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import axiosClient from "../axios-client"

export default function InvoiceUploader() {
    const [file, setFile] = useState()
    const [errors, setErrors] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)

    const onFileChange = (evt) => {
        setErrors(null)
        setFile(evt.target.files[0])
    }

    const onFileUpload = () => {
        setErrors(null)

        if (!file) {
            setErrors({
                error: ['No file selected. Please select a JPG, PNG or PDF file.']
            })
        }

        const formData = new FormData()
        formData.append('file', file, file.name)
        setLoading(true)
        axiosClient.post('/invoices/import', formData)
            .then(response => {
                setLoading(false)
                console.log(response);
                if (response && response.status == 200) {
                    setSuccess('Fule successflly imported.')
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err);
                const response = err.response

                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else if (response.data.error) {
                        setErrors({
                            error: [response.data.error]
                        })
                    } else {
                        setErrors({
                            error: [err.message]
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

                {success && <div className="alert alert-success">
                    <div>{success}</div>
                </div>}
            </div>
            <div className="actions mb-3">
                <label className="mb-2">Please select a file to import</label>
                <div className="form-group mb-2">
                    <input type="file" onChange={onFileChange} className="form-control-file"/>
                </div>
                <div className="small mb-3">
                    Supported file formats are JPG, PNG or PDF.
                    Maximum file size is 2MB.
                </div>
                <button className="btn btn-primary" onClick={onFileUpload}>
                    {loading && <i className="fas fa-spin fa-refresh"></i>} 
                    {!loading && <i className="fas fa-upload"></i>} 
                    Import
                </button>
                <Link to={'/invoices'} className="btn btn-secondary ml-2">Go back to invoices</Link>
            </div>
        </div>
    )
}