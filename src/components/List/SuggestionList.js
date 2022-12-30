import { List, ListItem, Box, Flex } from "@chakra-ui/react"

export function Suggestlist({ list, onSuggest }) {
    return list.length > 0 && (
        <Box boxShadow='lg' rounded='md' bg='white' position="absolute" maxHeight={300} zIndex={999} width="100%" overflowY="scroll">
            <List spacing={3} className="suggest-list">
                {
                    list.map((object) => (
                        <ListItem key={object.nameUA + (object?.nominationUA || '')} p='3' onClick={() => onSuggest(object)}>

                            <Flex justifyContent='space-between'>
                                <span>{object.nameUA}</span>
                                {object?.nominationUA ?? <span style={{ color: 'rgba(108,117,125, 1)' }}>{object.nominationUA}</span>}
                            </Flex>
                        </ListItem>)
                    )
                }
            </List>
        </Box>
    )
}