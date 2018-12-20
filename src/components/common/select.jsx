import React from "react";

const Select = ({
  name,
  label,
  error,
  value,
  items,
  onChange,
  valueProperty,
  displayProperty
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className="form-control"
        id={name}
        value={value}
        onChange={onChange}
        name={name}
      >
        <option value="" />
        {items.map(item => (
          <option key={item[valueProperty]} value={item[valueProperty]}>
            {item[displayProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
