# React Cee Form
Inspired by react hook form and props name and rewritten in a simple way.

It can be used for both React Native and ReactJs.

Don't hesitate to give me a star.

[Online Demo codesandbox](https://codesandbox.io/s/react-cee-form-example-6b3x29?file=/src/App.js)

## Why don't use react-hook-form
I had some problems in react-hook-form and I couldn't handle it, and I decided to write my own. The library is in its basic form, simple and has the same basic features as the hook-form side.
I'm just referencing the props name so that I don't have to think about naming and to be able to think of the cases this library needs to handle. But I don't use their code.
You can also fork back and edit as you like.

Don't hesitate to give me a star.

## Install
```js
npm install react-cee-form --save
```

## Usage:
```javascript
import React, { useState } from 'react';
import { useForm, Field, joiResolver } from 'react-cee-form';
import Input from './Input';

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

## API

### useForm
useForm is custom hook, it manages the form state and the form control.

```js
import { useForm, joiResolver } from 'react-cee-form';

useForm({
  validationSchema: joiResolver(schema), // use with joi validation
  defaultValues: {}
});
```

### Field
Field is a component that manages the form control. It wraps the component and the error message.

For react native need it to control your component.

It has some props:
- name: the name of the field. The form will use this name to set the value to the form control.
- control: the control object that manages the form state and the form control
- rules: the validation rules. 

**List of validation rules supported:**
- required: true/false or `{value: true/false, message: 'error message'}`
- min: number or `{value: number, message: 'error message'}`
- max: number or `{value: number, message: 'error message'}`
- minLength: number or `{value: number, message: 'error message'}`
- maxLength: number or `{value: number, message: 'error message'}`
- pattern: string or `{value: string, message: 'error message'}`
- validate: function that returns a string or null

Children is a function that returns the component. It receives the props:
- onChange: function that handles the change event, it sets value to the form control.
- value: the value of the component.
- name: the name of the component.
- onBlur: function that handles the blur event, it validates the component.

> 

```js
import { Field, useForm } from 'react-cee-form';

<Field
    name='fieldName'
    control={control}
    rules={{
      required: true,
      min: 15,
      max: 20,
      validate: (value) => {}
    }}
  >
    {({ onChange, value = '', name, onBlur }) => (
      <Input
        control={control}
        onChange={onChange}
        value={value}
        errors={errors}
        name={name}
        title='' />
    )}
</Field>
```

### Validation:
Beside using the validation rules, you can use the validation function. Now we support schema-based form validation with [Joi Validation](https://joi.dev/)


For example:
```js
import { useForm, joiResolver } from 'react-cee-form';
import Joi from 'joi';

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


const control = useForm({ validationSchema: joiResolver(schema) }); 
```


### Properties

```js
const { errors, handleSubmit, setValue, values, register, ...restProps } = useForm();
```

#### register: 
register the field to the form control

```
register(fieldName, fieldRules, defaultValue)
```

#### unRegister: 
unRegister the field from the form control

```
unRegister(fieldName)
```

#### setValue: 
set the value of the field

```
setValue(fieldName, value, conditions = { shouldValidate: true })
```

#### values: 
the values of the form

#### getValues: 
get the values of the form

```
getValues(fieldName)
```

#### errors: 
the errors of the form

#### setError: 
set the errors of the form

```
setError(fieldName, error)
```

#### getError: 
get the errors of the form

```
getError(fieldName)
```

#### clearError: 
clear the errors of the form

```
clearError(fieldName)
```

#### reset: 
reset the form

```
reset({fieldName: value, ...})
```

#### trigger: 
trigger to validate one or more fields

```
trigger([fieldName, ...])
```

#### handleSubmit: handle the submit event, it needs to wrap onClick event of the submit button.

```
const onSubmit = (values) => {
  console.log('submit', values);
}

handleSubmit(onSubmit)
```