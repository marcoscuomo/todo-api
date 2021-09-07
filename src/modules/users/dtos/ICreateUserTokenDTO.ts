interface ICreateUserTokenDTO {
  // eslint-disable-next-line camelcase
  user_id: string;
  expiresDate: Date;
  refreshToken: string;
}

export { ICreateUserTokenDTO }
