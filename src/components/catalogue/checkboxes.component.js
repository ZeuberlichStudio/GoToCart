import React from 'react';

export function LabeledCheckbox(props) {
  return(
    <label className="labeled-checkbox">
      <input data-filter={ props.dataFilter } type="checkbox" name={ props.name } value={ props.value }/>
      <span className="labeled-checkbox_label">{ props.label }</span>
    </label>
  );
}

export function ColorCheckbox(props) {
  return(
    <label title={ props.title } className="color-checkbox">
      <input data-filter="color" name={ props.name } value={ props.value } type="checkbox"/>
      <span>
        <i style={{ backgroundColor: props.color }}/>
      </span>
    </label>
  );
}
