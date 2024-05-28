import React, { Suspense } from 'react'
import { Switch } from 'react-router-dom'
import RouteWithLayout from '../components/RouteWithLayout'

// layout
import MainLayout from '../layouts/MainLayout'
// import AuthLayout from '../layouts/AuthLayout'

// import jwt_decode from 'jwt-decode'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import TermsLayout from '../layouts/TermsLayout'
// import SuspenceLayout from '../layouts/Suspence'
import Test from '../test'
import TestUser from '../testUser'

// //Lazy loading
// const Forestry = React.lazy(() => import('../views/forestry'));
// const Login = React.lazy(() => import('../views/auth/login'));
// const Register = React.lazy(() => import('../views/auth/register'));
// const Otp = React.lazy(() => import('../views/auth/otp'));
// const ForgotPassword = React.lazy(() => import('../views/auth/forgotPassword'));
// const ResetPassword = React.lazy(() => import('../views/auth/forgotPassword/ResetPassword'));
// const confirmEmail = React.lazy(() => import('../views/users/confirmEmail'));
// const ViewUser = React.lazy(() => import('../views/users/viewUser'));
// const EditUser = React.lazy(() => import('../views/users/editUser'));
// const Users = React.lazy(() => import('../views/users'));
// const AdminInvitation = React.lazy(() => import('../views/admin-invitation'));
// const AcceptInvitation = React.lazy(() => import('../views/accept-invitation'));
// const Terms = React.lazy(() => import('../views/terms'));
// const AssignFirstProject = React.lazy(() => import('../views/users/AssignFirstProject'));
// const Dashboard = React.lazy(() => import('../views/dashboard'));

function index() {
    const router = useHistory()

    const dispatch = useDispatch()
    const checkValidToken = () => {
        try {
            const token = localStorage.getItem('token')
            // const decodedToken: any = jwt_decode(token)
            var dateNow: any = new Date()
            // const expireDate = new Date(decodedToken.exp * 1000)
            // if (expireDate.getTime() < dateNow.getTime()) {
            //     dispatch.users.unSetAuthStatus()
            //     router.push(`/auth/login`, {url: router.location.pathname})
            // } else {
            //     decodedToken.status = true
            //     dispatch.users.setAuthStatus(decodedToken)
            //     dispatch.users.getUser({
            //         id: decodedToken.id,
            //     });
            // }
        } catch (error) {
            return(error)
        }
    }

    React.useEffect(() => {
        checkValidToken()
        
    }, [])

    return (
        // <Suspense fallback={<SuspenceLayout />}>
        <Switch>
            <RouteWithLayout
                component={Test}
                exact
                layout={MainLayout}
                path="/"
            />

            <RouteWithLayout
                component={TestUser}
                exact
                layout={MainLayout}
                path="/user/:id"
            />
        </Switch>
    // </Suspense>
    )
}

export default index
