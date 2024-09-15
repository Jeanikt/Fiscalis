"use client";

import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import {
    PieChartIcon,
    WalletIcon,
    DollarSignIcon,
    FileTextIcon,
    SettingsIcon,
    LogOutIcon,
    SunIcon,
    MoonIcon,
    MenuIcon,
    XIcon,
    GlobeIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/Context/ThemeContext";
import { useLanguage } from "@/Context/LanguageContext";

const translations = {
    en: {
        dashboard: "Dashboard",
        expenses: "Expenses",
        budgets: "Budgets",
        reports: "Reports",
        settings: "Settings",
        logout: "Logout",
    },
    pt: {
        dashboard: "Painel",
        expenses: "Despesas",
        budgets: "Orçamentos",
        reports: "Relatórios",
        settings: "Configurações",
        logout: "Sair",
    },
};

export default function SidebarLayout({
    children,
    headerContent,
}: {
    children: React.ReactNode;
    headerContent: React.ReactNode;
}) {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage } = useLanguage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const t = translations[language];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleLanguage = () => setLanguage(language === "en" ? "pt" : "en");

    const sidebarVariants = {
        open: { width: 250, opacity: 1 },
        closed: { width: 0, opacity: 0 },
    };

    const menuItemVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: -20 },
    };

    return (
        <div
            className={`flex h-screen ${
                theme === "dark"
                    ? "bg-zinc-950 text-white"
                    : "bg-gray-100 text-gray-900"
            } transition-colors duration-300`}
        >
            <AnimatePresence initial={false}>
                {isSidebarOpen && (
                    <motion.aside
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={sidebarVariants}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                        className={`fixed inset-y-0 left-0 z-50 ${
                            theme === "dark" ? "bg-zinc-900" : "bg-white"
                        } shadow-lg overflow-hidden md:relative`}
                    >
                        <div className="flex flex-col h-full p-4">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex justify-between items-center mb-6"
                            >
                                <h2
                                    className="text-4xl text-center font-bold text-primary mb-4"
                                    style={{ fontFamily: "Champ, BLACK" }}
                                >
                                    FISCALIS
                                </h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleSidebar}
                                    className="md:hidden"
                                >
                                    <XIcon className="h-6 w-6" />
                                </Button>
                            </motion.div>
                            <nav className="space-y-2">
                                {[
                                    {
                                        href: "/dashboard",
                                        icon: PieChartIcon,
                                        label: t.dashboard,
                                    },
                                    {
                                        href: "/expenses",
                                        icon: WalletIcon,
                                        label: t.expenses,
                                    },
                                    {
                                        href: "#",
                                        icon: DollarSignIcon,
                                        label: t.budgets,
                                    },
                                    {
                                        href: "#",
                                        icon: FileTextIcon,
                                        label: t.reports,
                                    },
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        variants={menuItemVariants}
                                        initial="closed"
                                        animate="open"
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        <Link href={item.href}>
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start"
                                            >
                                                <item.icon className="mr-2 h-4 w-4" />
                                                {item.label}
                                            </Button>
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                            <motion.div
                                className="mt-auto pt-6"
                                variants={menuItemVariants}
                                initial="closed"
                                animate="open"
                                transition={{ delay: 0.5 }}
                            >
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start mb-2"
                                >
                                    <SettingsIcon className="mr-2 h-4 w-4" />
                                    {t.settings}
                                </Button>
                                <Link href={route("logout")} method="post">
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-red-500"
                                    >
                                        <LogOutIcon className="mr-2 h-4 w-4" />
                                        {t.logout}
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
            <div className="flex-1 flex flex-col overflow-hidden">
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`flex justify-between items-center p-4 ${
                        theme === "dark"
                            ? "bg-zinc-950 border-b border-emerald-400"
                            : "bg-white"
                    } shadow-md transition-colors duration-300`}
                >
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSidebar}
                            aria-label="Toggle sidebar"
                        >
                            <MenuIcon className="h-6 w-6" />
                        </Button>
                        {headerContent}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={toggleLanguage}
                        >
                            <GlobeIcon className="h-[1.2rem] w-[1.2rem]" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={toggleTheme}
                        >
                            {theme === "light" ? (
                                <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
                            ) : (
                                <SunIcon className="h-[1.2rem] w-[1.2rem]" />
                            )}
                        </Button>
                    </div>
                </motion.header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
