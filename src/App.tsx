import './App.css';
import { formUser as FormField, ReportField, Types, User } from './@types';
import { userSchema } from './validations/userValidation';
import {
  reportFieldSchema,
  getValidateSchema,
  buildValidateSchema,
} from './validations/reportFieldValidation';
import * as yup from 'yup';
import { number } from 'yup/lib/locale';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { optionSchema } from './validations/optionValidation';
function App() {
  // const dataUser: User = {
  //   name: 'aaaa',
  //   email: '    abc@gmail.comcaca',
  //   chucvu: 'abv',
  //   lastlogin: new Date(),
  //   passwordHash: '12accaaa ',
  //   registerAt: '2/15/2021',
  //   array: ['2'],
  // };
  const {
    ARRAY,
    CHECK_BOX,
    DATE_TIME,
    MULTI_SELECT,
    NEGATIVE_NUMBER,
    OBJECT,
    POSITIVE_NUMBER,
    RADIO_BUTTON,
    SELECT,
    TEXT,
    MULTI_CHECKBOX,
  } = Types;
  const dataReportField: ReportField[] = [
    {
      type: OBJECT,
      propName: 'kipTruc',
      isRequired: true,
      children: [
        {
          type: POSITIVE_NUMBER,
          propName: 'hoTen',
          isRequired: true,
          children: [],
          options: [{
            value: '1',
            id: '',
          },
          {
            value: '2',
            id: '',
          },
          {
            value: 'true',
            id: '',
          },
        ],
          index: 1,
          title: '',
        },
        {
          type: DATE_TIME,
          propName: 'namSinh',
          isRequired: true,
          children: [],
          options: [],
          index: 1,
          title: '',
        },
      ],
      options: [],
      index: 1,
      title: '',
    },
  ];
  let a = buildValidateSchema(dataReportField);
  console.log(a);
  const filledReport: any = {
    kipTruc: {
      hoTen: -1,
      namSinh: '2011-10-05T14:48:00.000Z',
    },
  };

  // let b = buildValidateSchema(filledReport)
  // console.log(b);
  const valid = async () => {
    try {
      const isVaid = await a.validate(filledReport, { strict: false });
      console.log(isVaid);
    } catch (error) {
      console.log(error);
    }
  };
  valid();

  // ki???m tra ng?????i d??ng form v???i type
  // function getOptionsSchema(field: FormField): any {
  //   const options = field.options ?? [];
  //   let result = yup.array().of(yup.mixed().oneOf(options.map((v) => v.value)));
  //   return result;
  // }

  // function getValidateSchema(field: FormField): any {
  //   let schema = null;
  //   switch (field.type) {
  //     case Types.POSITIVE_NUMBER:
  //       schema = yup.number().positive();
  //       break;
  //     case Types.DATE_TIME:
  //       schema = yup.date();
  //       break;
  //     case Types.NEGATIVE_NUMBER:
  //       schema = yup.number().negative();
  //       break;
  //     case Types.TEXT:
  //       schema = yup.string();
  //       break;
  //     case Types.SELECT:
  //       schema = yup.string();
  //       break;
  //     case Types.RADIO_BUTTON:
  //       schema = yup.string();
  //       break;
  //     case Types.MULTI_SELECT:
  //       schema = getOptionsSchema(field);
  //       break;
  //     case Types.MULTI_CHECKBOX:
  //       schema = getOptionsSchema(field);
  //       break;
  //     case Types.CHECK_BOX:
  //       schema = yup.bool().required();
  //       break;
  //     case Types.OBJECT:
  //       schema = yup
  //         .object(
  //           (field?.children || [])
  //             .map((c) => getValidateSchema(c))
  //             .reduce((result, curr) => ({ ...result, curr }))
  //         )
  //         .nullable();
  //       break;
  //     case Types.ARRAY:
  //       schema = yup
  //         .array()
  //         .of(
  //           (field?.children || [])
  //             .map((c) => getValidateSchema(c))
  //             .reduce((result, curr) => ({ ...result, curr })) ///  {[key: string]: yup}
  //         )
  //         .nullable();
  //       if (field.isRequired) {
  //         schema.min(1);
  //       }
  //       break;
  //     default:
  //       throw Error();
  //   }
  //   if (field.isRequired === true) {
  //     schema = schema.required();
  //   }
  //   return schema;
  // }

  // const formConfig: FormField = {
  //   propName: 'trucNoi',
  //   name: 'Truc Noi',
  //   isRequired: true,
  //   type: Types.OBJECT,
  //   children: [
  //     {
  //       name: 'Ten',
  //       propName: 'name',
  //       isRequired: true,
  //       type: Types.TEXT,
  //     },
  //     {
  //       name: 'Ben Nhan',
  //       propName: 'benNhan',
  //       isRequired: true,
  //       type: Types.OBJECT,
  //       children: [
  //         {
  //           name: 'Name',
  //           propName: 'name',
  //           type: Types.TEXT,
  //           isRequired: true,
  //         },
  //       ],
  //     },
  //   ],
  // };
  // const optionSchema = yup.object().shape({
  //   propName: yup.string().required(),
  //   type: yup
  //     .mixed()
  //     .oneOf([
  //       TEXT,
  //       CHECK_BOX,
  //       RADIO_BUTTON,
  //       POSITIVE_NUMBER,
  //       NEGATIVE_NUMBER,
  //       DATE_TIME,
  //       SELECT,
  //       ARRAY,
  //       OBJECT,
  //       MULTI_SELECT,
  //       MULTI_CHECKBOX,
  //     ]),
  //   options: yup.array().of(
  //     yup.object().shape({
  //       name: yup.string(),
  //       value: yup.string().required(),
  //     })
  //   ),
  //   isRequired: yup.boolean(),
  //   children: yup.array(yup.object()),
  //   value: a,
  // });

  // const valid = async () => {
  //   try {
  //     // const isVaid = await buildValidateSchema(a);
  //     // const isVaid = await reportFieldSchema.validate(dataReportField);
  //     const isVaid = await optionSchema.validate(dataReportField);
  //     console.log(isVaid);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // valid();

  return <div className='App'></div>;
}

export default App;
