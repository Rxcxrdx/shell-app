import type { AppProps } from 'next/app';
import { Navbar } from '../components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      <Navbar />
      <main style={{ padding: '1.5rem' }}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
