import { string } from 'yup';
import { Types } from './enum';

export interface User {
  name?: string;
  passwordHash?: string;
  email?: string;
  registerAt?: Date | string | null;
  lastlogin?: Date | string | null;
  chucvu?: string;
  array: string[];
}

export interface Role {
  name: string;
}

export interface ReportField {
  title: string;
  propName: string;
  type: Types;
  index: number;
  isRequired: boolean;
  children: ReportField[];
  options: OptionValue[]; // {value: '1'}, {value: '2'}
}
//{''}
export interface Option {
  id: string;
  name?: string;
  child: OptionValue[];
}
export interface OptionValue {
  id: string;
  name?: string;
  value?: string;
}
export interface ReportType {
  name: string;
  value?: any;
}

export interface FilledReport {
  fillDate: Date | string;
  value: string;
}
export interface formUser {
  type: Types;
  propName: string;
  name: string;
  options?: OptionValue[];
  children?: formUser[];
  isRequired: boolean;
}
