import { Link } from "react-router-dom";

const contents = [
    {
        title: 'GENERAL',
        content: (
            <>
                <h3>Is playing on Defy Games legal?</h3>
                <p>Legal residents physically located in Canada and any of the 50 states and Washington DC, excluding Arizona, Hawaii, Idaho, Louisiana, Montana, Nevada, and Washington are eligible to open an account and participate in paid contests offered by the Website. </p>
                <p>Legal residents of Arizona, Hawaii, Louisiana, Montana, Nevada, and Washington (the "Excluded States") are ineligible for prizes offered by the Website. Residents of the Excluded States are eligible to open an account and play in Free contests.</p>
                <h3>What are Power Tokens?</h3>
                <p>Power Tokens are earned playing/participating on Defy Games and can be used to enter contests with Power Token entry fees. These will be clearly identified in the Power Center. </p>
            </>
        )
    },
    {
        title: 'DEPOSITS AND WITHDRAWALS',
        content: (
            <>
                <h3>How can I deposit funds?</h3>
                <ul>
                    <li>In jurisdictions where allowed, Powerplay Systems accepts all major credit/debit cards including Visa, MasterCard, Discover and American Express. </li>
                    <li>E-check/Interact – You may transfer funds directly to your account using E-checks (US clients) or Interact (Canadian clients)</li>
                    <li>Crytpo Currency – You can transfer Bitcoin or Ethereum directly to your personal Defy Games Address. </li>
                    <li>PayPal</li>
                </ul>
                <p>**You may only deposit funds into your Powerplay Systems account with a payment method registered in your name.** </p>
                <h3>What Is Your Withdrawal Policy? </h3>
                <p>All withdrawals will be processed either via wire transfer, PayPay, or cheque.  For confirmation of the final details of your withdrawal request, you will receive an email from Powerplay Systems with the subject line ‘Withdrawal Request Completed.’ </p>
                <p>Note: <b><i>All checks under $2000 are sent via USPS or Canada Post. Checks $2000 and over will be sent via FedEx. The max amount that can be processed to PayPal is $14,999. </i></b></p>
                <h3>How do I submit a withdrawal request? </h3>
                <p>If you click here you will be directed to the withdrawal page. Please follow the directions on the page. </p>
                <h3>What is the withdrawal process? </h3>
                <p>Our Accounting Department processes withdrawals Monday - Friday from 9 AM-5 PM. Any withdrawal requests that come in after 5 PM on Friday will be processed in the order that they were received starting the following Monday. Once our Accounting Department processes your withdrawal request (you'll receive a confirmation email), it typically takes anywhere from 2-8 business days for you to receive your prize. </p>
                <h3>Why do I have to complete a W9 form prior to withdrawing a prize? </h3>
                <p>Our compliance and identity verification requirements require PowerPlay Systems clients to complete a W-9 form prior to withdrawing prizes for US citizens. </p>
            </>
        )
    },
    {
        title: 'ACCOUNT MANAGEMENT',
        content: (
            <>
                <h3>What information is required to open a Defy Games account?</h3>
                <p>To open an account, you are required to provide your full name, address, date of birth, email address and telephone number. If your identity cannot be validated, you will be required to submit additional information or documentation which may include your valid state-issued ID. </p>
                <h3>How is my information protected?</h3>
                <p>All Powerplay Systems confidential information is safeguarded by SSL (Secure Socket Layer), as represented by the padlock visible on your browser’s address tab. This ensures the security of all private information provided by the website. We encrypt all our private customer information, available to our staff only when pertinent.</p>
                <h3>Can I change my Defy Games Display Name? </h3>
                <p>You may change your display name one (1) time. After you make a change, you display name is locked you can not make any more changes. </p>
                <h3>Can I create more than one account? </h3>
                <p>Powerplay Systems prohibits participants from opening more than one account, in order to ensure fair play and uphold the integrity of our contests. If for some reason you forget your password you can reset it <a href='https://test.powerplaysystems.com/reset-password' target='_blank'>here</a>:  If you forget your username or email used to register please contact <a href='mailto:support@powerplaysystems.com' target='_blank'>support@powerplaysystems.com</a> and an agent will be happy to assist you with retrieving that information. </p>
                <p>Please note: if the same individual sets up multiple accounts, Powerplay Systems will deactivate all accounts except one, and any potential winnings may not be honored from all accounts. Any accounts that are set up illegitimately will be deactivated and winnings will not be honored. </p>
                <h3>Can I permanently delete my account? </h3>
                <p>Yes, use the Delete Account link in the My Account page. </p>
                <h3>What should I do if I believe my account as been misallocated or compromised? </h3>
                <p>If you believe your account has been misallocated, compromised, or mishandled please contact <a href='mailto:support@powerplaysystems.com'>support@powerplaysystems.com</a> for assistance. Please provide all pertinent information related to your claim and a dedicated member of our Customer Service team will address your support ticket within 24 hours. </p>
                <h3>How are prize claims handled for closed accounts? </h3>
                <p>If any consumer chooses to close his or her PowerPlay Systems account, we will distribute all prizes in the account before the close of business on the next full business day. If an account is closed prior to the conclusion of a customer’s live contest(s) all prizes from the contest will be distributed to the player within five business days after the contest ends. </p>
            </>
        )
    },
    {
        title: 'TEAM MANAGEMENT',
        content: (
            <>
                <h3>When do team entries and edits close? </h3>
                <p>Contest entry will close approximately one minute before the start of the first game among players you have selected. You may make changes to your team at any point up to this point.</p>
                <h3>Can I change my team after submitting an entry? </h3>
                <p>You can edit your full roster as many times as you like before the contest closes (No Powers required). You can continue to swap any player during the contest if you have Powers remaining.</p>
                <h3>How do I withdraw from a contest? </h3>
                <p>Participants can withdraw from any contest as long as they meet the following conditions: </p>
                <ul>
                    <li>Participants may withdraw from unfilled Head-to-Head or League contests at any time.</li>
                    <li>Participants may withdraw from Guaranteed games until 60 minutes before start time.</li>
                    <li>Participants may NOT withdraw from a filled Head to Head contest.</li>
                </ul>
                <p>Go to the "My Game Center" page and click the ‘X’ on the game card you wish to withdraw from. </p>
                If you have any issues withdrawing an entry, please email <a href='mailto:support@powerplaysystems.com'>support@powerplaysystems.com</a>
            </>
        )
    },
    {
        title: 'GAMEPLAY AND CONTEST RULES',
        content: (
            <>
                <h3>How Do I Enter Contests? </h3>
                <p>All available games can be entered directly from the Power Center. Choose your game and click ‘Enter’. </p>
                <h3>Is there a limit on the number of entries I can submit? </h3>
                <p>Yes, each contest has a maximum of one (1) entry.</p>
                <h3>What are Powers? </h3>
                <p>Powers give you the ability to make changes to your team during the live game. Powers can be used to swap players, boost points, or prevent scores against. You can read more by clicking ’learn more’ on any game card. </p>
                <h3>What happens if one of my players does not play or has their game cancelled? </h3>
                <p>If one of your players does not play, and you do not swap them during the live game, that player will receive 0 points.</p>
                <h3>What Happens If A Real-Life Game Is Cancelled/Delayed/Postponed? </h3>
                <p>Please visit the respective Contest Rules page for each sport offered to view the cancellation and postponement policies. </p>
                <h3>What happens if two participants tie in a contest?</h3>
                <p>If there is a tie at the end of the contest, participants included in the tie will evenly split the related prize pool positions.</p>
                <p>For example: </p>
                <p>If two participants tie for 1st place, and 1st place pays $20 and 2nd place pays $10, we add the combined places then split that among the tied parties. Each would receive $15.00. </p>
                <h3>How do you determine the start time for in-game contests? </h3>
                <p>All game cards in the Power Center reflect the start times. Once you enter a contest, the start time countdown will show in My Game Center on the game card. </p>
            </>
        )
    }
]

export default contents;