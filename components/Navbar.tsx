import Link from 'next/link';

export function Navbar() {
  return (
    <nav
      style={{
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        borderBottom: '1px solid #ddd',
        fontFamily: 'sans-serif',
      }}
    >
      <strong>POC Micro-Frontends</strong>
      <Link href="/">Consultas</Link>
      <Link href="/reportes">Reportes</Link>
    </nav>
  );
}
