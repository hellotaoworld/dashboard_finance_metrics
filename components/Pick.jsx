import React, { useState, useEffect } from 'react'
import { setGlobalState, useGlobalState } from '@/state';
import { Select, SelectItem, Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { Button } from "@nextui-org/react";
import Link from 'next/link';

const Pick = ({ companies }) => {

    const CompanyHandler = (e) => {
        if (e !== null) {
            setGlobalState("Sector", companies[e].sector);
            setGlobalState("Company", companies[e].company_name);
        }
    }

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 my-2">

            <Autocomplete className="max-w-md"
                label="Start by Searching a Company"
                defaultItems={companies}
                defaultSelectedKey={useGlobalState("Company")[0]} onSelectionChange={CompanyHandler}>

                {companies.map((company, i) => (
                    <AutocompleteItem key={i} value={company.company_name}>{company.company_name}</AutocompleteItem>
                ))}
            </Autocomplete>

            <button className="bg-default-500 text-white px-2 my-2 rounded hover:bg-default-600"><Link href="/company" onClick={(e) => { setGlobalState('Tab', 2) }}>Start</Link></button>

        </div>

    )

}

export default Pick
