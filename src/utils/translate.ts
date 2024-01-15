export class MsgTranslate<T> {
  isNotEmpty = (prop: keyof T) => `${prop as string} não pode ser vazio`;

  maxLength = (prop: keyof T, len: number) =>
    `${prop as string} pode conter no máximo ${len} caracteres`;

  minLength = (prop: keyof T, len: number) =>
    `${prop as string} deve conter no mínimo ${len} caracteres`;

  isString = (prop: keyof T) => `${prop as string} deve ser do tipo string`;

  isNumber = (prop: keyof T) => `${prop as string} deve ser do tipo númerico`;

  isBoolean = (prop: keyof T) => `${prop as string} deve ser do tipo booleano`;

  isDateString = (prop: keyof T) =>
    `${prop as string} deve ser uma string padrão ISO8601`;

  isOptional = (prop: keyof T) => `${prop as string} é opcional`;
}
