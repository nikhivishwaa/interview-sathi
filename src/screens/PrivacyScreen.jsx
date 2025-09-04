import React from "react";
import { Link } from "react-router-dom";
import AnalyticsTracker from "../components/AnalyticsTracker";

const PrivacyScreen = () => {
  return (
    <main>
      <AnalyticsTracker screenName="PrivacyScreen"/>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-gray-600 mb-4">Last updated: April 5, 2025</p>

            <p className="text-gray-600 mb-4">
              At Interview Sathi, we take your privacy seriously. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you use our website and services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 mb-4">
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Create an account and profile</li>
              <li>Upload your resume</li>
              <li>Participate in interview sessions</li>
              <li>Contact us with questions or feedback</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              Types of Information
            </h3>
            <p className="text-gray-600 mb-4">
              The information we collect may include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Personal information (name, email address, phone number)</li>
              <li>Educational and professional background from your resume</li>
              <li>Audio recordings from interview sessions</li>
              <li>Interview responses and feedback</li>
              <li>Usage data and analytics</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Provide, maintain, and improve our services</li>
              <li>Create and maintain your account</li>
              <li>Process and complete transactions</li>
              <li>Generate personalized interview questions and feedback</li>
              <li>
                Send you technical notices, updates, and administrative messages
              </li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Analyze trends and usage patterns</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Data Retention
            </h2>
            <p className="text-gray-600 mb-4">
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Data Security
            </h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organizational measures to
              protect the security of your personal information. However, no
              electronic transmission or storage of information can be
              guaranteed to be 100% secure.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-600 mb-4">
              Depending on your location, you may have rights regarding your
              personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600">
              <li>Accessing your personal information</li>
              <li>Correcting inaccurate information</li>
              <li>Deleting your personal information</li>
              <li>Objecting to certain processing of your information</li>
              <li>Withdrawing consent</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-600 mb-4">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p className="text-gray-600 mb-4">
              Email: privacy@interviewsathi.com
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

export default PrivacyScreen;
