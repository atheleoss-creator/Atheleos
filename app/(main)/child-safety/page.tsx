"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/components/Icons";

export default function ChildSafetyPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-bg-body pb-24 relative">
            {/* Header */}
            <div className="flex items-center gap-4 px-4 py-3 sticky top-[64px] md:top-[64px] bg-black/80 backdrop-blur-xl z-10 border-b border-white/[0.06]">
                <button onClick={() => router.back()} className="text-white p-1.5 -ml-1 hover:bg-white/5 rounded-xl transition-colors">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold text-white">Child Safety Policy</h1>
            </div>

            <div className="px-5 md:px-0 max-w-2xl mx-auto mt-8">
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Zero-Tolerance Policy</h2>
                    
                    <p className="text-text-secondary text-[15px] mb-4 leading-relaxed">
                        At Atheleos, the safety and well-being of all users, especially minors, is our highest priority. We maintain a strict zero-tolerance policy against any form of exploitation or abuse.
                    </p>

                    <h3 className="text-lg font-bold text-white mb-2 mt-6">Prohibition of CSAM</h3>
                    <p className="text-text-secondary text-[15px] mb-4 leading-relaxed">
                        Atheleos explicitly prohibits the creation, distribution, sharing, or promotion of Child Sexual Abuse Material (CSAM). Any user found violating this policy will face an immediate, permanent ban from our platform.
                    </p>

                    <h3 className="text-lg font-bold text-white mb-2 mt-6">Child Sexual Abuse and Exploitation (CSAE)</h3>
                    <p className="text-text-secondary text-[15px] mb-4 leading-relaxed">
                        Atheleos strictly prohibits any content, communication, or activity that relates to Child Sexual Abuse and Exploitation (CSAE). This includes, but is not limited to, the grooming of minors, non-consensual sharing of intimate images involving minors, and any predatory behavior.
                    </p>

                    <h3 className="text-lg font-bold text-white mb-2 mt-6">Monitoring and Enforcement</h3>
                    <p className="text-text-secondary text-[15px] mb-4 leading-relaxed">
                        We take proactive steps to ensure our community remains safe. We manually review reports from our users and use automated tools to detect and remove violating content before it spreads. Our moderation team is dedicated to swiftly addressing any reports concerning child safety.
                    </p>

                    <h3 className="text-lg font-bold text-white mb-2 mt-6">Reporting to Authorities</h3>
                    <p className="text-text-secondary text-[15px] mb-4 leading-relaxed">
                        We do not simply remove illegal content. Atheleos is committed to cooperating fully with law enforcement. We will immediately report any instances of illegal content or activities, including suspected CSAM, to the appropriate authorities, such as the National Center for Missing & Exploited Children (NCMEC), to ensure real-world consequences and protect the vulnerable.
                    </p>
                </div>
            </div>
        </div>
    );
}
