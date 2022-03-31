import classes from './index.module.scss';
import comingSoonImg from '../../assets/coming-soon.png';
const ComingSoonComponent = () => {
    return (
        <div className={classes.comingSoonDiv}>
            <img src={comingSoonImg} />
            <p>Get ready for some exciting games that defy reality!</p>
        </div>
    );
};
export default ComingSoonComponent;