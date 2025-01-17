import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

const OnlyAdminPrivateRoute = () => {
    const {currentUser} = useSelector((store) => store.user)
    return currentUser.isAdmin ? <Outlet/> : <Navigate to='/sign-in'/>
}

export default OnlyAdminPrivateRoute