import { createPolicy, deletePolicy, updatePolicy } from "@/api/Policy";
import { Policy } from "@/Types/Policy";

// handleOnChange function is used to update the value of the input field
export const handleOnChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  forEditing: boolean,
  setEditingPolicy:
    | React.Dispatch<React.SetStateAction<Policy | null>>
    | undefined,
  editingPolicy: Policy | null,
  setNewPolicy: React.Dispatch<React.SetStateAction<Policy>> | undefined,
  newPolicy: Policy | undefined,
  item: Policy["title"] | Policy["content"]
) => {
  if (forEditing) {
    // When forEditing is true, we should update editingPolicy
    if (setEditingPolicy && editingPolicy) {
      setEditingPolicy({
        ...editingPolicy,
        [item]: e.target.value,
      });
    }
  } else {
    // When forEditing is false, we should update newPolicy
    if (setNewPolicy && newPolicy) {
      setNewPolicy({
        ...newPolicy,
        [item]: e.target.value,
      });
    }
  }
};
// getting the Value of the input field //
export const getValue = ({
  forEditing,
  newPolicy,
  editingPolicy,
  item,
}: {
  forEditing: boolean;
  newPolicy: Policy;
  editingPolicy: Policy | null;
  item: "title" | "content";
}) => {
  if (forEditing) {
    // We know editingPolicy is required here, but it's still Policy | null
    return editingPolicy?.[item] || "";
  } else {
    // We know newPolicy is required here
    return newPolicy[item];
  }
};

export const handleCreatePolicy = async ({
  newPolicy,
  setAlertMessage,
  setAlertType,
  fetchPolicies,
}: {
  newPolicy: Policy;
  setAlertMessage: (message: string) => void;
  setAlertType: (type: "success" | "error") => void;
  fetchPolicies: () => Promise<void>;
}) => {
  try {
    if (!newPolicy.title || !newPolicy.content) {
      setAlertType("error");
      setAlertMessage("الرجاء ملئ جميع الحقول");
      return;
    }
    const creatNewPolicy = await createPolicy(newPolicy);
    if (!creatNewPolicy) {
      setAlertType("error");
      setAlertMessage("حدث خطأ ما");
      return;
    }
    setAlertType("success");
    setAlertMessage("تم اضافة السياسة بنجاح");
  } catch (error) {
    setAlertType("error");
    setAlertMessage("حدث خطأ ما");
    console.error("Error creating policy:", error);
  }

  fetchPolicies();
};

export const handleUpdate = async (
  id: string,
  editingPolicy: Policy | null,
  setAlertMessage: (message: string) => void,
  setAlertType: (type: "success" | "error") => void,
  fetchPolicies: () => Promise<void>,
  setEditingPolicy: React.Dispatch<React.SetStateAction<Policy | null>>
) => {
  try {
    if (!editingPolicy?.content || !editingPolicy?.title) {
      setAlertMessage("يجب ادخال البيانات");
      setAlertType("error");
      return;
    } else {
      await updatePolicy(id, editingPolicy);
      setAlertMessage("تم تحديث السياسة بنجاح");
      setAlertType("success");
      setEditingPolicy(null);
      fetchPolicies();
    }
  } catch (error) {
    console.log(error);
    setAlertMessage("لم يتم تحديث السياسة");
    setAlertType("error");
  }
};

export const handleDelete = async (
  id: string,
  setAlertMessage: (message: string) => void,
  setAlertType: (type: "success" | "error") => void,
  fetchPolicies: () => Promise<void>
) => {
  try {
    await deletePolicy(id);
    setAlertMessage("تم حذف السياسة بنجاح");
    setAlertType("success");
  } catch (error) {
    console.log(error);
    setAlertMessage("لم يتم حذف السياسة");
    setAlertType("error");
  }
  fetchPolicies();
};
