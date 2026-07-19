import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  nombreRemoto: string;
}

interface State {
  huboError: boolean;
}

export class RemoteErrorBoundary extends Component<Props, State> {
  state: State = { huboError: false };

  static getDerivedStateFromError(): State {
    return { huboError: true };
  }

  componentDidCatch(error: Error) {
    console.error(`No se pudo cargar el micro-frontend "${this.props.nombreRemoto}":`, error);
  }

  render() {
    if (this.state.huboError) {
      return (
        <div role="alert" style={{ padding: '1rem', border: '1px solid #e57373', borderRadius: 8 }}>
          <strong>No se pudo cargar "{this.props.nombreRemoto}".</strong>
          <p>El servicio puede estar caído o no ser accesible en este momento. Intenta de nuevo más tarde.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
