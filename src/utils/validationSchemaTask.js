import * as yup from 'yup';

const VALIDATION_SCHEMA_TASK = yup.object({
  name: yup
    .string()
    .required('Task name is required')
    .min(10, 'Task name must be at least 10 characters')
    .max(23, 'Task name cannot exceed 23 characters'),

  lastDateToRealization: yup
    .date()
    .required('Date is required')
    .min(new Date(), 'Date cannot be in the past')
});

export default VALIDATION_SCHEMA_TASK;
