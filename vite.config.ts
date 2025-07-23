// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  // A linha mais importante é esta: 'base'
  // Substitua 'nome-do-seu-repositorio' pelo nome do seu repositório no GitHub.
  // Exemplo: se o seu repositório se chama 'my-ocr-app', a linha deve ser:
  // base: '/my-ocr-app/',
  base: '/Transcrever/', 
});