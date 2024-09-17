import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({onSearchChange}) => {

    const[search, setSearch] = useState(null);
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);  
    }

    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions);
            if (!response.ok) {
                throw new Error;
            }

            const result = await response.json();
            console.log(result); 
            return {
                options: result.data.map((city) => {
                    return {
                        value:`${city.latitude} ${city.longitude}`,
                        label:`${city.name}, ${city.countryCode}`,
                    };
                })
            };
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AsyncPaginate 
            placeholder="Search for City"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;