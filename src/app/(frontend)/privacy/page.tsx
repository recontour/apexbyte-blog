import React from 'react'

export const metadata = {
  title: 'Privacy Policy | ApexByte',
  description: 'Privacy Policy for ApexByte Blog',
}

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

      <div className="prose prose-slate prose-lg max-w-none text-slate-700">
        <p>
          <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
        </p>

        <p>
          At ApexByte (accessible from apexbyte.blog), one of our main priorities is the privacy of
          our visitors. This Privacy Policy document contains types of information that is collected
          and recorded by ApexByte and how we use it.
        </p>

        <h3>1. Information We Collect</h3>
        <p>
          <strong>Newsletter:</strong> If you subscribe to our newsletter, we collect your email
          address. We use this solely to send you tech insights and updates. We do not sell your
          email to third parties.
        </p>
        <p>
          <strong>Log Files:</strong> Like many other websites, ApexByte makes use of log files. The
          information inside the log files includes internet protocol (IP) addresses, browser type,
          Internet Service Provider (ISP), date/time stamp, referring/exit pages, and possibly the
          number of clicks. These are not linked to any information that is personally identifiable.
        </p>

        <h3>2. Cookies and Web Beacons</h3>
        <p>
          Like any other website, ApexByte uses "cookies". These cookies are used to store
          information including visitors' preferences, and the pages on the website that the visitor
          accessed or visited. The information is used to optimize the users' experience by
          customizing our web page content based on visitors' browser type and/or other information.
        </p>

        <h3>3. Google Analytics</h3>
        <p>
          We use Google Analytics to analyze the use of our website. Google Analytics gathers
          information about website use by means of cookies. The information gathered relating to
          our website is used to create reports about the use of our website. Google's privacy
          policy is available at:
          <a
            href="https://www.google.com/policies/privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.google.com/policies/privacy/
          </a>
        </p>

        <h3>4. Third Party Privacy Policies</h3>
        <p>
          ApexByte's Privacy Policy does not apply to other advertisers or websites. Thus, we are
          advising you to consult the respective Privacy Policies of these third-party ad servers
          for more detailed information.
        </p>

        <h3>5. Consent</h3>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree to its Terms and
          Conditions.
        </p>
      </div>
    </article>
  )
}
