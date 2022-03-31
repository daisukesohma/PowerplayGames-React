import { useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { useMediaQuery } from "react-responsive";
import styles from './styles.module.scss';
import _ from 'underscore';
const ContestRulesPage = (props) => {
    const { state = [] } = props.location || {};
    const {
        game_type = "",
        league = "",
        start_time = "",
        game_set_start,
        end_date,
        powerdfs_challenge_amount,
        PointsSystem = [],
        prizes = []
    } = state || [];
    const teamRoasterData = [
        {
          type: "MLB",
          heading: "The 8 roster positions:",
          teamRoster: [
            {
              count: "one (1)",
              countD: 1,
              title: "P",
              value: "(Pitcher)",
            },
            {
              count: "one (1)",
              countD: 1,
              title: "C",
              value: "(Catcher)",
            },
            {
              count: "one (1)",
              countD: 1,
              title: "SS",
              value: "(Shortstop)",
            },
            {
              count: "two (2)",
              countD: 2,
              title: "xB",
              value: "(1B, 2B or 3B)",
            },
            {
              count: "two (2)",
              countD: 2,
              title: "OF",
              value: "(Outfielders)",
            },
            {
              count: "one (1)",
              countD: 1,
              title: "Team Defense",
              value: "",
            }
          ]
        },
        {
          type: "NFL",
          heading: "The 8 roster positions:",
          teamRoster: [
            {
              count: "one (1)",
              countD: 1,
              title: "QB",
              value: "(Quarterback)",
            },
            {
              count: "two (2)",
              countD: 2,
              title: "RB",
              value: "(Running Backs)",
            },
            {
              count: "two (2)",
              countD: 2,
              title: "WR",
              value: "(Wide Receivers)",
            },
            {
              count: "one (1)",
              countD: 1,
              title: "TE",
              value: "(Tight End)",
            },
            {
              count: "one (1)",
              countD: 1,
              title: "K",
              value: "(Kicker)",
            },
            {
              count: "one (1)",
              countD: 1,
              title: "Team Defense",
              value: "",
            }
          ]
        },
        {
          type: "NHL",
          heading: "The 8 roster positions:",
          teamRoster: [
            {
              count: "one (1)",
              countD: 1,
              title: "C",
              value: "(Center)",
            },
            {
              count: "three (3)",
              countD: 3,
              title: "XW",
              value: "(Wingers)",
            },
            {
              count: "two (2)",
              countD: 2,
              title: "D",
              value: "(Defensemen)",
            },
            {
              count: "one (1)",
              countD: 1,
              title: "G",
              value: "(Goalie)",
            },
            {
              count: "one (1)",
              countD: 1,
              title: "Team Defense",
              value: "",
            }
          ]
        },
        {
          type: "NBA",
          heading: "The 8 roster positions:",
          teamRoster: [
            {
              count: "one (1)",
              countD: 1,
              title: "C",
              value: "(Center)",
            },
            {
              count: "two (2)",
              countD: 2,
              title: "PG",
              value: "(Point Guard)",
            },
            {
              count: "two (2)",
              countD: 2,
              title: "SG",
              value: "(Shooting Guard)",
            },
            {
              count: "two (2)",
              countD: 2,
              title: "F",
              value: "(Small/Power Forward)",
            },
            {
              count: "one (1)",
              countD: 1,
              title: "Team Defense",
              value: "",
            }
          ]
        },
    ];
    let finalRoasterData = teamRoasterData[teamRoasterData.findIndex(x => x.type == league)];
    const groupedPoints = _.groupBy(PointsSystem, 'type');
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const test = () => {
        window.addEventListener('DOMContentLoaded', () => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    const id = entry.target.getAttribute('id');
                    if (entry.intersectionRatio > 0) {
                        document.querySelector(`nav li a[href="#${id}"]`)?.parentElement.classList.add('active');
                    } else {
                        document.querySelector(`nav li a[href="#${id}"]`)?.parentElement.classList.remove('active');
                    }
                });
            });
        
            // Track all sections that have an `id` applied
            document.querySelectorAll('section[id]').forEach((section) => {
                observer.observe(section);
            });
            
        });
    };
    const nth = function(d) {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    }
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
    let n;
    function inWords (num) {
        if ((num = num.toString()).length > 9) return 'overflow';
        n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
        return str;
    }
    const startDate = new Date(game_set_start);
    const startDateString = `${days[startDate.getUTCDay()]}, ${month[startDate.getUTCMonth()]} ${startDate.getUTCDate() +nth(startDate.getUTCDate())}, ${startDate.getUTCFullYear()}`;
    const endDate = new Date(end_date);
    const endDateString = `${days[endDate.getUTCDay()]}, ${month[endDate.getUTCMonth()]} ${endDate.getUTCDate() +nth(endDate.getUTCDate())}, ${endDate.getUTCFullYear()}`;
    useEffect(() => {
        test();
    }, []);
    const toggleSection = (id) => {
        let elem = document.getElementById(id);
        if (elem.style.display !== "none") {  
            elem.style.display = "none";  
        }  
        else {  
            elem.style.display = "block";  
        }  
    };
    return (
        
        <div>
            <Header isStick={true} />
            {!isMobile ? (
                <main className={styles.ContestRulesPageDesktop}>
                <nav class="section-nav nav">
                <ol>
                    <li><a onClick={() => {document.getElementById('point1').scrollIntoView();}}>1. Entry Period & Content Sponsor.</a></li>
                    <li><a onClick={() => {document.getElementById('point2').scrollIntoView();}}>2. HOW TO ENTER AND PARTICIPATE</a></li>
                    <li><a onClick={() => {document.getElementById('point3').scrollIntoView();}}>3. THE CONTEST GAME</a></li>
                    <li><a onClick={() => {document.getElementById('point4').scrollIntoView();}}>4. CONDITIONS OF ENTRY</a></li>
                    <li><a onClick={() => {document.getElementById('point5').scrollIntoView();}}>5. ELIGIBILITY</a></li>
                    <li><a onClick={() => {document.getElementById('point6').scrollIntoView();}}>6. PRIZE DESCRIPTION</a></li>
                    <li><a onClick={() => {document.getElementById('point7').scrollIntoView();}}>7. GENERAL PRIZE CONDITIONS.</a></li>
                    <li><a onClick={() => {document.getElementById('point8').scrollIntoView();}}>8. ODDS OF WINNING</a></li>
                    <li><a onClick={() => {document.getElementById('point9').scrollIntoView();}}>9. WINNER SELECTION / NOTIFICATION</a></li>
                    <li><a onClick={() => {document.getElementById('point10').scrollIntoView();}}>10. RELEASE OF LIABILITY, INDEMNITY</a></li>
                    <li><a onClick={() => {document.getElementById('point11').scrollIntoView();}}>11. CONSENT TO PUBLICITY</a></li>
                    <li><a onClick={() => {document.getElementById('point12').scrollIntoView();}}>12. LIMITATION OF LIABILITY</a></li>
                    <li><a onClick={() => {document.getElementById('point13').scrollIntoView();}}>13. PRIVACY</a></li>
                    <li><a onClick={() => {document.getElementById('point14').scrollIntoView();}}>14. GENERAL</a></li>
                </ol>
        </nav>
                <div className={styles.contentPart}>
    
            <h1>Contest Rules</h1>
            <p>(the "Official Rules") PowerPlay Systems – {league} {game_type === "PowerdFs_challenge" ? "Fantasy Point Challenge" : "Fantasy Manager Challenge" } Contest (the "Contest")</p>
            
            <section id="point1">
                <h2>1. ENTRY PERIOD & CONTEST SPONSOR.</h2>
                <ol>
                <li>The Contest is brought to you by the following entity (the "Contest Sponsor"): PowerPlay Systems Inc.</li> 
                <li>The contest entry period (the "Entry Period") starts at {start_time} on {startDateString} and continues until the conclusion of the games that started on {startDateString}. All times referenced in these Official Rules are Eastern Time (ET).</li>
                </ol>
            </section>
            <section id="point2">
                <h2>2. HOW TO ENTER AND PARTICIPATE</h2>
                <p className={styles.light}>No purchase necessary to enter this Contest. Entry is subject to these OfficialRules, including without limitation the conditions of entry set forth below.</p>
                <ol>
                    <li>
                    During the Entry Period, go to defygames.io and proceed to the PowerCenter (the "Contest Website") and follow the instructions to enter the “PowerdFS {powerdfs_challenge_amount} Point Challenge Contest”. Enter the game by clicking “Enter’ and proceed to pick and submit your selections from the {league} Player Selection page. Then during the live {league} games starting on {startDateString} at {start_time} ET, visit My Game Center to play the game as set out in section 3 of these Official Rules (the "Contest Game"). Participants may be eligible to win a prize in this Contest depending on the ‘My Score’ point total of eachparticipant via his/her participation in the Contest as set put in section 6 of these official riles (the “Prize Description” section). A participant may not create more than one Contest profile.
                    </li>
                    <li>
                    <b>ENTRY LIMIT</b>: One (1) entry per person, per email address. By way of illustration, if two (2) or more otherwise eligible individuals share a single email address, only one (1) of them may create a profile; and, if an eligible individual has multiple email addresses, he or she may only have one profile.
                    </li>
                    <li>
                    Any attempt or suspected attempt to enter this Contest in a fashion not authorized by these Official Rules shall be deemed to be tampering and will void all of your entries. Entries that contain false information and/or are late, lost, stolen, falsified, illegible, damaged,misdirected, mutilated, garbled or incomplete, altered or otherwise irregular or entries that have been submitted using robotic, automated, programmed, or through illicit means, or that do not conform with or satisfy any or all of these Official Rules, as determined in the Contest Sponsor’s absolute discretion, will be judged null and void and disqualified. Only entries received by the Contest Sponsor will be considered. Proof of entry transmission shallnot constitute proof of receipt. The Contest Sponsor reserves the right to refuse any entry in their absolute discretion. The sole determinant of time for valid online entry in this Contest will be the Contest website's server machine(s).
                    </li>
                    <li>
                    Although this Contest may be communicated, promoted, or administered by means of any third party social media or social networking service or site (each, a "Third Party Service"), entrants acknowledge that: (i) this Contest is not sponsored, endorsed or administered by, or associated with, any Third Party Service; (ii) if entry into this Contest is by means of a Third Party Service, entrants must have a valid account with the applicable Third Party Service (and may be required to have a public (i.e. non-private) account in order to participate) and must comply with the applicable Third Party Service’s terms and policies; and (iii) any questions, comments or complaints regarding this Contest should be directed to the Contest Sponsor and not to any Third Party Service. By participating in this Contest, you completely release anyThird-Party Service of all liability in relation to any injury, damage orloss that may occur, directly or indirectly, in whole or in part, from your participation.
                    </li>
                </ol>
            </section>
            <section id="point3">
                <h2>3. THE CONTEST GAME</h2>
                <ol>
                    <li>
                    The Contest is based on the statistics from all {league} baseball games played on the contest game date starting on Saturday, {startDateString}, and ending on or about {endDateString}, when all {league} games have concluded. </li>
                    <li>Each participant's objective is to accumulate {powerdfs_challenge_amount} or more ‘My Points’ in the Contest via his/her selection of a fantasy baseball team, as described below.</li>
                    <li>Each participant's fantasy football team must consist of 7 players and 1 team defense: 
                        {finalRoasterData.teamRoster.map((item) => {
                            if(item.title !== "Team Defense")
                                return item.count + " " + item.value.replace("(","").replace(")","") + " " + "(\"" + item.title +"\"),";
                            else
                                return item.count + " " + item.value.replace("(","").replace(")","") + " " + item.title;
                        })}
                        . This will be the participants team. High performing players and high performing team defences (based on season-to-date performance or expected performance) available to be chosen for each position will be assigned a Star Power label. A participant's selections must not exceed 3 Premium selections.</li>
                    <li>The Contest Sponsor reserves the right to add fantasy baseball players during the Contest leading up to the start of the Contest. </li>
                    <li>The deadline for entering and/or changing fantasy football players (the "Selection Deadline") will be posted on the Selection Page. The Selection Deadline is {startDateString} at {start_time} ET, subject to change in the event of a change in the {league} schedule. No submissions will be accepted by the Contest Sponsor for any reason after the Selection Deadline as posted on the Selections Page have transpired. Participants may change the players on their team any time before the Selection Deadline. Any picks received after the Selection Deadline will be void. The sole determinant of time for the purposes of the Contest will be the Contest Website servers.</li>
                    <li>Point Scoring System
                        <div className={styles.tableHeader}>
                            <div className={styles.headerTitle}>
                                <span>Position</span>
                            </div> 
                            <div className={styles.headerTitle}>
                                <span>Scoring Play=Points</span>
                            </div>
                        </div>

                        {Object.entries(groupedPoints).map((key, value) => {
                            return key[1].map((item,index) => {
                                return (
                                    <div className={(index%2 !== 0) ? styles.tableRowEven : styles.tableRow}>
                                        <div className={styles.section}>
                                            <span>{item.plays}</span>
                                        </div> 
                                        <div className={styles.section}>
                                            <span>{item.action}{item.points} Pts</span>
                                        </div>
                                    </div>
                                );
                            });
                        })}
                    
                    
                    </li>
                    <li>
                    A participant's ranking in the Contest Period is determined by the number of ‘My Points’ that the participant accumulates during the Contest Period.</li>
                    <li>Unofficial results (the "Unofficial Results") will be posted on-line live during game play and will be final immediately following the completion of the {league} games with a start time occurring on {startDateString}. Winner postings will be deemed official fourteen (14) days after such posting. In the event of a discrepancy respecting an Unofficial Result, affected participants must notify the Contest Sponsor by emailing support@powerplaysystems.com within seven (7) calendar days after the applicable Unofficial Results Date. In the event of a discrepancy, the final draft results as posted on the game website shall be considered official and final. If no discrepancies have been received by the Contest Sponsor within seven (7) calendar days after the Unofficial Results Date, it will be assumed that the results are correct as posted, and the Unofficial Results will become official at that time (the "Official Results Date").</li>
                    <li>In the unlikely event that any {league} game is postponed, cancelled, delayed, suspended, or otherwise not completed on the originally scheduled date for the game, then a notice will be posted on the Contest Website as soon as reasonably possible to indicate how points potentially accumulated by the participant in respect of that game will be treated.
                    </li>
                </ol>
            </section>
            <section id="point4">
                <h2>4. CONDITIONS OF ENTRY</h2>
                <p className={styles.light}>By entering this Contest Game, you:</p>
                <ol>
                    <li>
                    agree to be bound by these Official Rules, including without limitation the eligibility requirements set forth below;</li>
                    <li>agree to be bound by the decisions of the Contest Sponsor and their representatives, whose decisions are final, binding and conclusive (without appeal) on all matters relating to the Contest Game;</li>
                    <li>represent and warrant that your entry, including any material comprising your entry (e.g. name, user name, profile picture, etc., as applicable) and any material submitted with your entry (e.g. photograph, video, written submission, or other form of submission, etc., as applicable) (collectively, the "Entry Material") (i) is original to you, and that you have all necessary rights in and to your Entry Material to enter the Contest, including, without limitation, the consentof any third parties whose personal information is included in your Entry Material, and (ii) does not contain, depict, include or involve content that is, or could reasonably be considered to be, inappropriate,unsuitable or offensive, as determined by the Contest Sponsor in their sole discretion;</li>
                    <li>understand and agree that: (i) your entry (including any Entry Material)may not be returned to you upon submission to the Contest and may be refused as entry to this Contest, as determined by the Contest Sponsor in their sole discretion; and (ii) the Contest Sponsor  may, in its absolute discretion, moderate and/or remove and/or edit any Entry Material, including to blur out any trademarks or to remove any copyrighted content or otherwise unsuitable content (as determined bythe Contest Sponsor);</li>
                    <li>grant to the Contest Sponsor a worldwide, royalty-free, irrevocable, non-exclusive, sub-licensable and unlimited licence to use your entry, including the Entry Material, in any media and for any purpose related to the Contest (or any substantially similar contest), including without limitation the right to use, reproduce, modify, adapt, translate, alter, orcreate derivative works from, the entry and/or Entry Material, without notification, compensation or additional consideration to you; and</li>
                    <li>waive all claims of moral rights in your entry and/or Entry Material and in any use thereof in accordance with these Official Rules.
                    </li>
                </ol>
            </section>
            <section id="point5">
                <h2>5. ELIGIBILITY</h2>
                <ol>
                    <li>
                    This Contest is open to residents of the United States and Canada (excluding residents of Quebec) who have reached the age of majority in their state or province of residence as of the date of entry.</li>
                    <li>The following individuals are not eligible to enter the Contest:
                        <ol type="a">
                            <li>
                            employees, officers, directors, agents, and representatives of: (1) the Contest Sponsor (2) any and all other companies associated with the Contest; and</li>
                            <li>a household member of any of the individuals listed in (i), above, whether or not related.</li>
                            <li>The parties acknowledge that the Contest Sponsor are not liable for payment or delivery of any prizes otherwise payable to participants who are in violationof this provision.
                            </li>
                        </ol>
                    </li>
                    <li>
                    The Contest Sponsor shall have the right at any time to require proof of identity and/or eligibility to enter the Contest. Failure to provide such proof may result in disqualification. All personal and other information requested by and supplied for the purpose of the Contest must be truthful, complete, accurate and in no way misleading. The Contest Sponsor reserve the right, in their sole discretion, to disqualify any entrant should such an entrant at any stage supply untruthful, incomplete, inaccurate, or misleading personal details and/or information.
                    </li>
                </ol>
            </section>
            <section id="point6">
                <h2>6. PRIZE DESCRIPTION</h2>
                <p className={styles.light}>There is a total of {inWords(prizes.length)} ({prizes.length}) prize available to be won in connection with this Contest, as more particularly set out below:</p>
                <ol type="a">
                    {prizes.map((item,index) => {
                        return (
                            <li>{inWords(item.prize)} ({item.prize}) eligible participant will have the opportunity to win the {index == 0 ? "grand prize" : (index+1)+nth(index+1)}, consisting of ${item.amount} USD;</li>
                        );
                    })}
                    <li>In the event of a tie, prizes will be split evenly</li>
                </ol>
                <p className={styles.light}>All potential winners will be contacted through the information provided by the participant at the time of entry.</p>
            </section>
            <section id="point7">
                <h2>7. GENERAL PRIZE CONDITIONS.</h2>
                <p className={styles.light}>The terms and conditions contained in this Section apply to any and all non-cash Contest prize(s) awarded pursuant to these Official Rules:</p>
                <ol type="a">
                    <li>No financial compensation will be made or required if actual prize value is lower than the total value quoted in these Official Rules.</li>
                    <li>Prize must be accepted as awarded, without substitution, transfer, exchange or assignment, unless otherwise determined in the absolute discretion of the Contest Sponsor and/or prize supplier(s). Prize may not be exactly as advertised. Except as expressly warranted herein, prize is provided "as is" without further warranty of any kind.</li>
                    <li>Any unused portion of the prize, once awarded, will be deemed forfeited by the applicable winner, and no financial compensation will be made or requiredin respect of such unused portion. Prize will not be replaced if lost, destroyed,mutilated, or stolen.</li>
                    <li>The Contest Sponsor and/or the prize supplier(s) reserve the right, in their absolute discretion, to substitute a prize or a component of a prize with a prize or a component of a prize (as applicable) of equal or greater value, including, without limitation, a monetary award, if the prize or prize componentcannot be awarded by the Contest Sponsor and/or the prize supplier(s) for any reason.</li>
                    <li>Once awarded, prize may not be resold or commercially traded in any manner, directly or indirectly, and Contest Sponsor reserve the right to ban or disqualify any entrant from any contest, including future contests, should it reasonably believe such entrant to have acted or attempted to act in contravention of the foregoing restriction.</li>
                </ol>
            </section>
            <section id="point8">
                <h2>8. ODDS OF WINNING</h2>
                <p className={styles.light}>Odds of winning this Contest depend on the number of contest entries, the number of points generated by each participant's player selections, and in-game use of Powers while playing the Contest Game.</p>
            </section>
            <section id="point9">
                <h2>9. WINNER SELECTION / NOTIFICATION</h2>
                <ol type="a">
                    <li>The participant accumulating {powerdfs_challenge_amount} or more My Points during the Contest Period will be eligible to win one (1) Grand Prize. In the event of a tie between participants, prizes will be divided equally. </li>
                    <li>Prizes will be distributed and delivered to the participants Defy Games Account immediately following competition of the {league} Games occurring on {startDateString}.</li>
                    <li>Decisions and rulings of the Contest Sponsor and/or their representatives are finaland binding without appeal in all matters related to this Contest and the awarding of a prize.</li>
                    <li>To be declared a winner, a potential winner must be in full compliance with these Official Rules; and, in the discretion of the Contest Sponsor, sign and return a release of liability and consent to publicity form (the "Release Form") within the period specified in the Release Form, and any other documentation as may reasonably be required by the Contest Sponsor in their absolute discretion.</li>
                    <li>A potential winner may be required to provide proof of identification to the ContestSponsor when claiming a prize or otherwise in connection with this Contest to facilitate the Contest Sponsor’s accurate identification of a Contest winner.</li>
                    <li>If a potential winner does not fulfill the conditions set out in these Official Rules, ordeclines or forfeits a Contest prize, the Contest Sponsor reserves the right, in theirabsolute discretion, to cancel the Contest prize or to select another entrant from the remaining eligible entries pursuant to the process described above.</li>
                </ol>
            </section>
            <section id="point10">
                <h2>10. RELEASE OF LIABILITY, INDEMNITY</h2>
                <p className={styles.light}>By entering this Contest, you: (a) agree to remise, release and forever discharge theContest Sponsor, any affiliated companies, any and all other companies associated with the Contest (including prize suppliers and suppliers of materials or services related to the Contest), and all of their respective employees, directors, officers, shareholders, agents, representatives, successors and assigns (collectively, the "Releasees") from any and all actions, causes of action, suits, debts, dues, accounts, claims, damages or liability for any loss, harm, damages, costs or expenses, including, without limitation, costs or losses related to personal injuries, death, damage to, loss or destruction of property, and rights of publicity, personality, privacy and/or intellectual property (each, a "Claim") arising out of, or in any way related to, your participation in the Contest and/or the awarding, receipt, possession,use and/or misuse of any Contest prize (or any portion thereof), or any travel or activity that is related to the receipt or use of any Contest prize; and (b) agree to indemnify and hold harmless each of the Releasees from and against any and all Claims arising from (i) your breach of these Official Rules, including the breach of any representations or warranties contained herein, (ii) your participation in the Contest, (iii) your acceptance, possession, use and/or misuse of any Contest prize (or any portion thereof), if applicable, or (iv) the use of any Entry Material in accordance with the rights granted in these Official Rules.</p>
            </section>
            <section id="point11">
                <h2>11. CONSENT TO PUBLICITY</h2>
                <p className={styles.light}>By accepting a Contest prize, if applicable, you authorize the Contest Sponsor and each of their respective licensees, successors, assigns, agents, representatives and employees the right, licence and permission to record, photograph and/or otherwise capture or document you and/or your likeness, including without limitation your voiceand any statements you may make regarding the Contest prize, by any available </p>
                <p className={styles.light}>means, and to use any such recordings, photographs or documents, as well as your image and/or likeness appearing therein, and your biographical information, including your name, city and province/territory/state of residence, throughout the world, in all manner and media, whether now known or hereafter devised, for advertising or promotional purposes relating to the Contest (or any substantially similar contest), without limitation and without compensation or additional consideration, notification, or permission of any kind, unless prohibited by law; and you waive any rights that you may have or that may otherwise exist in respect of anymaterials produced pursuant to the foregoing, including without limitation rights of inspection, approval, compensation, additional consideration or notification, and moral rights.</p>
            </section>
            <section id="point12">
                <h2>12. LIMITATION OF LIABILITY</h2>
                <p className={styles.light}>The Releasees are not responsible for: (a) stolen, late, incomplete, illegible, inaccurate, misdirected, lost, misrouted, scrambled, damaged, delayed, undelivered,mutilated, postage-due or garbled entries, transmissions, email or mail; (b) lost, interrupted or unavailable network, cable, satellite, server, Internet Service Provider, website, or other connections, including those through and/or by any website; (c) jumbled, scrambled, delayed, or misdirected transmissions or computer hardware or software malfunctions, failures or difficulties; (d) failures or malfunctions of phones, phone lines or telephone systems, any error, omission, interruption, defect or delay in transmission, processing, or communication; (e) non-delivered, misdirected, blocked, or delayed email notifications; (f) printing, typographical or other errors appearing within these Official Rules, in any Contest-related advertisements or othermaterials; or (g) any other errors, problems or difficulties of any kind, whether human, mechanical, electronic, network, computer, telephone, mail, typographical, printing or otherwise relating to or in connection with this Contest, including, without limitation, errors or difficulties which may occur in connection with the administration of the Contest, the processing of entries, the announcement of the prize or in any Contest-related materials, or the cancellation or postponement of any event. The Releasees are also not responsible for any incorrect or inaccurate information, including without limitation where caused by website users, tampering, hacking, or by any equipment or programming associated with or utilized in the Contest. The Releasees are not responsible for injury or damage to participants' or to any other person's computer related to or resulting from participation in this Contest or downloading materials from or use of any website.</p>
            </section>
            <section id="point13">
                <h2>13. PRIVACY</h2>
                <p className={styles.light}>By entering this Contest, each entrant consents to the collection, use, and disclosureof his/her personal information for the purposes and in the manner described herein.All information submitted by entrants is being collected by the Contest Sponsor and is subject to The Draft Network’s  Privacy Policy, available at</p>
                <p className={styles.light}><a href="https://thedraftnetwork.com/privacy" target="_blank" style={{color: "#688fbd"}}>https://thedraftnetwork.com/privacy</a></p>
                <p className={styles.light}>Online entrants may be given the option to receive commercial emails and/or other communications from the Contest Sponsor; however, eligibility to participate in the Contest is not dependent upon an entrant's consent to receive any such emails and communications, and consenting to receiving such emails and communications will not impact an entrant's chances of winning. The Contest Sponsor will not send informational or marketing communications to entrants, unless entrants expressly consent to receive such communications through an opt-in mechanism. Entrants may at any time opt out of receiving such materials by following the unsubscribe instructions provided at the bottom of any of these communications. Please consult The Draft Network’s Privacy Policy referenced above for further information on how the Contest Sponsor collect, use, and disclose personal information. Any questions or concerns with respect to communications from the Contest Sponsor may be addressed to TDNcontestsupport@powerplaysystems.com.In connection with prize fulfillment, the Contest Sponsor may be required to provide your personal information to another party. By entering the Contest, you consent to such disclosure of your personal information in connection with the foregoing, and you understand and agree that, should your personal information be provided to another party, your information will be subject to that party's privacy policy and information handling standards and practices.</p>
            </section>
            <section id="point14">
                <h2>14. GENERAL</h2>
                <ol>
                    <li>
                    <span style={{color: '#fb6e00', fontWeight: "bold"}}>LAWS AND RULES</span>. This Contest will be run in accordance with these Official Rules, which shall be subject to amendment by the Contest Sponsor without notice or liability to you. You must comply with these Official Rules and will be deemed to have received and understood these Official Rules by participating or attempting to participate in this Contest. The terms of this Contest, as set out in these Official Rules, are not subject to amendment or counter-offer, except as setout herein. This Contest is subject to all applicable federal, state and municipal laws and regulations. These Official Rules are governed exclusively by the laws of the state in which you reside, and you submit to the exclusive jurisdiction of the courts of such state. Rights and remedies may vary by state.</li>
                    <li><span style={{color: '#fb6e00', fontWeight: "bold"}}>CANCEL AND AMEND</span>. The Contest Sponsor reserve the right to cancel, modify, or suspend this Contest or to amend these Official Rules at any time and in any way, without prior notice, for any reason whatsoever. Without limiting the foregoing, if for any reason the Contest is not capable of running as originally planned, for example as a result of tampering or infection by computer virus, bug,corruption, security breach or other cause beyond the reasonable control of the Contest Sponsor, the Contest Sponsor reserve the right to cancel or suspend theContest.</li>
                    <li><span style={{color: '#fb6e00', fontWeight: "bold"}}>CONDUCT</span>. The Contest Sponsor reserve the right, in their absolute discretion, to disqualify without notice, and/or ban from this Contest and any future contests,any entrant that they find to be: violating these Official Rules; tampering or attempting to tamper with the entry process or the operation of the Contest or any Contest website; acting in an unsportsmanlike or disruptive manner, or with the intent to annoy, abuse, threaten or harass any other person; or attempting to undermine the legitimate operation of the Contest. Any attempt by an entrant or any other individual to undermine the legitimate operation of this Contest may be a violation of criminal and/or civil laws. Should any such attempt be made, the Contest Sponsor reserve the right to seek remedies and damages to the fullest extent permitted by law, including criminal prosecution.</li>
                    <li><span style={{color: '#fb6e00', fontWeight: "bold"}}>IDENTITY OF ONLINE ENTRANT</span>. If a dispute arises regarding the identity of any online entrant, the applicable entry will be deemed to have been submitted by the authorized individual at the time of entry. An entrant may be required to provide proof that he or she is the authorized individual associated with a particular entry. The individual assigned by an Internet access provider, online service provider, or other organization responsible for assigning the applicable type of account is considered the authorized account holder. Whether or not an individual constitutes the authorized account holder in question will be determined by the Contest Sponsor in their sole discretion; and, if the name of the authorized account holder does not accord with the full name provided at the time of entry, the applicable entry may be disqualified in the Contest Sponsor absolute discretion.
                    </li>
                </ol>
            </section>
        </div>
        
                </main>
            ) : (
                <div className={styles.mobileContestRules}>
                    <button onClick={() => toggleSection("point1")}>1. Entry Period & Content Sponsor.</button>
                    <section id="point1" style={{display: "none"}}>
                    <h1>Contest Rules</h1>
                    <p>(the "Official Rules") PowerPlay Systems – {league} Fantasy Point Challenge Contest (the "Contest")</p>
                    <h2>1. ENTRY PERIOD & CONTEST SPONSOR.</h2>
                    <ol>
                    <li>The Contest is brought to you by the following entity (the "Contest Sponsor"): PowerPlay Systems Inc.</li> 
                    <li>The contest entry period (the "Entry Period") starts at {start_time} on {startDateString} and continues until the conclusion of the games that started on {startDateString}. All times referenced in these Official Rules are Eastern Time (ET).</li>
                    </ol>
                    </section>
                    <button onClick={() => toggleSection("point2")}>2. HOW TO ENTER AND PARTICIPATE</button>
                    <section id="point2"  style={{display: "none"}}>
                        <h2>2. HOW TO ENTER AND PARTICIPATE</h2>
                        <p className={styles.light}>No purchase necessary to enter this Contest. Entry is subject to these OfficialRules, including without limitation the conditions of entry set forth below.</p>
                        <ol>
                            <li>
                            During the Entry Period, go to defygames.io and proceed to the PowerCenter (the "Contest Website") and follow the instructions to enter the “PowerdFS {powerdfs_challenge_amount} Point Challenge Contest”. Enter the game by clicking “Enter’ and proceed to pick and submit your selections from the {league} Player Selection page. Then during the live {league} games starting on {startDateString} at {start_time} ET, visit My Game Center to play the game as set out in section 3 of these Official Rules (the "Contest Game"). Participants may be eligible to win a prize in this Contest depending on the ‘My Score’ point total of eachparticipant via his/her participation in the Contest as set put in section 6 of these official riles (the “Prize Description” section). A participant may not create more than one Contest profile.
                            </li>
                            <li>
                            <b>ENTRY LIMIT</b>: One (1) entry per person, per email address. By way of illustration, if two (2) or more otherwise eligible individuals share a single email address, only one (1) of them may create a profile; and, if an eligible individual has multiple email addresses, he or she may only have one profile.
                            </li>
                            <li>
                            Any attempt or suspected attempt to enter this Contest in a fashion not authorized by these Official Rules shall be deemed to be tampering and will void all of your entries. Entries that contain false information and/or are late, lost, stolen, falsified, illegible, damaged,misdirected, mutilated, garbled or incomplete, altered or otherwise irregular or entries that have been submitted using robotic, automated, programmed, or through illicit means, or that do not conform with or satisfy any or all of these Official Rules, as determined in the Contest Sponsor’s absolute discretion, will be judged null and void and disqualified. Only entries received by the Contest Sponsor will be considered. Proof of entry transmission shallnot constitute proof of receipt. The Contest Sponsor reserves the right to refuse any entry in their absolute discretion. The sole determinant of time for valid online entry in this Contest will be the Contest website's server machine(s).
                            </li>
                            <li>
                            Although this Contest may be communicated, promoted, or administered by means of any third party social media or social networking service or site (each, a "Third Party Service"), entrants acknowledge that: (i) this Contest is not sponsored, endorsed or administered by, or associated with, any Third Party Service; (ii) if entry into this Contest is by means of a Third Party Service, entrants must have a valid account with the applicable Third Party Service (and may be required to have a public (i.e. non-private) account in order to participate) and must comply with the applicable Third Party Service’s terms and policies; and (iii) any questions, comments or complaints regarding this Contest should be directed to the Contest Sponsor and not to any Third Party Service. By participating in this Contest, you completely release anyThird-Party Service of all liability in relation to any injury, damage orloss that may occur, directly or indirectly, in whole or in part, from your participation.
                            </li>
                        </ol>
                    </section>
                    <button onClick={() => toggleSection("point3")}>3. THE CONTEST GAME</button>
                    <section id="point3"  style={{display: "none"}}>
                        <h2>3. THE CONTEST GAME</h2>
                        <ol>
                            <li>
                            The Contest is based on the statistics from all {league} baseball games played on the contest game date starting on Saturday, {startDateString}, and ending on or about {endDateString}, when all {league} games have concluded. </li>
                            <li>Each participant's objective is to accumulate {powerdfs_challenge_amount} or more ‘My Points’ in the Contest via his/her selection of a fantasy baseball team, as described below.</li>
                            <li>Each participant's fantasy football team must consist of 7 players and 1 team defense: 
                            {finalRoasterData.teamRoster.map((item) => {
                                if(item.title !== "Team Defense")
                                    return item.count + " " + item.value.replace("(","").replace(")","") + " " + "(\"" + item.title +"\"),";
                                else
                                    return item.count + " " + item.value.replace("(","").replace(")","") + " " + item.title;
                            })}
                                . This will be the participants team. High performing players and high performing team defences (based on season-to-date performance or expected performance) available to be chosen for each position will be assigned a Star Power label. A participant's selections must not exceed 3 Premium selections.</li>
                            <li>The Contest Sponsor reserves the right to add fantasy baseball players during the Contest leading up to the start of the Contest. </li>
                            <li>The deadline for entering and/or changing fantasy football players (the "Selection Deadline") will be posted on the Selection Page. The Selection Deadline is {startDateString} at {start_time} ET, subject to change in the event of a change in the {league} schedule. No submissions will be accepted by the Contest Sponsor for any reason after the Selection Deadline as posted on the Selections Page have transpired. Participants may change the players on their team any time before the Selection Deadline. Any picks received after the Selection Deadline will be void. The sole determinant of time for the purposes of the Contest will be the Contest Website servers.</li>
                            <li>Point Scoring System
                                <div className={styles.tableHeader}>
                                    <div className={styles.headerTitle}>
                                        <span>Position</span>
                                    </div> 
                                    <div className={styles.headerTitle}>
                                        <span>Scoring Play=Points</span>
                                    </div>
                                </div>
                                {Object.entries(groupedPoints).map((key, value) => {
                                    return key[1].map((item,index) => {
                                        return (
                                            <div className={(index%2 !== 0) ? styles.tableRowEven : styles.tableRow}>
                                                <div className={styles.section}>
                                                    <span>{item.plays}</span>
                                                </div> 
                                                <div className={styles.section}>
                                                    <span>{item.action}{item.points} Pts</span>
                                                </div>
                                            </div>
                                        );
                                    });
                                })}
                            </li>
                            <li>
                            A participant's ranking in the Contest Period is determined by the number of ‘My Points’ that the participant accumulates during the Contest Period.</li>
                            <li>Unofficial results (the "Unofficial Results") will be posted on-line live during game play and will be final immediately following the completion of the {league} games with a start time occurring on {startDateString}. Winner postings will be deemed official fourteen (14) days after such posting. In the event of a discrepancy respecting an Unofficial Result, affected participants must notify the Contest Sponsor by emailing support@powerplaysystems.com within seven (7) calendar days after the applicable Unofficial Results Date. In the event of a discrepancy, the final draft results as posted on the game website shall be considered official and final. If no discrepancies have been received by the Contest Sponsor within seven (7) calendar days after the Unofficial Results Date, it will be assumed that the results are correct as posted, and the Unofficial Results will become official at that time (the "Official Results Date").</li>
                            <li>In the unlikely event that any {league} game is postponed, cancelled, delayed, suspended, or otherwise not completed on the originally scheduled date for the game, then a notice will be posted on the Contest Website as soon as reasonably possible to indicate how points potentially accumulated by the participant in respect of that game will be treated.
                            </li>
                        </ol>
                    </section>
                    <button onClick={() => toggleSection("point4")}>4. CONDITIONS OF ENTRY</button>
                    <section id="point4"  style={{display: "none"}}>
                        <h2>4. CONDITIONS OF ENTRY</h2>
                        <p className={styles.light}>By entering this Contest Game, you:</p>
                        <ol>
                            <li>
                            agree to be bound by these Official Rules, including without limitation the eligibility requirements set forth below;</li>
                            <li>agree to be bound by the decisions of the Contest Sponsor and their representatives, whose decisions are final, binding and conclusive (without appeal) on all matters relating to the Contest Game;</li>
                            <li>represent and warrant that your entry, including any material comprising your entry (e.g. name, user name, profile picture, etc., as applicable) and any material submitted with your entry (e.g. photograph, video, written submission, or other form of submission, etc., as applicable) (collectively, the "Entry Material") (i) is original to you, and that you have all necessary rights in and to your Entry Material to enter the Contest, including, without limitation, the consentof any third parties whose personal information is included in your Entry Material, and (ii) does not contain, depict, include or involve content that is, or could reasonably be considered to be, inappropriate,unsuitable or offensive, as determined by the Contest Sponsor in their sole discretion;</li>
                            <li>understand and agree that: (i) your entry (including any Entry Material)may not be returned to you upon submission to the Contest and may be refused as entry to this Contest, as determined by the Contest Sponsor in their sole discretion; and (ii) the Contest Sponsor  may, in its absolute discretion, moderate and/or remove and/or edit any Entry Material, including to blur out any trademarks or to remove any copyrighted content or otherwise unsuitable content (as determined bythe Contest Sponsor);</li>
                            <li>grant to the Contest Sponsor a worldwide, royalty-free, irrevocable, non-exclusive, sub-licensable and unlimited licence to use your entry, including the Entry Material, in any media and for any purpose related to the Contest (or any substantially similar contest), including without limitation the right to use, reproduce, modify, adapt, translate, alter, orcreate derivative works from, the entry and/or Entry Material, without notification, compensation or additional consideration to you; and</li>
                            <li>waive all claims of moral rights in your entry and/or Entry Material and in any use thereof in accordance with these Official Rules.
                            </li>
                        </ol>
                    </section>
                    <button onClick={() => toggleSection("point5")}>5. ELIGIBILITY</button>
                    <section id="point5"  style={{display: "none"}}>
                        <h2>5. ELIGIBILITY</h2>
                        <ol>
                            <li>
                            This Contest is open to residents of the United States and Canada (excluding residents of Quebec) who have reached the age of majority in their state or province of residence as of the date of entry.</li>
                            <li>The following individuals are not eligible to enter the Contest:
                                <ol type="a">
                                    <li>
                                    employees, officers, directors, agents, and representatives of: (1) the Contest Sponsor (2) any and all other companies associated with the Contest; and</li>
                                    <li>a household member of any of the individuals listed in (i), above, whether or not related.</li>
                                    <li>The parties acknowledge that the Contest Sponsor are not liable for payment or delivery of any prizes otherwise payable to participants who are in violationof this provision.
                                    </li>
                                </ol>
                            </li>
                            <li>
                            The Contest Sponsor shall have the right at any time to require proof of identity and/or eligibility to enter the Contest. Failure to provide such proof may result in disqualification. All personal and other information requested by and supplied for the purpose of the Contest must be truthful, complete, accurate and in no way misleading. The Contest Sponsor reserve the right, in their sole discretion, to disqualify any entrant should such an entrant at any stage supply untruthful, incomplete, inaccurate, or misleading personal details and/or information.
                            </li>
                        </ol>
                    </section>
                    <button onClick={() => toggleSection("point6")}>6. PRIZE DESCRIPTION</button>
                    <section id="point6"  style={{display: "none"}}>
                        <h2>6. PRIZE DESCRIPTION</h2>
                        <p className={styles.light}>There is a total of {inWords(prizes.length)} ({prizes.length}) prize available to be won in connection with this Contest, as more particularly set out below:</p>
                        <ol type="a">
                            {prizes.map((item,index) => {
                                return (
                                    <li>{inWords(item.prize)} ({item.prize}) eligible participant will have the opportunity to win the {index == 0 ? "grand prize" : (index+1)+nth(index+1)}, consisting of ${item.amount} USD;</li>
                                );
                            })}
                            <li>In the event of a tie, prizes will be split evenly</li>
                        </ol>
                        <p className={styles.light}>All potential winners will be contacted through the information provided by the participant at the time of entry.</p>
                    </section>
                    <button onClick={() => toggleSection("point7")} >7. GENERAL PRIZE CONDITIONS.</button>
                    <section id="point7" style={{display: "none"}}>
                        <h2>7. GENERAL PRIZE CONDITIONS.</h2>
                        <p className={styles.light}>The terms and conditions contained in this Section apply to any and all non-cash Contest prize(s) awarded pursuant to these Official Rules:</p>
                        <ol type="a">
                            <li>No financial compensation will be made or required if actual prize value is lower than the total value quoted in these Official Rules.</li>
                            <li>Prize must be accepted as awarded, without substitution, transfer, exchange or assignment, unless otherwise determined in the absolute discretion of the Contest Sponsor and/or prize supplier(s). Prize may not be exactly as advertised. Except as expressly warranted herein, prize is provided "as is" without further warranty of any kind.</li>
                            <li>Any unused portion of the prize, once awarded, will be deemed forfeited by the applicable winner, and no financial compensation will be made or requiredin respect of such unused portion. Prize will not be replaced if lost, destroyed,mutilated, or stolen.</li>
                            <li>The Contest Sponsor and/or the prize supplier(s) reserve the right, in their absolute discretion, to substitute a prize or a component of a prize with a prize or a component of a prize (as applicable) of equal or greater value, including, without limitation, a monetary award, if the prize or prize componentcannot be awarded by the Contest Sponsor and/or the prize supplier(s) for any reason.</li>
                            <li>Once awarded, prize may not be resold or commercially traded in any manner, directly or indirectly, and Contest Sponsor reserve the right to ban or disqualify any entrant from any contest, including future contests, should it reasonably believe such entrant to have acted or attempted to act in contravention of the foregoing restriction.</li>
                        </ol>
                    </section>
                    <button onClick={() => toggleSection("point8")}>8. ODDS OF WINNING</button>
                    <section id="point8" style={{display: "none"}}>
                        <h2>8. ODDS OF WINNING</h2>
                        <p className={styles.light}>Odds of winning this Contest depend on the number of contest entries, the number of points generated by each participant's player selections, and in-game use of Powers while playing the Contest Game.</p>
                    </section>
                    <button onClick={() => toggleSection("point9")}>9. WINNER SELECTION / NOTIFICATION</button>
                    <section id="point9" style={{display: "none"}}>
                        <h2>9. WINNER SELECTION / NOTIFICATION</h2>
                        <ol type="a">
                            <li>The participant accumulating {powerdfs_challenge_amount} or more My Points during the Contest Period will be eligible to win one (1) Grand Prize. In the event of a tie between participants, prizes will be divided equally. </li>
                            <li>Prizes will be distributed and delivered to the participants Defy Games Account immediately following competition of the {league} Games occurring on {startDateString}.</li>
                            <li>Decisions and rulings of the Contest Sponsor and/or their representatives are finaland binding without appeal in all matters related to this Contest and the awarding of a prize.</li>
                            <li>To be declared a winner, a potential winner must be in full compliance with these Official Rules; and, in the discretion of the Contest Sponsor, sign and return a release of liability and consent to publicity form (the "Release Form") within the period specified in the Release Form, and any other documentation as may reasonably be required by the Contest Sponsor in their absolute discretion.</li>
                            <li>A potential winner may be required to provide proof of identification to the ContestSponsor when claiming a prize or otherwise in connection with this Contest to facilitate the Contest Sponsor’s accurate identification of a Contest winner.</li>
                            <li>If a potential winner does not fulfill the conditions set out in these Official Rules, ordeclines or forfeits a Contest prize, the Contest Sponsor reserves the right, in theirabsolute discretion, to cancel the Contest prize or to select another entrant from the remaining eligible entries pursuant to the process described above.</li>
                        </ol>
                    </section>
                    <button onClick={() => toggleSection("point10")}>10. RELEASE OF LIABILITY, INDEMNITY</button>
                    <section id="point10" style={{display: "none"}}>
                        <h2>10. RELEASE OF LIABILITY, INDEMNITY</h2>
                        <p className={styles.light}>By entering this Contest, you: (a) agree to remise, release and forever discharge theContest Sponsor, any affiliated companies, any and all other companies associated with the Contest (including prize suppliers and suppliers of materials or services related to the Contest), and all of their respective employees, directors, officers, shareholders, agents, representatives, successors and assigns (collectively, the "Releasees") from any and all actions, causes of action, suits, debts, dues, accounts, claims, damages or liability for any loss, harm, damages, costs or expenses, including, without limitation, costs or losses related to personal injuries, death, damage to, loss or destruction of property, and rights of publicity, personality, privacy and/or intellectual property (each, a "Claim") arising out of, or in any way related to, your participation in the Contest and/or the awarding, receipt, possession,use and/or misuse of any Contest prize (or any portion thereof), or any travel or activity that is related to the receipt or use of any Contest prize; and (b) agree to indemnify and hold harmless each of the Releasees from and against any and all Claims arising from (i) your breach of these Official Rules, including the breach of any representations or warranties contained herein, (ii) your participation in the Contest, (iii) your acceptance, possession, use and/or misuse of any Contest prize (or any portion thereof), if applicable, or (iv) the use of any Entry Material in accordance with the rights granted in these Official Rules.</p>
                    </section>
                    <button onClick={() => toggleSection("point11")}>11. CONSENT TO PUBLICITY</button>
                    <section id="point11" style={{display: "none"}}>
                        <h2>11. CONSENT TO PUBLICITY</h2>
                        <p className={styles.light}>By accepting a Contest prize, if applicable, you authorize the Contest Sponsor and each of their respective licensees, successors, assigns, agents, representatives and employees the right, licence and permission to record, photograph and/or otherwise capture or document you and/or your likeness, including without limitation your voiceand any statements you may make regarding the Contest prize, by any available </p>
                        <p className={styles.light}>means, and to use any such recordings, photographs or documents, as well as your image and/or likeness appearing therein, and your biographical information, including your name, city and province/territory/state of residence, throughout the world, in all manner and media, whether now known or hereafter devised, for advertising or promotional purposes relating to the Contest (or any substantially similar contest), without limitation and without compensation or additional consideration, notification, or permission of any kind, unless prohibited by law; and you waive any rights that you may have or that may otherwise exist in respect of anymaterials produced pursuant to the foregoing, including without limitation rights of inspection, approval, compensation, additional consideration or notification, and moral rights.</p>
                    </section>
                    <button onClick={() => toggleSection("point12")}>12. LIMITATION OF LIABILITY</button>
                    <section id="point12" style={{display: "none"}}>
                        <h2>12. LIMITATION OF LIABILITY</h2>
                        <p className={styles.light}>The Releasees are not responsible for: (a) stolen, late, incomplete, illegible, inaccurate, misdirected, lost, misrouted, scrambled, damaged, delayed, undelivered,mutilated, postage-due or garbled entries, transmissions, email or mail; (b) lost, interrupted or unavailable network, cable, satellite, server, Internet Service Provider, website, or other connections, including those through and/or by any website; (c) jumbled, scrambled, delayed, or misdirected transmissions or computer hardware or software malfunctions, failures or difficulties; (d) failures or malfunctions of phones, phone lines or telephone systems, any error, omission, interruption, defect or delay in transmission, processing, or communication; (e) non-delivered, misdirected, blocked, or delayed email notifications; (f) printing, typographical or other errors appearing within these Official Rules, in any Contest-related advertisements or othermaterials; or (g) any other errors, problems or difficulties of any kind, whether human, mechanical, electronic, network, computer, telephone, mail, typographical, printing or otherwise relating to or in connection with this Contest, including, without limitation, errors or difficulties which may occur in connection with the administration of the Contest, the processing of entries, the announcement of the prize or in any Contest-related materials, or the cancellation or postponement of any event. The Releasees are also not responsible for any incorrect or inaccurate information, including without limitation where caused by website users, tampering, hacking, or by any equipment or programming associated with or utilized in the Contest. The Releasees are not responsible for injury or damage to participants' or to any other person's computer related to or resulting from participation in this Contest or downloading materials from or use of any website.</p>
                    </section>
                    <button onClick={() => toggleSection("point13")}>13. PRIVACY</button>
                    <section id="point13" style={{display: "none"}}>
                        <h2>13. PRIVACY</h2>
                        <p className={styles.light}>By entering this Contest, each entrant consents to the collection, use, and disclosureof his/her personal information for the purposes and in the manner described herein.All information submitted by entrants is being collected by the Contest Sponsor and is subject to The Draft Network’s  Privacy Policy, available at</p>
                        <p className={styles.light}><a href="https://thedraftnetwork.com/privacy" target="_blank" style={{color: "#688fbd"}}>https://thedraftnetwork.com/privacy</a></p>
                        <p className={styles.light}>Online entrants may be given the option to receive commercial emails and/or other communications from the Contest Sponsor; however, eligibility to participate in the Contest is not dependent upon an entrant's consent to receive any such emails and communications, and consenting to receiving such emails and communications will not impact an entrant's chances of winning. The Contest Sponsor will not send informational or marketing communications to entrants, unless entrants expressly consent to receive such communications through an opt-in mechanism. Entrants may at any time opt out of receiving such materials by following the unsubscribe instructions provided at the bottom of any of these communications. Please consult The Draft Network’s Privacy Policy referenced above for further information on how the Contest Sponsor collect, use, and disclose personal information. Any questions or concerns with respect to communications from the Contest Sponsor may be addressed to TDNcontestsupport@powerplaysystems.com.In connection with prize fulfillment, the Contest Sponsor may be required to provide your personal information to another party. By entering the Contest, you consent to such disclosure of your personal information in connection with the foregoing, and you understand and agree that, should your personal information be provided to another party, your information will be subject to that party's privacy policy and information handling standards and practices.</p>
                    </section>
                    <button onClick={() => toggleSection("point14")}>14. GENERAL</button>
                    <section id="point14" style={{display: "none"}}>
                        <h2>14. GENERAL</h2>
                        <ol>
                            <li>
                            <span style={{color: '#fb6e00', fontWeight: "bold"}}>LAWS AND RULES</span>. This Contest will be run in accordance with these Official Rules, which shall be subject to amendment by the Contest Sponsor without notice or liability to you. You must comply with these Official Rules and will be deemed to have received and understood these Official Rules by participating or attempting to participate in this Contest. The terms of this Contest, as set out in these Official Rules, are not subject to amendment or counter-offer, except as setout herein. This Contest is subject to all applicable federal, state and municipal laws and regulations. These Official Rules are governed exclusively by the laws of the state in which you reside, and you submit to the exclusive jurisdiction of the courts of such state. Rights and remedies may vary by state.</li>
                            <li><span style={{color: '#fb6e00', fontWeight: "bold"}}>CANCEL AND AMEND</span>. The Contest Sponsor reserve the right to cancel, modify, or suspend this Contest or to amend these Official Rules at any time and in any way, without prior notice, for any reason whatsoever. Without limiting the foregoing, if for any reason the Contest is not capable of running as originally planned, for example as a result of tampering or infection by computer virus, bug,corruption, security breach or other cause beyond the reasonable control of the Contest Sponsor, the Contest Sponsor reserve the right to cancel or suspend theContest.</li>
                            <li><span style={{color: '#fb6e00', fontWeight: "bold"}}>CONDUCT</span>. The Contest Sponsor reserve the right, in their absolute discretion, to disqualify without notice, and/or ban from this Contest and any future contests,any entrant that they find to be: violating these Official Rules; tampering or attempting to tamper with the entry process or the operation of the Contest or any Contest website; acting in an unsportsmanlike or disruptive manner, or with the intent to annoy, abuse, threaten or harass any other person; or attempting to undermine the legitimate operation of the Contest. Any attempt by an entrant or any other individual to undermine the legitimate operation of this Contest may be a violation of criminal and/or civil laws. Should any such attempt be made, the Contest Sponsor reserve the right to seek remedies and damages to the fullest extent permitted by law, including criminal prosecution.</li>
                            <li><span style={{color: '#fb6e00', fontWeight: "bold"}}>IDENTITY OF ONLINE ENTRANT</span>. If a dispute arises regarding the identity of any online entrant, the applicable entry will be deemed to have been submitted by the authorized individual at the time of entry. An entrant may be required to provide proof that he or she is the authorized individual associated with a particular entry. The individual assigned by an Internet access provider, online service provider, or other organization responsible for assigning the applicable type of account is considered the authorized account holder. Whether or not an individual constitutes the authorized account holder in question will be determined by the Contest Sponsor in their sole discretion; and, if the name of the authorized account holder does not accord with the full name provided at the time of entry, the applicable entry may be disqualified in the Contest Sponsor absolute discretion.
                            </li>
                        </ol>
                    </section>
                </div>
            )}
            
            <Footer isBlack={true} />
        </div>
    )
}
export default ContestRulesPage;