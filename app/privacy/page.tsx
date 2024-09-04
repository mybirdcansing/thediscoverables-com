'use client'

import { Container } from 'components/Container'
import { PageHeader } from 'components/PageHeader'
import { PageLayout } from 'components/PageLayout'
import { useSettings } from 'lib/settingsContext'
import Link from 'next/link'
import React from 'react'

const PrivacyPage = () => {
  const { title } = useSettings()

  return (
    <PageLayout darkBg>
      <Container>
        <PageHeader title={title} isLightFont />
        <div className="flex flex-col w-full">
          <div className="max-w-[800px] w-full mx-auto">
            <h2 className="text-3xl font-bold mb-5">Privacy Policy</h2>
            <p className="space-y-4 my-4">
              <strong>Last updated: 9/3/2024</strong>
            </p>
            <p className="space-y-4 my-4">
              Welcome to {title} (&quot;we,&quot; &quot;our,&quot; or
              &quot;us&quot;). We are committed to protecting your privacy and
              ensuring that your personal information is handled in a safe and
              responsible manner. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our
              website.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">
              1. Information We Collect
            </h3>
            <p className="space-y-4 my-4">
              When you visit our website, we may collect certain information
              automatically.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">
              2. How We Use Your Information
            </h3>
            <p className="space-y-4 my-4">
              We use the information collected through cookies and other
              technologies to enhance your experience and to ensure the security
              of our website by protecting against fraudulent or malicious
              activity.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">
              3. Sharing Your Information
            </h3>
            <p className="space-y-4 my-4">
              We do not share your personal information with third parties
              except as necessary to provide our services, comply with the law,
              or protect our rights.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">
              4. Your Cookie Choices
            </h3>
            <p className="space-y-4 my-4">
              Our website uses cookies solely for security purposes. You can
              manage your cookie preferences by adjusting your browser settings
              to refuse or delete cookies. Please note that disabling cookies
              may affect the functionality and security of our website.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">
              5. Security of Your Information
            </h3>
            <p className="space-y-4 my-4">
              We take the security of your personal information seriously and
              use reasonable administrative, technical, and physical measures to
              protect your information from unauthorized access, use, or
              disclosure.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">
              6. Changes to This Privacy Policy
            </h3>
            <p className="space-y-4 my-4">
              We may update this Privacy Policy from time to time. Any changes
              will be reflected on this page with an updated revision date. We
              encourage you to review this Privacy Policy periodically to stay
              informed about how we are protecting your information.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">7. Contact Us</h3>
            <p className="space-y-4 my-4">
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please{' '}
              <Link href="/contact" className="text-indigo-400 hover:underline">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </PageLayout>
  )
}

export default PrivacyPage
