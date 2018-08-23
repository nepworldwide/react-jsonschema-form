import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

function RadioWidget(props) {
  const {
    options,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    onChange,
  } = props;
  // Generating a unique field name to identify this set of radio buttons
  const name = Math.random().toString();
  const { enumOptions /*inline*/ } = options;
  // checked={checked} has been moved above name={name}, As mentioned in #349;
  // this is a temporary fix for radio button rendering bug in React, facebook/react#7630.
  return (
    <Form.Field className="field-radio-group">
      {enumOptions.map((option, i) => {
        const checked = option.value === value;
        // const disabledCls = disabled || readonly ? "disabled" : "";
        const radio = (
          <Form.Radio
            label={option.label}
            checked={checked}
            name={name}
            required={required}
            value={option.value}
            disabled={disabled || readonly}
            autoFocus={autofocus && i === 0}
            onChange={_ => onChange(option.value)}
          />
        );

        return radio;
      })}
    </Form.Field>
  );
}

RadioWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  RadioWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
      inline: PropTypes.bool,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}
export default RadioWidget;
