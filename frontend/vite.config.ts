import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Need to expose ports to outside connections to be able to connect to the docker instance
const shouldExposePorts = process.env.EXPOSE_PORTS === "true";

const configurationToExposePorts = {
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ...(shouldExposePorts ? configurationToExposePorts : {}),
});
