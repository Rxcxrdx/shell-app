import dynamic from 'next/dynamic';
import { RemoteErrorBoundary } from '../components/RemoteErrorBoundary';
import { loadRemoteWithFallback } from '../lib/loadRemote';

const TablaTransacciones = dynamic(
  () => loadRemoteWithFallback(() => import('reportes/TablaTransacciones'), 'reportes'),
  {
    ssr: false,
    loading: () => <p>Cargando micro-frontend de reportes...</p>,
  }
);

export default function ReportesPage() {
  return (
    <RemoteErrorBoundary nombreRemoto="reportes">
      <TablaTransacciones />
    </RemoteErrorBoundary>
  );
}
