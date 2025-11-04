export interface loginInter {
  username: string;
  password: string;
}

interface dataInter {
  token?: string;
  message?: string;
}

export interface loginResInter {
  code: number;
  data: dataInter;
}
