import ReactDOM from 'react-dom';

const CreatePopUpPortal = props => ReactDOM.createPortal(props.children, document.getElementById('popup'));

export default CreatePopUpPortal;