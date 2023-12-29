import React, { useState, useEffect } from 'react'
import { setGlobalState, useGlobalState } from '@/state';
import { Select, SelectItem, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';


const Filter = ({ sectors, status }) => {
    const sector = useGlobalState("Sector")[0];
    const [companyList, setcompanyList] = useState([]);

    useEffect(() => {
        //console.log(sector);
        fetch(`/api/sectors/companylist/${sector}`)
            .then(res => res.json())
            .then(value => {
                setcompanyList(value)
            })
    }, [sector])

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 my-2">
            <Select className="max-w-xs"
                label="Select a sector"
                defaultSelectedKeys={useGlobalState("Sector")} onChange={(e) => { setGlobalState("Sector", e.target.value) }}>

                {sectors.map((sector, i) => (
                    <SelectItem key={sector.company_sector} value={sector.company_sector}>{sector.company_sector}</SelectItem>
                ))}
            </Select>
            <Select className="max-w-xs"
                label="Select a company"
                defaultSelectedKeys={useGlobalState("Company")} onChange={(e) => { setGlobalState("Company", e.target.value) }}>

                {companyList.map((company, i) => (
                    <SelectItem key={company.company_name} value={company.company_name}>{company.company_name}</SelectItem>
                ))}
            </Select>
        </div>

    )

}

export default Filter
