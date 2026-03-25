const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLoginForm = ({ email, password }) => {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Enter at least 6 characters for password.";
  }

  return errors;
};

export const validateRegisterForm = ({
  name,
  email,
  password,
  confirmPassword,
  location,
}) => {
  const errors = {};

  if (!name.trim()) {
    errors.name = "Full name is required.";
  } else if (name.trim().length < 2) {
    errors.name = "Name should be at least 2 characters.";
  }

  if (!location.trim()) {
    errors.location = "City is required.";
  } else if (location.trim().length < 2) {
    errors.location = "Enter a valid city name.";
  }

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Enter at least 6 characters for password.";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};

export const getAuthErrorMessage = (error, fallbackMessage) => {
  const message = error?.message || fallbackMessage;

  if (/already exists|already in use/i.test(message)) {
    return "User already exists. Please login instead.";
  }

  if (/invalid email or password/i.test(message)) {
    return "Invalid email or password.";
  }

  if (/deactivated/i.test(message)) {
    return message;
  }

  return message;
};
