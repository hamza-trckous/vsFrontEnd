import { saveSettingsProfile } from "@/api/profile";
import {
  fileToBase64,
  LOGO_VALIDATION,
  validateImage,
} from "../validationMedia/validationPhoto";
import { ValidationResult } from "@/Types/ValidationMedia";
import {
  COVER_VALIDATION,
  validateVideo,
} from "../validationMedia/validationVideo";

export const handleSave = async ({
  logo,
  nameOfBrand,
  cover,
  setIsSaved,
  setAlertMessage,
  setAlertType,
  fetchSettings,
}: {
  logo: string;
  nameOfBrand: string;
  cover: string;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertMessage: (message: string | null) => void;
  setAlertType: (type: "success" | "error") => void;
  fetchSettings: () => Promise<void>;
}) => {
  try {
    await saveSettingsProfile({ logo, nameOfBrand, cover });
    setIsSaved(true);
    console.log("Settings saved successfully!");
    await fetchSettings(); // Fetch the updated settings after saving
  } catch (error) {
    console.error("Error saving settings:", error);
    if (error instanceof Error) {
      setAlertMessage(`Error: ${error.message}`);
    } else {
      setAlertMessage("An unknown error occurred.");
    }
    setAlertType("error");
  }
};

// for Changing logo

export const handlePhotoChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setAlertMessage: (message: string | null) => void,
  setAlertType: (type: "success" | "error") => void,
  setlogo: React.Dispatch<React.SetStateAction<string>>
) => {
  const file = e.target.files?.[0];
  if (file) {
    try {
      const validation = await validateImage(file, LOGO_VALIDATION);
      if (!validation.isValid) {
        setAlertMessage(validation.error || "An unknown error occurred.");
        setAlertType("error");
      }
      e.target.value = "";
      const base64String = await fileToBase64(file);
      setlogo(base64String);
    } catch (error) {
      setAlertMessage("Error processing image");
      setAlertType("error");
      console.log("Error processing image", error);
      // Reset the input
      e.target.value = "";
    }
  }
};

// for Changing cover
export const handleCoverChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setAlertMessage: (message: string | null) => void,
  setAlertType: (type: "success" | "error") => void,
  setCover: React.Dispatch<React.SetStateAction<string>>,
  setCoverType: React.Dispatch<React.SetStateAction<"image" | "video">>
) => {
  const file = e.target.files?.[0];
  if (file) {
    try {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      if (!isImage && !isVideo) {
        setAlertMessage("Invalid file type");
        setAlertType("error");
        e.target.value = "";
        return;
      }
      let validation: ValidationResult;
      if (isImage) {
        validation = await validateImage(file, LOGO_VALIDATION);
      } else {
        validation = await validateVideo(file, COVER_VALIDATION.video);
      }
      if (!validation.isValid) {
        setAlertMessage(validation.error || "An unknown error occurred.");
        setAlertType("error");
        e.target.value = "";
        return;
      }
      const base64String = await fileToBase64(file);
      setCover(base64String);
      setCoverType(isImage ? "image" : "video");
    } catch (error) {
      setAlertMessage("Error processing file");
      setAlertType("error");
      console.error("Error processing file", error);
      e.target.value = "";
    }
  }
  if (e.target.files && e.target.files[0]) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCover(reader.result as string);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
};
