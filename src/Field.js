import React, { Fragment, useEffect } from 'react';

export default function Field({ control, name, rules, children, defaultValue }) {
  const { register, setValue } = control;
  useEffect(() => {
    register(name, rules, defaultValue);
    defaultValue && setValue(name, defaultValue);
  }, []);

  const value = control?.values?.[name];
  const onChange = control?.onChange(name, rules);
  const onBlur = control?.onBlur(name, rules);
  return (
    <Fragment>
      {children?.({ onChange, value, name, onBlur })}
    </Fragment>
  );
}
