export const requiredField = value => value ? undefined : "The field is required";

const maxLength = max => value =>
    (value && value.length) > max ? `Must be ${max} characters or less` : undefined;

export const maxLength15 = maxLength(15);