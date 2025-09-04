import React from 'react';
import InterviewRoom from '../components/InterviewRoom';
import AnalyticsTracker from '../components/AnalyticsTracker';

const InterviewScreen = () => {
  return (
    <main className="bg-gray-50">
      <AnalyticsTracker screenName="InterviewScreen"/>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 w-10/12">
          <h1 className="text-2xl font-bold text-gray-900">Interview Session</h1>
          <p className="text-gray-600">Answer questions clearly and take your time</p>
        </div>
        
        <InterviewRoom />
      </div>
    </main>
  );
};

export default InterviewScreen;