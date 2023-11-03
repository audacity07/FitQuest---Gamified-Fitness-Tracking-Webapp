import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Activity } from '../pages/Activity'
import { Login } from '../pages/Login'

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/activity' element={<Activity/>}/>
            <Route path='/login' element={<Login/>}/>

        </Routes>
    )
}
