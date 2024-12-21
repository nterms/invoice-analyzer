import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axiosClient from "../axios-client"

export default function InvoiceDetails() {
    const { id } = useParams()
    const [invoiceItems, setInvoiceItems] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axiosClient.get('/invoice-items/' + id)
            .then(({data}) => {
                setLoading(false)
                console.log(data)
                setInvoiceItems(data)
            })
            .catch(err => {
                setLoading(false)
                console.log(err);
            })
    }, [])

    return (
        <div>
            <h1 className="mb-3">Invoices Details</h1>
            <div className="actions mb-3">
            <Link to={'/invoices'} className="btn btn-secondary">Go back to invoices</Link>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Price Per Unit</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceItems.length > 0 ? invoiceItems.map(item => {
                        return <tr>
                            <td>{item.item_name}</td>
                            <td className="text-center">{item.quantity}</td>
                            <td className="text-right">{item.price_per_unit}</td>
                            <td className="text-right">{item.total_price}</td>
                        </tr>
                    }) : <tr>
                        <td colSpan={4} className="text-center">
                            No items available for this invoice.
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