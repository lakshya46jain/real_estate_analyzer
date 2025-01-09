interface Props {
  buttonClick: () => void;
}

function Output(props: Props) {
  return (
    <div className="input-group mb-3">
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon1"
        style={{
          borderColor: "#DE6C83",
          borderWidth: "2.5px",
          borderRadius: "25px",
          padding: "8px 50px 8px 50px",
          fontFamily: "'League Spartan', sans-serif",
          margin: "0px 20px 0px 0px",
        }}
        onClick={props.buttonClick}
      >
        Search
      </button>
      <input
        id="price-prediction"
        readOnly
        type="text"
        className="form-control"
        placeholder="Price Estimate"
        aria-label="Price Estimate"
        aria-describedby="button-addon1"
        style={{
          borderColor: "#DE6C83",
          borderWidth: "2.5px",
          borderRadius: "25px",
          padding: "8px 20px 8px 20px",
          fontFamily: "'League Spartan', sans-serif",
        }}
      />
    </div>
  );
}

export default Output;
