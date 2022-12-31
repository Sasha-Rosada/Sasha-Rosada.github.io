import { Input, FormControl, FormLabel } from "@chakra-ui/react";
import { SuggestionList } from "./suggestion";

export function InputWithSuggestions({ suggestion, value, onChange }) {
    const [suggestion, setSuggestion] = useState([]);

    const onChangeHandler = (e) => {
        onChange(e)

        if (e.target.value.length) {
            setSuggestion(FilterSubstringEntry(e.target.value))
        }
    }

    const onSuggest = (e) => {
        onChange(e)
        setSuggestion([]);
    }

    return (
        <FormControl p={0}>
            <FormLabel color="white">Введіть ім'я</FormLabel>
            <Input autoComplete="off" bg='white' type='text' value={value} onChange={onChangeHandler} />
            <SuggestionList list={suggestion} onSuggest={onSuggest} />
        </FormControl>
    )
}

function FilterSubstringEntry(pattern) {
    return (value) => value.toLowerCase().includes(pattern.toLowerCase())
}