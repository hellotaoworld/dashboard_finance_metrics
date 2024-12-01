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
                        <iframe
                            src="https://www.google.com/finance/quote/COST:NASDAQ"
                            width="100%"
                            height="500"
                            style={{ border: "none" }}
                            title="Google Finance Chart"
                        ></iframe>
                    </CardBody>
                </Card>
            </Tab>

        </Tabs>


    )
}

export default AdminMain
