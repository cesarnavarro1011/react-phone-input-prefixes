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

export default function PhoneInputPrefixes({
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
    <div
      className={`space-y-2 w-full max-w-sm`}
      style={containerStyle}
    >
      <label htmlFor="Phone" className="block text-base font-medium text-gray-700">
        {label}
      </label>

      <div className="flex items-center border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
        {/* Selector de país */}
        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 p-2 hover:bg-gray-50 transition"
            >
              <img
                src={`https://flagcdn.com/w40/${selectedCountry.iso}.png`}
                alt={selectedCountry.name}
                width={20}
                height={20}
                className="rounded-xs"
              />
              <span className="text-base font-semibold">{selectedCountry.code}</span>
            </button>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              side="bottom"
              align="start"
              className="bg-white border border-gray-200 rounded-lg shadow-lg w-64 z-50 p-2"
              sideOffset={6}
            >
              {enableSearch && (
                <div className="mb-2">
                  <input
                    placeholder="Buscar país"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              )}

              <ScrollArea.Root className="h-48 w-full overflow-hidden">
                <ScrollArea.Viewport className="w-full h-full">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.iso}
                      onClick={() => handleSelectCountry(country)}
                      className="w-full flex items-center p-2 pr-5 text-sm hover:bg-gray-100 rounded-md transition gap-2"
                    >
                      <img
                        src={`https://flagcdn.com/w40/${country.iso}.png`}
                        alt={country.name}
                        width={22}
                        height={22}
                        className="rounded-xs"
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

        {/* Input */}
        <input
          id="Phone"
          type="tel"
          placeholder={placeholder}
          value={phone}
          onChange={handlePhoneChange}
          className="flex-1 px-3 py-2 text-base placeholder-gray-400 focus:outline-none"
          style={inputStyle}
          {...inputProps}
        />
      </div>
    </div>
  );
}
