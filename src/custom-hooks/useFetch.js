import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export function useFetch(url) {
    
    const [data, setData] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {

        async function fetchData() {
            
            try {
                setLoading(true);
                const response =  await axios.get(url);
                setData(response.data);
                setError(null);
            } catch (error) {
                setError(error.response?.data?.message || "something went wrong!");
                setData(null);
            } finally{
                setLoading(false);
            }   
        }
        fetchData();
    },[url])

    return {data, setData, loading, error};
}