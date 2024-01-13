import React, { useState, useEffect } from 'react'
import { setGlobalState, useGlobalState } from '@/state';
import { Select, SelectItem, Autocomplete, AutocompleteItem } from '@nextui-org/react';


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

    const SectorHandler = (e) => {
        if (e !== null) { setGlobalState("Sector", e) }
    }

    const CompanyHandler = (e) => {
        if (e !== null) { setGlobalState("Company", e) }
    }

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 my-2">
            <Autocomplete className="max-w-xs"
                label="Select a sector"
                defaultItems={sectors}
                defaultSelectedKey={useGlobalState("Sector")[0]} onSelectionChange={SectorHandler} >

                {sectors.map((sector, i) => (
                    <AutocompleteItem key={sector.company_sector} value={sector.company_sector}>{sector.company_sector}</AutocompleteItem>
                ))}
            </Autocomplete>
            <Autocomplete className="max-w-xs"
                label="Select a company"
                defaultItems={companyList}
                defaultSelectedKey={useGlobalState("Company")[0]} onSelectionChange={CompanyHandler}>

                {companyList.map((company, i) => (
                    <AutocompleteItem key={company.company_name} value={company.company_name}>{company.company_name}</AutocompleteItem>
                ))}
            </Autocomplete>
        </div>

    )

}

export default Filter
