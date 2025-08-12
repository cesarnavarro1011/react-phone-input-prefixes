import PhoneInputWithPrefixes from "./phone-input-prefixes";


export default function App() {
  return (
    <div className="p-4">
    <PhoneInputWithPrefixes
      value=""
      onChange={(value: string, code: string) => console.log(value, code)}
      countryDefault="co"
      enableSearch
    />
    </div>
  );
}
