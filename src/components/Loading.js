import { Spinner } from "@chakra-ui/react"

export function Loading() {
    return (
        <div style={{width: '100%', height: '40rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:"transparent" }}>
            <Spinner position='relative'
                thickness='8px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </div>
    )
}