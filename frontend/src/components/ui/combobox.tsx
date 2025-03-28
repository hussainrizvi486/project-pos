import { useState, useEffect } from "react";
import { Command } from "cmdk";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@components/ui/popover";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@utils/index";

interface ComboboxOption {
    label: string;
    value: string;
}

interface ComboboxProps {
    options?: ComboboxOption[];
    placeholder?: string;
    onChange?: (value: ComboboxOption | null) => void;
    defaultValue?: ComboboxOption | null;
    onSearch?: (query: string) => Promise<ComboboxOption[]> | ComboboxOption[];
    className?: string;
}

export const Combobox = ({
    options = [],
    placeholder = "Select...",
    onChange,
    defaultValue = null,
    onSearch,
    className = "",
}: ComboboxProps) => {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState<ComboboxOption[]>(options);
    const [value, setValue] = useState<ComboboxOption | null>(defaultValue);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!onSearch) {
            setResults(
                options.filter((option) =>
                    option.label.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            return;
        }

        const fetchResults = async () => {
            if (!searchQuery.trim()) {
                setResults(options);
                return;
            }
            setLoading(true);
            try {
                const searchResults = await onSearch(searchQuery);
                setResults(searchResults);
            } catch (error) {
                console.error("Error searching options:", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(() => {
            fetchResults();
        }, 300);

        return () => clearTimeout(debounce);
    }, [searchQuery, options, onSearch]);

    const handleSelect = (option: ComboboxOption) => {
        setValue(option);
        onChange?.(option);
        setOpen(false);
    };


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {/* class="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-[200px] justify-between" */}
                <button
                    className={cn(
                        "inline-flex items-center gap-2 justify-between whitespace-nowrap rounded-md font-medium transition-colors [&_svg]:pointer-events-none [&_svg]:size-2 [&_svg]:shrink-0 w-full p-2 border border-gray-300 shadow-sm text-sm",
                        className
                    )}
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="listbox"
                >
                    {value ? value.label : placeholder}

                    <ChevronsUpDown className="opacity-50 " />
                </button>
            </PopoverTrigger>

            <PopoverContent className="w-96 p-0 ">
                <Command className="w-full">
                    <div className="flex items-center border-b px-3">
                        <Search className="h-4 w-4 text-muted-foreground mr-2" />
                        <Command.Input
                            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Search..."
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                        />
                    </div>

                    <Command.List>
                        {loading ? (
                            <div className="py-6 text-center text-sm">Loading...</div>
                        ) : results.length > 0 ? (
                            <Command.Group>
                                {results.map((option) => (
                                    // relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
                                    <Command.Item
                                        key={option.value}
                                        className="relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                                        onSelect={() => handleSelect(option)}
                                        value={option.value}
                                    >
                                        <span className="flex-1">{option.label}</span>
                                        {value?.value === option.value && (
                                            <Check className="h-4 w-4 ml-2" />
                                        )}
                                    </Command.Item>
                                ))}
                            </Command.Group>
                        ) : (
                            <div className="py-6 text-center text-sm">No results found.</div>
                        )}
                    </Command.List>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

