import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client"

export default function InvoiceUploader() {
    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)

    const onFileChange = (evt) => {
        setFile(evt.target.files[0])
    }
    
    const onFileUpload = () => {
        const formData = new FormData()
        formData.append('file', file, file.name)

        axiosClient.post('/invoices/import', formData)
    }

    return (
        <div>
            <h1 className="mb-3">Import Invoice</h1>
            <div>
                
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