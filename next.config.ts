import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // 75 é o padrão do Next. 90 é usado nas fotografias com rosto, onde o
    // artefato de compressão aparece na pele; qualquer `quality` fora desta
    // lista é recusado pelo otimizador.
    qualities: [75, 90],
  },
};

export default nextConfig;
