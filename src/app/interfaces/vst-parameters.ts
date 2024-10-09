import { Parameter } from './parameter';

export interface VstParameters {
  vstName: string;
  type: string;
  parts: string[];
  parameters: Parameter[];
  linkPartParam: any[][];
}
