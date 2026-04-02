import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        shell: '#112742',
        shellTop: '#203a63',
        sidebar: '#132845',
        panel: '#0d1118',
        panelBorder: '#26344e',
        mutedText: '#91a0b8',
        primaryText: '#f3f5f8',
        accentBlue: '#4f8cff',
        accentRed: '#f1647a',
        accentYellow: '#f3bf3d',
      },
      boxShadow: {
        panel: '0 10px 28px rgba(0, 0, 0, 0.16)',
      },
      borderRadius: {
        panel: '20px',
      },
    },
  },
  plugins: [],
};

export default config;
