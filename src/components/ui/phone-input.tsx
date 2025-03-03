import * as React from "react";
import { CheckIcon, ChevronDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<
    React.ComponentProps<"input">,
    "onChange" | "value" | "ref"
> &
    Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
        onChange?: (value: RPNInput.Value) => void;
    };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
    React.forwardRef<React.ComponentRef<typeof RPNInput.default>, PhoneInputProps>(
        ({ className, onChange, ...props }, ref) => {
            // const [value, setValue] = React.useState<RPNInput.Value>();
            // const inputRef = React.useRef<HTMLInputElement>(null)

            // React.useEffect(() => {
            //     if (inputRef.current) {
            //         inputRef.current.focus();
            //     }
            // }, []);

            return (
                <RPNInput.default
                    ref={ref}
                    className={cn(
                        "flex bg-transparent border-b-2 border-b-gray focus-within:border-b-graphic-light transition duration-200",
                        className
                    )}
                    // value={value}
                    flagComponent={FlagComponent}
                    countrySelectComponent={CountrySelect}
                    inputComponent={InputComponent}
                    // inputComponent={(props) => (
                    //     <InputComponent 
                    //         {...props}
                    //         // ref={inputRef}
                    //         onFocus={}
                    //         onClear={() => {
                                
                    //             setValue("" as RPNInput.Value)
                    //             onChange?.("" as RPNInput.Value)
                    //         }} 
                    //     />
                    // )}
                    smartCaret={false}
                    onChange={(value) => {
                        // setValue(value || ("" as RPNInput.Value))
                        onChange?.(value || ("" as RPNInput.Value))
                    }}
                    {...props}
                />
            );
        },
    );
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<"input"> & { onClear?: () => void }
        >(({ className, onClear, ...props }, ref) => (
            <Input
                isPhone
                ref={ref}
                className={cn("bg-transparent text-white border-none", className)}
                onClear={onClear}
                {...props}
            />
        ));
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    options: CountryEntry[];
    onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
    disabled,
    value: selectedCountry,
    options: countryList,
    onChange,
}: CountrySelectProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleTogglePopover = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Popover onOpenChange={handleTogglePopover}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="flex gap-1 h-10 px-3 focus:z-10 border-none bg-transparent rounded-sm hover:bg-white/20"
                    disabled={disabled}
                >
                    <FlagComponent
                        country={selectedCountry}
                        countryName={selectedCountry}
                    />
                    <ChevronDown
                        className={cn(
                            "-mr-2 size-4 opacity-50 text-white",
                            disabled ? "hidden" : "opacity-100",
                            isOpen ? "rotate-180" : "rotate-0",
                            "transition-transform duration-300"
                        )}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Поиск..." />
                    <CommandList>
                        <ScrollArea className="h-44">
                            <CommandEmpty>Не найдено.</CommandEmpty>
                            <CommandGroup>
                                {countryList.map(({ value, label }) =>
                                    value ? (
                                        <CountrySelectOption
                                            key={value}
                                            country={value}
                                            countryName={label}
                                            selectedCountry={selectedCountry}
                                            onChange={onChange}
                                        />
                                    ) : null,
                                )}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
    selectedCountry: RPNInput.Country;
    onChange: (country: RPNInput.Country) => void;
}

const CountrySelectOption = ({
    country,
    countryName,
    selectedCountry,
    onChange,
}: CountrySelectOptionProps) => {
    return (
        <CommandItem className="gap-2" onSelect={() => onChange(country)}>
            <FlagComponent country={country} countryName={countryName} />
            <span className="flex-1 text-sm">{countryName}</span>
            <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
            <CheckIcon
                className={`ml-auto size-4 ${country === selectedCountry ? "opacity-100" : "opacity-0"}`}
            />
        </CommandItem>
    );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country];

    return (
        <span className="flex h-4 w-6 overflow-hidden bg-foreground/20 [&_svg]:size-full">
            {Flag && <Flag title={countryName} />}
        </span>
    );
};

export { PhoneInput };
