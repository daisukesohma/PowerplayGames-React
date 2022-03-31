import styles from './index.module.scss';
import { Link } from "react-router-dom";

const terms = [
    {
        title: 'DEFINITIONS',
        content: (
            <>
                <p><b>“Service(s)”</b> refers to products, games, contests, services, content, Defygames.io and/or other domains provided by PowerPlay Systems Inc.</p>
                <p><b>“Account”</b> means an Account you create when you access the Services.</p>
                <p><b>“Offers”</b> means special programs, including offers, excursions, and special gifts, both digital and tactile, that players may earn from time to time while using the Service.</p>
                <p><b>“Terms of Service”</b> or “Terms” means these terms of service.</p>
            </>
        )
    },
    {
        title: 'USER AGREEMENT',
        content: (
            <>
                <p>
                    PowerPlay Systems Inc. (hereafter referred to as ‘PowerPlay Systems’, “the Company”) owns and operates the Defy Games Website (defygames.io) that links to these Terms of Use.
                </p>
                <p>
                    We are pleased to offer you access to our Website and the ability to
                    participate in our contests of skill, other content, products,
                    Services, and promotions (collectively the "Services") that we may
                    provide from our Website, subject to these Terms of Use (the "Terms of
                    Use", or “Terms”), our privacy policy (the "Privacy Policy") and the
                    Official Rules and Regulations for the applicable games and promotions
                    (the "Rules" or "Rules and Scoring," and together with the Terms of
                    Use and the Privacy Policy, the "Agreements").
                </p>
            </>
        )
    },
    {
        title: 'CONSIDERATION',
        content: (
            <p>
                You agree to these Terms of Use by accessing or using the Website,
                registering for Services offered on the Website, or by accepting,
                uploading, submitting, or downloading any information or content from
                or to the Website. <br /> IF YOU DO NOT AGREE TO BE BOUND BY ALL OF
                THESE TERMS OF USE, DO NOT USE THE WEBSITE. These Terms of Use
                constitute a legal agreement between you and PowerPlay Systems and
                shall apply to your use of the Website and the Services even after
                termination.
            </p>
        )
    },
    {
        title: 'ELIGIBILITY',
        content: (
            <>
                <p>
                    You hereby represent and warrant that you are fully able and competent
                    to enter into the terms, conditions, obligations, affirmations,
                    representations and warranties set forth in these terms and to abide
                    by and comply with these terms.
                </p>
                <p>By entering a Defy Games contest, you are representing and warranting that:</p>
                <ul>
                    <li>
                        you are of 18 years of age or older (19 or older in Alabama or
                        Nebraska, 21 years of age or older in Massachusetts)
                     </li>
                    <li>
                        you are of legal age in the jurisdiction in which you are using the
                        Services; PowerPlay Systems reserves the right, in its sole
                        discretion, to terminate your Account, withhold or revoke the
                        awarding of any prizes associated with your Account or limit your
                        ability to withdraw if it determines that you are not of legal age
                        in the applicable jurisdiction;
                    </li>
                    <li>
                        you are not listed on any U.S. Government list of prohibited or
                        restricted parties;
                    </li>
                    <li>
                        you will abide at all times by these Terms of Use and any other
                        agreements between you and PowerPlay Systems regarding your use of
                        the Service or participation in contests;
                    </li>
                </ul>
                <p>
                    If PowerPlay Systems determines that you do not meet the eligibility
                    requirements of this section, then you are not authorized to use the
                    Service. PowerPlay Systems may require you to provide proof that you
                    are eligible to participate according to this section prior to
                    receiving a prize. This includes by requesting that you fill out an
                    affidavit of eligibility or other verification information. If
                    PowerPlay Systems otherwise determines that you do not meet the
                    eligibility requirements of this section, in addition to any rights
                    that PowerPlay Systems may have in law or equity, PowerPlay Systems
                    reserves the right to terminate your Account, withhold or revoke the
                    awarding of any prizes associated with your Account or limit your
                    ability to withdraw. In such a situation, PowerPlay Systems may pay
                    out any withheld or revoked prizes to the other entrants in the
                    relevant game in a manner consistent with the prize structure of the
                    game, to be precisely determined by PowerPlay Systems in its sole
                    discretion. PowerPlay Systems also reserves the right to withhold
                    revoked prizes to use in furtherance of its fraud prevention or
                    anti-money laundering efforts.
                </p>
                <p>
                    You must be at least eighteen (18) years of age to open an Account,
                    participate in games, or win prizes offered by the Website. In
                    jurisdictions, provinces, territories, and locations where the minimum
                    age for permissible use of the Website is greater than eighteen (18)
                    years old, you must meet the age requirement in your local
                    jurisdiction or territory. You must be at least nineteen (19) years of
                    age at time of Account creation if you are a legal resident of Alabama
                    or Nebraska or twenty-one (21) years of age if you are a legal
                    resident of Massachusetts.
                </p>
                <p>
                    You must be at least eighteen (18) years of age to open an Account,
                    participate in games, or win prizes offered by the Website. In
                    jurisdictions, provinces, territories, and locations where the minimum
                    age for permissible use of the Website is greater than eighteen (18)
                    years old, you must meet the age requirement in your local
                    jurisdiction or territory. You must be at least nineteen (19) years of
                    age at time of Account creation if you are a legal resident of Alabama
                    or Nebraska or twenty-one (21) years of age if you are a legal
                    resident of Massachusetts.
                </p>
                <p>
                    You must be at least eighteen (18) years of age to open an Account,
                    participate in games, or win prizes offered by the Website. In
                    jurisdictions, provinces, territories, and locations where the minimum
                    age for permissible use of the Website is greater than eighteen (18)
                    years old, you must meet the age requirement in your local
                    jurisdiction or territory. You must be at least nineteen (19) years of
                    age at time of Account creation if you are a legal resident of Alabama
                    or Nebraska or twenty-one (21) years of age if you are a legal
                    resident of Massachusetts.
                </p>
                <p>
                    You must be at least eighteen (18) years of age to open an Account,
                    participate in games, or win prizes offered by the Website. In
                    jurisdictions, provinces, territories, and locations where the minimum
                    age for permissible use of the Website is greater than eighteen (18)
                    years old, you must meet the age requirement in your local
                    jurisdiction or territory. You must be at least nineteen (19) years of
                    age at time of Account creation if you are a legal resident of Alabama
                    or Nebraska or twenty-one (21) years of age if you are a legal
                    resident of Massachusetts.
                </p>
                <p>
                    If any deposit is reversed, any winnings generated from PowerPlay
                    Systems games shall be invalidated, forfeited, and deducted from your
                    Account balance. In addition, the amount of the initial deposit will
                    be invalidated, forfeited and deducted from the Account balance.
                    PowerPlay Systems reserves the right to close your Account – without
                    notice – shall a deposit be charged back.
                </p>
                <p>
                    PowerPlay Systems employees (“Employees”) and Immediate Family Members
                    (an “Immediate Family Member” means any domestic partner and relative
                    of the employee who resident at an employee’s residence, including but
                    not limited to parents, grandparents, in-laws, children, siblings, and
                    spouses) are not permitted to play in any public games hosted on the
                    Website.
                </p>
                <p>
                    Athletes, coaches and other team management, team support personnel
                    (e.g. without limitation, team physicians) and team owners may not
                    participate in any Defy Games contests in the sport or sports with
                    which they’re associated. Team owners, referees, league employees,
                    sports commissioners and other individuals who through an ownership
                    interest or game-related employment can influence the gameplay are
                    likewise ineligible.
                </p>
            </>
        )
    },
    {
        title: 'GAME ENTRY',
        content: (
            <p>
                Users will be able to visit the Website and view the contests
                available for entry (the "Contests").
            </p>
        )
    },
    {
        title: 'POWERPLAY TOKENS (PWRS)',
        content: (
            <p>
                Powerplay tokens are a reward mechanism used on the Website.
                Participants may earn or win PowerPlay tokens by participating in
                Contests on the Website or via other means as the sole discretion of
                PowerPlay Systems. While PWRS are a registered ERC20 token on the
                Ethereum Network, they do not currently have any re-sale value and are
                used purely as a utility token for Defy Game participation purposes.
                As they are registered tokens, participants are free to transfer any
                accumulated tokens to their personal ERC20 wallet.
            </p>
        )
    },
    {
        title: 'REFUND POLICY',
        content: (
            <p>
                Purchases made on our site will appear on your statement as POWERPLAY
                SYSTEMS INC. All payments are final. No refunds will be issued. In the
                event of a dispute regarding the identity of the person submitting an
                entry, the entry will be deemed submitted by the person in whose name
                the Account was registered.
            </p>
        )
    },
    {
        title: 'CONDITIONS OF PARTICIPATION',
        content: (
            <>
                <p>
                    By entering a Defy Games Contest, entrants agree to be bound by these
                    Rules and the decisions of PowerPlay Systems, which shall be final and
                    binding in all respects. PowerPlay Systems, at its sole discretion,
                    may disqualify any entrant from a Contest, refuse to award benefits or
                    prizes and require the return of any prizes, if the entrant engages in
                    conduct or otherwise utilizes any information PowerPlay Systems deems
                    to be improper, unfair, or otherwise adverse to the operation of the
                    Contest or is in any way detrimental to other entrants.
            </p>
                <p>These Terms prohibit entering a Contest if the entrant is:</p>
                <ul>
                    <li>
                        Except as otherwise stated in the Eligibility section above, an
                        Employee of PowerPlay Systems or an immediate family member of such
                        employee;
            </li>
                    <li>
                        Accessing or has had access to any pre-release, confidential
                        information or other information that is not available to all other
                        entrants of a Game and that provides the entrant an advantage in
                        such a Contest, including any information from any daily fantasy
                        sport site or information from a sports governing body (e.g.,
                        pre-release injury information) (“Pre-Release Data”);
            </li>
                    <li>
                        An employee of a sponsor, consultant, or supplier of PowerPlay
                        Systems or any other daily fantasy sports game provider that has
                        access to Pre-Release Data or otherwise receives an advantage in the
                        entrant’s participation in a Contest;
            </li>
                    <li>
                        An employee, operator or consultant to a sports governing body where
                        such employee, operator or consultant is prohibited from
                        participating in applicable Contests by such governing body;
            </li>
                    <li>
                        PowerPlay Systems employees may use the Service for the purpose of
                        testing the user experience but may not withdraw money or prizes.
            </li>
                    <li>
                        Relatives of PowerPlay Systems employees with whom they share a
                        household are not eligible to participate in Contests.
            </li>
                    <li>
                        PowerPlay Systems consultants or promoters of the Service may play
                        in Contests without such limitation, but only if (i) their
                        arrangement with PowerPlay Systems does not permit them to have any
                        access to non-public Service data or any other data not made
                        available to all players on the Service and (ii) they do not receive
                        any other advantages in their play on the Service.
            </li>
                    <li>
                        Breaches any rules or policies of the entrant’s employer, of any
                        sports governing body, or any other professional body of which the
                        entrant is a member, including any rule or policy regarding
                        participation in Contests or accepting prize money;
            </li>
                    <li>
                        Any person prohibited from participating pursuant to court order;
            </li>
                    <li>
                        Any entrant who has knowingly received Pre-Release Data or any other
                        non-public information that provides an advantage in a Contest from
                        any person who is prohibited from entering a Contest as provided in
                        these Terms.
            </li>
                </ul>
                <p>
                    In addition, conduct that would be deemed improper also includes, but
                    is not limited to:
            </p>
                <ul>
                    <li>
                        Falsifying personal information required to enter a Contest or claim
                        a prize;
            </li>
                    <li>
                        Engaging in any type of financial fraud including unauthorized use
                        of credit instruments to enter a Contest or claim a prize;•
                        Colluding with any other individual(s) or engaging in any type of
                        syndicate play;
            </li>
                    <li>Any violation of Contest rules or the Terms of Use;</li>
                    <li>
                        Using a single Account to participate in a Contest on behalf of
                        multiple entrants or otherwise collaborating with others to
                        participate in any Contest;
            </li>
                    <li>
                        Using automated means (including but not limited to scripts and
                        third-party tools) to interact with the Website in any way (this
                        includes, but is not limited to: creating a Contest, entering a
                        Contest, withdrawing from a Contest, selecting teams, and editing a
                        teams);
            </li>
                    <li>
                        Using automated means (including but not limited to harvesting bots,
                        robots, parser, spiders or screen scrapers) to obtain, collect or
                        access any information on the Website or of any User for any
                        purpose.
            </li>
                    <li>
                        Any type of bonus abuse, abuse of the refer-a-friend program, or
                        abuse of any otherOffers or promotions;
            </li>
                    <li>
                        Tampering with the administration of a Contest or trying to in any
                        way tamper with the computer programs or any security measure
                        associated with a Contest;
            </li>
                    <li>
                        Obtaining other entrants information and spamming other entrants; or
            </li>
                    <li>Abusing the Website in any way.</li>
                </ul>
                <p>
                    Users further acknowledge that the forfeiture and/or return of any
                    prize shall in no way prevent PowerPlay Systems from pursuing criminal
                    or civil proceedings in connection with such conduct.
            </p>
                <p>
                    By entering into a Contest or accepting any prize, entrants, including but not limited to the
                    winner(s), agree to indemnify, release and to hold harmless PowerPlay Systems, its parents,
                    subsidiaries, affiliates and agents, as well as the officers, directors, employees, shareholders and
                    representatives of any of the foregoing entities (collectively, the "Released Parties"), from any
                    and all liability, claims or actions of any kind whatsoever, including but not limited to injuries,
                    damages, or losses to persons and property which may be sustained in connection with
                    participation in the Contest, the receipt, ownership, use or misuse of any prize or while
                    preparing for, participating in and/or travelling to or from any prize related activity, as well as
                    any claims based on publicity rights, defamation, or invasion of privacy. PowerPlay Systems
                    may, in its sole and absolute discretion, require an Authorized Account Holder to execute a
                    separate release of claims similar to the one listed above in this Paragraph as a condition of
                    being awarded any prize or receiving any payout.
            </p>
                <p>
                    PowerPlay Systems is not responsible for: any incorrect, invalid or inaccurate entry information;
                    human errors; postal delays/postage due mail; technical malfunctions; failures, including public
                    utility or telephone outages; omissions, interruptions, deletions or defects of any telephone
                    system or network, computer online systems, data, computer equipment, servers, providers, or
                    software (including, but not limited to software and operating systems that do not permit an
                    entrant to participate in a Contest), including without limitation any injury or damage to any
                    entrant's or any other person's computer or video equipment relating to or resulting from
                    participation in a Contest; inability to access the Website, or any web pages that are part of or
                    related to the Website; theft, tampering, destruction, or unauthorized access to, or alteration of,
                    entries and/or images of any kind; data that is processed late or incorrectly or is incomplete or
                    lost due to telephone, postal issues, computer or electronic malfunction or traffic congestion on
                    telephone lines or transmission systems, or the Internet, or any service provider's facilities, or
                    any phone site or website or for any other reason whatsoever; typographical, printing or other
                    errors, or any combination thereof.
            </p>
                <p>
                    PowerPlay Systems is not responsible for incomplete, illegible, misdirected or stolen entries. If
                    for any reason a Contest is not capable of running as originally planned, or if a Contest,computer application, or website associated therewith (or any portion thereof) becomes
                    corrupted or does not allow the proper entry to a Contest in accordance with the Terms of Use or
                    applicable Contest rules, or if infection by a computer (or similar) virus, bug, tampering,
                    unauthorized intervention, actions by entrants, fraud, technical failures, or any other causes of
                    any kind, in the sole opinion of PowerPlay Systems corrupts or affects the administration,
                    security, fairness, integrity, or proper conduct of a Contest, PowerPlay Systems reserves the
                    right, at its sole discretion, to disqualify any individual implicated in such action and/or to
                    cancel, terminate, extend, modify or suspend the Contest, and select the winner(s) from all
                    eligible entries received. If such cancellation, termination, modification or suspension occurs,
                    notification will be posted on the Website.
            </p>
                <p>
                    <b>
                        <i>
                            ANY ATTEMPT BY AN ENTRANT OR ANY OTHER INDIVIDUAL TO DELIBERATELY
                            DAMAGE THE WEBSITE OR UNDERMINE THE LEGITIMATE OPERATION OF ANY
                            CONTEST IS A VIOLATION OF CRIMINAL AND/OR CIVIL LAWS AND SHOULD SUCH AN
                            ATTEMPT BE MADE POWERPLAY SYSTEMS RESERVES THE RIGHT TO SEEK DAMAGES
                            AND OTHER REMEDIES FROM ANY SUCH PERSON TO THE FULLEST EXTENT
                            PERMITTED BY LAW.
                </i>
                    </b>
                </p>
                <p>All entries become the property of PowerPlay Systems and will not be acknowledged or returned.</p>
                <p>
                    To be eligible to enter any Contest or receive any prize, the Authorized Account Holder may be
                    required to provide PowerPlay Systems with additional documentation and/or information to
                    verify the identity of the Authorized Account Holder, and to provide proof that all eligibility
                    requirements are met. In the event of a dispute as to the identity or eligibility of an Authorized
                    Account Holder, PowerPlay Systems will, in its sole and absolute discretion, utilize certain
                    information collected by PowerPlay Systems to assist in verifying the identity and/or eligibility
                    of such Authorized Account Holder.
            </p>
                <p>
                    Participation in each Contest must be made only as specified in the Terms of Use. Failure to
                    comply with these Terms of Use will result in disqualification and, if applicable, prize forfeiture.
            </p>
                <p>
                    Where legal, both entrants and winners’ consent to the use of their name, voice, and
                    likeness/photograph in and in connection with the development, production, distribution
                    and/or exploitation of any Contest or the Website. Winners agree that from the date of
                    notification by PowerPlay Systems of their status as a potential winner and continuing until such
                    time when PowerPlay Systems informs them that they no longer need to do so that they will
                    make themselves available to PowerPlay Systems for publicity, advertising, and promotion
                    activities.
            </p>
                <p>
                    PowerPlay Systems reserves the right to move entrants from the Contests they have entered to
                    substantially similar Contests in certain situations determined by PowerPlay Systems in its sole
                    discretion.
            </p>
            </>
        )
    },
    {
        title: 'Using the Defy Games Website',
        content: (
            <>
                <div>
                    <h3>Service Changes and Limitations:</h3>
                    <p>
                        The Service is evolving and we may require that you accept updates
                        to the Service as well as to the Terms, Community Rules, and the
                        PowerPlay Systems Privacy Policy. From time to time, we may make you
                        update the Contest or your software to continue to use our Services.
                        We may perform these updates remotely including to the Defy Games
                        software residing on your computer or mobile device, without
                        notifying you.
          </p>
                    <p>
                        PowerPlay Systems reserves the right to stop offering and/or
                        supporting the Service or a particular Contest or part of the
                        Service at any time either permanently or temporarily, at which
                        point your right to use the Service or any part of it will be
                        automatically terminated or suspended. If that happens, PowerPlay
                        Systems is not required to provide refunds, benefits or other
                        compensation to players in connection with discontinued elements of
                        the Service or for virtual goods previously earned or purchased.
          </p>
                    <p>
                        POWERPLAY SYSTEMS MAY, IN ITS SOLE DISCRETION LIMIT, SUSPEND,
                        TERMINATE, MODIFY, OR DELETE ACCOUNTS OR ACCESS TO THE SERVICE OR
                        ANY PORTION OF IT AND PROHIBIT ACCESS TO OUR CONTESTS AND SITES, AND
                        THEIR CONTENT, SERVICES AND TOOLS, DELAY OR REMOVE HOSTED CONTENT
                        AND POWERPLAY SYSTEMS IS UNDER NO OBLIGATION TO COMPENSATE YOU FOR
                        ANY SUCH LOSSES OR RESULTS.
          </p>
                </div>
                <br />
                <div>
                    <h3>Deleting your Account:</h3>
                    <p>
                        You may stop using the Service at any time by closing your Account
                        on the Player Admin page. Unless the local law where you are located
                        requires otherwise, we are not required to provide refunds,
                        benefits, or other compensation if you request deletion of your
                        Account.
          </p>
                    <p className={styles.notice}>
                        <span>
                            WE MAY DELETE OR TERMINATE ACCOUNTS THAT ARE INACTIVE (I.E., NOT
                            LOGGED INTO) FOR 180 DAYS.
            </span>
                        <span>
                            IF YOU WANT US TO DELETE YOUR ACCOUNT, YOU CAN GO <Link to='/' className='__primary-text'>HERE</Link> AND CLICK
              DELETE ACCOUNT
            </span>
                    </p>
                </div>
                <br />
                <div>
                    <h3>Your Account and Powers:</h3>
                    <p>
                        Regardless of what anything else says in these Terms or any other
                        Terms that apply to features you may choose to use; you do not own
                        the Account that you create on our service and your Account is not
                        your property. This also applies to other services or items, like
                        Powers, regardless of whether you “earned” Powers in a Contest or
                        “purchased” them. Your Account and any Powers are owned by PowerPlay
                        Systems.
          </p>
                    <p>
                        You are not allowed to transfer Powers outside of the Service (i.e.,
                        in the “real world”), for example by selling, gifting, or trading
                        them. We won’t recognize those transfers as legitimate. You are not
                        allowed to sublicense, trade, sell or attempt to sell Powers for
                        "real" money, or exchange Powers for value of any kind outside of a
                        Contest. Any such transfer or attempted transfer is prohibited and
                        void, and we may terminate your Account because of it.
          </p>
                </div>
                <div>
                    <h3>ALL SALES ARE FINAL:</h3>
                    <p>
                        YOU ACKNOWLEDGE THAT POWERPLAY SYSTEMS IS NOT REQUIRED TO PROVIDE A
                        REFUND FOR ANY REASON, AND THAT YOU WILL NOT RECEIVE MONEY OR OTHER
                        COMPENSATION FOR UNUSED POWERS WHEN AN ACCOUNT IS CLOSED, WHETHER
                        SUCH CLOSURE WAS VOLUNTARY OR INVOLUNTARY, OR WHETHER YOU MADE A
                        PAYMENT THROUGH DEFYGAMES.IO OR ANOTHER PLATFORM SUCH AS APPLE, GOOGLE, FACEBOOK, OR ANY OTHER SITES OR PLATFORMS WHERE WE OFFER OUR
                        SERVICES.
          </p>
                </div>
                <div>
                    <h3>PURCHASES OR REDEMPTIONS OF THIRD PARTY VIRTUAL CURRENCY TO ACQUIRE A LICENSE TO USE VIRTUAL ITEMS ARE NON-REFUNDABLE TO THE FULLEST EXTENT ALLOWED BY LAW.</h3>
                    <p>If you purchase third party currency or choose to make a payment in our Services through a third party (like Facebook, Apple, or Google), you are agreeing to the third party’s payment terms, and PowerPlay Systems is not a party to the transaction.</p>
                </div>
                <div>
                    <h3>Additional Payment Terms:</h3>
                    <p>You agree to pay all fees and applicable taxes incurred by you or anyone using an Account registered to you. PowerPlay Systems may revise the pricing for the goods and Services it licenses to you through the Service at any time.</p>
                </div>
                <div>
                    <h3>Billing Support:</h3>
                    <p>Email: <a href="mailto:support@powerplaysystems.com" className='__primary-text' target='_blank'>support@powerplaysystems.com</a></p>
                </div>
            </>
        )
    },
    {
        title: 'CONTEST PRIZES AND PROMOTIONS',
        content: (
            <>
                <p>
                    Prizes will only be awarded if a Contest is run. We reserve the right to cancel Contests at any
                    time. In the event of a cancellation, all entry fees will be refunded to the customer except as
                    specifically provided in these Terms of Use.
                </p>
                <p>
                    Guaranteed prizes are offered in connection with some of the Contests offered by the Website.
                    Each Contest or promotion is governed by its own set of official rules. We encourage you to read
                    such Contest and promotions Rules before participating.
                </p>
            </>
        )
    },
    {
        title: 'OTHER LEGAL RESTRICTIONS',
        content: (
            <>
                <div>
                    <h3>CONTEST OF SKILL</h3>
                    <p>
                        Contests offered on the Website are Contests of skill. Winners are determined by the objective
                        criteria described in the Contest deadline, Rules, scoring, and any other applicable
                        documentation associated with the Contest. From all entries received for each Contest, winners
                        are determined by the individuals who use their skill and knowledge of relevant sports
                        information and fantasy sports rules to accumulate the most points according to the
                        corresponding scoring rules. The Website and Contests may not be used for any form of illicit
                        gambling.
          </p>
                </div>
                <div>
                    <h3>CONTEST STATISTICS AND LIVE SCORING</h3>
                    <p>
                        Our games are based on 'live' statistics during gameplay. While PowerPlay Systems and the third
                        parties used to provide the Defy Games Services use reasonable efforts to include accurate and
                        up-to-date information, neither PowerPlay Systems nor its third-party providers warrant or
                        make any representations of any kind with respect to the information provided through the Defy
                        Games Website and related information sources. PowerPlay Systems and its third-party
                        providers shall not be responsible or liable for the accuracy, usefulness, or availability of any
                        information transmitted or made available via the Defy Games Website and related information
                        sources, and shall not be responsible or liable for any error or omissions in that information.
          </p>
                </div>
                <div>
                    <h3>IDENTITY DISPUTES</h3>
                    <p>
                        In the event of a dispute regarding the identity of the person submitting an entry, the entry will
                        be deemed submitted by the person in whose Username the entry was submitted, or if
                        possession of the Username itself is gamed and in PowerPlay Systems’ opinion sufficiently
                        uncertain, the name in which the email address on file was registered with the email service
                        provider. PowerPlay Systems reserves the right not to award a prize to an individual it believes
                        in its sole discretion did not submit the winning entry.
          </p>
                </div>
                <div>
                    <h3>CONTEST RESULTS</h3>
                    <p>
                        Contest results and prize calculations are based on the final points accumulated by each
                        participant at the completion of the last professional sports contest of each individual Contest.
                        Once Contest results are reviewed and graded, prizes are awarded. The scoring results of a
                        Contest will not be changed regardless of any official statistics or scoring adjustments made by
                        the leagues at later times or dates, except in PowerPlay Systems' sole discretion.
          </p>
                </div>
                <div>
                    <h3>PRIZES</h3>
                    <p>
                        At the conclusion of each Contest, prizes will be awarded by 5:00 PM EST on the following day
                        except in circumstances where technical failure, inability of PowerPlay Systems to verify your
                        compliance with these Terms, or other reasons prevent such timely payout. Contest prizes are
                        listed in our prize table list. Prizes won are added to the winning participants Account balance.
                        In the event of a tie, prizes are divided evenly amongst the participants that have tied.
          </p>
                </div>
            </>
        )
    },
    {
        title: 'PAYMENT AND WITHDRAWAL OF PRIZES',
        content: (
            <>
                <p>Winners are posted on the Website.</p>
                <p>
                    Before making any payment, PowerPlay Systems may require that an entrant complete and
                    execute an affidavit of eligibility in which, among other things, the entrant is required to
                    represent and warrant that the entrant is eligible to participate in a Contest, is otherwise in
                    compliance with this Agreement and, potentially, is required to provide documentation or proof
                    of eligibility and compliance. If PowerPlay Systems requests that an entrant completes and
                    executes such an affidavit and the entrant fails to do so within seven (7) days, or PowerPlay
                    Systems otherwise determines that the entrant does not meet the eligibility requirements or is
                    not in compliance with these Terms, PowerPlay Systems reserves the right to terminate the
                    entrant’s Account and withhold or revoke the awarding of any prizes associated with such
                    Account. In such a situation, PowerPlay Systems may pay out any withheld or revoked prizes to
                    the other entrants in the relevant Contest in a manner consistent with the Rules of the Contest.
        </p>
                <p>
                    Entrants may withdraw their cash prize awards as well as cash deposits by using the
          <b>"Withdrawal"</b> option on the My Account pages of the Website. Entrants may be requested to
          complete an affidavit of eligibility and a liability/publicity release (unless prohibited by law)
          and/or appropriate tax forms and forms of identification including but not limited to a Driver's
          License, Proof of Residence, and/or any information relating to payment/deposit Accounts as
          reasonably requested by PowerPlay Systems in order to complete the withdrawal of prizes.
          Failure to comply with this requirement may result in disqualification and forfeiture of any
          prizes. Disqualification or forfeiture of any prizes may also occur if it is determined any such
          entrant did not comply with these Terms of Use in any manner.
        </p>
                <p>
                    If you are an entrant residing in Missouri, you can withdraw the funds maintained in your
                    individual Account, whether such Account is open or closed, within five (5) business days of the
                    request being made, unless PowerPlay Systems believes in good faith that the you engaged in
                    either fraudulent conduct or other conduct that would put PowerPlay Systems in violation of
                    sections 313.900 to 313.1020, RSMo, in which case PowerPlay Systems may decline to honor the
                    request for withdrawal for a reasonable investigatory period until its investigation is resolved if
                    it provides notice of the nature of the investigation to you. For the purposes of this provision, a
                    request for withdrawal will be considered honored if it is processed by PowerPlay Systems but
                    delayed by a payment processor, credit card issuer, or by the custodian of a financial Account.
        </p>
                <p>Cheques for withdrawal requests are processed within 14 business days, and are sent via Canada Post. </p>
                <p>
                    All taxes associated with the receipt of any prize are the sole responsibility of the winner. In the
                    event that the awarding of any prizes to winners of Contests is challenged by any legal authority,
                    PowerPlay Systems reserves the right in its sole discretion to determine whether or not to award
                    such prizes.
        </p>
                <p>
                    No substitution or transfer of prize is permitted, except that PowerPlay Systems reserves the
                    right to substitute a prize of equal value or greater if the advertised prize is unavailable. All
                    prizes are awarded "as is" and without warranty of any kind, express or implied (including,
                    without limitation, any implied warranty of merchantability for a particular purpose).
        </p>
                <p>Any withdrawal requests, after approved by PowerPlay Systems, will be issued via e-transfer, wire, PayPal, or cheque.</p>
                <p>
                    Each year all winners who have won $600 or more over the previous year must provide updated
                    address and social security details to PowerPlay Systems. These details will be used to allow
                    PowerPlay Systems to comply with tax regulations and may be shared with appropriate tax
                    authorities. You, not PowerPlay Systems, are responsible for filing and paying applicable State
                    or Province and federal taxes on any winnings. PowerPlay Systems does not provide tax advice,
                    nor should any statements in this agreement or on the Service be construed as tax advice.
        </p>
            </>
        )
    },
    {
        title: 'TERMINATION AND EFFECT OF TERMINATION',
        content: (
            <p>
                In addition to any other legal or equitable remedy, PowerPlay Systems may, without prior
                notice, immediately revoke any or all of your rights granted hereunder. In such event, you will
                immediately cease all access to and use of the Website. PowerPlay Systems may revoke any
                password(s) and/or Account identification issued to you and deny you access to and use of the
                Website. Any such action shall not affect any rights and obligations arising prior thereto. All
                provisions of the Terms of Use which by their nature should survive termination shall survive
                termination, including, without limitation, ownership provisions, warranty disclaimers,
                indemnity and limitations of liability.
            </p>
        )
    },
    {
        title: 'DISCLAIMER OF WARRANTIES',
        content: (
            <>
                <p>
                    THE WEBSITE, INCLUDING, WITHOUT LIMITATION, ALL CONTENT, SOFTWARE, AND
                    FUNCTIONS MADE AVAILABLE ON OR ACCESSED THROUGH OR SENT FROM THE
                    WEBSITE, ARE PROVIDED "AS IS," "AS AVAILABLE," AND "WITH ALL FAULTS." TO THE
                    FULLEST EXTENT PERMISSIBLE BY LAW, THE COMPANY AND ITS PARENTS,
                    SUBSIDIARIES AND AFFILIATES MAKE NO REPRESENTATION OR WARRANTIES OR
                    ENDORSEMENTS OF ANY KIND WHATSOEVER (EXPRESS OR IMPLIED) ABOUT: (A) THE
                    WEBSITE; (B) THE CONTENT AND SOFTWARE ON AND PROVIDED THROUGH THE
                    WEBSITE; (C) THE FUNCTIONS MADE ACCESSIBLE ON OR ACCESSED THROUGH THE
                    WEBSITE; (D) THE MESSAGES AND INFORMATION SENT FROM THE WEBSITE BY
                    USERS; (E) ANY PRODUCTS OR SERVICES OFFERED VIA THE WEBSITE OR HYPERTEXT
                    LINKS TO THIRD PARTIES; AND/OR (F) SECURITY ASSOCIATED WITH THE
                    TRANSMISSION OF SENSITIVE INFORMATION THROUGH THE WEBSITE OR ANY
                    LINKED SITE. THE COMPANY DOES NOT WARRANT THAT THE WEBSITE, ANY OF THE
                    WEBSITES' FUNCTIONS OR ANY CONTENT CONTAINED THEREIN WILL BE
                    UNINTERRUPTED OR ERROR-FREE; THAT DEFECTS WILL BE CORRECTED; OR THAT
                    THE WEBSITES OR THE SERVERS THAT MAKES THEM AVAILABLE ARE FREE OF
                    VIRUSES OR OTHER HARMFUL COMPONENTS.
        </p>
                <p>
                    THE COMPANY DOES NOT WARRANT THAT YOUR ACTIVITIES OR USE OF THE WEBSITE
                    IS LAWFUL IN ANY PARTICULAR JURISDICTION AND, IN ANY EVENT, THE COMPANY
                    SPECIFICALLY DISCLAIMS SUCH WARRANTIES. YOU UNDERSTAND THAT BY USING
                    ANY OF THE FEATURES OF THE WEBSITE, YOU ACT AT YOUR OWN RISK, AND YOU
                    REPRESENT AND WARRANT THAT YOUR ACTIVITIES ARE LAWFUL IN EVERY
                    JURISDICTION WHERE YOU ACCESS OR USE THE WEBSITE OR THE CONTENT.
                    FURTHER, THE COMPANY AND ITS PARENTS, SUBSIDIARIES AND AFFILIATES
                    DISCLAIM ANY EXPRESS OR IMPLIED WARRANTIES INCLUDING, WITHOUT
                    LIMITATION, NONINFRINGEMENT, MERCHANTABILITY, FITNESS FOR A PARTICULAR
                    PURPOSE, AND TITLE.
        </p>
                <p>
                    THE COMPANY, ITS PARENTS, SUBSIDIARIES AND AFFILIATES, AND THE DIRECTORS,
                    OFFICERS, EMPLOYEES, AND OTHER REPRESENTATIVES OF EACH OF THEM, SHALL
                    NOT BE LIABLE FOR THE USE OF THE WEBSITE INCLUDING, WITHOUT LIMITATION,
                    THE CONTENT AND ANY ERRORS CONTAINED THEREIN. SOME JURISDICTIONS LIMIT
                    OR DO NOT ALLOW THE DISCLAIMER OF IMPLIED OR OTHER WARRANTIES SO THE
                    ABOVE DISCLAIMER MAY NOT APPLY TO THE EXTENT SUCH JURISDICTION'S LAW IS
                    APPLICABLE TO THIS AGREEMENT.
        </p>
            </>
        )
    },
    {
        title: 'LIMITATION OF LIABILITY',
        content: (
            <p>
                YOU UNDERSTAND AND AGREE THAT THE COMPANY LIMITS ITS LIABILITY IN
                CONNECTION WITH YOUR USE OF THE WEBSITE AS SET FORTH BELOW: UNDER NO
                CIRCUMSTANCES SHALL POWERPLAY SYSTEMS, ITS PARENTS, SUBSIDIARIES, OR
                AFFILIATES, OR THE DIRECTORS, OFFICERS, EMPLOYEES, OR OTHER
                REPRESENTATIVES OF EACH OF THEM (COLLECTIVELY, THE "COMPANY ENTITIES AND
                INDIVIDUALS"), BE LIABLE TO YOU FOR ANY LOSS OR DAMAGES OF ANY KIND
                (INCLUDING, WITHOUT LIMITATION, FOR ANY SPECIAL, DIRECT, INDIRECT,
                INCIDENTAL, EXEMPLARY, ECONOMIC, PUNITIVE, OR CONSEQUENTIAL DAMAGES)
                THAT ARE DIRECTLY OR INDIRECTLY RELATED TO (1) THE WEBSITE, THE CONTENT,
                OR YOUR UPLOAD INFORMATION; (2) THE USE OF, INABILITY TO USE, OR
                PERFORMANCE OF THE WEBSITE; (3) ANY ACTION TAKEN IN CONNECTION WITH AN
                INVESTIGATION BY THE COMPANY OR LAW ENFORCEMENT AUTHORITIES
                REGARDING YOUR USE OF THE WEBSITE OR CONTENT;(4) ANY ACTION TAKEN IN
                CONNECTION WITH COPYRIGHT OWNERS; OR (5) ANY ERRORS OR OMISSIONS IN THE
                WEBSITE'S TECHNICAL OPERATION, EVEN IF FORESEEABLE OR EVEN IF THE
                COMPANY ENTITIES AND INDIVIDUALS HAVE BEEN ADVISED OF THE POSSIBILITY OF
                SUCH DAMAGES WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE, STRICT
                LIABILITY TORT (INCLUDING, WITHOUT LIMITATION, WHETHER CAUSED IN WHOLE
                OR IN PART BY NEGLIGENCE, ACTS OF GOD, TELECOMMUNICATIONS FAILURE, OR
                THEFT OR DESTRUCTION OF THE WEBSITE). IN NO EVENT WILL THE COMPANY
                ENTITIES AND INDIVIDUALS BE LIABLE TO YOU OR ANYONE ELSE FOR LOSS OR
                INJURY, INCLUDING, WITHOUT LIMITATION, DEATH OR PERSONAL INJURY. SOME
                STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR
                CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION OR EXCLUSION MAY NOT
                APPLY TO YOU. IN NO EVENT SHALL THE COMPANY ENTITIES AND INDIVIDUALS
                TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES, OR CAUSES OF ACTION EXCEED
                ONE HUNDRED DOLLARS ($100). THE COMPANY ENTITIES AND INDIVIDUALS ARE NOT
                RESPONSIBLE FOR ANY DAMAGE TO ANY USER'S COMPUTER, HARDWARE, COMPUTER
                SOFTWARE, OR OTHER EQUIPMENT OR TECHNOLOGY INCLUDING, WITHOUT
                LIMITATION, DAMAGE FROM ANY SECURITY BREACH OR FROM ANY VIRUS, BUGS,
                TAMPERING, FRAUD, ERROR, OMISSION, INTERRUPTION, DEFECT, DELAY IN
                OPERATION OR TRANSMISSION, COMPUTER LINE OR NETWORK FAILURE OR ANY
                OTHER TECHNICAL OR OTHER MALFUNCTION. YOUR ACCESS TO AND USE OF THIS
                WEBSITE IS AT YOUR RISK. IF YOU ARE DISSATISFIED WITH THE WEBSITE OR ANY OF
                THE CONTENT, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE ACCESSING
                AND USING THE WEBSITE OR THE CONTENT. YOU RECOGNIZE AND CONFIRM THAT IN
                THE EVENT YOU INCUR ANY DAMAGES, LOSSES OR INJURIES THAT ARISE OUT OF THE
                COMPANY'S ACTS OR OMISSIONS, THE DAMAGES, IF ANY, CAUSED TO YOU ARE NOT
                IRREPARABLE OR SUFFICIENT TO ENTITLE YOU TO AN INJUNCTION PREVENTING ANY
                EXPLOITATION OF ANY WEBSITE OR OTHER PROPERTY OWNED OR CONTROLLED BY
                THE COMPANY AND/OR ITS PARENTS, SUBSIDIARIES, AND/OR AFFILIATES OR YOUR
                UPLOAD INFORMATION, AND YOU WILL HAVE NO RIGHTS TO ENJOIN OR RESTRAIN
                THE DEVELOPMENT, PRODUCTION, DISTRIBUTION, ADVERTISING, EXHIBITION OR
                EXPLOITATION OF ANY COMPANY WEBSITE OR OTHER PROPERTY OR YOUR UPLOAD
                INFORMATION OR ANY AND ALL ACTIVITIES OR ACTIONS RELATED THERETO. BY
                ACCESSING THE WEBSITE, YOU UNDERSTAND THAT YOU MAY BE WAIVING RIGHTS
                WITH RESPECT TO CLAIMS THAT ARE AT THIS TIME UNKNOWN OR UNSUSPECTED.
                ACCORDINGLY, YOU AGREE TO WAIVE THE BENEFIT OF ANY LAW, INCLUDING, TO THE
                EXTENT APPLICABLE, CALIFORNIA CIVIL CODE SECTION 1542, THAT OTHERWISE
                MIGHT LIMIT YOUR WAIVER OF SUCH CLAIMS.
            </p>
        )
    },
    {
        title: 'INTELLECTUAL PROPERTY RIGHTS',
        content: (
            <>
                <p>
                    The content on the Website, including without limitation, the text, software, scripts, graphics,
                    photos, sounds, music, videos, interactive features and the like and the trademarks, service
                    marks and logos contained therein (the "Intellectual Property"), are owned by, or licensed to
                    PowerPlay Systems, subject to copyright and other intellectual property rights under Canadian
                    and foreign laws and international conventions. Content on the Website is provided to you AS IS
                    for your information and personal use only and may not be used, copied, reproduced,
                    distributed, transmitted, broadcast, displayed, sold, licensed, or otherwise exploited for any
                    other purposes whatsoever without the prior written consent of the respective owners.
                    PowerPlay Systems reserves all rights not expressly granted in and to the Website and the
                    Intellectual Property. You agree to not engage in the use, copying, or distribution of any of the
                    Intellectual Property other than expressly permitted herein. If you download or print a copy of
                    the Intellectual Property for personal use, you must retain all copyright and other proprietary
                    notices contained therein. You agree not to circumvent, disable or otherwise interfere with
                    security related features of the Website or features that prevent or restrict use or copying of any
                    Intellectual Property or enforce limitations on use of the Website or the Intellectual Property
                    therein.
        </p>
                <p>
                    Some of the Services may allow you to submit or transmit audio, video, text, or other materials
                    (collectively, "User Submissions") to or through the Services. When you provide User
                    Submissions, you grant to PowerPlay Systems, its parents, subsidiaries, affiliates, and partners a
                    non-exclusive, worldwide, royalty-free, fully sublicensable license to use, distribute, edit,
                    display, archive, publish, sublicense, perform, reproduce, make available, transmit, broadcast,
                    sell, translate, and create derivative works of those User Submissions, and your name, voice,
                    likeness and other identifying information where part of a User Submission, in any form, media,
                    software, or technology of any kind now known or developed in the future, including, without
                    limitation, for developing, manufacturing, and marketing products. You hereby waive any moral
                    rights you may have in your User Submissions.
        </p>
                <p>
                    In addition, you agree that any User Submissions you submit shall not contain any material that
                    is, in the sole and absolute discretion of PowerPlay Systems, inappropriate, obscene, vulgar,
                    unlawful, or otherwise objectionable (hereinafter, "Prohibited Content"). Posting of any
                    Prohibited Content, in addition to any and all other rights and remedies available to PowerPlay
                    Systems, may result in Account suspension or termination.
                </p>
                <p>
                    We respect your ownership of User Submissions. If you owned a User Submission before
                    providing it to us, you will continue owning it after providing it to us, subject to any rights
                    granted in the Terms of Use and any access granted to others. If you delete a User Submission
                    from the Services, our general license to that User Submission will end after a reasonable period
                    of time required for the deletion to take full effect. However, the User Submission may still exist
                    in our backup copies, which are not publicly available. If your User Submission is shared with
                    third parties, those third parties may have retained copies of your User Submissions. In
                    addition, if we made use of your User Submission before you deleted it, we will continue to have
                    the right to make, duplicate, redistribute, and sublicense those pre-existing uses, even after you
                    delete the User Submission. Terminating your Account on a Service will not automatically delete
                    your User Submissions.
                </p>
                <p>
                    We may refuse or remove a User Submission without notice to you. However, we have no
                    obligation to monitor User Submissions, and you agree that neither we nor our parents,
                    subsidiaries, affiliates, employees, or agents will be liable for User Submissions or any loss or
                    damage resulting from User Submissions.
                </p>
                <p>
                    Except as provided in the Privacy Policy, we do not guarantee that User Submissions will be
                    private, even if the User Submission is in a password-protected area. Accordingly, you should
                    not provide User Submissions that you want protected from others.
                </p>
                <p>
                    You represent and warrant that you have all rights necessary to grant to PowerPlay Systems the
                    license above and that none of your User Submissions are defamatory, violate any rights of third
                    parties (including intellectual property rights or rights of publicity or privacy), or violate
                    applicable law.
                </p>
            </>
        )
    },
    {
        title: 'NO THIRD PARTY BENEFICIARIES',
        content: <p>You agree that, except as otherwise expressly provided in these Terms, there shall be no third party beneficiaries to the Terms.</p>
    },
    {
        title: 'BINDING ARBITARTION AND CLASS ACTION WAIVER',
        content: (
            <>
                <p>
                    PLEASE READ THIS SECTION CAREFULLY – IT MAY SIGNIFICANTLY AFFECT YOUR
                    LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT
        </p>
                <div>
                    <h3>Initial Dispute Resolution</h3>
                    <p>
                        Our Customer Support Department is available via email <a href='mailto:support@powerplaysystems.com' className='__primary-text' target='_blank'>(support@powerplaysystems.com)</a> to
            address any concerns you may have regarding the Service. Our Customer Service Department is
            able to resolve most concerns quickly to our players’ satisfaction. The parties shall use their best
            efforts through this Customer Service process to settle any dispute, claim, question, or
            disagreement and engage in good faith negotiations which shall be a condition to either party
            initiating a lawsuit or arbitration.
          </p>
                </div>
                <div>
                    <h3>Binding Arbitration</h3>
                    <p>
                        If the parties do not reach an agreed upon solution within a period of 30 days from the time
                        informal dispute resolution under the Initial Dispute Resolution provision, then either party
                        may initiate binding arbitration as the sole means to resolve claims, subject to the terms set
                        forth below. Specifically, all claims arising out of or relating to these Terms (including their
                        formation, performance and breach), the parties’ relationship with each other and/or your use
                        of the Service shall be finally settled by binding arbitration administered by the American
                        Arbitration Association in accordance with the provisions of its Commercial Arbitration Rules
                        and the supplementary procedures for consumer related disputes of the American Arbitration
                        Association (the “AAA”), excluding any rules or procedures governing or permitting class
                        actions.
          </p>
                    <p>
                        The arbitrator, and not any federal, state, provincial, or local court or agency, shall have
                        exclusive authority to resolve all disputes arising out of or relating to the interpretation,
                        applicability, enforceability or formation of these Terms, including, but not limited to any claim
                        that all or any part of these Terms are void or voidable, or whether a claim is subject to
                        arbitration. The arbitrator shall be empowered to grant whatever relief would be available in a
                        court under law or in equity. The arbitrator’s award shall be written, and binding on the parties
                        and may be entered as a judgment in any court of competent jurisdiction.
          </p>
                    <p>
                        The Commercial Arbitration Rules governing the arbitration may be accessed at www.adr.org or
                        by calling the AAA at +1.800.778.7879.
          </p>
                </div>
                <div>
                    <h3>Location</h3>
                    <p>
                        If you are a resident of the United States, arbitration will take place at any reasonable location
                        within the United States convenient for you. For residents in Canada, arbitration shall be
                        initiated in the Province of Ontario, Canada, and you and PowerPlay Systems agree to submit to
                        the personal jurisdiction of any federal or provincial court in Toronto, Ontario, Canada, in order
                        to compel arbitration, to stay proceedings pending arbitration, or to confirm, modify, vacate or
                        enter judgment on the award entered by the arbitrator.
          </p>
                </div>
                <div>
                    <h3>Class Action Waiver</h3>
                    <p>
                        The parties further agree that any arbitration shall be conducted in their individual capacities
                        only and not as a class action or other representative action, and the parties expressly waive
            their right to file a class action or seek relief on a class basis. <b><i>YOU AND POWERPLAY SYSTEMS
                        AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS
                        INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY
            PURPORTED CLASS OR REPRESENTATIVE PROCEEDING</i></b>. If any court or arbitrator
            determines that the class action waiver set forth in this paragraph is void or unenforceable for
            any reason or that an arbitration can proceed on a class basis, then the arbitration provision set
            forth above shall be deemed null and void in its entirety and the parties shall be deemed to have
            not agreed to arbitrate disputes.
          </p>
                </div>
                <div>
                    <h3>Exception - Litigation of Intellectual Property and Small Claims Court Claims</h3>
                    <p>
                        Notwithstanding the parties' decision to resolve all disputes through arbitration, either party
                        may bring an action in provincial, state, or federal court to protect its intellectual property rights
                        (“intellectual property rights” means patents, copyrights, moral rights, trademarks, and trade
                        secrets, but not privacy or publicity rights). Either party may also seek relief in a small claims
                        court for disputes or claims within the scope of that court’s jurisdiction.
          </p>
                </div>
                <div>
                    <h3>Changes to this Section</h3>
                    <p>
                        PowerPlay Systems will provide 60-days’ notice of any changes to this section. Changes will
                        become effective on the 60th day, and will apply prospectively only to any claims arising after
                        the 60th day.
          </p>
                    <p>
                        For any dispute not subject to arbitration you and PowerPlay Systems agree to submit to the
                        personal and exclusive jurisdiction of and venue in the provincial courts located in Toronto, ON.
                        You further agree to accept service of process by mail, and hereby waive any and all
                        jurisdictional and venue defenses otherwise available.
          </p>
                    <p>
                        The Terms and the relationship between you and PowerPlay Systems shall be governed by the
                        laws of the Province of Ontario without regard to conflict of law provisions.
          </p>
                </div>
            </>
        )
    },
    {
        title: 'MISCELLANEOUS',
        content: (
            <>
                <p>
                    These Terms of Use shall be governed by the internal substantive laws of the Province of
                    Ontario, without respect to its conflict of laws principles. Any claim or dispute between you and
                    PowerPlay Systems that arises in whole or in part from the Terms of Use, the Website or any
                    Contest shall be decided exclusively by a court of competent jurisdiction located in Ontario,
                    Canada.
        </p>
                <p>
                    Nothing in the Terms of Use shall create or confer any rights or other benefits in favor of any
                    third parties except as specifically provided herein. By participating in any Contest on the
                    Website, you agree to indemnify, protect, defend and hold harmless PowerPlay Systems, its
                    parents, subsidiaries, affiliates and divisions, and their respective directors, officers, employees,
                    agents and representatives (the " PowerPlay Systems Entities"), from and against any and all
                    third party claims, liabilities, losses, damages, injuries, demands, actions, causes of action, suits,
                    proceedings, judgments and expenses, including reasonable attorneys’ fees, court costs and
                    other legal expenses including, without limitation, those costs incurred at the trial and appellate
                    levels and in any bankruptcy, reorganization, insolvency or other similar proceedings, and any
                    other legal expenses (collectively, "Claims") arising from or connected with your use of the
                    Website, any payment methods used, any purchases made in your Account, and/or your
                    participation in any Contest. The Website may contain links to third party websites that are not
                    owned or controlled by PowerPlay Systems. PowerPlay Systems has no control over, and
                    assumes no responsibility for, the content, privacy policies, or practices of any third-party
                    websites. In addition, PowerPlay Systems will not and cannot censor or edit the content of any
                    third-party site. By using the Website, you expressly relieve PowerPlay Systems from any and all
                    liability arising from your use of any third-party website. Accordingly, we encourage you to be
                    aware when you leave the Website and to read the terms and conditions and privacy policy of
                    each other website that you visit.
        </p>
                <p>
                    Nothing in the Terms of Use shall create or be deemed to create a partnership, agency, trust
                    arrangement, fiduciary relationship or joint venture between you and PowerPlay Systems.
        </p>
                <p>
                    No professional or amateur sports league or any team associated with any professional or
                    amateur sports league is associated with PowerPlay Systems or in any way affiliated or
                    associated with the Contests.
        </p>
                <p>
                    Third-party online publishers that refer users to the PowerPlay Systems website shall not be
                    responsible or liable for the website or any of the content, software, or functions made available
                    on, or accessed through, or sent from, the website.
        </p>
                <p>
                    If any provision of these Terms of Use is deemed invalid by a court of competent jurisdiction,
                    the invalidity of such provision shall not affect the validity of the remaining provisions of these
                    Terms of Use, which shall remain in full force and effect.
        </p>
                <p>
                    No waiver of any term of these Terms of Use shall be deemed a further or continuing waiver of
                    such term or any other term, and PowerPlay Systems' failure to assert any right or provision
                    under these Terms of Use shall not constitute a waiver of such right or provision.
        </p>
                <p>
                    PowerPlay Systems reserves the right to amend these Terms of Use at any time and without
                    notice, and it is your responsibility to review these Terms of Use for any changes. If you continue
                    to use the Services after we change the Terms of Use, you accept all changes. The failure of
                    PowerPlay Systems to comply with any provision of these Terms of Use due to an act of God,
                    hurricane, war, fire, riot, earthquake, terrorism, act of public enemies, actions of governmental
                    authorities outside of the control of the Company (excepting compliance with applicable codes
                    and regulations) or other force majeure event will not be considered a breach of these Terms of
                    Use.
        </p>
                <p>
                    <b>
                        <i>
                            POWERPLAY SYSTEMS AND OTHER TRADEMARKS CONTAINED ON THE WEBSITE ARE
                            TRADEMARKS OR REGISTERED TRADEMARKS OF POWERPLAY SYSTEMS IN CANADA.
                            THE UNITED STATES AND/OR OTHER COUNTRIES. THIRD PARTY TRADEMARKS,
                            TRADE NAMES, PRODUCT NAMES AND LOGOS MAY BE THE TRADEMARKS OR
                            REGISTERED TRADEMARKS OF THEIR RESPECTIVE OWNERS. YOU MAY NOT REMOVE
                            OR ALTER ANY TRADEMARK, TRADE NAMES, PRODUCT NAMES, LOGO, COPYRIGHT OR
                            OTHER PROPRIETARY NOTICES, LEGENDS, SYMBOLS OR LABELS ON THE WEBSITE.
            </i>
                    </b>
                </p>
            </>
        )
    }
]


export default terms;