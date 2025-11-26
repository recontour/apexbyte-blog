import React from 'react'

export const metadata = {
  title: 'Terms of Service | ApexByte',
  description: 'Terms of Service for ApexByte Blog',
}

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>

      <div className="prose prose-slate prose-lg max-w-none text-slate-700">
        <p>
          <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
        </p>

        <h3>1. Terms</h3>
        <p>
          By accessing this Website, accessible from apexbyte.blog, you are agreeing to be bound by
          these Website Terms and Conditions of Use and agree that you are responsible for the
          agreement with any applicable local laws. If you disagree with any of these terms, you are
          prohibited from accessing this site.
        </p>

        <h3>2. Use License</h3>
        <p>
          Permission is granted to temporarily download one copy of the materials on ApexByte's
          Website for personal, non-commercial transitory viewing only. This is the grant of a
          license, not a transfer of title, and under this license you may not:
        </p>
        <ul>
          <li>modify or copy the materials;</li>
          <li>use the materials for any commercial purpose or for any public display;</li>
          <li>attempt to reverse engineer any software contained on ApexByte's Website;</li>
          <li>remove any copyright or other proprietary notations from the materials;</li>
        </ul>

        <h3>3. Disclaimer</h3>
        <p>
          All the materials on ApexByte’s Website are provided "as is". ApexByte makes no
          warranties, may it be expressed or implied, therefore negates all other warranties.
          Furthermore, ApexByte does not make any representations concerning the accuracy or
          reliability of the use of the materials on its Website or otherwise relating to such
          materials or any sites linked to this Website.
        </p>
        <p>
          The tech advice provided on this blog is for educational purposes only. Always test code
          in a staging environment before using it in production.
        </p>

        <h3>4. Limitations</h3>
        <p>
          ApexByte or its suppliers will not be hold accountable for any damages that will arise
          with the use or inability to use the materials on ApexByte’s Website, even if ApexByte or
          an authorize representative of this Website has been notified, orally or written, of the
          possibility of such damage.
        </p>

        <h3>5. Governing Law</h3>
        <p>
          Any claim related to ApexByte's Website shall be governed by the laws of India without
          regards to its conflict of law provisions.
        </p>
      </div>
    </article>
  )
}
