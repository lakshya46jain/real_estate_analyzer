import InputField from "./InputField";

interface Props {
  bedroomValue: string;
  bathroomValue: string;
  acreLotValue: string;
  houseSizeValue: string;
  onChangeBedroom: (event: any) => void;
  onChangeBathroom: (event: any) => void;
  onChangeAcreLot: (event: any) => void;
  onChangeHouseSize: (event: any) => void;
}

function Form(props: Props) {
  return (
    <div>
      <InputField
        id="bedrooms"
        placeholder="Number of Bedrooms"
        label="Bedroom"
        value={props.bedroomValue}
        onChange={props.onChangeBedroom}
      />
      <InputField
        id="bathrooms"
        placeholder="Number of Bathrooms"
        label="Bathroom"
        value={props.bathroomValue}
        onChange={props.onChangeBathroom}
      />
      <InputField
        id="acre-lot"
        placeholder="Land Size (Optional)"
        label="acres"
        value={props.acreLotValue}
        onChange={props.onChangeAcreLot}
      />
      <InputField
        id="house-size"
        placeholder="Carpet Area (Optional)"
        label="sq ft."
        value={props.houseSizeValue}
        onChange={props.onChangeHouseSize}
      />
    </div>
  );
}

export default Form;
