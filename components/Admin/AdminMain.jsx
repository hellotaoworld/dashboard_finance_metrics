import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import AdminRefresh from './Admin_Refresh'
import AdminMapping from './Admin_Mapping';


const AdminMain = ({ sectors }) => {
    //console.log(sectors)
    return (
        <Tabs aria-label="Graphs" className='my-4'>
            <Tab key="refresh" title="Data Load">

                <AdminRefresh></AdminRefresh>
            </Tab>
            <Tab key="Mapping" title="Mapping">
                <AdminMapping sectors={sectors}></AdminMapping>
            </Tab>

        </Tabs>


    )
}

export default AdminMain
