import axios from 'axios';
import config from '../config';

const { apiBaseUrl } = config;

const CUSTOMERDETAILS_URL = apiBaseUrl + "/api/customerInfo";

export default function getFilterData(){   

    return axios.get(CUSTOMERDETAILS_URL + "/filters")
    
}

export function getFilteredData(minage,maxage,gender,zone,state,city,sec,completes){

    return axios.post(CUSTOMERDETAILS_URL + "/getCustomerDetails" ,{
        minAge:minage,maxAge:maxage,gender:gender,zone:zone,state:state,city:city,sec:sec,totComReq:completes})

}