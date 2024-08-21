import { useState, useEffect, createContext, useContext } from "react";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Progress } from "@/shadcn/ui/progress";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    DollarSignIcon,
    PieChartIcon,
    WalletIcon,
    FileTextIcon,
    SettingsIcon,
    LogOutIcon,
    ChevronDownIcon,
    DownloadIcon,
    SunIcon,
    MoonIcon,
    MenuIcon,
    XIcon,
    GlobeIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Head, Link } from "@inertiajs/react";

const LanguageContext = createContext({
    language: "en",
    setLanguage: (lang: string) => {},
});

const useLanguage = () => useContext(LanguageContext);

const translations = {
    en: {
        dashboard: "Dashboard",
        expenses: "Expenses",
        budgets: "Budgets",
        reports: "Reports",
        settings: "Settings",
        logout: "Logout",
        totalBalance: "Total Balance",
        monthlyExpenses: "Monthly Expenses",
        budgetProgress: "Budget Progress",
        incomeVsExpenses: "Income vs Expenses",
        recentTransactions: "Recent Transactions",
        topSpendingCategories: "Top Spending Categories",
        export: "Export",
        chooseFormat: "Choose format",
        from: "from last month",
    },
    pt: {
        dashboard: "Painel",
        expenses: "Despesas",
        budgets: "Orçamentos",
        reports: "Relatórios",
        settings: "Configurações",
        logout: "Sair",
        totalBalance: "Saldo Total",
        monthlyExpenses: "Despesas Mensais",
        budgetProgress: "Progresso do Orçamento",
        incomeVsExpenses: "Receita vs Despesas",
        recentTransactions: "Transações Recentes",
        topSpendingCategories: "Principais Categorias de Gastos",
        export: "Exportar",
        chooseFormat: "Escolha o formato",
        from: "do mês passado",
    },
};

const useTheme = () => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    return [theme, setTheme] as const;
};

