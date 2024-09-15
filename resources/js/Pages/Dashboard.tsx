"use client";

import { useState } from "react";
import { Head } from "@inertiajs/react";
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
    ChevronDownIcon,
    DownloadIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import SidebarLayout from "@/Layouts/SidebarLayout";
import { useTheme } from "@/Context/ThemeContext";
import { useLanguage } from "@/Context/LanguageContext";

const translations = {
    en: {
        dashboard: "Dashboard",
        totalBalance: "Total Balance",
        monthlyExpenses: "Monthly Expenses",
        budgetProgress: "Budget Progress",
        incomeVsExpenses: "Income vs Expenses",
        recentTransactions: "Recent Transactions",
        topSpendingCategories: "Top Spending Categories",
        export: "Export",
        chooseFormat: "Choose format",
        from: "from last month",
        groceryShopping: "Grocery Shopping",
        salaryDeposit: "Salary Deposit",
        electricBill: "Electric Bill",
        foodAndDining: "Food & Dining",
        transportation: "Transportation",
        entertainment: "Entertainment",
        income: "Income",
        expenses: "Expenses",
    },
    pt: {
        dashboard: "Painel",
        totalBalance: "Saldo Total",
        monthlyExpenses: "Despesas Mensais",
        budgetProgress: "Progresso do Orçamento",
        incomeVsExpenses: "Receita vs Despesas",
        recentTransactions: "Transações Recentes",
        topSpendingCategories: "Principais Categorias de Gastos",
        export: "Exportar",
        chooseFormat: "Escolha o formato",
        from: "do mês passado",
        groceryShopping: "Compras de Supermercado",
        salaryDeposit: "Depósito de Salário",
        electricBill: "Conta de Luz",
        foodAndDining: "Alimentação",
        transportation: "Transporte",
        entertainment: "Entretenimento",
        income: "Receita",
        expenses: "Despesas",
    },
};

export default function Dashboard() {
    const { theme } = useTheme();
    const { language, setLanguage } = useLanguage();
    const [progress] = useState(66);

    const t = translations[language];

    const chartData = [
        { name: "Jan", expenses: 4000, income: 2400 },
        { name: "Feb", expenses: 3000, income: 1398 },
        { name: "Mar", expenses: 2000, income: 9800 },
        { name: "Apr", expenses: 2780, income: 3908 },
        { name: "May", expenses: 1890, income: 4800 },
        { name: "Jun", expenses: 2390, income: 3800 },
    ];

    const toggleLanguage = () => setLanguage(language === "en" ? "pt" : "en");

    const headerContent = (
        <>
            <h1 className="text-2xl font-bold">{t.dashboard}</h1>
            <div className="flex items-center space-x-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            {t.export}{" "}
                            <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>{t.chooseFormat}</DropdownMenuLabel>
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
                <Button variant="outline" size="icon" onClick={toggleLanguage}>
                    {language === "en" ? "PT" : "EN"}
                </Button>
            </div>
        </>
    );

    return (
        <SidebarLayout headerContent={headerContent}>
            <Head title={t.dashboard} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
                >
                    <Card className={theme === "dark" ? "bg-zinc-900" : ""}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {t.totalBalance}
                            </CardTitle>
                            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$12,345.67</div>
                            <p className="text-xs text-muted-foreground">
                                +20.1% {t.from}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className={theme === "dark" ? "bg-zinc-900" : ""}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {t.monthlyExpenses}
                            </CardTitle>
                            <WalletIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$3,456.78</div>
                            <p className="text-xs text-muted-foreground">
                                -5.2% {t.from}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className={theme === "dark" ? "bg-zinc-900" : ""}>
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
                            <Progress value={progress} className="mt-2" />
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
                            theme === "dark" ? "bg-zinc-900" : ""
                        }`}
                    >
                        <CardHeader>
                            <CardTitle>{t.incomeVsExpenses}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
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
                                        name={t.income}
                                    />
                                    <Bar
                                        dataKey="expenses"
                                        fill="#EF4444"
                                        name={t.expenses}
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
                    <Card className={theme === "dark" ? "bg-zinc-900" : ""}>
                        <CardHeader>
                            <CardTitle>{t.recentTransactions}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li className="flex justify-between items-center">
                                    <span>{t.groceryShopping}</span>
                                    <span className="font-semibold text-red-500">
                                        -$85.20
                                    </span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span>{t.salaryDeposit}</span>
                                    <span className="font-semibold text-green-500">
                                        +$3,000.00
                                    </span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span>{t.electricBill}</span>
                                    <span className="font-semibold text-red-500">
                                        -$120.50
                                    </span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className={theme === "dark" ? "bg-zinc-900" : ""}>
                        <CardHeader>
                            <CardTitle>{t.topSpendingCategories}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li className="flex justify-between items-center">
                                    <span>{t.foodAndDining}</span>
                                    <span className="font-semibold">
                                        $450.30
                                    </span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span>{t.transportation}</span>
                                    <span className="font-semibold">
                                        $280.00
                                    </span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span>{t.entertainment}</span>
                                    <span className="font-semibold">
                                        $185.75
                                    </span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </SidebarLayout>
    );
}
