const requiredMsg = (prop: string) => `${prop} is a required property`;

const typeErrorMsg = (prop: string, type: string = 'string') =>
  `${prop} must be of type ${type}`;

const minMsg = (prop: string, min: number) =>
  `${prop} must have a min length of ${min}`;

const maxMsg = (prop: string, max: number) =>
  `${prop} must have a max length of ${max}`;

const matchesMsg = (prop: string, pattern: string) =>
  `${prop} must adhere to the following pattern: ${pattern}`;

export { requiredMsg, typeErrorMsg, minMsg, maxMsg, matchesMsg };
