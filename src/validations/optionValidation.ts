import { formUser, ReportField } from './../@types/interface';
import { Types } from './../@types/enum';
import * as yup from 'yup';
import { OptionValue } from '../@types';

const { MULTI_SELECT, MULTI_CHECKBOX } = Types;
// function getOptionsSchema(field: formUser): any {
//   let result = yup
//     .array()
//     .of(yup.mixed().oneOf(field.options.map((v) => v.value)));
//   return result;
// }
export const optionSchema = yup.object().shape({
  propName: yup.string().required(),
  type: yup.mixed().oneOf([MULTI_SELECT, MULTI_CHECKBOX]),
  options: yup.array().of(
    yup.object().shape({
      name: yup.string(),
      value: yup.string().required(),
    })
  ),
  // value: yup.array().of(yup.mixed().oneOf(field.options.map((v) => v.value))),
});
