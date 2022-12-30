import { List, ListItem, Box } from "@chakra-ui/react"

export function Suggestlist({ list, onSuggest }) {
    return list.length > 0 && (
        <Box boxShadow='lg' rounded='md' bg='white' position="absolute" maxHeight={300} zIndex={999} width="100%" overflowY="scroll">
            <List spacing={3} className="suggest-list">
                {
                    list.map(({ nameUA }) => <ListItem key={nameUA} p='3' onClick={() => onSuggest(nameUA)}>{nameUA}</ListItem>)
                }
            </List>
        </Box>
    )
}