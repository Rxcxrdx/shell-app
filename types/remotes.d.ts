declare module 'consultas/ConsultaSaldo' {
  import { ComponentType } from 'react';
  interface ConsultaSaldoProps {
    cuentaId?: string;
  }
  const ConsultaSaldo: ComponentType<ConsultaSaldoProps>;
  export default ConsultaSaldo;
}

declare module 'reportes/TablaTransacciones' {
  import { ComponentType } from 'react';
  interface TablaTransaccionesProps {
    cuentaId?: string;
  }
  const TablaTransacciones: ComponentType<TablaTransaccionesProps>;
  export default TablaTransacciones;
}
