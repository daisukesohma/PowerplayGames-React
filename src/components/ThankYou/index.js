import classes from './index.module.scss';
import plane from '../../assets/358-paper-plane.png';
import CloseIcon from "../../icons/Close";
const ThankYouModal = (props) => {
    return (
        <div style={{
            width: "100%",
            height: "100vh",
            position: "fixed",
            top: 0,
            zIndex: 1
        }}>
        <div className={classes.thankYouDiv}>
            <div className={classes.closeButton} style={{
                position: "absolute",
                right: 30
            }}>
                <CloseIcon onClick={props.closeModal} />
            </div>
            <img src={plane} />
            <p className={classes.title}>Thank you for reaching out!</p>
            <p className={classes.subtitle}>We try our best to respond within 48 hours.</p>
        </div>
        </div>
    );
}
export default ThankYouModal;