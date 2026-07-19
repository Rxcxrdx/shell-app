import { ComponentType } from 'react';
import RemoteUnavailable from '../components/RemoteUnavailable';

type RemoteModule = { default: ComponentType<any> };

export function loadRemoteWithFallback(
  loader: () => Promise<RemoteModule>,
  nombreRemoto: string,
  timeoutMs = 6000
): Promise<RemoteModule> {
  const fallback: RemoteModule = {
    default: () => <RemoteUnavailable nombreRemoto={nombreRemoto} />,
  };

  const cargaRemoto = Promise.resolve()
    .then(() => loader())
    .then((mod) => (mod && mod.default ? mod : fallback))
    .catch(() => fallback);

  const timeout = new Promise<RemoteModule>((resolve) => {
    setTimeout(() => resolve(fallback), timeoutMs);
  });

  return Promise.race([cargaRemoto, timeout]);
}
