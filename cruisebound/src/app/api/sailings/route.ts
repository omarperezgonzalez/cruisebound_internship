import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const api = axios.create({
    baseURL: "https://sandbox.cruisebound-qa.com/",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br'
    }
});

export async function GET(request: NextRequest) {
    try {
        const { data } = await api.get('sailings');
        return NextResponse.json(data);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { message: 'Internal server error' }, 
            { status: 500 }
        );
    }
}