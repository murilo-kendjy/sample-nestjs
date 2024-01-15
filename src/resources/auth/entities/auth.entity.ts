export interface IToken {
  sub: string;
  name: string;
  role: string;
}

export class TokenEntity implements IToken {
  sub: string;
  name: string;
  role: string;
}
