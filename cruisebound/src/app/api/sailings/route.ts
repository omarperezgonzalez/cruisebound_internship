//Now we can access the API without CORS related issues
//Creates a local server that way it can send and receive 
//requests with no CORS issues.

//Import Axios for making HTTP requests
import axios from 'axios';
//Import Next.js request and response utilities for server-side API handling
import { NextRequest, NextResponse } from 'next/server';

const apiUrl = process.env.API_URL;

//Create an Axios instance with a predefined base URL and headers
const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br'
    }
});

//Define a GET handler for the API route
export async function GET(request: NextRequest) {
    try {
        const { data } = await api.get('sailings');
        //Return the response as JSON to the client
        return NextResponse.json(data);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { message: 'Internal server error' }, 
            { status: 500 }
        );
    }
}