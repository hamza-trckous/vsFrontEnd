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
import { ColorName } from "../theme";
import { profile } from "@/Types/Profile";
export const handleSave = async ({
  currentColor,
  Profile,
  setIsSaved,
  setAlertMessage,
  setAlertType,
  fetchSettings,
}: {
  Profile: profile;
  currentColor: ColorName | undefined;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertMessage: (message: string | null) => void;
  setAlertType: (type: "success" | "error") => void;
  fetchSettings: () => Promise<void>;
}) => {
  try {
    await saveSettingsProfile({
      logo: Profile.logo,
      nameOfBrand: Profile.nameOfBrand,
      cover: Profile.cover,
      color: currentColor as ColorName,
      slogon: Profile.slogon,
      category: Profile.category,
      accounts: Profile.accounts,
      email: Profile.email,
    });

    setIsSaved(true);
    await fetchSettings(); // Refresh the profile info
  } catch (error) {
    console.log(error);

    setAlertMessage(
      error instanceof Error
        ? `Error: ${error.message}`
        : "An unknown error occurred.",
    );
    setAlertType("error");
  }
};

// for Changing logo
export const handlePhotoChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setAlertMessage: (message: string | null) => void,
  setAlertType: (type: "success" | "error") => void,
  setprofile: React.Dispatch<React.SetStateAction<profile>>,
) => {
  const file = e.target.files?.[0];
  if (file) {
    try {
      const validation = await validateImage(file, LOGO_VALIDATION);
      if (!validation.isValid) {
        setAlertMessage(validation.error || "An unknown error occurred.");
        setAlertType("error");
        e.target.value = "";
        return; // <--- Return early if invalid
      }

      const base64String = await fileToBase64(file);
      setprofile((prev) => ({
        ...prev,
        logo: {
          ...(prev.logo ?? {}), // <--- safe fallback if prev.logo is undefined
          src: base64String,
        },
      }));
      e.target.value = ""; // Reset after successful upload
    } catch (error) {
      console.log(error);
      setAlertMessage("Error processing image");
      setAlertType("error");
      e.target.value = "";
    }
  }
};

// for Changing cover
export const handleCoverChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setAlertMessage: (message: string | null) => void,
  setAlertType: (type: "success" | "error") => void,
  setCoverType: React.Dispatch<React.SetStateAction<"image" | "video">>,

  setprofile: React.Dispatch<React.SetStateAction<profile>>,
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
        validation = await validateImage(file, COVER_VALIDATION.image);
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
      setprofile((pre) => ({
        ...pre,
        cover: { ...pre.cover, name: base64String },
      }));
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
      setprofile((pre) => ({
        ...pre,
        cover: { ...pre.cover, name: reader.result as string },
      }));
    };
    reader.readAsDataURL(e.target.files[0]);
  }
};
