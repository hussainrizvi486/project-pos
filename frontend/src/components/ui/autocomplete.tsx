import * as Combobox from '@radix-ui/react-combobox';
import PropTypes from 'prop-types';

export function AutoComplete({ suggestions, value, onChange, placeholder }) {
    // Filter suggestions based on the current input value (case-insensitive)
    const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
    );

    return (
        <Combobox.Root onValueChange={onChange}>
            <Combobox.Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search"
            />
            <Combobox.Portal>
                <Combobox.Content className="absolute w-full bg-white border rounded shadow-lg mt-1 z-10">
                    <div className="max-h-60 overflow-y-auto">
                        {filteredSuggestions.map((suggestion) => (
                            <Combobox.Item
                                key={suggestion}
                                value={suggestion}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {suggestion}
                            </Combobox.Item>
                        ))}
                    </div>
                </Combobox.Content>
            </Combobox.Portal>
        </Combobox.Root>
    );
}

AutoComplete.propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

AutoComplete.defaultProps = {
    placeholder: 'Type to search...',
};