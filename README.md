# React Simple Validation
inspired by react hook form and props name and rewritten in a simple way.

it can be used for both react native and reactjs.

Don't hesitate to give me a star.

## Why don't use react-hook-form
I had some problems in react-hook-form and I couldn't handle it, and I decided to write my own. The library is in its basic form, simple and has the same basic features as the hook-form side.
I'm just referencing the props name so that I don't have to think about naming and to be able to think of the cases this library needs to handle. But I don't use their code.
You can also fork back and edit as you like.

Don't hesitate to give me a star.

## Usage:
```
import React, { useState } from 'react';
import useForm from './Form';
import Field from './Field';
import Input from './Input';
import { joiResolver } from './utils';

const schema = Joi.object({
  userName: Joi.string()
    .min(5)
    .max(10)
    .required()
    .messages({
      "string.base": `"username" should be a type of 'text' joiiiii`,
      "string.empty": `"username" cannot be an empty field joiiiii`,
      "string.min": `"username" should have a minimum length of {#limit} joiiiii`,
      "string.max": `"username" should have a maximum length of {#limit} joiiiii`,
      "any.required": `"username" is a required field joiiiii`
    }),
  displayName: Joi.string().min(5)
    .max(10)
    .required()
    .messages({
      "string.base": `"displayName" should be a type of 'text' joiiiii`,
      "string.empty": `"displayName" cannot be an empty field joiiiii`,
      "string.min": `"displayName" should have a minimum length of {#limit} joiiiii`,
      "string.max": `"displayName" should have a maximum length of {#limit} joiiiii`,
      "any.required": `"displayName" is a required field joiiiii`
    })
    .custom((value, helper) => {
      if (value.length < 8) {
        return helper.message("lastName must be at least 8 characters long");
      } else {
        return true;
      }

    }),
  book: Joi.array().min(1),
});

function App() {
    // const control = useForm({ validationSchema: joiResolver(schema) }); // use with joi validation
  const control = useForm();
  const { errors, handleSubmit, setValue, values, register } = control;
  console.log('control', control?.values);

  const onSubmit = (values) => {
    console.log('submit', values);
  };

  // const onChangeIp2 = (ev) => setValue('password', ev.target.value, { shouldValidate: false });
  const onChangeIp2 = (ev) => setValue('password', ev.target.value);

  // we have 2 ways to use with component: use Field or register()

  return (
    <div className="App">
      <Field
        name='userName'
        control={control}
        rules={{
          required: true,
          min: 15,
          max: 20,
          validate: (value) => value?.length > 5 ? 'Length is over 5 letter' : null
        }}
      >
        {({ onChange, value = '', name }) => (
          <Input
            control={control}
            onChange={onChange}
            value={value}
            errors={errors}
            name={name}
            title='User name' />
        )}
      </Field>

      <div>
        <div>Display Name</div>
        <input {...register('displayName', { required: true, })} />
        <div>{errors?.displayName}</div>
      </div>

      <div>
        <div>Password</div>
        <input {...register('password', { required: true, })} onChange={onChangeIp2} value={values?.password || ''} />
        <div>{errors?.password}</div>
      </div>
      <div onClick={handleSubmit(onSubmit)}>onSubmit</div>
    </div>
  );
}

export default App;
```
