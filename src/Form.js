import React, { useState } from 'react';
import { removeEmpty, omit, omitSingle } from './utils';
import { validateField } from './Validate';

//https://replit.com/@hungdev/joi-v17#index.js

export default function Controller({ validationSchema, defaultValues = {} } = {}) {
  const [values, setValues] = useState(defaultValues);
  const [rules, setRules] = useState({});
  const [errors, setErrors] = useState({});


  const register = (name, fieldRules, defaultValue) => {
    !values?.hasOwnProperty(name) && setValues(prev => ({ ...prev, [name]: defaultValue }));
    !rules?.hasOwnProperty(name) && setRules(prev => ({ ...prev, [name]: fieldRules || {} }));

    return ({
      value: values?.[name] || '',
      onChange: (event) => onChangeField?.(name, fieldRules, event?.target?.value),
      onBlur: (event) => onChangeField?.(name, fieldRules, event?.target?.value),
    });
  };

  const unRegister = (name) => {
    if (typeof name === 'string') {
      setValues(({ name, ...prev }) => ({ ...prev }));
    }
    if (Array.isArray(name)) {
      setValues(prev => omit(prev, name));
    }
  };


  const onValidate = (name, val, fieldRules) => {
    const error = validationSchema ? validationSchema?.resolve({ [name]: val })?.getFilteredErrors(name) : validateField(name, val, fieldRules);
    setErrors(prev => removeEmpty({ ...prev, [name]: error }));
  };

  const onChange = (name, fieldRules) => (value) => onChangeField(name, fieldRules, value);

  const onChangeField = (name, fieldRules, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    onValidate(name, value, fieldRules);
  };

  const setValue = (name, value, conditions = { shouldValidate: true }) => {
    // TODO: conditions
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    conditions?.shouldValidate && onValidate(name, value, rules?.[name]);
  };

  const getValues = (name) => name ? values?.[name] : values;

  const handleSubmit = (cb) => () => {
    Object.keys(values).forEach(name => {
      onValidate(name, values[name], rules[name]);
    });

    if (Object.values(errors).every(v => !v)) {
      cb(values);
    }
  };

  const setError = (name, error) => setErrors(prev => ({ ...prev, [name]: error }));

  const getError = (name) => errors?.[name];

  const clearError = (name) => setErrors(prev => {
    const newErrors = { ...prev };
    delete newErrors[name];
    return newErrors;
  });

  const reset = (obj = {}) => {
    setValues(prev => defaultValues || ({ ...Object.keys(prev).reduce((acc, name) => ({ ...acc, [name]: '' }), {}), ...obj }));
    setErrors({});
  };

  const trigger = (conditions) => {
    if (typeof conditions === 'string') {
      onValidate(conditions, values[conditions], rules[conditions]);
    } else if (Array.isArray(conditions)) {
      conditions.forEach(name => onValidate(name, values[name], rules[name]));
    } else {
      Object.keys(values).forEach(name => onValidate(name, values[name], rules[name]));
    }
  };


  return ({
    register, unRegister,
    values, setValue, getValues,
    errors, setErrors, setError, getError, clearError,
    reset, trigger,
    onChange, onBlur: onChange, handleSubmit,
  });
};