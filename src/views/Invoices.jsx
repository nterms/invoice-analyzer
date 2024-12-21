import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client"

export default function Invoices() {
    const [invoices, setInvoices] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axiosClient.get('/invoices')
            .then(({data}) => {
                setLoading(false)
                console.log(data)
                setInvoices(data)
            })
            .catch(err => {
                setLoading(false)
                console.log(err);
            })
    }, [])

    return (
        <div>
            <h1 className="mb-3">Invoices</h1>
            <div className="actions mb-3">
                <Link to={'/invoices/upload'} className="btn btn-primary">Import Invoice</Link>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Total Amount</th>
                        <th>Purchased Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.length > 0 ? invoices.map(invoice => {
                        return <tr>
                            <td>{invoice.invoice_number}</td>
                            <td className="text-right">{invoice.total_amount}</td>
                            <td className="text-center">{invoice.purchase_date}</td>
                            <td className="text-center">
                                <Link to={'/invoices/' + invoice.id} className="btn btn-secondary"><i className="fas fa-file-text"></i> View Details</Link>
                            </td>
                        </tr>
                    }) : <tr>
                        <td colSpan={4} className="text-center">
                            No invoices available.
                        </td>
                    </tr>}
                    {loading && <tr>
                        <td colSpan={4} className="text-center">
                            <i className="fas fa-spin fa-refresh"></i>
                            Loading...
                        </td>
                    </tr>}
                </tbody>
            </table>
        </div>
    )
}