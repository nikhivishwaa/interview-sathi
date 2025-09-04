import React from "react";
import { Link } from "react-router-dom";
import AnalyticsTracker from "../components/AnalyticsTracker";

const AboutScreen = () => {
  return (
    <main>
      <AnalyticsTracker screenName="AboutScreen"/>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            About Interview Sathi
          </h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-gray-600 mb-4">
              Interview Sathi is an innovative platform designed to help job
              seekers prepare for interviews through AI-powered practice
              sessions.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4">
              Our mission is to democratize interview preparation by providing
              accessible, personalized practice opportunities for everyone. We
              believe that with proper preparation, anyone can ace their
              interviews and land their dream job.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 mb-4">
              Interview Sathi uses advanced AI technology to simulate realistic
              interview experiences. Our system analyzes your resume, tailors
              questions to your experience and the job role you're targeting,
              and provides detailed feedback to help you improve.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="h-12 w-12 bg-sathi-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-sathi-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Create an Account
                </h3>
                <p className="text-gray-600">
                  Sign up and create your profile to get started with Interview
                  Sathi.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="h-12 w-12 bg-sathi-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-sathi-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Upload Your Resume
                </h3>
                <p className="text-gray-600">
                  Upload your resume to receive tailored interview questions
                  based on your experience.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="h-12 w-12 bg-sathi-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-sathi-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Schedule Interviews
                </h3>
                <p className="text-gray-600">
                  Schedule practice interviews at your convenience and start
                  preparing.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Our Team
            </h2>
            <p className="text-gray-600 mb-4">
              Interview Sathi was founded by a team of professionals who
              understand the challenges of job searching and interview
              preparation. Our diverse team combines expertise in AI, career
              counseling, and software development to create the best interview
              preparation platform available.
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

export default AboutScreen;
