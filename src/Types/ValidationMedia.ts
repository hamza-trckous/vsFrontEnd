export interface VideoValidationOptions {
  maxSizeInMB?: number;
  allowedTypes?: string[];
  maxDurationInSeconds?: number;
}
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}
export interface ImageValidationOptions {
  maxSizeInMB?: number;
  allowedTypes?: string[];
  maxWidth?: number;
  maxHeight?: number;
}
