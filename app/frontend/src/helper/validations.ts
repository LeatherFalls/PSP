export const validatePassword = (password: string): boolean => {
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return (passRegex.test(password));
};

export const validateName = (username: string): boolean => {
  const MIN_LENGTH = 3;
  return (username.length >= MIN_LENGTH)
};