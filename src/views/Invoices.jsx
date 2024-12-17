import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client"

export default function Invoices() {
    const [invoices, setInvoices] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading
        axiosClient.get('/invoices')
            .then(({data}) => {
                console.log(data)
                setInvoices(data)
            })
            .catch(err => {
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
                    {invoices.map(invoice => {
                        return <tr>
                            <td>{invoice.invoice_number}</td>
                            <td className="text-right">{invoice.total_amount}</td>
                            <td>{invoice.purchased_date}</td>
                            <td>
                                <Link to={'/invoices/' + invoice.id}>View Details</Link>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}