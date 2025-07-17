declare module '@components/*' {
  import { ComponentType } from 'react';
  const component: ComponentType;
  export default component;
}

declare module '@assets/*' {
  import { ComponentType } from 'react';
  const component: ComponentType;
  export default component;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}