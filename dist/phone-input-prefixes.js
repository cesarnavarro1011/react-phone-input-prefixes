"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import * as ScrollArea from "@radix-ui/react-scroll-area";
const defaultCountries = [
    { iso: "co", code: "+57", name: "Colombia" },
    { iso: "us", code: "+1", name: "Estados Unidos" },
    { iso: "pe", code: "+51", name: "Perú" },
    { iso: "mx", code: "+52", name: "México" },
    { iso: "ar", code: "+54", name: "Argentina" },
    { iso: "cl", code: "+56", name: "Chile" },
];
export default function PhoneInputWithPrefixes({ value, onChange, countries = [], onlyCountries, countryDefault, label = "Phone number", placeholder = "300 123 4567", inputStyle, containerStyle, enableSearch = false, inputProps = {}, }) {
    const mergedCountries = [
        ...defaultCountries,
        ...countries.filter((ec) => !defaultCountries.some((dc) => dc.iso === ec.iso)),
    ].filter((c) => !onlyCountries || onlyCountries.includes(c.iso));
    const getDefaultCountry = () => {
        const found = mergedCountries.find((c) => c.iso === countryDefault);
        return found || mergedCountries[0];
    };
    const [selectedCountry, setSelectedCountry] = React.useState(getDefaultCountry);
    const [phone, setPhone] = React.useState(value);
    const [searchTerm, setSearchTerm] = React.useState("");
    React.useEffect(() => {
        setPhone(value);
    }, [value]);
    React.useEffect(() => {
        const defaultC = getDefaultCountry();
        setSelectedCountry(defaultC);
        onChange(phone, defaultC.code);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countryDefault]);
    const handlePhoneChange = (e) => {
        const newPhone = e.target.value;
        setPhone(newPhone);
        onChange(newPhone, selectedCountry.code);
    };
    const handleSelectCountry = (country) => {
        setSelectedCountry(country);
        onChange(phone, country.code);
    };
    const filteredCountries = mergedCountries.filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return (_jsxs("div", { className: "space-y-2", style: containerStyle, children: [_jsx("label", { htmlFor: "Phone", className: "text-sm font-medium", children: label }), _jsxs("div", { className: "flex border border-gray-300 rounded-md overflow-hidden bg-white focus-within:ring-1 focus-within:ring-blue-500", children: [_jsxs(Popover.Root, { children: [_jsx(Popover.Trigger, { asChild: true, children: _jsxs("button", { type: "button", className: "w-[100px] flex items-center gap-2 px-2 hover:bg-gray-100", children: [_jsx("img", { src: `https://flagcdn.com/w40/${selectedCountry.iso}.png`, alt: selectedCountry.name, width: 20, height: 15, className: "object-cover" }), _jsx("span", { className: "text-sm", children: selectedCountry.code })] }) }), _jsx(Popover.Portal, { children: _jsxs(Popover.Content, { className: "bg-white border border-gray-200 rounded-md shadow-lg w-60", sideOffset: 4, children: [enableSearch && (_jsx("div", { className: "p-2", children: _jsx("input", { placeholder: "Buscar pa\u00EDs", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full border border-gray-300 rounded px-2 py-1 text-sm" }) })), _jsxs(ScrollArea.Root, { className: "h-48 w-full overflow-hidden", children: [_jsx(ScrollArea.Viewport, { className: "w-full h-full", children: filteredCountries.map((country) => (_jsxs("button", { onClick: () => handleSelectCountry(country), className: "w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100 gap-2", children: [_jsx("img", { src: `https://flagcdn.com/w40/${country.iso}.png`, alt: country.name, width: 20, height: 15, className: "object-cover" }), _jsx("span", { children: country.name }), _jsx("span", { className: "ml-auto text-gray-500", children: country.code })] }, country.iso))) }), _jsx(ScrollArea.Scrollbar, { orientation: "vertical", className: "bg-gray-100 hover:bg-gray-200 w-2", children: _jsx(ScrollArea.Thumb, { className: "bg-gray-400 rounded" }) })] })] }) })] }), _jsx("input", Object.assign({ id: "Phone", type: "tel", placeholder: placeholder, value: phone, onChange: handlePhoneChange, className: "border-0 flex-1 px-2 py-1 text-sm focus:outline-none", style: inputStyle }, inputProps))] })] }));
}
