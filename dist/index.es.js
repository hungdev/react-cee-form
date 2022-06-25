import e,{useState as t,useEffect as r,Fragment as n}from"react";const a=e=>({result:[],resolve:function(t){const{error:r}=e.validate(t,{abortEarly:!1});if(r)return this.result=r.details.map((({message:e,path:t})=>({message:e,path:t.join(".")}))),this},getFilteredErrors:function(e){return this.result.find((t=>t?.path===e))?.message}});function s({validationSchema:e,defaultValues:r={}}={}){const[n,a]=t(r),[s,l]=t({}),[i,o]=t({}),u=(t,r,n)=>{const a=e?e?.resolve({[t]:r})?.getFilteredErrors(t):((e,t,r)=>{let n=null;return r?.required&&(n=!t&&`Field ${e} is required`),r?.pattern&&(n=!r?.pattern.test(t)&&`Field ${e} is invalid`),!n&&r?.min&&r?.max&&(n=(Number(t)<r?.min||Number(t)>r?.max)&&`Field ${e} must be between ${r?.min} and ${r?.max}`),!n&&r?.min&&(n=Number(t)<r?.min&&`Field ${e} is too short`),!n&&r?.max&&(n=Number(t)>r?.max&&`Field ${e} is too long`),!n&&r?.minLength&&r?.maxLength&&(n=(t?.length<r?.minLength||t?.length>r?.maxLength)&&`Field ${e} must be between ${r?.minLength} and ${r?.maxLength}`),!n&&r?.minLength&&(n=t?.length<r?.minLength&&`Field ${e} is too short`),!n&&r?.maxLength&&(n=t?.length>r?.maxLength&&`Field ${e} is too long`),!n&&r?.validate&&(n=r?.validate?.(t)),n})(t,r,n);o((e=>{return r={...e,[t]:a},Object.keys(r).filter((e=>void 0!==r[e]&&null!==r[e]&&""!==r[e])).reduce(((e,t)=>({...e,[t]:r[t]})),{});var r}))},m=(e,t)=>r=>g(e,t,r),g=(e,t,r)=>{a((t=>({...t,[e]:r}))),u(e,r,t)};return{register:(e,t,r)=>(!n?.hasOwnProperty(e)&&a((t=>({...t,[e]:r}))),!s?.hasOwnProperty(e)&&l((r=>({...r,[e]:t||{}}))),{value:n?.[e]||"",onChange:r=>g?.(e,t,r?.target?.value),onBlur:r=>g?.(e,t,r?.target?.value)}),unRegister:e=>{"string"==typeof e&&a((({name:e,...t})=>({...t}))),Array.isArray(e)&&a((t=>{return r=t,n=e,Object.fromEntries(Object.entries(r).filter((([e])=>!n.includes(e))));var r,n}))},values:n,setValue:(e,t,r={shouldValidate:!0})=>{a((r=>({...r,[e]:t}))),r?.shouldValidate&&u(e,t,s?.[e])},getValues:e=>e?n?.[e]:n,errors:i,setErrors:o,setError:(e,t)=>o((r=>({...r,[e]:t}))),getError:e=>i?.[e],clearError:e=>o((t=>{const r={...t};return delete r[e],r})),reset:(e={})=>{a((t=>r||{...Object.keys(t).reduce(((e,t)=>({...e,[t]:""})),{}),...e})),o({})},trigger:e=>{"string"==typeof e?u(e,n[e],s[e]):Array.isArray(e)?e.forEach((e=>u(e,n[e],s[e]))):Object.keys(n).forEach((e=>u(e,n[e],s[e])))},onChange:m,onBlur:m,handleSubmit:e=>()=>{Object.keys(n).forEach((e=>{u(e,n[e],s[e])})),Object.values(i).every((e=>!e))&&e(n)}}}function l({control:t,name:a,rules:s,children:l,defaultValue:i}){const{register:o,setValue:u}=t;r((()=>{o(a,s,i),i&&u(a,i)}),[]);const m=t?.values?.[a],g=t?.onChange(a,s),h=t?.onBlur(a,s);return e.createElement(n,null,l?.({onChange:g,value:m,name:a,onBlur:h}))}export{l as Field,a as joiResolver,s as useForm};
