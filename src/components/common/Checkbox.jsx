import React from "react";
import MuiCheckbox from "@material-ui/core/Checkbox";
import { useField } from "formik";

const Checkbox = ({ ...props }) => {
  const [field, meta, helpers] = useField(props.name);

  const handleCheckbox = () => {
    const set = new Set(field.value)
    if (set.has(props.value)) {
      set.delete(props.value)
    } else {
      set.add(props.value)
    }
    helpers.setValue(Array.from(set))

  }

  return (
    <MuiCheckbox
      {...field}
      checked={field.value.includes(props.value)}
      onChange={()=> {handleCheckbox()}}

    />
  )
}

export default Checkbox