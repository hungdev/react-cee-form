
export const removeEmpty = (obj) => {
  return Object.keys(obj)
    .filter((k) => obj[k] !== undefined && obj[k] !== null && obj[k] !== '')
    .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});
};

export const omit = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));

export const omitSingle = (key, { [key]: _, ...obj }) => obj;

export const joiResolver = (schema) => {
  return {
    result: [],
    resolve: function (source) {
      const { error } = schema.validate(source, { abortEarly: false });
      if (error) {
        this.result = error.details.map(({ message, path }) => ({
          message,
          path: path.join('.')
        }));
        return this;
      }
    },
    getFilteredErrors: function (fieldName) {
      return this.result.find((ele) => ele?.path === fieldName)?.message;
    }
  };
};