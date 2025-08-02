import { FieldErrors, UseFormRegister } from "react-hook-form";
import { LandingEditingProps } from "@/Types/LandingEditing";

const AddPhoto = ({
  onFileChange,

  errors,
}: {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<LandingEditingProps>;
  errors: FieldErrors<LandingEditingProps>;
}) => {
  return (
    <div className="w-full flex flex-col">
      {errors.image && (
        <span className="text-red-500">{errors.image.message}</span>
      )}

      <label
        htmlFor="photo-file"
        className="block text-sm font-medium text-gray-700 mt-4"
      >
        Upload Photo
      </label>
      <input
        type="file"
        id="photo-file"
        onChange={onFileChange}
        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  );
};

export default AddPhoto;
