import { ChangeEvent } from 'react';

type SelectOption = {
  id: number;
  value: string;
};

interface Props {
  value: string;
  optionProp: Array<SelectOption>;
  setValue: (value: number) => void;
}

export default function Select(props: Props) {
  function selectChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = Number(e.target.value);
    props.setValue(value);
  }

  return (
    <>
      <div className="select_body">
        <select className="form-select" onChange={(e) => selectChange(e)}>
          {props.optionProp.map((option: SelectOption, index: number) => (
            <option value={option.id}>{option.value}</option>
          ))}
          ;
        </select>
      </div>
    </>
  );
}
