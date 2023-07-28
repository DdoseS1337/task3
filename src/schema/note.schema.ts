import * as yup from 'yup';

export const noteSchema = yup.object().shape({
  name: yup.string().required(),
  date: yup.date().required(),
  category: yup.string().required(),
  content: yup.string().required(),
});

export const updateNoteSchema = yup.object().shape({
  name: yup.string(),
  date: yup.date(),
  category: yup.string(),
  content: yup.string(),
});
