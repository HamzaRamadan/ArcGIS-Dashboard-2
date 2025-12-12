/* eslint-disable @typescript-eslint/no-explicit-any */
// types.ts
export type Nullable<T> = T | null;

export interface Project {
  Name: string;
  Class?: number;
  Stage?: number;
  Type?: number;
  Year?: number;
  Size?: string;
  Inspection?: string;
  [key: string]: any;
}

export interface Stats {
  total: number;
  completed: number;
  underConstruction: number;
  pending: number;
}

export interface NationwideData {
  population: number[];
  agingIndex: number[];
  gdp: number[];
}
