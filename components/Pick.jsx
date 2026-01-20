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
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 my-8 justify-center items-end">

            <Autocomplete
                className="max-w-md"
                label="Search for a Company"
                defaultItems={companies}
                defaultSelectedKey={useGlobalState("Company")[0]}
                onSelectionChange={CompanyHandler}
                size="lg"
            >
                {companies.map((company, i) => (
                    <AutocompleteItem key={i} value={company.company_name}>
                        {company.company_name}
                    </AutocompleteItem>
                ))}
            </Autocomplete>

            <Link href="/company" onClick={(e) => { setGlobalState('Tab', 2) }}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                                 py-3 px-8 rounded-lg text-lg transition-all duration-200 
                                 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Start Analyzing →
                </button>
            </Link>

        </div>
    )
}

export default Pick