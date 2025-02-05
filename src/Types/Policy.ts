export interface Policy {
  _id?: string;
  title: string;
  content: string;
}

export type EditingPolicyProps = {
  forEditing: true;
  editingPolicy: Policy | null; // required when forEditing is true
  setEditingPolicy: React.Dispatch<React.SetStateAction<Policy | null>>; // required
  newPolicy?: Policy; // optional when forEditing is true
  setNewPolicy?: React.Dispatch<React.SetStateAction<Policy>>; // optional
};

export type NewPolicyProps = {
  forEditing: false;
  editingPolicy?: Policy | null; // optional when forEditing is false
  setEditingPolicy?: React.Dispatch<React.SetStateAction<Policy | null>>; // required
  newPolicy: Policy; // required when forEditing is false
  setNewPolicy: React.Dispatch<React.SetStateAction<Policy>>; // required
};

export type InputTitleProps = EditingPolicyProps | NewPolicyProps;
