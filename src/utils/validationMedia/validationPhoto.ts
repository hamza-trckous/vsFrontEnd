import {
  ImageValidationOptions,
  ValidationResult
} from "@/Types/ValidationMedia";

export const DEFAULT_IMAGE_OPTIONS: ImageValidationOptions = {
  maxSizeInMB: 5, // 5MB
  allowedTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  maxWidth: 4096,
  maxHeight: 4096
};

/**
 * Validates image file size
 */
const validateImageSize = (
  file: File,
  maxSizeInMB: number
): ValidationResult => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  if (file.size > maxSizeInBytes) {
    return {
      isValid: false,
      error: `Image size must be less than ${maxSizeInMB}MB`
    };
  }

  return { isValid: true };
};
/**
 * Validates image type
 */
const validateImageType = (
  file: File,
  allowedTypes: string[]
): ValidationResult => {
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Image type must be one of: ${allowedTypes.join(", ")}`
    };
  }

  return { isValid: true };
};

/**
 * Validates image dimensions
 */
const validateImageDimensions = (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<ValidationResult> => {
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      if (img.width > maxWidth || img.height > maxHeight) {
        resolve({
          isValid: false,
          error: `Image dimensions must be less than ${maxWidth}x${maxHeight}px`
        });
      }

      resolve({ isValid: true });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        isValid: false,
        error: "Failed to load image for validation"
      });
    };

    img.src = objectUrl;
  });
};

/**
 * Main image validation function
 */
export const validateImage = async (
  file: File,
  options: ImageValidationOptions = DEFAULT_IMAGE_OPTIONS
): Promise<ValidationResult> => {
  // Destructure options with defaults
  const {
    maxSizeInMB = DEFAULT_IMAGE_OPTIONS.maxSizeInMB,
    allowedTypes = DEFAULT_IMAGE_OPTIONS.allowedTypes,
    maxWidth = DEFAULT_IMAGE_OPTIONS.maxWidth,
    maxHeight = DEFAULT_IMAGE_OPTIONS.maxHeight
  } = options;

  // Check if file exists
  if (!file) {
    return {
      isValid: false,
      error: "No file provided"
    };
  }

  // Validate file type
  const typeValidation = validateImageType(file, allowedTypes!);
  if (!typeValidation.isValid) {
    return typeValidation;
  }

  // Validate file size
  const sizeValidation = validateImageSize(file, maxSizeInMB!);
  if (!sizeValidation.isValid) {
    return sizeValidation;
  }

  // Validate dimensions
  const dimensionsValidation = await validateImageDimensions(
    file,
    maxWidth!,
    maxHeight!
  );
  if (!dimensionsValidation.isValid) {
    return dimensionsValidation;
  }

  return { isValid: true };
};

/**
 * Convert file to base64
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
export const LOGO_VALIDATION: ImageValidationOptions = {
  maxSizeInMB: 5,
  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  maxWidth: 1024, // logos don’t need to be huge
  maxHeight: 1024
};

export const COVER_IMAGE_VALIDATION: ImageValidationOptions = {
  maxSizeInMB: 5,
  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  maxWidth: 2048,
  maxHeight: 1080
};
