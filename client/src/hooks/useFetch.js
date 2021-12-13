import { useCallback, useEffect, useState } from 'react'
import { sendGetRequest } from '../api/request'

export const useFetch = (url, dependencies = [url]) => {
    const [data, setData] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState(null)

    const makeAsyncRequest = useCallback(async () => {
        setIsFetching(true)
        setError(null)
        try {
            const response = await sendGetRequest(url)
            setData(response)
        } catch(error) {
            setError(error.errors)
        } finally {
            setIsFetching(false)
        }
    }, dependencies)

    useEffect(() => {
        makeAsyncRequest()
    }, [makeAsyncRequest])

    return [data, isFetching, error]
}
