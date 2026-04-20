"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, Mail, Lock, Eye, EyeOff, Car, Building2 } from "lucide-react";

export default function AuthForm() {
    const router = useRouter();

    const [mode, setMode] = useState<"signin" | "signup">("signin");
    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        role: "customer", // default for regular customer
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const activeClass = "text-lg font-bold border-b-2 border-yellow-400 text-white";
    const inactiveClass = "text-lg text-gray-300 hover:text-white";

    const handleChange = (key: string, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!form.email || !form.password) {
            setError("Email and password are required.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (mode === "signup") {
            if (!form.fullName.trim()) {
                setError("Full name is required.");
                return;
            }
            if (!form.phone.trim()) {
                setError("Phone number is required.");
                return;
            }
            const digitsOnly = form.phone.replace(/\D/g, '');
            if (digitsOnly.length < 9 || digitsOnly.length > 15) {
                setError("Please enter a valid phone number.");
                return;
            }
        }

        const endpoint =
            mode === "signup" ? "/api/auth/signup" : "/api/auth/login";

        const payload =
            mode === "signup"
                ? form
                : { email: form.email, password: form.password };

        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message || "Something went wrong");
            return;
        }

        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "admin") router.push("/dashboard/admin");
        else if (data.user.role === "staff") router.push("/dashboard/staff");
        else if (data.user.role === "fleet_manager") router.push("/dashboard/fleet");
        else if (data.user.role === "hotel_partner") router.push("/dashboard/hotel");
        else router.push("/");
    };

    return (
        <div className="w-full max-w-md rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 shadow-2xl shadow-black/40 ring-1 ring-white/10">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-yellow-400">Join Yatara Ceylon</h1>
                <p className="mt-3 text-sm uppercase tracking-widest text-slate-400">Create Your Exclusive Account</p>
            </div>

            <div className="mb-6 flex justify-center gap-6 border-b border-slate-600 pb-3">
                <button type="button" onClick={() => setMode("signin")} className={mode === "signin" ? activeClass : inactiveClass}>
                    Sign In
                </button>
                <button type="button" onClick={() => setMode("signup")} className={mode === "signup" ? activeClass : inactiveClass}>
                    Sign Up
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                    <>
                        <div className="relative">
                            <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                            <input
                                className="w-full rounded-lg border border-slate-500 bg-slate-900/70 pl-10 pr-3 py-2 text-white placeholder:text-slate-400 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                placeholder="Full Name"
                                value={form.fullName}
                                onChange={(e) => handleChange("fullName", e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                            <input
                                className="w-full rounded-lg border border-slate-500 bg-slate-900/70 pl-10 pr-3 py-2 text-white placeholder:text-slate-400 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                placeholder="Phone Number"
                                value={form.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                            <input
                                className="w-full rounded-lg border border-slate-500 bg-slate-900/70 pl-10 pr-3 py-2 text-white placeholder:text-slate-400 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                placeholder="Email Address"
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                            <input
                                className="w-full rounded-lg border border-slate-500 bg-slate-900/70 pl-10 pr-3 py-2 text-white placeholder:text-slate-400 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                placeholder="Create Password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </>
                )}

                {mode === "signin" && (
                    <>
                        <input
                            className="w-full rounded-lg border border-slate-500 bg-slate-900/70 px-3 py-2 text-white placeholder:text-slate-400 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                        <input
                            className="w-full rounded-lg border border-slate-500 bg-slate-900/70 px-3 py-2 text-white placeholder:text-slate-400 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                            placeholder="Password"
                            type="password"
                            value={form.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                        />
                    </>
                )}

                {error && <p className="text-red-300 text-center text-sm">{error}</p>}

                <button type="submit" className="w-full rounded-lg bg-yellow-400 px-4 py-3 font-bold text-slate-900 shadow-lg hover:bg-yellow-300 transition uppercase tracking-wide">
                    {mode === "signup" ? "Create Account" : "Sign In"}
                </button>

                <p className="text-center text-xs text-slate-400">
                    {mode === "signin"
                        ? "Don’t have an account? "
                        : "Already have an account? "}
                    <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-yellow-300 hover:text-yellow-200 font-medium">
                        {mode === "signin" ? "Sign Up" : "Sign In"}
                    </button>
                </p>
                {mode === "signup" && (
                    <>
                        <div className="pt-6 border-t border-slate-600">
                            <p className="text-center text-xs uppercase tracking-widest text-slate-400 mb-4">Or Join As A Partner</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setForm((prev) => ({ ...prev, role: 'fleet_manager' }))}
                                    className={`rounded-lg p-4 border transition ${form.role === 'fleet_manager' ? 'border-yellow-400 bg-yellow-500/10 text-white' : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-yellow-300'}`}
                                >
                                    <Car className="w-8 h-8 mx-auto mb-2" />
                                    <p className="font-semibold text-sm">Fleet Partner</p>
                                    <p className="text-xs text-slate-400">Manage your vehicles</p>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setForm((prev) => ({ ...prev, role: 'hotel_partner' }))}
                                    className={`rounded-lg p-4 border transition ${form.role === 'hotel_partner' ? 'border-yellow-400 bg-yellow-500/10 text-white' : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-yellow-300'}`}
                                >
                                    <Building2 className="w-8 h-8 mx-auto mb-2" />
                                    <p className="font-semibold text-sm">Hotel Partner</p>
                                    <p className="text-xs text-slate-400">Manage your properties</p>
                                </button>
                            </div>
                        </div>
                    </>
                )}            </form>
        </div>
    );
}