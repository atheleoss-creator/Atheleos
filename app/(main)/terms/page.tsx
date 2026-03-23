import React from 'react';

export const metadata = {
  title: 'Terms of Use | Atheleos',
  description: 'Terms of Use for Atheleos',
};

export default function TermsOfUsePage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto bg-card rounded-xl border shadow-sm p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-6 text-sm md:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Atheleos ("the App"), you accept and agree to be bound by the terms and provision of this agreement. 
              In addition, when using this App's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. User Accounts</h2>
            <p>
              When you create an account with us, you must provide us information that is accurate, complete, and current at all times. 
              Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            <p className="mt-2">
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). 
              You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
            </p>
            <p className="mt-2">
              By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Acceptable Use Policy</h2>
            <p className="mb-2">You agree not to use the Service to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Post content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
              <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
              <li>Engage in any activity that interferes with or disrupts the Service.</li>
              <li>Attempt to gain unauthorized access to any portion or feature of the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Atheleos and its licensors. 
              The Service is protected by copyright, trademark, and other laws of both the country and foreign countries.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
