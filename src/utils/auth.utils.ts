import { BadRequestException } from '@nestjs/common';

const validatePassword = (password: string) => {
  if (!password) {
    return true;
  }
  // Check for at least 1 uppercase letter
  if (!/[A-Z]/.test(password)) {
    throw new BadRequestException(
      'Password must contain at least 1 uppercase letter',
    );
  }

  // Check for at least 1 lowercase letter
  if (!/[a-z]/.test(password)) {
    throw new BadRequestException(
      'Password must contain at least 1 lowercase letter',
    );
  }

  // Check for at least 1 number
  if (!/\d/.test(password)) {
    throw new BadRequestException('Password must contain at least 1 number');
  }

  // Check the length of the password
  if (password.length < 8) {
    throw new BadRequestException(
      'Password must be at least 8 characters long',
    );
  }
};

const validatePhoneFormat = (phoneNumber: string) => {
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; // Regular expression for xxx-xxx-xxxx format

  if (
    phoneNumber !== undefined &&
    phoneNumber !== '' &&
    !phoneRegex.test(phoneNumber)
  ) {
    throw new BadRequestException(
      'Number should be in the format xxx-xxx-xxxx',
    );
  }
};

export const authUtils = {
  validatePassword,
  validatePhoneFormat,
};
