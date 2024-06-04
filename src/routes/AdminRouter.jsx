import React from 'react'
import { Navigate } from 'react-router-dom'
import useUsersData from '../Hooks/useUsersData'
import { Spinner } from '@material-tailwind/react'

const AdminRouter = ({children}) => {
    const {admin, loading}= useUsersData()
    if(loading){
        return <Spinner/>
    }
    if(admin){
        return children
    }

  return <Navigate to={"/dashboard"}></Navigate>
}

export default AdminRouter
