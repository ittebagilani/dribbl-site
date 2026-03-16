import React from 'react'
import Footer from '../components/Footer'
import { useBreakpoint } from '../hooks/useBreakpoint'

const sections = [
  {
    title: '1. Introduction',
    body: [
      'Dribbl ("we," "us," or "our") operates the social and recruitment platform available at teamdribbl.ca and any associated mobile applications (collectively, the "Platform"). We are committed to protecting the privacy of all users, including minors.',
      'This Privacy Policy explains what personal information we collect, how we use it, who we share it with, and what rights you have. By using Dribbl, you agree to the practices described in this policy.',
      'Dribbl is operated from Canada and complies with the Personal Information Protection and Electronic Documents Act (PIPEDA), applicable provincial privacy legislation, and where applicable, international frameworks including the General Data Protection Regulation (GDPR) and the Children\'s Online Privacy Protection Act (COPPA).',
    ],
  },
  {
    title: '2. Information We Collect',
    body: ['2.1 Information You Provide Directly'],
    list: [
      'Full name, username, and email address',
      'Date of birth and age',
      'Profile photo and cover image',
      'Soccer-related information: position(s), club history, achievements, and career milestones',
      'Uploaded videos, photos, and highlight reels',
      'Messages sent through the Platform',
      'Club or academy information (for club accounts)',
      'Coach or scout credentials and affiliation (for coach/scout accounts)',
    ],
  },
  {
    title: '2.2 Information Collected Automatically',
    list: [
      'IP address and approximate location',
      'Device type, operating system, and browser type',
      'Pages visited, time spent on the Platform, and interaction data',
      'Log data and crash reports',
      'Cookies and similar tracking technologies',
    ],
  },
  {
    title: '2.3 Information From Third Parties',
    body: [
      'If you sign up using a third-party service (e.g., Google), we receive basic profile information from that service as permitted by your settings.',
    ],
  },
  {
    title: '3. How We Use Your Information',
    body: ['We use the personal information we collect to:'],
    list: [
      'Create and manage your account',
      'Display your profile to other users on the Platform',
      'Facilitate connections between players, coaches, scouts, and clubs',
      'Enable coaches and scouts to discover and recruit players',
      'Send notifications, messages, and platform updates',
      'Improve and develop the Platform',
      'Ensure the safety and security of all users',
      'Comply with legal obligations',
      'Respond to support requests and complaints',
    ],
  },
  {
    title: '4. Parental Consent and Users Under 18',
    body: [
      'Dribbl is designed for soccer players aged 14 and older. We take the privacy and safety of minors seriously.',
      'Users between the ages of 14 and 17 must have a parent or legal guardian review and acknowledge this Privacy Policy on their behalf prior to registration.',
      'We do not knowingly collect personal information from children under the age of 13 without verified parental consent. If we become aware that a user is under 13 and has registered without parental consent, we will promptly delete their account and associated data.',
      'Parents or guardians may request to review, modify, or delete their child\'s personal information by contacting us at the address provided in Section 11.',
      'We encourage parents to supervise and participate in their child\'s use of the Platform.',
    ],
  },
  {
    title: '5. Sharing Your Information',
    body: [
      'We do not sell your personal information. We may share your information in the following circumstances:',
    ],
    list: [
      'With other users: Your public profile, including your name, position, club history, highlights, and achievements, is visible to all registered users on the Platform including coaches, scouts, and clubs.',
      'With service providers: We work with trusted third-party providers for hosting, data storage, analytics, and customer support. These providers are contractually bound to protect your data.',
      'For legal reasons: We may disclose your information if required to do so by law or in response to a valid legal request, such as a court order or government inquiry.',
      'Business transfers: In the event of a merger, acquisition, or sale of all or part of our assets, your information may be transferred as part of that transaction. We will notify you before your personal information is transferred and becomes subject to a different privacy policy.',
      'With your consent: We may share your information in any other circumstance where you have given us explicit consent to do so.',
    ],
  },
  {
    title: '6. Cookies and Tracking Technologies',
    body: [
      'We use cookies and similar technologies to operate the Platform, remember your preferences, and improve your experience. You can control cookie settings through your browser, though disabling certain cookies may affect the functionality of the Platform.',
      'We do not use cookies to serve third-party advertising on the Platform.',
    ],
  },
  {
    title: '7. Data Retention',
    body: [
      'We retain your personal information for as long as your account is active or as needed to provide you with our services. If you delete your account, we will delete or anonymize your personal information within 30 days, unless we are required to retain it for legal purposes.',
      'Uploaded content such as videos and photos may take up to 60 days to be fully removed from backup systems.',
    ],
  },
  {
    title: '8. Data Security',
    body: [
      'We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These include encrypted data transmission (SSL/TLS), secure data storage, and access controls.',
      'However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security and encourage users to use strong, unique passwords and to keep their login credentials confidential.',
    ],
  },
  {
    title: '9. Your Privacy Rights',
    body: [
      'Depending on your location, you may have the following rights regarding your personal information:',
    ],
    list: [
      'Access: Request a copy of the personal information we hold about you.',
      'Correction: Request that we correct inaccurate or incomplete information.',
      'Deletion: Request that we delete your personal information, subject to legal obligations.',
      'Withdrawal of consent: Withdraw your consent to our processing of your personal information at any time.',
      'Data portability: Request that we provide your data in a portable, machine-readable format.',
      'Objection: Object to certain types of processing of your personal information.',
    ],
  },
  {
    title: '10. Changes to This Privacy Policy',
    body: [
      'We may update this Privacy Policy from time to time. When we make material changes, we will notify users via email or a prominent notice on the Platform at least 14 days before the changes take effect. Continued use of the Platform after that date constitutes acceptance of the updated policy.',
    ],
  },
]

const PrivacyPolicyPage = () => {
  const { isMobile } = useBreakpoint()

  return (
    <>
      <section style={{ background: 'var(--dark)', padding: isMobile ? '120px 24px 80px' : '160px 80px 100px', borderBottom: '1px solid var(--border-weak)' }}>
        <div className="overline" style={{ marginBottom: 24 }}>// PRIVACY POLICY</div>
        <h1 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 72px)', color: 'var(--text)', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 24px' }}>
          Privacy Policy
        </h1>
        <p style={{ fontFamily: 'Manrope', fontSize: 15, lineHeight: 1.9, color: 'var(--text-muted)', maxWidth: 720, margin: 0, letterSpacing: '0.02em' }}>
          How we collect, use, and protect personal information on Dribbl.
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

export default PrivacyPolicyPage
