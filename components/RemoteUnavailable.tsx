interface Props {
  nombreRemoto: string;
}

export default function RemoteUnavailable({ nombreRemoto }: Props) {
  return (
    <div role="alert" style={{ padding: '1rem', border: '1px solid #e57373', borderRadius: 8 }}>
      <strong>No se pudo cargar &quot;{nombreRemoto}&quot;.</strong>
      <p>El servicio puede estar caído o no ser accesible en este momento. Intenta de nuevo más tarde.</p>
    </div>
  );
}
