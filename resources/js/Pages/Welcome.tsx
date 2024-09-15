import { BarChartIcon, ShieldCheckIcon, TrendingUpIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent } from "@/shadcn/ui/card";
import { Head, Link } from "@inertiajs/react";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

export default function WelcomeScreen() {
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

    const features = [
        {
            icon: BarChartIcon,
            title: "Track Expenses",
            description: "Easily monitor your spending habits",
        },
        {
            icon: ShieldCheckIcon,
            title: "Create Budgets",
            description: "Set and manage financial goals",
        },
        {
            icon: TrendingUpIcon,
            title: "Financial Analysis",
            description: "Gain insights with interactive charts",
        },
    ];

    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen flex flex-col relative overflow-hidden">
                {/* Background with modular shapes */}
                <div className="absolute inset-0 z-0">
                    <svg
                        viewBox="0 0 1440 800"
                        className="absolute inset-0 w-full h-full object-cover"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient
                                id="grad1"
                                x1="100%"
                                y1="100%"
                                x2="100%"
                                y2="100%"
                            >
                                <stop
                                    offset="0%"
                                    style={{
                                        stopColor: "#1F9B77",
                                        stopOpacity: 1,
                                    }}
                                />
                                <stop
                                    offset="100%"
                                    style={{
                                        stopColor: "#004d60",
                                        stopOpacity: 1,
                                    }}
                                />
                            </linearGradient>
                        </defs>
                        <path
                            fill="url(#grad1)"
                            d="M0,0 L0,800 L1440,800 L1440,0 C1200,600 700,100 0,0 Z"
                        />
                    </svg>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-800 to-black opacity-50 blur-md z-0"></div>

                {/* Main content */}
                <div className="flex-grow flex flex-col items-center justify-center p-4 relative z-10 ">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-5xl md:text-9xl font-bold text-white mb-4">
                            Welcome to Fiscalis
                        </h1>
                        <p className="text-2xl text-white max-w-2xl mx-auto ">
                            Your personal financial management application that
                            helps you control your finances effectively.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                    >
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border-none text-center text-white relative z-10 "
                            >
                                <CardContent className="p-6">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        onHoverStart={() =>
                                            setHoveredFeature(index)
                                        }
                                        onHoverEnd={() =>
                                            setHoveredFeature(null)
                                        }
                                    >
                                        <feature.icon className="w-12 h-12 mb-4 mx-auto" />
                                        <h2 className="text-2xl font-semibold mb-2">
                                            {feature.title}
                                        </h2>
                                        <p>{feature.description}</p>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-x-4 mb-8"
                    >
                        <div className="mt-4 flex space-x-4">
                            <Link
                                href={route("login")}
                                className="relative z-10"
                            >
                                <Button
                                    variant="link"
                                    size="lg"
                                    className="bg-transparent text-xl text-white"
                                >
                                    Log In
                                </Button>
                            </Link>
                            <Link
                                href={route("register")}
                                className="relative z-10"
                            >
                                <Button
                                    variant="link"
                                    size="lg"
                                    className="bg-transparent text-xl text-white"
                                >
                                    Get start
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <footer className="bg-transparent text-white py-4 relative z-10">
                    <div className="flex justify-center gap-4">
                        <Link
                            href="https://github.com/Jeanikt/Fiscalis"
                            className="relative z-10"
                        >
                            <Button className="bg-transparent  text-white flex items-center gap-2">
                                <FaGithub className="text-xl" />
                                GitHub
                            </Button>
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/jeanfoliveira"
                            className="relative z-10"
                        >
                            <Button className="bg-transparent  text-white flex items-center gap-2">
                                <FaLinkedin className="text-xl" />
                                LinkedIn
                            </Button>
                        </Link>
                        <Link
                            href="https://www.instagram.com/jewknd/"
                            className="relative z-10"
                        >
                            <Button className="bg-transparent  text-white flex items-center gap-2">
                                <FaInstagram className="text-xl" />
                                Instagram
                            </Button>
                        </Link>
                    </div>
                </footer>
            </div>
        </>
    );
}
