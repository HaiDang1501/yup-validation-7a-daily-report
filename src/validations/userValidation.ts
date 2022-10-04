import * as yup from 'yup';
import { User } from '../@types';

export const userSchema = yup.object().shape({
  name: yup
    .string()
    // .min(3, 'name at least ${min} characters')
    // .max(25, 'name can not exceed ${max} characters')
    .trim()
    .required(),
  // .matches(
  //   /^[a-z0-9A-Zà|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|ì|í|ị|ỉ|ĩ|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|ỳ|ý|ỵ|ỷ|ỹ|đ ]+$/i,
  //   'Username should contain alphabets and numbers only'
  // ),
  chucvu: yup.string().trim().required(),
  email: yup.string().trim().required().email(),
  passwordHash: yup
    .string()
    .min(8, 'password at least ${min} characters')
    .max(25, 'name can not exceed ${max} characters')
    .trim()
    .required()
    .matches(
      /^[a-z0-9]+$/i,
      'password should contain alphabets and numbers only'
    ),
  lastlogin: yup.date().default(() => new Date()),
  registerAt: yup.date().default(() => new Date()),
  array: yup.array().of(yup.string()).required().min(1),
});
