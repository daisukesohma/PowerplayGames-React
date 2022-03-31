import classes from './index.module.scss';
import seasonOffImage from '../../assets/image-1.png';
const OffSeasonComponent = () => {
    return (
        <div className={classes.offSeasonDiv}>
            <h2>OFF-SEASON</h2>
            <p>Games will return when the next season starts</p>
            <img src={seasonOffImage} />
        </div>
    );
};
export default OffSeasonComponent;