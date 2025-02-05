import {
  ValidationResult,
  VideoValidationOptions,
} from "@/Types/ValidationMedia";
import { COVER_IMAGE_VALIDATION } from "./validationPhoto";

export const DEFAULT_VIDEO_OPTIONS: VideoValidationOptions = {
  maxSizeInMB: 100, // 100MB
  allowedTypes: ["video/mp4", "video/webm"],
  maxDurationInSeconds: 300, // 5 minutes
};

// Video validation function
export const validateVideo = (
  file: File,
  options: VideoValidationOptions = DEFAULT_VIDEO_OPTIONS
): Promise<ValidationResult> => {
  return new Promise((resolve) => {
    const {
      maxSizeInMB = DEFAULT_VIDEO_OPTIONS.maxSizeInMB,
      allowedTypes = DEFAULT_VIDEO_OPTIONS.allowedTypes,
    } = options;

    // Check file size
    const maxSizeInBytes = maxSizeInMB! * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      resolve({
        isValid: false,
        error: `Video size must be less than ${maxSizeInMB}MB`,
      });
      return;
    }

    // Check file type
    if (!allowedTypes?.includes(file.type)) {
      resolve({
        isValid: false,
        error: `Video type must be one of: ${allowedTypes?.join(", ")}`,
      });
      return;
    }

    resolve({ isValid: true });
  });
};

// Add cover validation options
export const COVER_VALIDATION = {
  image: COVER_IMAGE_VALIDATION,
  video: {
    maxSizeInMB: 100,
    allowedTypes: ["video/mp4", "video/webm"],
    maxDurationInSeconds: 300,
  },
};
