export const validateField = (name, val, rules) => {
  let error = null;
  if (rules?.required) {
    error = !val && `Field ${name} is required`;
  }

  if (rules?.pattern) {
    error = !rules?.pattern.test(val) && `Field ${name} is invalid`;
  }

  if (!error && rules?.min && rules?.max) {
    error = (Number(val) < rules?.min || Number(val) > rules?.max) && `Field ${name} must be between ${rules?.min} and ${rules?.max}`;
  }

  if (!error && rules?.min) {
    error = Number(val) < rules?.min && `Field ${name} is too short`;
  }

  if (!error && rules?.max) {
    error = Number(val) > rules?.max && `Field ${name} is too long`;
  }

  if (!error && rules?.minLength && rules?.maxLength) {
    error = (val?.length < rules?.minLength || val?.length > rules?.maxLength) && `Field ${name} must be between ${rules?.minLength} and ${rules?.maxLength}`;
  }

  if (!error && rules?.minLength) {
    error = val?.length < rules?.minLength && `Field ${name} is too short`;
  }

  if (!error && rules?.maxLength) {
    error = val?.length > rules?.maxLength && `Field ${name} is too long`;
  }


  if (!error && rules?.validate) {
    error = rules?.validate?.(val);
  }

  return error;
};