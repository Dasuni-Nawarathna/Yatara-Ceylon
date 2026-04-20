"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<{ fullName: string; email: string; phone: string; role: string; } | null>(null);
    const [phone, setPhone] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            router.push("/auth");
            return;
        }
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setFullName(parsed.fullName || "");
        setPhone(parsed.phone || "");
    }, [router]);

    if (!user) return null;

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedUser = {
            ...user,
            fullName: fullName.trim() === "" ? user.fullName : fullName,
            phone: phone.trim() === "" ? user.phone : phone,
        } as any;

        if (password.trim()) {
            updatedUser.password = password;
        }

        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setMessage("Profile updated successfully.");

        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900 p-8">
            <div className="max-w-3xl mx-auto bg-slate-900/80 border border-slate-700 rounded-2xl p-8 shadow-xl">
                <h1 className="text-3xl font-bold text-white mb-3">My Profile</h1>
                <p className="text-slate-300 mb-6">Update your customer details below.</p>

                <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid gap-2">
                        <label className="text-slate-200 uppercase text-xs tracking-widest">Email (read-only)</label>
                        <input value={user.email} readOnly className="w-full rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-2 text-slate-300" />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-slate-200 uppercase text-xs tracking-widest">Full Name</label>
                        <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-2 text-white"
                            placeholder="Full Name"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-slate-200 uppercase text-xs tracking-widest">Phone Number</label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-2 text-white"
                            placeholder="Phone Number"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-slate-200 uppercase text-xs tracking-widest">New Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Leave blank to keep existing"
                            className="w-full rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-2 text-white"
                        />
                    </div>

                    {message && <p className="text-green-300">{message}</p>}

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="submit"
                            className="px-5 py-2 bg-yellow-400 text-slate-900 font-semibold rounded-lg hover:bg-yellow-300 transition"
                        >
                            Save Profile
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Home
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/packages")}
                            className="px-5 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition"
                        >
                            Back to Packages
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
