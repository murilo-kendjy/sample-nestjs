export interface IToken {
  sub: number;
  username: string;
}

export class TokenEntity implements IToken {
  sub: number;
  username: string;
}
