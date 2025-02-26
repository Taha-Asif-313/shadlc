# ShadLC - A Modern UI Library for React

**ShadLC** is a lightweight and customizable UI component library built for **React** with **Tailwind CSS**. It provides reusable and stylish components to speed up your development process while keeping your UI clean and modern.

---

## ✨ Features

- 📌 **Pre-styled & Customizable** – Components are designed with Tailwind CSS and can be customized easily.
- ⚡ **Lightweight & Fast** – Optimized for performance and smooth user experience.
- 🏗 **Reusable Components** – Copy-paste-ready components for quick integration.
- 🎨 **Theming Support** – Modify styles to match your brand identity.

---

## 🚀 Installation

To use **ShadLC** in your project, install it via npm:

```sh
npm install shadlc
```

or with Yarn:

```sh
yarn add shadlc
```

Make sure you have **Tailwind CSS** installed in your project. If not, install it:

```sh
npm install tailwindcss postcss autoprefixer
npx tailwindcss init
```

Then, configure your `tailwind.config.js` to include the library’s styles:

```js
module.exports = {
  content: [
    "./node_modules/shadlc/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

## 📚 Components Usage Template

### **Code Clipboard Component**

Easily copy code snippets with a click of a button.

#### 🔹 Usage

```tsx
import { CodeClipboard } from "shadlc";

const codeSnippet = `const hello = "Hello, World!";`;

const App = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Copy Code Example</h1>
      <CodeClipboard code={codeSnippet} />
    </div>
  );
};
```

#### 🔹 Features

- 📋 Click-to-copy button with a **clipboard icon**
- ✅ Shows "Copied!" confirmation message
- 🎨 Customizable styles & animations

---

## 🛠 Development & Contribution

If you want to contribute or customize the library:

1. Clone the repository:

   ```sh
   git clone https://github.com/Taha-Asif-313/shadlc.git
   cd shadlc
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Build the package for production:

   ```sh
   npm run build
   ```

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use and modify it as needed.

---

## 💬 Need Help?

If you have any questions or need support, feel free to [open an issue](https://github.com/your-username/shadlc/issues) or reach out via email.

