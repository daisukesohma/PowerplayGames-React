import classes from "./powerCenterUpcomingGameCard.module.scss";
import ComingSoonCard from "../../assets/comingSoonCardBg.png";
import TwitterIcon from "../../assets/twitter-icon-orange.svg"

const PowerCenterUpcommingGameCard = (props) => {
    const { header, subtitle, content, subcontent, } = props
    return(
        <div className={classes.__interactive_contests_power_center_card}>
            <div className={classes.__power_center_upcoming_card} style={{backgroundRepeat: "no-repeat", backgroundAttachment: "inherit", backgroundImage: `url(${ComingSoonCard})`}}>
                <div className={classes.___upcoming_card_header}>{header}</div>
                <div className={classes.__upcoming_card_subtitle}>{subtitle}</div>
                <div className={classes.__upcoming_card_content}>{content}</div>
                <div className={classes.__upcoming_card_sub_content}>{subcontent}</div>
                <a href="https://twitter.com/PowerPlaySys"><button><img src={TwitterIcon} height="20px" width="20px"></img>Follow Us for Updates</button></a>
            </div>
        </div>
    )
}

export default PowerCenterUpcommingGameCard;