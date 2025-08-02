"use client";

import { useForm } from "react-hook-form";
import LandingPageId from "../LandingPageID";

import { LandingEditingProps } from "@/Types/LandingEditing";
import AddTitle from "./AddTitle";
import AddDescription from "./AddDescription";
import { Dispatch, SetStateAction, useState } from "react";
import AddPhoto from "./AddPhoto"; // Import the new AddPhoto component
import { updateLandingPage } from "@/api/product";
import Image from "next/image";
import AlertModal from "../AlertModal";
import { useAlert } from "@/context/useAlert";
import Container from "../dashbord/multualCompenents/Container";

const LandingpageEditing = ({ ProductID }: { ProductID: string }) => {
  const { setAlertMessage, alertType, setAlertType, alertMessage } = useAlert();
  const [newProduct, setNewProduct] = useState<LandingEditingProps>({
    title: "",
    description: "",
    image: "",
  });
  return (
    <Container>
      <div className="w-4/12">
        <LandingPageId productId={ProductID} />
        <div className="grid grid-cols-2 gap-4 ">
          <div className=" whitespace-pre-wrap break-all w-full overflow-hidden flex flex-col flex-end">
            <h1 className="text-[20px]  text-center  items-center">
              {" "}
              {newProduct.title}
            </h1>
            <div className="text-[10px] items-end w-full flex flex-end content-end justify-end">
              {" "}
              {newProduct.description}
            </div>
          </div>
          <div className="whitespace-pre-wrap break-all w-full overflow-hidden flex flex-col flex-end items-center">
            <Image
              src={newProduct.image}
              alt={`Landing page image`}
              width={200}
              height={200}
              className="object-cover rounded"
            />
          </div>
        </div>
      </div>
      <div className="w-7/12">
        <AddPart
          setAlertMessage={setAlertMessage}
          setAlertType={setAlertType}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          ProductID={ProductID}
        />
      </div>
      {alertMessage && (
        <AlertModal
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage(null)}
        />
      )}
    </Container>
  );
};

export default LandingpageEditing;

const AddPart = ({
  setAlertMessage,
  setAlertType,
  ProductID,
  setNewProduct,
  newProduct,
}: {
  setAlertMessage: (message: string | null) => void;
  setAlertType: (type: "success" | "error") => void;
  ProductID: string;
  newProduct: LandingEditingProps;
  setNewProduct: Dispatch<SetStateAction<LandingEditingProps>>;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LandingEditingProps>();

  const onSubmit = (data: LandingEditingProps) => {
    const transformedData = {
      LandingPageContent: {
        title: data.title,
        description: data.description,
        image: data.image && data.image.length > 0 ? data.image[0] : "",
      },
    };
    try {
      const updating = async () => {
        await updateLandingPage(ProductID, transformedData);
        setAlertMessage("تم تحديث المنتج بنجاح!");
        setAlertType("success");
      };
      updating();
    } catch (error) {
      setAlertMessage("حدث خطأ أثناء تحديث المنتج.");
      setAlertType("error");
      console.error("Error updating product:", error);
    }
  };
  const handlAdd = () => {};

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewProduct({
          ...newProduct,
          image: event.target?.result as string,
        });
        setValue("image", event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex">
      <AddTitle
        onchange={(e) =>
          setNewProduct({ ...newProduct, title: e.target.value })
        }
        value={newProduct.title}
        register={register}
        errors={errors}
      />
      <AddDescription
        onchange={(e) =>
          setNewProduct({ ...newProduct, description: e.target.value })
        }
        value={newProduct.description}
        register={register}
        errors={errors}
      />
      <AddPhoto
        onFileChange={handleFileChange}
        register={register}
        errors={errors}
      />
      <Add onclick={handlAdd} />
      <Submit />
    </form>
  );
};

const Submit = () => {
  return (
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Submit
    </button>
  );
};
const Add = ({ onclick }: { onclick: () => void }) => {
  return (
    <button
      onClick={onclick}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Add
    </button>
  );
};
