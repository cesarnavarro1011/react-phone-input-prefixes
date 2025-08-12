import * as React from "react";
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
export default function PhoneInputWithPrefixes({ value, onChange, countries, onlyCountries, countryDefault, label, placeholder, inputStyle, containerStyle, enableSearch, inputProps, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
