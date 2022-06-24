interface Props {
  value: string | '';
  setValue: (value: string) => void;
}

export default function InputText(props: Props) {
  return (
    <input
      className="form-control"
      type="text"
      value={props.value}
      onChange={(e) => props.setValue(e.target.value)}
    />
  );
}
