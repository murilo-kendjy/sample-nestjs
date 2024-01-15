export const queryOne = <T>(val: T[]): T => (val.length ? val[0] : undefined);
