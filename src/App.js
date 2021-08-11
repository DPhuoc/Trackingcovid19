import React, { useEffect, useState } from 'react'
import { getCountries, getReportByCountry } from './apis'
import CountrySelector from './components/CountrySelector/index'
import Highlight from './components/Highlight/index'
import Summary from './components/Summary/index'
import { sortBy } from 'lodash';

export default function App() {
    const [countries, setCountries] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState('');
    const [report, setReport] = useState([]);

    useEffect(() => {
        getCountries()
            .then(res => {
                const { data } = res;
                const countries = sortBy(data, 'Country');
                setCountries(countries);
                setSelectedCountryId('vn');
            })

    }, [])

    const handleOnChange = (e) => {
        setSelectedCountryId(e.target.value);
        
    }

    useEffect(() => {
        if (selectedCountryId) {
            const { Slug } = countries.find(country => country.ISO2.toLowerCase() === selectedCountryId)
    
            getReportByCountry(Slug)
                .then(res => {
                    res.data.pop();
                    setReport(res.data)
                });
        }
    }, [countries, selectedCountryId]);

    return (
        <>
            <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountryId}/>
            <Highlight report={report} />
            <Summary selectedCountryId={selectedCountryId} report={report} />
        </>
    )
}


