import { FormEventHandler, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function RegisterScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Sign up" />
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
                {/* Background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-800 to-black opacity-50 blur-md z-0"></div>

                {/* Background with modular shapes */}
                <svg
                    viewBox="0 0 1440 800"
                    className="absolute inset-0 w-full h-full object-cover"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient
                            id="grad1"
                            x1="0%"
                            y1="0%"
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
                        d="M0,0 L0,800 L1440,800 L1440,0 C1200,100 200,600 0,0 Z"
                    />
                </svg>

                {/* Main content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                >
                    <Card className="w-full max-w-md bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border-none p-10">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center text-white">
                                Create your Fiscalis account
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit}>
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <Label
                                            htmlFor="name"
                                            className="text-white"
                                        >
                                            Full Name
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            required
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="bg-white bg-opacity-20 text-white placeholder-white"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label
                                            htmlFor="email"
                                            className="text-white"
                                        >
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            required
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="bg-white bg-opacity-20 text-white placeholder-white"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label
                                            htmlFor="password"
                                            className="text-white"
                                        >
                                            Password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Create a password"
                                                required
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                className="bg-white bg-opacity-20 text-white placeholder-white"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                {showPassword ? (
                                                    <EyeOffIcon className="h-4 w-4 text-white" />
                                                ) : (
                                                    <EyeIcon className="h-4 w-4 text-white" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label
                                            htmlFor="confirmPassword"
                                            className="text-white"
                                        >
                                            Confirm Password
                                        </Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm your password"
                                            required
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            className="bg-white bg-opacity-20 text-white placeholder-white"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white"
                                    >
                                        Create Account
                                    </Button>
                                </div>
                            </form>
                            <div className="mt-6 text-center text-sm text-white">
                                Already have an account?{" "}
                                <Link href="/login" className="hover:underline">
                                    Login
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </>
    );
}
