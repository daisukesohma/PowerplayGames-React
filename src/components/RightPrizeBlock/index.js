import classes from "./index.module.scss";
export function setNumberComma(number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const RightPrizeBlock = ({
    targetPrize = 0
}) => {
    return (
        <div className={classes.prizeBlock_div}>
            <div className={classes.prizeDigit}>${setNumberComma(targetPrize)}</div>
            <div className={classes.targetPrizeText}>Target Prize</div>
            <div className={classes.note}>
                <span>NOTE! If multiple players meet the target, the prize will be split evently</span>
            </div>
        </div>
    );
};
export default RightPrizeBlock;