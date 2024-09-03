'use client'

import { Container } from 'components/Container'
import { PageHeader } from 'components/PageHeader'
import { PageLayout } from 'components/PageLayout'
import { useSettings } from 'lib/settingsContext'
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
              automatically, such as:
            </p>
            <ul className="list-disc pl-5 my-4">
              <li>
                Cookies and Tracking Technologies: Our website uses cookies and
                similar technologies to enhance your experience. Cookies are
                small text files that are placed on your device to help us
                provide a better user experience. We use cookies from
                third-party services, including Sentry and reCAPTCHA.
              </li>
            </ul>
            <h3 className="text-xl font-semibold mt-6 mb-3">
              2. Cookies and Their Purposes
            </h3>
            <p className="space-y-4 my-4">
              We use the following types of cookies on our website:
            </p>
            <ul className="list-disc pl-5 my-4">
              <li>
                <strong>Essential Cookies:</strong> These cookies are necessary
                for the operation of our website. Without these cookies, certain
                services and functionalities may not be accessible or work
                correctly. This includes cookies from:
                <ul className="list-disc pl-5 my-2">
                  <li>
                    <strong>reCAPTCHA:</strong> We use Google reCAPTCHA to
                    protect our site from spam and abuse. This service uses
                    cookies to perform risk analysis and distinguish between
                    human and automated access.{' '}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Learn more about how Google uses your data
                    </a>
                    .
                  </li>
                  <li>
                    <strong>Sentry:</strong> We use Sentry for error tracking
                    and monitoring to ensure the website operates smoothly.
                    Sentry may use cookies to identify errors and bugs.{' '}
                    <a
                      href="https://sentry.io/privacy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Learn more about Sentry&rsquo;s privacy practices
                    </a>
                    .
                  </li>
                </ul>
              </li>
            </ul>
            <h3 className="text-xl font-semibold mt-6 mb-3">
              3. How We Use Your Information
            </h3>
            <p className="space-y-4 my-4">
              We use the information collected through cookies and other
              technologies for the following purposes:
            </p>
            <ul className="list-disc pl-5 my-4">
              <li>
                To ensure the security of our website by identifying and
                preventing fraudulent or malicious activity.
              </li>
              <li>
                To monitor and improve website performance by detecting errors
                and optimizing the user experience.
              </li>
            </ul>
            <h3 className="text-xl font-semibold mt-6 mb-3">
              4. Sharing Your Information
            </h3>
            <p className="space-y-4 my-4">
              We do not share your personal information with third parties
              except as necessary to provide our services, comply with the law,
              or protect our rights. The third-party services we use (reCAPTCHA
              and Sentry) may collect data in accordance with their own privacy
              policies.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">
              5. Your Cookie Choices
            </h3>
            <p className="space-y-4 my-4">
              By continuing to use our website, you consent to our use of
              cookies as described in this Privacy Policy. You can manage your
              cookie preferences by adjusting your browser settings to refuse or
              delete cookies. Please note that disabling cookies may affect the
              functionality of our website and prevent you from accessing
              certain features.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">
              6. Security of Your Information
            </h3>
            <p className="space-y-4 my-4">
              We take the security of your personal information seriously and
              use reasonable administrative, technical, and physical measures to
              protect your information from unauthorized access, use, or
              disclosure.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">
              7. Changes to This Privacy Policy
            </h3>
            <p className="space-y-4 my-4">
              We may update this Privacy Policy from time to time. Any changes
              will be reflected on this page with an updated revision date. We
              encourage you to review this Privacy Policy periodically to stay
              informed about how we are protecting your information.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">8. Contact Us</h3>
            <p className="space-y-4 my-4">
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us at [Your Contact
              Information].
            </p>
          </div>
        </div>
      </Container>
    </PageLayout>
  )
}

export default PrivacyPage
