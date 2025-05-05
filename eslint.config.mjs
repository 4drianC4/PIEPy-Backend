import js from "@eslint/js";
import globals from "globals";

export default [
  {
    // Configuración base para todos los archivos JS
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node, // Agrega variables globales de Node.js
        ...globals.jest // Si usas Jest
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      // Tus reglas personalizadas aquí
      "no-console": "warn",
      "semi": ["error", "always"]
    }
  },
  {
    // Configuración específica para tests
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  }
];