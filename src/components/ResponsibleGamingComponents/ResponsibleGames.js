import { Link } from 'react-router-dom';

const ResponsibleGames = [
    {
        title: 'OVERVIEW',
        content: (
            <>
                <p>
                    PowerPlay Systems is innovator in the interactive gaming industry. Our fair and responsible contest options ensure every player can play within their financial means. PowerPlay Systems is committed to integrity, fairness, and reliability. We do everything possible to prevent gaming-related problems. We have developed measures to maintain a responsible, safe, and reliable place for interactive gaming.
                </p>
                <p>PowerPlay Systems offers the options to self-exclude and self limit. If, at any point, you think you're spending too much time or money on our Defy Games site, you have the option of taking a break entirely. Self-limiting allows you to still play, however, within the parameters that you set for yourself.  </p>
                <p>Options to Limit Play: </p>
                <ul>
                    <li>Deposit Limits and Alerts</li>
                    <li>Entry Fee Limits </li>
                    <p>PowerPlay Systems provides options to limit the amount of funds you can deposit into your account by choosing an amount over a daily, weekly and monthly period. You can also set limits for entry fees to enter a contest. </p>
                    <p>To learn more, click <Link to='/help/FAQ'>here</Link></p>
                </ul>
            </>
        )
    },
    {
        title: 'NEED HELP?',
        content: (
            <>
                <p>If you have questions or concerns about your own gaming behavior or about that of a friend or family member, please contact <a href='https://www.icrg.org' target='_blank'> NCRG</a> or RGC (http://www.responsiblegambling.org)</p>
                <p>You can also contact NCPG 24 Hour Confidential National Helpline Number in the United States: 1-800-522-4700 or 1-888-230-3505 to contact RGC in Canada for additional assistance. </p>
            </>
        )
    },
    {
        title: 'NCRG',
        content: (
            <>
                <p>Founded in 1996 as a charitable organization, the National Center for Responsible Gaming is exclusively devoted to funding research for gaming-related issues and effective methods of treatment. The research is scientific, peer-reviewed, and focused on prevention, diagnostic, intervention and treatment strategies, and advancing public education about responsible gaming. </p>
                <p>The NCRG website provides a variety of support and referral sources for help with counseling and crisis support for any affected by a gaming-related issue. </p>
            </>
        )
    },
    {
        title: 'RGC',
        content: (
            <>
                <p>The Responsible Gambling Council (RGC) is an independent non-profit organization dedicated to problem gambling prevention. </p>
                <p>RGC works to reduce gambling risks by creating and delivering innovative awareness and information programs. It also promotes the adoption of improved play safeguards through best practices research, standards development and the RG Check accreditation program. </p>
                <p>RGC is committed to bringing together all perspectives in the reduction of gambling problems including those of people with firsthand experience with gambling problems, gaming providers, regulators, policy makers and treatment professionals.   </p>
            </>
        )
    },
    {
        title: 'CONCERNED ABOUT A FAMILY MEMBER?',
        content: (
            <>
                <p>If you believe that a member of your family is a problem gamer or is overspending, please contact <a href='mailto:support@powerplaysystems.com'> support@powerplaysystems.com </a> for assistance. </p>
                <p>You may be able to exclude PowerPlay Systems consumer(s) from participating in contests on the Defy Games site or to set deposit or loss limits. In order to process such requests, PowerPlay Systems will require the following proof: (1) that the requestor is jointly obligated on the credit or debit card associated with the PowerPlay Systems Consumer’s account; (2) proof of legal dependency of the PowerPlay Systems Consumer; (3) the existence of a court order requiring the PowerPlay Systems consumer to pay unmet child support obligations; and (4) any additional identifiable verification documentation validating the relationship between the requestor and PowerPlay Systems Consumer. </p>
            </>
        )
    },
    {
        title: 'PARENTAL CONTROLS',
        content: (
            <>
                <p>If there are children under 18 who have access to your computer, you may want to consider installing parental control software to prevent access to online gaming site and other material, such as: </p>
                <ul>
                    <li>NetNanny - US Toll Free at 1-800-485-4008</li>
                    <li>CyberSitter </li>
                </ul>
                <p>If you believe that a minor is improperly using the Defy Games site, please contact support@powerplaysystems.com </p>
            </>
        )
    },
]

export default ResponsibleGames;