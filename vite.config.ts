import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import browserslistToEsbuild from 'browserslist-to-esbuild';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Change the build from 'dist' to 'build',
    target: browserslistToEsbuild(['>0.2%', 'not dead', 'not op_mini all']),
    rollupOptions: {
      external: ['jspdf', 'jspdf-autotable'],
    },
  },
})
