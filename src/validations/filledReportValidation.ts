import * as yup from 'yup';

export const filledReportSchema = yup.object().shape({
  fillDate: yup.date().default(() => new Date()),
  value: yup.string(),
});
