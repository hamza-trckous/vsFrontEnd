import React from "react";
type ToggleSwitchProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const ToggleSwitch = ({ label, checked, onChange }: ToggleSwitchProps) => {
  return (
    <div className="flex items-center space-x-3 mb-4 w-full justify-start">
      <span className="text-gray-700 font-medium select-none">{label}</span>

      <label className="relative inline-block w-11 h-6 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-teal-600 transition-colors"></div>
        <span
          className="
            absolute left-1 top-1 
            w-4 h-4 
            bg-white rounded-full 
            transition-transform 
            peer-checked:translate-x-5
          "></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
