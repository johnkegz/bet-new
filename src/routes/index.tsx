import React, { Suspense } from 'react'
import { Switch } from 'react-router-dom'
import RouteWithLayout from '../components/RouteWithLayout'

// layout
import MainLayout from '../layouts/MainLayout'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import History from '../History'
import UserProfile from '../UserProfile'
import Home from '../Home'
import FrozenPage from '../FrozenPage'
import TestUser from '../Play'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../views/Login'
import Registration from '../views/Regisiter'
import Play from '../Play'
import Dashboard from '../Dashboard'

function index() {
    const router = useHistory()

    const dispatch = useDispatch()
    const checkValidToken = () => {
        try {
            const token = localStorage.getItem('token')
            var dateNow: any = new Date()
        } catch (error) {
            return(error)
        }
    }

    React.useEffect(() => {
        checkValidToken()
        
    }, [])

    return (
        <Switch>
            <RouteWithLayout
                component={Home}
                exact
                layout={MainLayout}
                path="/"
            />
            <RouteWithLayout
                component={Dashboard}
                exact
                layout={MainLayout}
                path="/dashboard"
            />
            <RouteWithLayout
                component={Play}
                exact
                layout={MainLayout}
                path="/play"
            />
            <RouteWithLayout
                component={History}
                exact
                layout={MainLayout}
                path="/history"
            />
            <RouteWithLayout
                component={UserProfile}
                exact
                layout={MainLayout}
                path="/profile"
            />
            <RouteWithLayout
                component={FrozenPage}
                exact
                layout={MainLayout}
                path="/frozen"
            />
            <RouteWithLayout
                component={Login}
                exact
                layout={AuthLayout}
                path="/login"
            />
            <RouteWithLayout
                component={Registration}
                exact
                layout={AuthLayout}
                path="/register"
            />
        </Switch>
    )
}

export default index
