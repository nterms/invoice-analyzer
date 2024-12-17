import {createBrowserRouter, Navigate} from 'react-router-dom'
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import NotFound from './views/NotFound';
import Login from './views/Login';
import Signup from './views/Signup';
import Invoices from './views/Invoices';
import InvoiceDetails from './views/InvoiceDetails';
import InvoiceUploader from './views/InvoiceUploader';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/invoices' />
            },
            {
                path: '/invoices',
                element: <Invoices />
            },
            {
                path: '/invoices/upload',
                element: <InvoiceUploader />
            },
            {
                path: '/invoices/:id',
                element: <InvoiceDetails />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router;