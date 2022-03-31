import classes from "./index.module.scss";
import SidebarBtnIcon from "../../assets/nhl-sidebar-icon.png";
export function setNumberComma(number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const RightRankBox = ({
    current_winning = 20000,
    target = 200,
    prize_to_go = 160,
    game_id = 0
}) => {
    return (
        <div className={classes.rightRankBox_div}>
            <p className={classes.winningTitle}>Currently Winning:</p>
            <div className={classes.prizeDigits}>${setNumberComma(current_winning)}</div>
            <div className={classes.pointsDiv}>
                <div className={classes.targetPoints}>
                    <p className={classes.title}>Target:</p>
                    <p className={classes.digit}>{target} Pts</p>
                </div>
                <div className={classes.toGoPoints}>
                    <p className={classes.title}>Points To Go:</p>
                    <p className={classes.digit}>{prize_to_go} Pts</p>
                </div>
            </div>
            <button>
                <img
                    src={SidebarBtnIcon}
                    width={19}
                    style={{ marginRight: 5, marginTop: -4 }}
                />{" "}
                See Full Standings
            </button>
        </div>
    );
};
export default RightRankBox;