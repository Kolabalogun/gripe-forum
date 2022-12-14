import React, { useEffect } from 'react'
import { useGlobalContext } from '../Functions/Context'

import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'

import Inbox from './Screens/Inbox'
import Outbox from './Screens/Outbox'
import Settings from './Screens/Settings'
import Trash from './Screens/Trash'


const AdminHome = () => {

    const { pageState, adminuser, navigate } = useGlobalContext()


    useEffect(() => {
        if (adminuser === 'null') {
            navigate('/adminauth')
        }
    })



    return (

        <div className='home'>
            <Navbar />

            <div className='main'>
                <Sidebar />


                {pageState === 'default' ? <Inbox /> :



                    pageState === 'Outbox' ? <Outbox /> :
                        pageState === 'Trash' ? <Trash /> : pageState === 'settings' ? <Settings /> :
                            <Inbox />}

            </div>

        </div>
    )
}

export default AdminHome