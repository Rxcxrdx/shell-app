import dynamic from 'next/dynamic';
import { RemoteErrorBoundary } from '../components/RemoteErrorBoundary';
import { loadRemoteWithFallback } from '../lib/loadRemote';

const ConsultaSaldo = dynamic(
  () => loadRemoteWithFallback(() => import('consultas/ConsultaSaldo'), 'consultas'),
  {
    ssr: false,
    loading: () => <p>Cargando micro-frontend de consultas...</p>,
  }
);

export default function HomePage() {
  return (
    <RemoteErrorBoundary nombreRemoto="consultas">
      <ConsultaSaldo />
    </RemoteErrorBoundary>
  );
}
