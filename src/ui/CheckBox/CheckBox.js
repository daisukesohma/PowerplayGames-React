import "./CheckBox.scss";

const CheckBox = (props) => {
  const id = props.id || props.name;
  return (
    <div className='__checkbox-field'
    >
      <input type="checkbox" id={id} {...props} className="__checkbox" />
      {props.title && <label htmlFor={id}>{props.title}</label>}
    </div>
  );
};

export default CheckBox;
