import * as $ from "jquery";
import styles from './styles.module.scss';
import arrow from '../../assets/group-17@3x.png';
const MyScoreDetailsMobileCard = (props) => {
    const {
        data = {}
    } = props;
    console.log("data1", props);
    return (
        <div className={styles.scoreCard}>
            <div className={styles.topPart}>
                <div className={styles.positions}>
                    {
                        data?.fantasyPosition == "TeamD" ? "TD" :
                        data?.fantasyPosition == "G1" ? "G" : 
                        data?.fantasyPosition == "C1" ? "C" : data?.fantasyPosition
                    }
                </div>
                <div className={styles.seperator}></div>
                <div className={styles.playerDetails}>
                    <p>{ data?.fantasyPosition == "TeamD" ? data?.fantasyLog?.team.name : data?.fantasyLog?.player?.full_name }</p>
                    {/* <span></span> */}
                </div>
                <div className={styles.arrow}>
                    <button onClick={(e) => {
                        if($(e.target).parent().find('span').text() == "See less") {
                            $(e.target).parent().find('img').addClass("rotate");
                            $(e.target).parent().find('span').text("See More");
                            $(e.target).parent().parent().parent().next().find("div[class^='styles_statsPlayer']").hide();
                        }
                        else {
                            $(e.target).parent().find('img').removeClass("rotate");
                            $(e.target).parent().find('span').text("See less");
                            $(e.target).parent().parent().parent().next().find("div[class^='styles_statsPlayer']").show();
                        }
                    }}>
                        <span>See less</span>
                        <img src={arrow} width="14"/>
                    </button>
                </div>
            </div>
            <div className={styles.middlePart}>
                <div className={styles.statsPlayer + ' statsPlayerDiv'}>
                    <div className={styles.statItem}>
                        <p>Scoring Plays</p>
                        <div className={styles.itemBottom}>
                            <div className={styles.itemBottomPart}>
                                <p>Plays</p>
                                <span className={styles.spans}>
                                    {
                                        data?.fantasyLog?.type === "shotagainst" && data?.fantasyLog?.saved == true
                                        ? "SA"
                                        : data?.fantasyLog?.type === "shotagainst" && data?.fantasyLog?.saved == false ? 
                                        "GA" 
                                        : data?.fantasyLog?.type === "goalagainst"
                                        ? "GA"
                                        : data?.fantasyLog?.type[0]
                                    }
                                </span>
                            </div>
                            <div className={styles.itemBottomPart}>
                                <p>Pts</p>
                                <span>{data.fantasyPosition == "Team D" ? data?.fantasyLog?.homeTeamD : data?.fantasyLog?.playerPts}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statItem}>
                        <p>RBI</p>
                        <div className={styles.itemBottom}>
                            <div className={styles.itemBottomPart}>
                                <p>RBI</p>
                                <span>1</span>
                            </div>
                            <div className={styles.itemBottomPart}>
                                <p>Pts</p>
                                <span>6</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statItem}>
                        <p>Runs</p>
                        <div className={styles.itemBottom}>
                            <div className={styles.itemBottomPart}>
                                <p>RS</p>
                                <span>1</span>
                            </div>
                            <div className={styles.itemBottomPart}>
                                <p>Pts</p>
                                <span>6</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.totals}>
                    <div className={styles.totalItem}>
                        <p>Total Pts</p>
                        <div>{data.fantasyPosition == "Team D" ? data?.fantasyLog?.homeTeamD : data?.fantasyLog?.playerPts}</div>
                    </div>
                    <div className={styles.totalItem}>
                        <p>Powers</p>
                        <div>-</div>
                    </div>
                    <div className={styles.totalItem}>
                        <p>My Score</p>
                        <div className={
                                        data?.fantasyLog?.type === "shotagainst" && data?.fantasyLog?.saved == true
                                        ? styles.success
                                        : data?.fantasyLog?.type === "shotagainst" && data?.fantasyLog?.saved == false ? 
                                        styles.danger
                                        : data?.fantasyLog?.type === "goalagainst"
                                        ? styles.danger
                                        : styles.success
                                    }>
                            {data.fantasyPosition == "Team D" ? data?.fantasyLog?.homeTeamD : data?.fantasyLog?.playerPts}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bottomPart}>
                <p>Running Total</p>
                <div>
                    {
                    props?.runningTotal }
                </div>
            </div>
        </div>
    );
};
export default MyScoreDetailsMobileCard;