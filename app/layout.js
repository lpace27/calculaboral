import './globals.css';
import { ThemeProvider } from '../components/Theme';
import Nav, { Footer } from '../components/Nav';

export const metadata = {
  title: {
    default: 'CALCULABORAL — Calculadoras laborales e impositivas argentinas',
    template: '%s | CALCULABORAL',
  },
  description: 'Sin publicidad. Sin registro. Sin vueltas. Calculadoras gratuitas de sueldo neto, monotributo, vacaciones y liquidación final. Valores actualizados 2026.',
  keywords: ['calculadora sueldo neto', 'sueldo bruto a neto', 'monotributo 2026', 'calculadora vacaciones', 'liquidación final', 'argentina'],
  openGraph: {
    title: 'CALCULABORAL — Calculadoras laborales argentinas',
    description: 'Herramientas gratuitas para trabajadores, contadores y empleadores argentinos. Valores actualizados al 1er semestre 2026.',
    url: 'https://calculaboral.com.ar',
    siteName: 'CALCULABORAL',
    locale: 'es_AR',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider>
          <Nav />
          <main style={{ maxWidth: "960px", margin: "0 auto", padding: "8px 20px 48px", animation: "fadeUp .3s ease both" }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
