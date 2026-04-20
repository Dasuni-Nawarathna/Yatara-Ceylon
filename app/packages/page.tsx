"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight, Phone, Heart } from "lucide-react";

interface Package {
    id: number;
    name: string;
    destination: string;
    direction: string;
    price: number;
    duration: string;
    image: string;
    highlights: string[];
}

export default function PackagesPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [liked, setLiked] = useState<Set<number>>(new Set());

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            router.push("/auth");
            return;
        }
        const userData = JSON.parse(storedUser);
        if (userData.role !== "customer") {
            router.push("/dashboard");
            return;
        }
        setUser(userData);
    }, [router]);

    const packages: Package[] = [
        {
            id: 1,
            name: "Sigiri Cultural Tour",
            destination: "Sigiriya",
            direction: "North Central Province, ~165 km from Colombo",
            price: 45000,
            duration: "2 Days",
            image: "🏰",
            highlights: ["Ancient Rock Fortress", "Local Villages", "Traditional Meals"],
        },
        {
            id: 2,
            name: "Kandy Heritage",
            destination: "Kandy",
            direction: "Central Province, ~115 km from Colombo",
            price: 35000,
            duration: "2 Days",
            image: "🏛️",
            highlights: ["Temple of the Tooth", "Botanical Gardens", "Lake Tour"],
        },
        {
            id: 3,
            name: "Colombo City Experience",
            destination: "Colombo",
            direction: "Western Province - Capital City",
            price: 15000,
            duration: "1 Day",
            image: "🌆",
            highlights: ["City Tour", "Shopping Mall", "Beach Walk"],
        },
        {
            id: 4,
            name: "Beach Paradise",
            destination: "Mirissa",
            direction: "Southern Province, ~160 km from Colombo",
            price: 50000,
            duration: "3 Days",
            image: "🏖️",
            highlights: ["Beach Activities", "Whale Watching", "Water Sports"],
        },
        {
            id: 5,
            name: "Tea Plantations Tour",
            destination: "Nuwara Eliya",
            direction: "Central Highlands, ~180 km from Colombo",
            price: 55000,
            duration: "3 Days",
            image: "🌿",
            highlights: ["Tea Factory Tour", "Mountain Views", "Cool Climate"],
        },
        {
            id: 6,
            name: "Wildlife Safari",
            destination: "Yala National Park",
            direction: "Eastern Province, ~300 km from Colombo",
            price: 65000,
            duration: "2 Days",
            image: "🦁",
            highlights: ["Safari Experience", "Wildlife Viewing", "Nature Resort"],
        },
    ];

    const toggleLike = (id: number) => {
        const newLiked = new Set(liked);
        if (newLiked.has(id)) {
            newLiked.delete(id);
        } else {
            newLiked.add(id);
        }
        setLiked(newLiked);
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-5xl font-extrabold text-white mb-2">Travel Packages</h1>
                        <p className="text-slate-300">Explore our exclusive destinations across Sri Lanka</p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                        <p className="text-slate-400 text-sm">Welcome, <span className="text-yellow-400 font-semibold">{user.fullName || user.email}</span></p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => router.push("/")}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => router.push("/profile")}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition"
                            >
                                Profile
                            </button>
                            <button
                                onClick={() => {
                                    localStorage.removeItem("user");
                                    router.push("/auth");
                                }}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className="rounded-xl border border-slate-700 bg-linear-to-br from-slate-800 to-slate-900 overflow-hidden hover:border-yellow-400 transition shadow-lg hover:shadow-yellow-400/20"
                        >
                            {/* Image */}
                            <div className="h-32 bg-linear-to-br from-yellow-500/20 to-yellow-600/20 flex items-center justify-center text-6xl">
                                {pkg.image}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                                    <button
                                        onClick={() => toggleLike(pkg.id)}
                                        className="text-slate-400 hover:text-red-500 transition"
                                    >
                                        <Heart
                                            className="w-6 h-6"
                                            fill={liked.has(pkg.id) ? "currentColor" : "none"}
                                        />
                                    </button>
                                </div>

                                {/* Direction */}
                                <div className="flex items-start gap-2 mb-3 p-3 bg-slate-700/30 rounded-lg">
                                    <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold text-white">{pkg.destination}</p>
                                        <p className="text-xs text-slate-300">{pkg.direction}</p>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                                    <div className="p-2 bg-slate-700/30 rounded-lg">
                                        <p className="text-slate-400 text-xs">Duration</p>
                                        <p className="text-white font-semibold">{pkg.duration}</p>
                                    </div>
                                    <div className="p-2 bg-slate-700/30 rounded-lg">
                                        <p className="text-slate-400 text-xs">Price</p>
                                        <p className="text-yellow-400 font-semibold">LKR {pkg.price.toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Highlights */}
                                <div className="mb-4">
                                    <p className="text-xs text-slate-400 mb-2">Highlights</p>
                                    <div className="flex flex-wrap gap-1">
                                        {pkg.highlights.map((highlight, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full"
                                            >
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button className="w-full py-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-semibold rounded-lg transition flex items-center justify-center gap-2">
                                    Book Now
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
