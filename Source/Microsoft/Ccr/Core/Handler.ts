export type Handler = () => void;
export type Handler1<T0> = ((parameter0: T0) => void) & Handler;
export type Handler2<T0, T1> = ((parameter0: T0, parameter1: T1) => void) & Handler & Handler1<T0>;
export type Handler3<T0, T1, T2> = ((parameter0: T0, parameter1: T1, parameter2: T2) => void) & Handler & Handler1<T0> & Handler2<T0, T1>;
