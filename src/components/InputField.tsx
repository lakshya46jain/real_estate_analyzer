interface Props {
  id: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (event: any) => void;
}

function InputField(props: Props) {
  return (
    <div className="input-group mb-3">
      <input
        id={props.id}
        type="text"
        className="form-control"
        placeholder={props.placeholder}
        aria-describedby="basic-addon2"
        style={{
          color: "#FFFFFF",
          backgroundColor: "#0B2564",
          borderColor: "#0B2564",
          borderWidth: "2.5px",
          borderRadius: "25px 0px 0px 25px",
          padding: "8px 20px 8px 20px",
          fontFamily: "'League Spartan', sans-serif",
        }}
        value={props.value}
        onChange={props.onChange}
      />
      <span
        className="input-group-text"
        id="basic-addon2"
        style={{
          backgroundColor: "#0B2564",
          color: "#FFFFFF",
          borderColor: "#DE6C83",
          borderWidth: "2.5px",
          borderRadius: "0px 25px 25px 0px",
          padding: "8px 20px 8px 20px",
          minWidth: "110px",
          fontFamily: "'League Spartan', sans-serif",
          justifyContent: "center",
        }}
      >
        {props.label}
      </span>
      <style>
        {`
          #${props.id}::placeholder {
            color: rgba(255, 255, 255, 0.65); /* Custom placeholder color */
          }
        `}
      </style>
    </div>
  );
}

export default InputField;
