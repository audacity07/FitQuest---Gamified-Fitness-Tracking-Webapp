import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { UserBoard } from '../pages/UserBoard'
import { AvatarSelect } from '../pages/AvatarSelect'

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/user-board' element={<UserBoard/>}/>
            <Route path='/select-avarat' element={<AvatarSelect/>}/>
        </Routes>
    )
}
