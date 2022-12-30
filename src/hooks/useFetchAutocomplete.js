import { useFetch } from "./useFetch";
import { useCallback } from "react";
import { API } from "api"

export function useFetchAutocomplate(type) {
    const AutocomplateCall = useCallback(() => API.autocomplete(type), [type])

    const { isDataFetched, data, error } = useFetch(AutocomplateCall)

    return { isDataFetched, data, error }
}