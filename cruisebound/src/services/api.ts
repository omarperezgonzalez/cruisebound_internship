import axios, { AxiosError } from 'axios';

export interface Cruise {
    price : string,
    name : string,
    ship : CruiseShip,
    itinerary : [string],
    region : string,
    departureDate : string,
    returnDate : string,
    duration : number
}

export interface CruiseShip {
    name : string,
    rating : number,
    reviews : number,
    image : string,
    line : CruiseShipLine,
}

export interface CruiseShipLine {
    logo : string,
    name : string,
}

// Create an Axios instance configured for local API routes
const api = axios.create({
    baseURL: "/api/", // Base URL pointing to backend local API endpoints
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Function to fetch cruise data from the backend
export const getData = async (): Promise<Cruise[]> => {
    try {
        const { data } = await api.get('sailings'); //This will call /api/sailings
        return data.results;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('API Error:', error.response?.data || error.message);
        }
        throw error;
    }
};

//Example data
/*
{
    "price": 319,
    "name": "7 Night Mediterranean - Western Cruise",
    "ship": {
        "name": "MSC Virtuosa",
        "rating": 4.5,
        "reviews": 123,
        "image": "https://res.cloudinary.com/cruisebound/image/upload/f_auto/v1656397931/production/small_msc_vi_item_76c6c4b53c.png",
        "line": {
            "logo": "https://res.cloudinary.com/cruisebound/image/upload/f_auto/v1649242239/production/line_logo_6_4bbd4246_eded_4690_bd5e_b184f4a64e82_0f9ac3171a.jpg",
            "name": "MSC Cruises"
        }
    },
    "itinerary": [
        "Naples, Italy",
        "Palma de Mallorca, Spain",
        "Barcelona, Spain",
        "Marseille, France",
        "Genoa, Italy",
        "La Spezia (Cinque Terre), Italy",
        "Naples, Italy"
    ],
    "region": "Caribbean",
    "departureDate": "2022-11-23",
    "returnDate": "2022-11-30",
    "duration": 7
}
*/