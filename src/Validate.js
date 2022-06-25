
export const validateField = (name, val, rules) => {
  let error = null;
  // required
  if (rules?.required) {
    let condition = rules?.required?.value || rules?.required;
    let message = rules?.required?.message || `Field ${name} is required`;
    error = !val && condition && message;
  }

  // pattern
  if (rules?.pattern) {
    let condition = rules?.pattern?.value || rules?.pattern;
    let message = rules?.pattern?.message || `Field ${name} is invalid`;
    error = val && !condition.test(val) && message;
  }

  // min & max
  if (!error && rules?.min && rules?.max) {
    let minCondition = rules?.min?.value || rules?.min;
    let maxCondition = rules?.max?.value || rules?.max;
    error = (Number(val) < minCondition || Number(val) > maxCondition) && `Field ${name} must be between ${minCondition} and ${maxCondition}`;
  }

  // min
  if (!error && rules?.min) {
    let condition = rules?.min?.value || rules?.min;
    let message = rules?.min?.message || `Field ${name} is smaller than ${condition}`;
    error = val && Number(val) < condition && message;
  }

  // max
  if (!error && rules?.max) {
    let condition = rules?.max?.value || rules?.max;
    let message = rules?.max?.message || `Field ${name} is higher than ${condition}`;
    error = val && Number(val) > condition && message;
  }

  // minLength & maxLength
  if (!error && rules?.minLength && rules?.maxLength) {
    let minLengthCondition = rules?.minLength?.value || rules?.minLength;
    let maxLengthCondition = rules?.maxLength?.value || rules?.maxLength;
    error = (val?.length < minLengthCondition || val?.length > maxLengthCondition) && `Field ${name} must be between ${minLengthCondition} and ${maxLengthCondition}`;
  }

  // minLength
  if (!error && rules?.minLength) {
    let condition = rules?.minLength?.value || rules?.minLength;
    let message = rules?.minLength?.message || `Field ${name} is too short`;
    error = val?.length < condition && message;
  }

  // maxLength
  if (!error && rules?.maxLength) {
    let condition = rules?.maxLength?.value || rules?.maxLength;
    let message = rules?.maxLength?.message || `Field ${name} is too long`;
    error = val?.length > condition && message;
  }

  // validate
  if (!error && rules?.validate) {
    error = rules?.validate?.(val);
  }

  return error;
};