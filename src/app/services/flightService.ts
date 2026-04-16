import axios from "axios";
import { flightModel } from "../../models/flightModel";


const client = axios.create({
    baseURL: 'https://flight.pequla.com/api',
    headers: {
        'Accept': 'application/json',
        'X-Name': 'KVA_2026/dev'
    },
    validateStatus(status) {
        return status === 200
    }
})

export class FlightService {
    static async getFlights() {
        return await client.get<flightModel[]>('/flight/list?type=departure')
    }

    static async getFlightById(id: number) {
        return await client.get<flightModel>('/flight/' + id)
    }

    static async getDestinations() {
        return await client.get<string[]>('/flight/destination')
    }

    static async getFlightsToDestination(dest: string) {
        return await client.get(`/flight/destination/${dest}?type=departure`)
    }

    static async getFlightsByIds(ids: number[]) {
        return await client.request({
            url: '/flight/list',
            method: 'post',
            data: ids
        })
    }
}