import React from "react";

interface CheckboxProps {
  id: number;
  name: string;
  value: number;
  checked: boolean;
  label: string;
  onChange: () => void;
}

const Checkbox = ({ id, name, value, checked, label, onChange }: CheckboxProps) => {
  return (
    <div>
      <input
        type="checkbox"
        id={`category_${id}`}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={`category_${id}`}>{label}</label>
    </div>
  );
};

export default Checkbox;