import React from "react";
import PropTypes from "prop-types";

import { asNumber } from "../../utils";
import { Dropdown } from "semantic-ui-react";

const nums = new Set(["number", "integer"]);

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
function processValue({ type, items }, value) {
  if (value === "") {
    return undefined;
  } else if (type === "array" && items && nums.has(items.type)) {
    return value.map(asNumber);
  } else if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return asNumber(value);
  }
  return value;
}

function SelectWidget(props) {
  const {
    schema,
    id,
    options,
    value,
    required,
    disabled,
    readonly,
    multiple,
    autofocus,
    onChange,
    onBlur,
    onFocus,
    placeholder,
  } = props;
  const { enumOptions, enumDisabled } = options;
  const emptyValue = multiple ? [] : "";

  const parsedOptions = enumOptions.map(({ value, label }, i) => {
    const disabled = enumDisabled && enumDisabled.indexOf(value) != -1;
    return {
      value,
      disabled,
      text: label,
    };
  });

  return (
    <Dropdown
      selection
      placeholder={placeholder}
      options={parsedOptions}
      id={id}
      multiple={multiple}
      value={typeof value === "undefined" ? emptyValue : value}
      required={required}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      onBlur={
        onBlur &&
        ((event, data) => {
          const newValue = data.value;
          onBlur(id, processValue(schema, newValue));
        })
      }
      onFocus={
        onFocus &&
        ((event, data) => {
          const newValue = data.value;
          onFocus(id, processValue(schema, newValue));
        })
      }
      onChange={(event, data) => {
        console.log(data);
        const newValue = data.value;
        onChange(processValue(schema, newValue));
      }}
    />
  );
}

SelectWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  SelectWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    multiple: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };
}

export default SelectWidget;
