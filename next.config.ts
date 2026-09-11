import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // La home dell'utente contiene un package-lock.json: fissiamo la root
  // del workspace alla cartella del progetto.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
