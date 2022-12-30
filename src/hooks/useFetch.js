import { useEffect, useState } from "react";

export function useFetch(callback) {
    const [data, setData] = useState(undefined);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsFetching(true)

        callback?.()
            .then((response) => {
                setData(response.data)
                setIsFetching(false)
                setError(null)
            })
            .catch((rejected) => {
                setData(undefined)
                setIsFetching(false)
                setError(rejected)
            })
    }, [callback])

    return {
        isDataFetched: (isFetching === false) && (data !== undefined) && (error === null),
        data,
        error
    }
}