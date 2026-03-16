import React from 'react'
import Footer from '../components/Footer'
import { useBreakpoint } from '../hooks/useBreakpoint'

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: [
      'By accessing or using the Dribbl platform available at dribbl.ca and any associated mobile applications (the "Platform"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, you must not use the Platform.',
      'If you are under the age of 18, you confirm that a parent or legal guardian has reviewed and agreed to these Terms on your behalf.',
      'These Terms constitute a legally binding agreement between you and Dribbl.',
    ],
  },
  {
    title: '2. Eligibility',
    body: [
      'You must be at least 14 years of age to register for and use the Platform.',
      'Users between the ages of 14 and 17 must have parental or guardian consent.',
      'Users under the age of 13 are not permitted to use the Platform under any circumstances.',
      'Coaches, scouts, and club administrators represent and warrant that they are at least 18 years of age.',
      'By registering, you confirm that all information you provide is accurate, current, and complete.',
    ],
  },
  {
    title: '3. Account Registration and Security',
    body: [
      'You are responsible for maintaining the confidentiality of your login credentials.',
      'You are responsible for all activity that occurs under your account.',
      'You must notify us immediately at support@teamdribbl.ca if you suspect unauthorized access to your account.',
      'You may not share your account with another person or create multiple accounts.',
      'We reserve the right to suspend or terminate accounts that violate these Terms.',
    ],
  },
  {
    title: '4. User Accounts — Types and Permissions',
    body: [
      'Dribbl offers the following account types:',
    ],
    list: [
      'Player Account: For individual soccer players to create an athletic profile, connect with other players, and be discoverable by coaches and scouts.',
      'Coach / Scout Account: For coaches and scouts to browse player profiles, shortlist candidates, and recruit players through the Platform.',
      'Club / Academy Account: For youth clubs and academies to create an organizational profile and showcase their players.',
    ],
  },
  {
    title: '5. User Content',
    body: [
      '5.1 Your Content',
      'You retain ownership of all content you upload to the Platform, including photos, videos, and profile information ("User Content"). By uploading User Content, you grant Dribbl a non-exclusive, royalty-free, worldwide licence to use, display, reproduce, and distribute your User Content solely for the purpose of operating and promoting the Platform.',
      '5.2 Content Standards',
      'You agree that all content you post on the Platform will:',
    ],
    list: [
      'Be accurate and not misleading',
      'Be relevant to soccer and your athletic profile',
      'Not infringe any third-party intellectual property rights',
      'Not contain nudity, sexually explicit material, or graphic violence',
      'Not contain hate speech, harassment, or discriminatory content',
      'Not promote illegal activity',
      'Not include the personal contact information of minors without explicit parental consent',
    ],
  },
  {
    title: '5.3 Content Removal',
    body: [
      'We reserve the right to remove any User Content that violates these Terms or that we determine, in our sole discretion, is harmful, inappropriate, or contrary to the spirit of the Platform. We are not obligated to review all content posted on the Platform but will act on reported content promptly.',
    ],
  },
  {
    title: '6. Acceptable Use',
    body: ['You agree not to use the Platform to:'],
    list: [
      'Harass, bully, threaten, or intimidate any other user',
      'Solicit personal information from minors',
      'Impersonate another person or entity',
      'Post false, defamatory, or misleading information',
      'Engage in unauthorized commercial activity or advertising',
      'Scrape, crawl, or extract data from the Platform without authorization',
      'Introduce viruses, malware, or other harmful code',
      'Attempt to gain unauthorized access to any portion of the Platform',
      'Use the Platform for any unlawful purpose',
    ],
  },
  {
    title: '7. Recruitment and Communication',
    body: [
      'Coaches, scouts, and clubs may use the Platform to identify and reach out to players for recruitment purposes. All recruitment communications must:',
    ],
    list: [
      'Be professional, respectful, and relevant to soccer',
      'Not involve financial solicitation or requests for payment from players or their families',
      'Comply with all applicable laws regarding the recruitment of minors',
      'Not bypass the Platform\'s messaging system to obtain private contact details without consent',
    ],
  },
  {
    title: '8. Privacy and Minor Safety',
    body: [
      'We take the safety of minors on the Platform seriously. All users agree to:',
    ],
    list: [
      'Respect the privacy of other users, particularly those who are minors',
      'Not share, distribute, or misuse the personal information of any user',
      'Report any suspicious or inappropriate behaviour involving minors to us immediately',
    ],
  },
  {
    title: '9. Intellectual Property',
    body: [
      'All content, design, logos, trademarks, and technology on the Platform that are not User Content are the exclusive property of Dribbl and are protected by Canadian and international intellectual property laws. You may not copy, reproduce, distribute, or create derivative works from any part of the Platform without our prior written consent.',
    ],
  },
  {
    title: '10. Third-Party Links and Services',
    body: [
      'The Platform may contain links to third-party websites or services. We are not responsible for the content, privacy practices, or terms of any third-party sites. Accessing third-party links is at your own risk.',
    ],
  },
  {
    title: '11. Disclaimers',
    body: [
      'The Platform is provided on an "as is" and "as available" basis. To the fullest extent permitted by law, Dribbl disclaims all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.',
      'We do not guarantee that:',
    ],
    list: [
      'The Platform will be uninterrupted, error-free, or secure',
      'Any player will be recruited or discovered through the Platform',
      'Any coach, scout, or club account is verified or legitimate unless explicitly stated',
    ],
  },
  {
    title: '12. Limitation of Liability',
    body: [
      'To the maximum extent permitted by applicable law, Dribbl and its directors, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, loss of opportunity, or loss of revenue, arising out of or in connection with your use of the Platform.',
      'Our total liability to you for any claim arising under these Terms shall not exceed the amount you have paid to us in the 12 months preceding the claim, or CAD $100, whichever is greater.',
    ],
  },
  {
    title: '13. Indemnification',
    body: [
      'You agree to indemnify and hold harmless Dribbl and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the Platform, your User Content, or your violation of these Terms.',
    ],
  },
  {
    title: '14. Termination',
    body: [
      'We reserve the right to suspend or permanently terminate your account at any time, with or without notice, if we believe you have violated these Terms, engaged in harmful conduct, or for any other reason at our discretion.',
      'You may delete your account at any time through your account settings. Upon termination, your right to use the Platform ceases immediately.',
      'Sections 9, 11, 12, and 13 of these Terms survive termination.',
    ],
  },
  {
    title: '15. Governing Law and Dispute Resolution',
    body: [
      'These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict of law principles.',
      'Any disputes arising out of or relating to these Terms or the Platform shall first be attempted to be resolved through good-faith negotiation. If unresolved, disputes shall be subject to the exclusive jurisdiction of the courts of the Province of Ontario.',
    ],
  },
  {
    title: '16. Changes to These Terms',
    body: [
      'We may update these Terms from time to time. When we make material changes, we will notify users via email or a prominent notice on the Platform at least 14 days before the changes take effect. Continued use of the Platform after that date constitutes your acceptance of the updated Terms.',
    ],
  },
]

