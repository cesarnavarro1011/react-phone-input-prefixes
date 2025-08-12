"use client";
import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import * as ScrollArea from "@radix-ui/react-scroll-area";

type Country = {
  iso: string;
  code: string;
  name: string;
};

type Props = {
  value: string;
  onChange: (value: string, countryCode: string) => void;
  countries?: Country[];
  onlyCountries?: string[];
  countryDefault?: string;
  label?: string;
  placeholder?: string;
  inputStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  enableSearch?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const defaultCountries: Country[] = [
  { iso: "co", code: "+57", name: "Colombia" },
  { iso: "us", code: "+1", name: "Estados Unidos" },
  { iso: "pe", code: "+51", name: "Perú" },
  { iso: "mx", code: "+52", name: "México" },
  { iso: "ar", code: "+54", name: "Argentina" },
  { iso: "cl", code: "+56", name: "Chile" },
];

export default function PhoneInputWithPrefixes({
  value,
  onChange,
  countries = [],
  onlyCountries,
  countryDefault,
  label = "Phone number",
  placeholder = "300 123 4567",
  inputStyle,
  containerStyle,
  enableSearch = false,
  inputProps = {},
}: Props) {
  const mergedCountries = [
    ...defaultCountries,
    ...countries.filter((ec) => !defaultCountries.some((dc) => dc.iso === ec.iso)),
  ].filter((c) => !onlyCountries || onlyCountries.includes(c.iso));

  const getDefaultCountry = (): Country => {
    const found = mergedCountries.find((c) => c.iso === countryDefault);
    return found || mergedCountries[0];
  };

  const [selectedCountry, setSelectedCountry] = React.useState<Country>(getDefaultCountry);
  const [phone, setPhone] = React.useState<string>(value);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  React.useEffect(() => {
    setPhone(value);
  }, [value]);

  React.useEffect(() => {
    const defaultC = getDefaultCountry();
    setSelectedCountry(defaultC);
    onChange(phone, defaultC.code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryDefault]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    onChange(newPhone, selectedCountry.code);
  };

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    onChange(phone, country.code);
  };

  const filteredCountries = mergedCountries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-2" style={containerStyle}>
      <label htmlFor="Phone" className="text-sm font-medium">
        {label}
      </label>

      <div className="flex border border-gray-300 rounded-md overflow-hidden bg-white focus-within:ring-1 focus-within:ring-blue-500">
        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              type="button"
              className="w-[100px] flex items-center gap-2 px-2 hover:bg-gray-100"
            >
              <img
                src={`https://flagcdn.com/w40/${selectedCountry.iso}.png`}
                alt={selectedCountry.name}
                width={20}
                height={15}
                className="object-cover"
              />
              <span className="text-sm">{selectedCountry.code}</span>
            </button>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              className="bg-white border border-gray-200 rounded-md shadow-lg w-60"
              sideOffset={4}
            >
              {enableSearch && (
                <div className="p-2">
                  <input
                    placeholder="Buscar país"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                </div>
              )}

              <ScrollArea.Root className="h-48 w-full overflow-hidden">
                <ScrollArea.Viewport className="w-full h-full">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.iso}
                      onClick={() => handleSelectCountry(country)}
                      className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100 gap-2"
                    >
                      <img
                        src={`https://flagcdn.com/w40/${country.iso}.png`}
                        alt={country.name}
                        width={20}
                        height={15}
                        className="object-cover"
                      />
                      <span>{country.name}</span>
                      <span className="ml-auto text-gray-500">{country.code}</span>
                    </button>
                  ))}
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  orientation="vertical"
                  className="bg-gray-100 hover:bg-gray-200 w-2"
                >
                  <ScrollArea.Thumb className="bg-gray-400 rounded" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        <input
          id="Phone"
          type="tel"
          placeholder={placeholder}
          value={phone}
          onChange={handlePhoneChange}
          className="border-0 flex-1 px-2 py-1 text-sm focus:outline-none"
          style={inputStyle}
          {...inputProps}
        />
      </div>
    </div>
  );
}
