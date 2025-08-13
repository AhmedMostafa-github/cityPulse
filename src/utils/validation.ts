import { TFunction } from "i18next";

export interface ValidationResult {
  isValid: boolean;
  errors: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

export const validateEmail = (email: string, t: TFunction): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    return t("auth.validation.emailRequired");
  }
  if (!emailRegex.test(email)) {
    return t("auth.validation.emailInvalid");
  }
  return "";
};

export const validatePassword = (password: string, t: TFunction): string => {
  if (!password.trim()) {
    return t("auth.validation.passwordRequired");
  }
  if (password.length < 8) {
    return t("auth.validation.passwordLength");
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return t("auth.validation.passwordLowercase");
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return t("auth.validation.passwordUppercase");
  }
  if (!/(?=.*\d)/.test(password)) {
    return t("auth.validation.passwordNumber");
  }
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    return t("auth.validation.passwordSpecial");
  }
  return "";
};

export const validateName = (name: string, t: TFunction): string => {
  if (!name.trim()) {
    return t("auth.validation.nameRequired");
  }
  if (name.trim().length < 2) {
    return t("auth.validation.nameLength");
  }
  return "";
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
  t: TFunction
): string => {
  if (!confirmPassword.trim()) {
    return t("auth.validation.confirmPasswordRequired");
  }
  if (password !== confirmPassword) {
    return t("auth.validation.passwordsDoNotMatch");
  }
  return "";
};

export const validateForm = (
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  },
  isSignup: boolean,
  t: TFunction
): ValidationResult => {
  const errors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  if (isSignup) {
    errors.name = validateName(formData.name, t);
  }

  errors.email = validateEmail(formData.email, t);
  errors.password = validatePassword(formData.password, t);

  if (isSignup) {
    errors.confirmPassword = validateConfirmPassword(
      formData.password,
      formData.confirmPassword,
      t
    );
  }

  const isValid = !Object.values(errors).some((error) => error !== "");

  return { isValid, errors };
};