const TermsPage = () => {
  const { isMobile } = useBreakpoint()

  return (
    <>
      <section style={{ background: 'var(--dark)', padding: isMobile ? '120px 24px 80px' : '160px 80px 100px', borderBottom: '1px solid var(--border-weak)' }}>
        <div className="overline" style={{ marginBottom: 24 }}>// TERMS & CONDITIONS</div>
        <h1 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 72px)', color: 'var(--text)', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 24px' }}>
          Terms and Conditions
        </h1>
        <p style={{ fontFamily: 'Manrope', fontSize: 15, lineHeight: 1.9, color: 'var(--text-muted)', maxWidth: 720, margin: 0, letterSpacing: '0.02em' }}>
          The terms that govern use of the Dribbl platform.
        </p>
      </section>

      <section style={{ background: 'var(--dark)', padding: isMobile ? '64px 24px' : '90px 80px' }}>
        <div style={{ maxWidth: 900 }}>
          {sections.map((s) => (
            <div key={s.title} style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 'clamp(18px, 2.2vw, 26px)', color: 'var(--text)', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
                {s.title}
              </h2>
              {s.body && s.body.map((p) => (
                <p key={p} style={{ fontFamily: 'Manrope', fontSize: 14, lineHeight: 1.9, color: 'var(--text-muted)', margin: '0 0 10px', letterSpacing: '0.02em' }}>
                  {p}
                </p>
              ))}
              {s.list && (
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {s.list.map((item) => (
                    <li key={item} style={{ fontFamily: 'Manrope', fontSize: 14, lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.02em' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default TermsPage
