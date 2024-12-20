import React from 'react'
import CompanyMapping from './Admin_CompanyMapping'

const AdminMapping = ({ sectors }) => {
    return (
        <div><CompanyMapping sectors={sectors}></CompanyMapping></div>
    )
}

export default AdminMapping