📞 react-phone-input-prefixes
## 📸 Demo

![Input Preview](https://raw.githubusercontent.com/cesarnavarro1011/react-phone-input-prefixes/main/Iphone-input-prefixes-preview.png)
![Selector Preview](https://raw.githubusercontent.com/cesarnavarro1011/react-phone-input-prefixes/main/Iphone-input-prefixes-selector.png)


## ✨ Features

- Country selector with flags.
- Flag images obtained from `flagcdn.com`.
- Fully styled with **TailwindCSS** and built with **Radix UI** (no shadcn/ui dependency).
- Add new countries easily.
- Highly reusable and customizable.
- Ideal for international forms and localization.

Español:

- Selector de países con sus banderas.
- Imágenes de banderas obtenidas de `flagcdn.com`.
- Totalmente estilizado con **TailwindCSS** y construido con **Radix UI** (sin dependencia de shadcn/ui).
- Agrega nuevos países fácilmente.
- Altamente reutilizable y personalizable.
- Ideal para formularios internacionales y localización.

---

## 🚀 Installation

```bash
npm install react-phone-input-prefixes @radix-ui/react-popover @radix-ui/react-scroll-area
# o
yarn add react-phone-input-prefixes @radix-ui/react-popover @radix-ui/react-scroll-area
```

**Peer dependencies:**
- `react` >= 18
- `tailwindcss` >= 3.0.0

---

## ⚙️ Configuration

En Next.js, permite las imágenes desde `flagcdn.com` en `next.config.js`:

```ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
  },
};

export default nextConfig;
```

```tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-phone-input-prefixes/**/*.{js,ts,jsx,tsx}", // 👈 importante
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};


```

---

## 📦 Basic usage

```tsx
"use client"
import { PhoneInputPrefixes } from "react-phone-input-prefixes";

export default function App() {
  const [phone, setPhone] = useState("");

  return (
    <div className="p-4">
      <PhoneInputPrefixes
        value={phone}
        onChange={(value, code) => console.log(value, code)}
        countryDefault="co"
      />
    </div>
  );
}
```

---

## 🎨 Customization

```tsx
"use client"
import { PhoneInputPrefixes } from "react-phone-input-prefixes";

export default function Home() {
  const [phone, setPhone] = useState("");
  
  return (
    <div className="p-4">
      <PhoneInputPrefixes
        label="Teléfono"
        value={phone}
        onChange={(value, code) => {
          console.log("Teléfono:", value, "Código:", code);
          setPhone(value);
        }}
        enableSearch={true}
        countryDefault="CO"
        countries={[
          { iso: "co", code: "+57", name: "Colombia" },
          { iso: "us", code: "+1", name: "Estados Unidos" }
        ]}
        placeholder="Ingresa tu número"
        inputProps={{
          name: "phone",
          required: true,
          autoFocus: true
        }}
        inputStyle={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px"
        }}
        containerStyle={{
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}
      />
    </div>
  );
}
```

---

## 📦 Props

| Prop            | Tipo                                              | Descripción                                                    |
|-----------------|---------------------------------------------------|----------------------------------------------------------------|
| `value`         | `string`                                          | Valor del número de teléfono.                                  |
| `onChange`      | `(value: string, countryCode: string) => void`    | Callback que retorna el número y el código de país.            |
| `countries`     | `Country[]`                                       | Lista adicional de países soportados.                          |
| `onlyCountries` | `string[]`                                        | ISO de países permitidos (ej: `["co","us"]`).                  |
| `countryDefault`| `string`                                          | ISO del país por defecto.                                      |
| `label`         | `string`                                          | Texto de la etiqueta del input.                                |
| `placeholder`   | `string`                                          | Placeholder del input.                                         |
| `inputStyle`    | `React.CSSProperties`                             | Estilos personalizados para el input.                          |
| `containerStyle`| `React.CSSProperties`                             | Estilos personalizados para el contenedor general.             |
| `enableSearch`  | `boolean`                                         | Habilita la búsqueda en el popover de países.                  |
| `inputProps`    | `React.InputHTMLAttributes<HTMLInputElement>`     | Props adicionales que se pasan directamente al `<input>`.      |


---

## 🌐 Default countries

Por defecto incluye:

- 🇨🇴 Colombia (+57)
- 🇺🇸 Estados Unidos (+1)
- 🇵🇪 Perú (+51)
- 🇲🇽 México (+52)
- 🇦🇷 Argentina (+54)
- 🇨🇱 Chile (+56)

...y más.

---

## 📄 License

MIT License

Copyright (c) 2025 César Navarro.
