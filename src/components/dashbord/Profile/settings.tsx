"use client";

import React, { useState } from "react";
import LogoPart from "./LogoPart";
import Toggles from "./Toggles";
import ChoiseWhatShowingCategory from "./ChoiseWhatShowingCategory";
import CoverPart from "./CoverPart";
import NameBrand from "./NameBrand";
import SlogonPart from "./SlogonPart";
import HandleSavingLogic from "./HandleSavingLogic";
import { useAlert } from "@/context/useAlert";
import PrincipalEmailPart from "./PrincipalEmailPart";
import AccountsPart from "./AccountsPart";

const Settings = ({
  fetchSettings,
  setCoverType,
  coverType
}: {
  coverType: "image" | "video";

  fetchSettings: () => Promise<void>;
  setCoverType: React.Dispatch<React.SetStateAction<"image" | "video">>;
}) => {
  const { setAlertMessage, setAlertType } = useAlert();

  const [chosenCategory, setChosenCategory] = useState<{
    [key: string]: boolean;
  }>({});
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-center items-center content-center flex-col">
      <LogoPart setAlertMessage={setAlertMessage} setAlertType={setAlertType} />
      <Toggles />
      <CoverPart
        setAlertMessage={setAlertMessage}
        setAlertType={setAlertType}
        setCoverType={setCoverType}
        coverType={coverType}
      />
      <NameBrand />
      <SlogonPart />
      <PrincipalEmailPart />
      <AccountsPart />
      <ChoiseWhatShowingCategory
        chosenCategory={chosenCategory}
        setChosenCategory={setChosenCategory}
      />
      <HandleSavingLogic
        chosenCategory={chosenCategory}
        fetchSettings={fetchSettings}
      />
    </div>
  );
};

export default Settings;
