import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// PORT lets Agent Studio run one copy per ticket side by side.
const port = Number(process.env.PORT) || 5173;

export default defineConfig({
  plugins: [react()],
  server: { port, strictPort: true },
});
