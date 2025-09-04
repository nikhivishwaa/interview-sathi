import React from "react";
import { Link } from "react-router-dom";
import AnalyticsTracker from "../components/AnalyticsTracker";

const TermsScreen = () => {
  return (
    <main>
      <AnalyticsTracker screenName="TermsScreen"/>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-gray-600 mb-4">Last updated: April 5, 2025</p>

            <p className="text-gray-600 mb-4">
              Please read these Terms of Service ("Terms") carefully before
              using the Interview Sathi website and services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 mb-4">
              By accessing or using Interview Sathi, you agree to be bound by
              these Terms. If you do not agree to all of these Terms, you may
              not use our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              2. Changes to Terms
            </h2>
            <p className="text-gray-600 mb-4">
              We may modify these Terms at any time by posting the revised Terms
              on our website. Your continued use of our services after any such
              changes constitutes your acceptance of the revised Terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              3. Account Registration
            </h2>
            <p className="text-gray-600 mb-4">
              To access certain features of our services, you must create an
              account. You are responsible for maintaining the confidentiality
              of your account information and for all activities that occur
              under your account.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              4. User Content
            </h2>
            <p className="text-gray-600 mb-4">
              You retain ownership of any content you submit through our
              services, including resumes and interview responses. However, by
              submitting content, you grant us a worldwide, non-exclusive,
              royalty-free license to use, reproduce, modify, adapt, publish,
              translate, and distribute such content in connection with
              providing our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              5. Prohibited Conduct
            </h2>
            <p className="text-gray-600 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Violate any applicable laws or regulations</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt our services</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use our services for any fraudulent or illegal purpose</li>
              <li>Harass, abuse, or harm another person</li>
              <li>Submit false or misleading information</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              6. Intellectual Property Rights
            </h2>
            <p className="text-gray-600 mb-4">
              Our services and their contents, features, and functionality are
              owned by Interview Sathi and are protected by copyright,
              trademark, and other intellectual property laws.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              7. Termination
            </h2>
            <p className="text-gray-600 mb-4">
              We may terminate or suspend your account and access to our
              services at our sole discretion, without notice, for conduct that
              we believe violates these Terms or is harmful to other users, us,
              or third parties, or for any other reason.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              8. Disclaimer of Warranties
            </h2>
            <p className="text-gray-600 mb-4">
              Our services are provided "as is" and "as available" without any
              warranties of any kind, either express or implied.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-gray-600 mb-4">
              To the maximum extent permitted by law, Interview Sathi shall not
              be liable for any indirect, incidental, special, consequential, or
              punitive damages resulting from your use of or inability to use
              our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              10. Governing Law
            </h2>
            <p className="text-gray-600 mb-4">
              These Terms shall be governed by and construed in accordance with
              the laws of India, without regard to its conflict of law
              provisions.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              11. Contact Us
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-gray-600 mb-4">
              Email: legal@interviewsathi.com
              <br />
              Address: 123 Tech Park, Innovation Street, Bangalore, Karnataka
              560001, India
            </p>

            <div className="mt-8">
              <Link to="/" className="text-sathi-primary hover:underline">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsScreen;
