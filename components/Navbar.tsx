import Link from 'next/link';
import { useRouter } from 'next/router';

const linkBase: React.CSSProperties = {
  padding: '0.4rem 0.8rem',
  borderRadius: 6,
  textDecoration: 'none',
  color: '#4a5568',
  fontSize: '0.95rem',
};

const linkActive: React.CSSProperties = {
  ...linkBase,
  color: '#2b6cb0',
  backgroundColor: '#ebf8ff',
  fontWeight: 600,
};

export function Navbar() {
  const { pathname } = useRouter();

  return (
    <nav
      style={{
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        borderBottom: '1px solid #e2e8f0',
        fontFamily: 'sans-serif',
        backgroundColor: '#fff',
      }}
    >
      <strong style={{ marginRight: '0.5rem', color: '#1a202c' }}>POC Micro-Frontends</strong>
      <Link href="/" style={pathname === '/' ? linkActive : linkBase}>
        Consultas
      </Link>
      <Link href="/reportes" style={pathname === '/reportes' ? linkActive : linkBase}>
        Reportes
      </Link>
    </nav>
  );
}
