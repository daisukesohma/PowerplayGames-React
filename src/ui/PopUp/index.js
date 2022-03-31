import React from 'react';
import './styles.scss';
import ReactDOM from 'react-dom';

const PopUp = props => ReactDOM.createPortal(props.children, document.getElementById('popup'))
export default PopUp;