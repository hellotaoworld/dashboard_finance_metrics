import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import AdminRefresh from './Admin_Refresh'

const AdminMain = ({ companypick }) => {

    return (
        <Tabs aria-label="Graphs" className='my-4'>
            <Tab key="refresh" title="Data Load">

                <AdminRefresh></AdminRefresh>
            </Tab>
            <Tab key="Mapping" title="Mapping">
                <Card>
                    <CardBody>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </CardBody>
                </Card>
            </Tab>

        </Tabs>


    )
}

export default AdminMain
