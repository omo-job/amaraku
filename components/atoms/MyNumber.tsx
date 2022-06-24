import { ChangeEvent } from 'react';

interface Props {
  value: number | '';
  setValue: (value: number | '') => void;
  min: number;
  max: number;
}

export default function MyNumber(props: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    if (inputValue === '') {
      props.setValue(inputValue);
    } else if (!isNaN(Number(inputValue))) {
      if (Number(inputValue) >= props.min && Number(inputValue) <= props.max) {
        props.setValue(Number(inputValue));
      } else {
        alert(`${props.min}から${props.max}の間で入力してください`);
      }
    }
  }

  return <input type="text" className="form-control" value={props.value} onChange={(e) => handleChange(e)} />;
}
