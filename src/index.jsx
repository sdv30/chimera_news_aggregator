import React from "react";
import { createRoot } from "react-dom/client";
import App from './App.jsx';
import './styles/index.css';
import './styles/tailwind.css';
import './i18n/config.js';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);