import { jsx as _jsx } from "react/jsx-runtime";
import PhoneInputWithPrefixes from "./phone-input-prefixes";
export default function App() {
    return (_jsx("div", { className: "p-4", children: _jsx(PhoneInputWithPrefixes, { value: "", onChange: (value, code) => console.log(value, code), countryDefault: "co", enableSearch: true }) }));
}
