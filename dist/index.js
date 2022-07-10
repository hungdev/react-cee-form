"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=t(e);const a=e=>Object.keys(e).filter((t=>void 0!==e[t]&&null!==e[t]&&""!==e[t]&&!1!==e[t])).reduce(((t,r)=>({...t,[r]:e[r]})),{}),n=(e,t,r)=>{let a=null;if(r?.required){let n=r?.required?.value||r?.required,l=r?.required?.message||`Field ${e} is required`;a=!t&&n&&l}if(r?.pattern){let n=r?.pattern?.value||r?.pattern,l=r?.pattern?.message||`Field ${e} is invalid`;a=t&&!n.test(t)&&l}if(!a&&r?.min&&r?.max){let n=r?.min?.value||r?.min,l=r?.max?.value||r?.max;a=(Number(t)<n||Number(t)>l)&&`Field ${e} must be between ${n} and ${l}`}if(!a&&r?.min){let n=r?.min?.value||r?.min,l=r?.min?.message||`Field ${e} is smaller than ${n}`;a=t&&Number(t)<n&&l}if(!a&&r?.max){let n=r?.max?.value||r?.max,l=r?.max?.message||`Field ${e} is higher than ${n}`;a=t&&Number(t)>n&&l}if(!a&&r?.minLength&&r?.maxLength){let n=r?.minLength?.value||r?.minLength,l=r?.maxLength?.value||r?.maxLength;a=(t?.length<n||t?.length>l)&&`Field ${e} must be between ${n} and ${l}`}if(!a&&r?.minLength){let n=r?.minLength?.value||r?.minLength,l=r?.minLength?.message||`Field ${e} is too short`;a=t?.length<n&&l}if(!a&&r?.maxLength){let n=r?.maxLength?.value||r?.maxLength,l=r?.maxLength?.message||`Field ${e} is too long`;a=t?.length>n&&l}return!a&&r?.validate&&(a=r?.validate?.(t)),a};exports.Field=function({control:t,name:a,rules:n,children:l,defaultValue:s,render:i}){const{register:u,setValue:o}=t;e.useEffect((()=>{u(a,n,s),s&&o(a,s)}),[]);const m=t?.values?.[a],g=t?.onChangeValue?.(a,n),d=t?.onBlur?.(a,n);return r.default.createElement(e.Fragment,null,l?.({onChange:g,value:m,name:a,onBlur:d})||i?.({onChange:g,value:m,name:a,onBlur:d}))},exports.joiResolver=e=>({result:[],resolve:function(t){const{error:r}=e.validate(t,{abortEarly:!1});if(r)return this.result=r.details.map((({message:e,path:t})=>({message:e,path:t.join(".")}))),this},getFilteredErrors:function(e){return this.result.find((t=>t?.path===e))?.message}}),exports.useForm=function({validationSchema:t,defaultValues:r={}}={}){const[l,s]=e.useState(r),[i,u]=e.useState({}),[o,m]=e.useState({}),g=(e,r,l)=>{const s=t?t?.resolve({[e]:r})?.getFilteredErrors(e):n(e,r,l);m((t=>a({...t,[e]:s})))},d=(e,t)=>r=>h(e,t,r),h=(e,t,r)=>{s((t=>({...t,[e]:r}))),g(e,r,t)};return{register:(e,t,r)=>(!l?.hasOwnProperty(e)&&s((t=>({...t,...!t?.hasOwnProperty(e)&&{[e]:r}}))),!i?.hasOwnProperty(e)&&u((r=>({...r,[e]:t||{}}))),{value:l?.[e]||"",onChange:r=>h?.(e,t,r?.target?.value),onBlur:r=>h?.(e,t,r?.target?.value)}),unRegister:e=>{"string"==typeof e&&s((({name:e,...t})=>({...t}))),Array.isArray(e)&&s((t=>{return r=t,a=e,Object.fromEntries(Object.entries(r).filter((([e])=>!a.includes(e))));var r,a}))},values:l,setValue:(e,t,r={shouldValidate:!0})=>{s((r=>({...r,[e]:t}))),r?.shouldValidate&&g(e,t,i?.[e])},getValues:e=>e?l?.[e]:l,errors:o,setErrors:m,setError:(e,t)=>m((r=>({...r,[e]:t}))),getError:e=>o?.[e],clearError:e=>m((t=>{const r={...t};return delete r[e],r})),reset:(e={})=>{s((t=>r||{...Object.keys(t).reduce(((e,t)=>({...e,[t]:""})),{}),...e})),m({})},trigger:e=>{"string"==typeof e?g(e,l[e],i[e]):Array.isArray(e)?e.forEach((e=>g(e,l[e],i[e]))):Object.keys(l).forEach((e=>g(e,l[e],i[e])))},onChangeValue:d,onBlur:d,handleSubmit:e=>()=>{Object.keys(l).forEach((e=>{g(e,l[e],i[e])})),(()=>{const e=Object.keys(l).reduce(((e,r)=>({...e,[r]:t?t?.resolve({[r]:l[r]})?.getFilteredErrors(r):n(r,l[r],i[r])})),{});return Object.keys(a(e))?.length})()||Object.values(o).every((e=>!e))&&e(l)}}};
