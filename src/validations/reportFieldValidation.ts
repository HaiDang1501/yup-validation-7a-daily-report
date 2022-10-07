import { ReportField } from './../@types/interface';
import * as yup from 'yup';
import { Types } from '../@types';
import { userSchema } from './userValidation';
const {
  TEXT,
  CHECK_BOX,
  RADIO_BUTTON,
  POSITIVE_NUMBER,
  NEGATIVE_NUMBER,
  DATE_TIME,
  SELECT,
  ARRAY,
  OBJECT,
  MULTI_SELECT,
  MULTI_CHECKBOX,
} = Types;
const optionSchema = yup.object().shape({
  id: yup.string(),
  value: yup.string(),
  name: yup.string(),
});
export const reportFieldSchema = yup.object().shape({
  title: yup.string().trim(),
  propName: yup.string().required(),
  type: yup
    .mixed()
    .oneOf([
      TEXT,
      CHECK_BOX,
      RADIO_BUTTON,
      POSITIVE_NUMBER,
      NEGATIVE_NUMBER,
      DATE_TIME,
      SELECT,
      ARRAY,
      OBJECT,
      MULTI_SELECT,
      MULTI_CHECKBOX,
    ]),
  // propName: yup.array().of(yup.object().concat(optionSchema)).required().min(1), //yup nhan gia tri 1, 2
  index: yup.number().positive(),
  isRequired: yup.boolean(),
  children: yup.array(yup.object()),
  options: yup.array().of(yup.object().concat(optionSchema)),
});
// interface Report extends yup.InferType<typeof reportFieldSchema>{}
// type Report = yup.InferType<typeof reportFieldSchema>;
function getOptionsSchema(field: ReportField): any {
  let result = yup
    .array()
    .of(yup.mixed().oneOf(field.options.map((v) => v.value)))
    .strict();
  if (field.isRequired) {
    result = result.min(1);
  }
  return result;
}
// type a = yup.InferType<typeof reportFieldSchema>;
export function getValidateSchema(field: ReportField): any {
  let schema = null;
  switch (field.type) {
    case Types.POSITIVE_NUMBER:
      schema = yup.number().positive().strict();
      break;
    case Types.DATE_TIME:
      schema = yup.date();
      break;
    case Types.NEGATIVE_NUMBER:
      schema = yup.number().negative().strict();
      break;
    case Types.TEXT:
      schema = yup.string().trim().strict();
      break;
    case Types.SELECT:
      schema = yup
        .string()
        .oneOf(field.options.map((v) => v.value))
        .strict();
      break;
    case Types.RADIO_BUTTON:
      schema = yup
        .string()
        .oneOf(field.options.map((v) => v.value))
        .strict();
      break;
    case Types.MULTI_SELECT:
      schema = getOptionsSchema(field);
      break;
    case Types.MULTI_CHECKBOX:
      schema = getOptionsSchema(field);
      break;
    case Types.CHECK_BOX:
      schema = yup.bool().required();
      break;
    case Types.OBJECT:
      schema = yup.object(
        field.children
          .map((c) => getValidateSchema(c))
          .reduce((result, curr) => ({ ...result, ...curr }))
      );
      break;
    case Types.ARRAY:
      schema = yup.array().of(
        field.children
          .map((c) => getValidateSchema(c))
          .reduce((result, curr) => ({ ...result, ...curr })) ///  {[key: string]: yup}
      );
      if (field.isRequired) {
        schema.min(1);
      }
      break;
    default:
      throw Error();
  }
  if (field.isRequired === true) {
    schema = schema.required();
  }
  return {
    [field.propName]: schema,
  };
}

/// {name}, {age}, {namSinh}
/// {name: String}, {age: Number}, {nameSinh:  String}

/// {name: String, age: Number, nameSinh:  String}
// export function buildValidateSchema(fields: ReportField[]) {
//   return yup
//     .object()
//     .shape(
//       fields
//         .map((c) => getValidateSchema(c))
//         .reduce((result, curr) => ({ ...result, ...curr }))
//     );
// }

export function buildValidateSchema(fields: ReportField[]) {
  return yup
    .object()
    .shape(
      fields
        .map((c) => getValidateSchema(c))
        .reduce((result, curr) => ({ ...result, ...curr }))
    );
}