export default function Component() {
    const [progress, setProgress] = useState(66);
    const [theme, setTheme] = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [language, setLanguage] = useState("en");

    const t = translations[language as keyof typeof translations];

    const chartData = [
        { name: "Jan", expenses: 4000, income: 2400 },
        { name: "Feb", expenses: 3000, income: 1398 },
        { name: "Mar", expenses: 2000, income: 9800 },
        { name: "Apr", expenses: 2780, income: 3908 },
        { name: "May", expenses: 1890, income: 4800 },
        { name: "Jun", expenses: 2390, income: 3800 },
    ];

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleLanguage = () => setLanguage(language === "en" ? "pt" : "en");

    return (
        <>
            <Head title="Dashboard" />

            <LanguageContext.Provider value={{ language, setLanguage }}>
                <div
                    className={`flex h-screen ${
                        theme === "dark"
                            ? "bg-zinc-950 text-white"
                            : "bg-gray-100 text-gray-900"
                    }`}
                >
                    <AnimatePresence initial={false}>
                        {isSidebarOpen && (
                            <motion.aside
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 250, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                }}
                                className={`fixed inset-y-0 left-0 z-50 ${
                                    theme === "dark"
                                        ? "bg-zinc-900"
                                        : "bg-white"
                                } shadow-lg overflow-hidden md:relative`}
                            >
                                <div className="flex flex-col h-full p-4 ">
                                    <div className="flex justify-center items-center mb-6 ">
                                        <h2
                                            className="text-4xl text-center font-bold text-primary mb-4"
                                            style={{
                                                fontFamily: "Champ, BLACK",
                                            }}
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
                                    </div>
                                    <nav className="space-y-2">
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                        >
                                            <PieChartIcon className="mr-2 h-4 w-4" />
                                            {t.dashboard}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                        >
                                            <WalletIcon className="mr-2 h-4 w-4" />
                                            {t.expenses}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                        >
                                            <DollarSignIcon className="mr-2 h-4 w-4" />
                                            {t.budgets}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start"
                                        >
                                            <FileTextIcon className="mr-2 h-4 w-4" />
                                            {t.reports}
                                        </Button>
                                    </nav>
                                    <div className="mt-auto pt-6 ">
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start mb-2"
                                        >
                                            <SettingsIcon className="mr-2 h-4 w-4" />
                                            {t.settings}
                                        </Button>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                        >
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start text-red-500"
                                            >
                                                <LogOutIcon className="mr-2 h-4 w-4" />
                                                {t.logout}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.aside>
                        )}
                    </AnimatePresence>
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <header
                            className={`flex justify-between items-center p-4 ${
                                theme === "dark"
                                    ? "bg-zinc-950 border-b border-emerald-400"
                                    : "bg-white"
                            } shadow-md`}
                        >
                            <div className="flex items-center">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleSidebar}
                                    aria-label="Toggle sidebar"
                                >
                                    <MenuIcon className="h-6 w-6" />
                                </Button>
                                <h1 className="text-2xl font-bold ml-4">
                                    {t.dashboard}
                                </h1>
                            </div>
                            <div className="flex items-center space-x-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            {t.export}{" "}
                                            <ChevronDownIcon className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>
                                            {t.chooseFormat}
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <DownloadIcon className="mr-2 h-4 w-4" />
                                            PDF
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <DownloadIcon className="mr-2 h-4 w-4" />
                                            Excel
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
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
                        </header>
                        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
                            >
                                <Card
                                    className={
                                        theme === "dark" ? "bg-black" : ""
                                    }
                                >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {t.totalBalance}
                                        </CardTitle>
                                        <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            $12,345.67
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            +20.1% {t.from}
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card
                                    className={
                                        theme === "dark" ? "bg-black" : ""
                                    }
                                >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {t.monthlyExpenses}
                                        </CardTitle>
                                        <WalletIcon className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            $3,456.78
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            -5.2% {t.from}
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card
                                    className={
                                        theme === "dark" ? "bg-black" : ""
                                    }
                                >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {t.budgetProgress}
                                        </CardTitle>
                                        <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {progress}%
                                        </div>
                                        <Progress
                                            value={progress}
                                            className="mt-2"
                                        />
                                    </CardContent>
                                </Card>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Card
                                    className={`mb-6 ${
                                        theme === "dark" ? "bg-black" : ""
                                    }`}
                                >
                                    <CardHeader>
                                        <CardTitle>
                                            {t.incomeVsExpenses}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer
                                            width="100%"
                                            height={300}
                                        >
                                            <BarChart data={chartData}>
                                                <CartesianGrid
                                                    strokeDasharray="3 3"
                                                    stroke={
                                                        theme === "dark"
                                                            ? "#374151"
                                                            : "#e5e7eb"
                                                    }
                                                />
                                                <XAxis
                                                    dataKey="name"
                                                    stroke={
                                                        theme === "dark"
                                                            ? "#9ca3af"
                                                            : "#4b5563"
                                                    }
                                                />
                                                <YAxis
                                                    stroke={
                                                        theme === "dark"
                                                            ? "#9ca3af"
                                                            : "#4b5563"
                                                    }
                                                />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor:
                                                            theme === "dark"
                                                                ? "#1f2937"
                                                                : "#ffffff",
                                                        borderColor:
                                                            theme === "dark"
                                                                ? "#374151"
                                                                : "#e5e7eb",
                                                        color:
                                                            theme === "dark"
                                                                ? "#ffffff"
                                                                : "#000000",
                                                    }}
                                                />
                                                <Bar
                                                    dataKey="income"
                                                    fill="#10B981"
                                                    name={
                                                        language === "en"
                                                            ? "Income"
                                                            : "Receita"
                                                    }
                                                />
                                                <Bar
                                                    dataKey="expenses"
                                                    fill="#EF4444"
                                                    name={
                                                        language === "en"
                                                            ? "Expenses"
                                                            : "Despesas"
                                                    }
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                <Card
                                    className={
                                        theme === "dark" ? "bg-black" : ""
                                    }
                                >
                                    <CardHeader>
                                        <CardTitle>
                                            {t.recentTransactions}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            <li className="flex justify-between items-center">
                                                <span>
                                                    {language === "en"
                                                        ? "Grocery Shopping"
                                                        : "Compras de Supermercado"}
                                                </span>
                                                <span className="font-semibold text-red-500">
                                                    -$85.20
                                                </span>
                                            </li>
                                            <li className="flex justify-between items-center">
                                                <span>
                                                    {language === "en"
                                                        ? "Salary Deposit"
                                                        : "Depósito de Salário"}
                                                </span>
                                                <span className="font-semibold text-green-500">
                                                    +$3,000.00
                                                </span>
                                            </li>
                                            <li className="flex justify-between items-center">
                                                <span>
                                                    {language === "en"
                                                        ? "Electric Bill"
                                                        : "Conta de Luz"}
                                                </span>
                                                <span className="font-semibold text-red-500">
                                                    -$120.50
                                                </span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card
                                    className={
                                        theme === "dark" ? "bg-black" : ""
                                    }
                                >
                                    <CardHeader>
                                        <CardTitle>
                                            {t.topSpendingCategories}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            <li className="flex justify-between items-center">
                                                <span>
                                                    {language === "en"
                                                        ? "Food & Dining"
                                                        : "Alimentação"}
                                                </span>
                                                <span className="font-semibold">
                                                    $450.30
                                                </span>
                                            </li>
                                            <li className="flex justify-between items-center">
                                                <span>
                                                    {language === "en"
                                                        ? "Transportation"
                                                        : "Transporte"}
                                                </span>
                                                <span className="font-semibold">
                                                    $280.00
                                                </span>
                                            </li>
                                            <li className="flex justify-between items-center">
                                                <span>
                                                    {language === "en"
                                                        ? "Entertainment"
                                                        : "Entretenimento"}
                                                </span>
                                                <span className="font-semibold">
                                                    $185.75
                                                </span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </main>
                    </div>
                </div>
            </LanguageContext.Provider>
        </>
    );
}
