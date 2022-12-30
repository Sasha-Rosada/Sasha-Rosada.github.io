import { useCallback, useEffect } from "react"
import { API } from "../api"
import { useFetch } from "./useFetch"

export function useGenerate(username, type) {
    const requestTemplateUA = useCallback(() => API.generate(username, type, 'ua'), [type, username])
    const requestTemplateEN = useCallback(() => API.generate(username, type, 'en'), [type, username])
    
    useFetch(requestTemplateEN)
    useFetch(requestTemplateUA)

}