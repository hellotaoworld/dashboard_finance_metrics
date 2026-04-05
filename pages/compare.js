import Head from 'next/head';
import React, { useState, useEffect } from 'react'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { getSectors } from '../services';
import CompareMain from '@/components/Compare/CompareMain';

const ComparePage = ({ sectors }) => {
    const [sectorA, setSectorA] = useState('');
    const [companyA, setCompanyA] = useState('');
    const [sectorB, setSectorB] = useState('');
    const [companyB, setCompanyB] = useState('');
    const [allCompanies, setAllCompanies] = useState([]);
    const [companiesA, setCompaniesA] = useState([]);
    const [companiesB, setCompaniesB] = useState([]);

    // Load all companies once on mount
    useEffect(() => {
        fetch('/api/companies/company')
            .then(r => r.json())
            .then(v => {
                setAllCompanies(v);
                setCompaniesA(v);
                setCompaniesB(v);
            });
    }, []);

    // When sector A is selected, filter company list A to that sector
    useEffect(() => {
        if (!sectorA) {
            setCompaniesA(allCompanies);
            return;
        }
        fetch(`/api/sectors/companylist/${sectorA}`)
            .then(r => r.json())
            .then(v => { setCompaniesA(v); setCompanyA(''); });
    }, [sectorA]);

    // When sector B is selected, filter company list B to that sector
    useEffect(() => {
        if (!sectorB) {
            setCompaniesB(allCompanies);
            return;
        }
        fetch(`/api/sectors/companylist/${sectorB}`)
            .then(r => r.json())
            .then(v => { setCompaniesB(v); setCompanyB(''); });
    }, [sectorB]);

    const handleCompanyAChange = (name) => {
        if (!name) return;
        setCompanyA(name);
        // Auto-set sector if not already set
        if (!sectorA) {
            const match = allCompanies.find(c => c.company_name === name);
            if (match?.sector) setSectorA(match.sector);
        }
    };

    const handleCompanyBChange = (name) => {
        if (!name) return;
        setCompanyB(name);
        if (!sectorB) {
            const match = allCompanies.find(c => c.company_name === name);
            if (match?.sector) setSectorB(match.sector);
        }
    };

    const bothSelected = companyA && companyB;

    return (
        <main>
            <Head><title>Valuation Engine — Compare</title>
                <link rel="icon" href="/avatar2.png" />
            </Head>
            <div className='container gap-4 py-4'>
                <h1 className='text-2xl font-bold mb-4 mx-2'>Compare Companies</h1>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">Company A</p>
                        <div className="flex flex-col gap-2">
                            <Autocomplete
                                label="Filter by industry (optional)"
                                defaultItems={sectors}
                                onSelectionChange={(v) => setSectorA(v || '')}
                                className="w-full"
                            >
                                {sectors.map((s) => (
                                    <AutocompleteItem key={s.company_sector} value={s.company_sector}>{s.company_sector}</AutocompleteItem>
                                ))}
                            </Autocomplete>
                            <Autocomplete
                                label="Search company"
                                defaultItems={companiesA}
                                onSelectionChange={handleCompanyAChange}
                                className="w-full"
                            >
                                {companiesA.map((c) => (
                                    <AutocompleteItem key={c.company_name} value={c.company_name}>{c.company_name}</AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                        <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-2">Company B</p>
                        <div className="flex flex-col gap-2">
                            <Autocomplete
                                label="Filter by industry (optional)"
                                defaultItems={sectors}
                                onSelectionChange={(v) => setSectorB(v || '')}
                                className="w-full"
                            >
                                {sectors.map((s) => (
                                    <AutocompleteItem key={s.company_sector} value={s.company_sector}>{s.company_sector}</AutocompleteItem>
                                ))}
                            </Autocomplete>
                            <Autocomplete
                                label="Search company"
                                defaultItems={companiesB}
                                onSelectionChange={handleCompanyBChange}
                                className="w-full"
                            >
                                {companiesB.map((c) => (
                                    <AutocompleteItem key={c.company_name} value={c.company_name}>{c.company_name}</AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                    </div>
                </div>

                {!bothSelected && (
                    <div className="flex justify-center mt-10">
                        <div className="text-center max-w-sm">
                            <div className="text-6xl mb-5">⚖️</div>
                            <p className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Compare Two Companies</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                {!companyA && !companyB
                                    ? 'Select Company A and Company B from the pickers above to see a side-by-side breakdown of their financial metrics.'
                                    : !companyA
                                        ? 'Now select Company A to complete the comparison.'
                                        : 'Now select Company B to complete the comparison.'}
                            </p>
                        </div>
                    </div>
                )}

                {bothSelected && (
                    <CompareMain
                        companyA={companyA}
                        sectorA={sectorA}
                        companyB={companyB}
                        sectorB={sectorB}
                    />
                )}
            </div>
        </main>
    );
};

export default ComparePage;

export async function getServerSideProps() {
    const sectors = (await getSectors()) || [];
    return { props: { sectors } };
}
