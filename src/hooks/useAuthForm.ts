import { useState } from "react";
import { useTranslation } from "react-i18next";
import { validateForm, ValidationResult } from "../utils/validation";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UseAuthFormReturn {
  formData: FormData;
  validationErrors: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleInputChange: (field: keyof FormData, value: string) => void;
  validateFormData: (isSignup: boolean) => ValidationResult;
  resetForm: () => void;
  clearValidationErrors: () => void;
}

export const useAuthForm = (): UseAuthFormReturn => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateFormData = (isSignup: boolean): ValidationResult => {
    const result = validateForm(formData, isSignup, t);
    setValidationErrors(result.errors);
    return result;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setValidationErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const clearValidationErrors = () => {
    setValidationErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return {
    formData,
    validationErrors,
    handleInputChange,
    validateFormData,
    resetForm,
    clearValidationErrors,
  };
};
