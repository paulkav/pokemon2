declare module 'next' {
  export interface PageProps<P = Record<string, unknown>, SP = Record<string, unknown>> {
    params: P;
    searchParams?: SP;
  }
}

declare module 'next/types' {
  export interface PageProps<P = Record<string, unknown>, SP = Record<string, unknown>> {
    params: P;
    searchParams?: SP;
  }
}
