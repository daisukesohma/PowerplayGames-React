import { Link } from "react-router-dom";

const contents = [
    {
        title: 'The Rules',
        content: (
            <p>Learn the rules before you play. Please review the specific rules for each contest before entering. Visit our <Link to='/terms'>Terms of use</Link> for more information.</p>
        )
    },
    {
        title: 'No Minors',
        content: (
            <p>You must be 18 years of age or older (21 years of age or older in Massachusetts) enter a contest on the PowerPlay Systems Website. Visit our <Link to='/terms'>Terms of use</Link> for more information.</p>
        )
    },
    {
        title: 'Powerplay Systems Employees',
        content: (
            <p>Employees of PowerPlay Systems and their immediate family members are restricted from entering contests on the Powerplay Systems Website. </p>
        )
    },
    {
        title: 'Tax Obligations for Winners.',
        content: (
            <p>Each year all users who have won $600 or more during the previous year must provide additional information to assist us in complying with tax regulations and preparing forms, including 1099-MISC reporting forms. Visit our <Link to='/terms'>Terms of use</Link> for more information. </p>
        )
    },
    {
        title: 'Account Management, Security and Protection',
        content: (
            <>
                <p>PowerPlay Systems is committed to protecting the security of your personal information. We use a variety of security technologies and procedures to help protect your personal information from unauthorized access, use, or disclosure</p>
                <p>We have also implemented a number of security procedures, structures and safeguards to protect our own network, including, but not limited to, encryption, firewalls, and third-party audits. Powerplay Systems security team also monitors and regularly reviews our system's infrastructure, to detect possible weakness and updates practices, procedures and technologies pending new developments.</p>
                <p>In addition to our efforts, we strongly encourage you to use best practices to prevent unauthorized access to your account. Here are some steps you can take to protect your password:</p>
                <ul>
                    <li>Never share your password with anyone.</li>
                    <li>Use a combination of letters, numbers and symbols (_@#$%^ =,.!).</li>
                    <li>Avoid obvious names, common words and birthdays.</li>
                    <li>Longer passwords are stronger (up to 24 total characters).</li>
                    <li>Try a mnemonic device for something only you’ll remember.</li>
                    <li>Update your password on a regular basis, and make it unique from other sites.</li>
                </ul>
                <p>Take these additional steps to protect your account:</p>
                <ul>
                    <li>When accessing the Powerplay Games Platform from a device you don't own, make sure you sign out.</li>
                    <li>Be wary of phishing scams. Blackjack Sports will never ask for your password.</li>
                    <li>Avoid bad links and questionable websites. To check where a link is taking you before you click it, rest your mouse cursor on the link and examine the URL.</li>
                    <li>Avoid downloading files from unknown sources.</li>
                    <li>If you have any concerns or complaints or believe that your account has been compromised in any way, please email <a href='mailto:support@powerplaygames.com'>support@powerplaygames.com</a> right away for assistance.</li>
                </ul>
            </>
        )
    },
    {
        title: 'Prizes and Points Distribution',
        content: (
            <p>Each contest will have its own unique prize and point distribution models. Please review the specific contest rules for each contest to view prize and point distributions.</p>
        )
    },
    {
        title: 'Parental Controls',
        content: (
            <p>If minors under 18 have access to your computer and/or personal information, please consider installing parental control software to prevent access to the PowerPlay Systems Website and other age-restricted sites.</p>
        )
    },
    {
        title: 'Multi-Accounting',
        content: (
            <p>You may establish, maintain, use and control only one account on the PowerPlay Systems Website and each account on the PowerPlay Systems Website may only be owned, maintained, used and controlled by one individual. Visit our <Link to='/terms'>Terms of use</Link> for more information.</p>
        )
    },
    {
        title: 'Permanently Closing Your PowerPlay Systems Account',
        content: (
            <p>You can, at any time, request to have your PowerPlay Systems account permanently closed. Email <a href='mailto:support@powerplaysystems.com'>support@powerplaysystems.com</a></p>
        )
    },
    {
        title: 'Scripts and Automated Tools',
        content: (
            <p>Use of third-party or unauthorized scripts is prohibited on the Powerplay Systems Website.</p>
        )
    },
    {
        title: 'Maximum Entries',
        content: (
            <p>Each player may one create a single entry into each Powerplay Systems contest. Visit our <Link to='/terms'>Terms of use</Link> for more information.</p>
        )
    },
    {
        title: 'Complaints',
        content: (
            <p>If you have a complaint about anything relating to the Powerplay Systems Website, please contact us at <a href='mailto:support@powerplaysystems.com'>support@powerplaysystems.com</a>.</p>
        )
    }
];

export default contents;