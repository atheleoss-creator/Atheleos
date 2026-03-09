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
            fetch(`/api/profile/${user.username}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.profile) {
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
        return (
            <div className="min-h-screen bg-bg-body flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const inputClass = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary/50 focus:bg-white/[0.06] transition-all placeholder-text-tertiary";

    return (
        <div className="min-h-screen bg-bg-body pb-24">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-xl border-b border-white/[0.06] sticky top-[64px] z-40">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="text-white p-1.5 -ml-1 hover:bg-white/5 rounded-xl transition-colors">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold text-white">Edit Player Card</h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto p-4 md:p-8 mt-4 animate-fade-in">
                <div className="mb-8 border-b border-white/[0.06] pb-4">
                    <p className="text-text-secondary text-sm">Update your athletic biometrics and recruiting status so scouts and teams can find you.</p>
                </div>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl border backdrop-blur-sm animate-slide-up ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8 bg-white/[0.02] p-6 md:p-8 rounded-2xl border border-white/[0.06] backdrop-blur-sm">
                    
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-transparent bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text border-b border-white/[0.06] pb-2">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[12px] font-medium text-text-tertiary uppercase tracking-wider mb-1.5">Full Name</label>
                                <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-[12px] font-medium text-text-tertiary uppercase tracking-wider mb-1.5">Recruiting Status</label>
                                <select name="recruiting_status" value={formData.recruiting_status} onChange={handleChange} className={`${inputClass} appearance-none`}>
                                    <option value="Not Looking">Not Looking</option>
                                    <option value="Looking">Looking for Offers</option>
                                    <option value="Signed">Signed / Committed</option>
                                    <option value="Free Agent">Free Agent</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[12px] font-medium text-text-tertiary uppercase tracking-wider mb-1.5">Bio</label>
                            <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} placeholder="Share your athletic journey..." />
                        </div>
                    </div>

                    {/* Athletic Metrics */}
                    <div className="space-y-4 pt-4">
                        <h2 className="text-lg font-bold text-transparent bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text border-b border-white/[0.06] pb-2">Athletic Metrics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[12px] font-medium text-text-tertiary uppercase tracking-wider mb-1.5">Primary Sport</label>
                                <input type="text" name="sport" value={formData.sport} onChange={handleChange} placeholder="e.g. Basketball" className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-[12px] font-medium text-text-tertiary uppercase tracking-wider mb-1.5">Position / Event</label>
                                <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="e.g. Point Guard" className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-[12px] font-medium text-text-tertiary uppercase tracking-wider mb-1.5">Height</label>
                                <input type="text" name="height" value={formData.height} onChange={handleChange} placeholder="e.g. 6'2&quot;" className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-[12px] font-medium text-text-tertiary uppercase tracking-wider mb-1.5">Weight</label>
                                <input type="text" name="weight" value={formData.weight} onChange={handleChange} placeholder="e.g. 190 lbs" className={inputClass} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[12px] font-medium text-text-tertiary uppercase tracking-wider mb-1.5">Vertical Leap</label>
                                <input type="text" name="vertical_leap" value={formData.vertical_leap} onChange={handleChange} placeholder="e.g. 40 in" className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-[12px] font-medium text-text-tertiary uppercase tracking-wider mb-1.5">Top Speed</label>
                                <input type="text" name="top_speed" value={formData.top_speed} onChange={handleChange} placeholder="e.g. 21 mph" className={inputClass} />
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-4 pt-4">
                        <h2 className="text-lg font-bold text-transparent bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text border-b border-white/[0.06] pb-2">Location</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[12px] font-medium text-text-tertiary uppercase tracking-wider mb-1.5">City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-[12px] font-medium text-text-tertiary uppercase tracking-wider mb-1.5">State / Province</label>
                                <input type="text" name="state" value={formData.state} onChange={handleChange} className={inputClass} />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end gap-3 border-t border-white/[0.06]">
                        <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-xl font-semibold text-text-secondary hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-all border border-white/[0.06]">
                            Cancel
                        </button>
                        <button type="submit" disabled={saving} className="px-8 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transform active:scale-95 transition-all disabled:opacity-50">
                            {saving ? 'Saving...' : 'Save Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
