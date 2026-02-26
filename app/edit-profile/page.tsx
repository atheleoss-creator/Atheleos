"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@/components/Icons';

export default function EditProfilePage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const [formData, setFormData] = useState({
        full_name: '',
        bio: '',
        sport: '',
        position: '',
        height: '',
        weight: '',
        top_speed: '',
        vertical_leap: '',
        recruiting_status: 'Not Looking',
        city: '',
        state: ''
    });

    useEffect(() => {
        if (user?.username) {
            // Fetch current advanced stats to populate form
            fetch(`/api/profile/${user.username}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.profile) {
                         // Safely spread avoiding nulls overriding initial empty strings
                        const p = data.profile;
                        setFormData({
                            full_name: p.full_name || '',
                            bio: p.bio || '',
                            sport: p.sport || '',
                            position: p.position || '',
                            height: p.height || '',
                            weight: p.weight || '',
                            top_speed: p.top_speed || '',
                            vertical_leap: p.vertical_leap || '',
                            recruiting_status: p.recruiting_status || 'Not Looking',
                            city: p.city || '',
                            state: p.state || ''
                        });
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to load profile', err);
                    setLoading(false);
                });
        } else if (user === null) {
            // Not logged in
            router.push('/login');
        }
    }, [user, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: '', type: '' });

        try {
            const res = await fetch('/api/profile/edit', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error || 'Failed to update profile');

            setMessage({ text: 'Profile updated successfully!', type: 'success' });
            
            // Redirect back to profile after short delay
            setTimeout(() => {
                if (user?.username) router.push(`/profile/${user.username}`);
            }, 1500);

        } catch (err: any) {
            setMessage({ text: err.message, type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-bg-body flex items-center justify-center text-text-secondary">Loading profile data...</div>;
    }

    return (
        <div className="min-h-screen bg-bg-body pb-20 pt-4">
             {/* Header */}
             <div className="flex items-center justify-between px-4 py-3 bg-bg-body border-b border-border-color sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="text-text-primary">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold">Edit Player Card</h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto p-4 md:p-8 mt-4">
                <div className="mb-8 border-b border-border-color pb-4">
                    <p className="text-text-secondary">Update your athletic biometrics and recruiting status so scouts and teams can find you.</p>
                </div>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8 bg-bg-card p-6 rounded-2xl border border-border-color shadow-sm">
                    
                    {/* Section 1: Basic Info */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-accent-primary border-b border-border-color/50 pb-2">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                                <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Recruiting Status</label>
                                <select name="recruiting_status" value={formData.recruiting_status} onChange={handleChange} className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary appearance-none">
                                    <option value="Not Looking">Not Looking</option>
                                    <option value="Looking">Looking for Offers</option>
                                    <option value="Signed">Signed / Committed</option>
                                    <option value="Free Agent">Free Agent</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">Bio</label>
                            <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary resize-none placeholder-text-muted" placeholder="Share your athletic journey..."></textarea>
                        </div>
                    </div>

                    {/* Section 2: Athletic Biometrics */}
                    <div className="space-y-4 pt-4">
                        <h2 className="text-xl font-bold text-accent-primary border-b border-border-color/50 pb-2">Athletic Metrics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Primary Sport</label>
                                <input type="text" name="sport" value={formData.sport} onChange={handleChange} placeholder="e.g. Basketball" className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Position / Event</label>
                                <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="e.g. Point Guard" className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Height</label>
                                <input type="text" name="height" value={formData.height} onChange={handleChange} placeholder="e.g. 6'2&quot;" className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Weight</label>
                                <input type="text" name="weight" value={formData.weight} onChange={handleChange} placeholder="e.g. 190 lbs" className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary" />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Vertical Leap</label>
                                <input type="text" name="vertical_leap" value={formData.vertical_leap} onChange={handleChange} placeholder="e.g. 40 in" className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">Top Speed / Pace</label>
                                <input type="text" name="top_speed" value={formData.top_speed} onChange={handleChange} placeholder="e.g. 21 mph" className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary" />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Location */}
                    <div className="space-y-4 pt-4">
                        <h2 className="text-xl font-bold text-accent-primary border-b border-border-color/50 pb-2">Location</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1">State / Province</label>
                                <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full bg-bg-input border border-border-color rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end gap-3 border-t border-border-color/50">
                        <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-xl font-semibold text-text-secondary hover:text-white bg-bg-input hover:bg-border-color transition-all">
                            Cancel
                        </button>
                        <button type="submit" disabled={saving} className="px-8 py-3 bg-accent-gradient text-white font-bold rounded-xl hover:shadow-lg hover:shadow-accent-primary/20 transform active:scale-95 transition-all disabled:opacity-50">
                            {saving ? 'Saving...' : 'Save Profile'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
