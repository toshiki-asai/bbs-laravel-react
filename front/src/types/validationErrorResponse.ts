export type ValidationErrorResponse = {
  errors: {
    [key: string]: string; // 例: { email: ["メールアドレス形式が不正です"] }
  };
}
