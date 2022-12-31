import { List, ListItem, Box, Flex } from "@chakra-ui/react"
import { Loading } from "components/Loading"

export function SuggestionList({ list, onSuggest }) {
    return list.length > 0 && (
        <Box boxShadow='lg' rounded='md' bg='white' position="absolute" maxHeight={300} zIndex={999} width="100%" overflowY="scroll">
            <List spacing={3} className="suggest-list">
                {
                    list.map((object) => (
                        <ListItem key={object.nameUA + (object?.nominationUA || '')} p='3' onClick={() => onSuggest(object)}>

                            <Flex justifyContent='space-between'>
                                <div>{object.nameUA}</div>
                                {object?.nominationUA ?? <div style={{ color: 'rgba(108,117,125, 1)' }}>{object.nominationUA}</div>}
                            </Flex>
                        </ListItem>)
                    )
                }
            </List>
        </Box>
    )
}

export function SuggestionListPure({ list, onSuggest, loading }) {
    return (
        <Box boxShadow='lg' rounded='md' bg='white' position="absolute" maxHeight={300} zIndex={999} width="100%" overflowY="scroll">
            <List spacing={3} className="suggest-list">
                {
                    !loading && list.map((object) => (
                        <ListItem key={object} p='3' onClick={() => onSuggest(object)} color="black">
                            {object}
                        </ListItem>)
                    )
                }
                {
                    loading && <Loading />
                }
            </List>
        </Box>
    )
}