"use client";

import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Textarea } from "@/shadcn/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import {
    DollarSignIcon,
    CalendarIcon,
    RepeatIcon,
    ZapIcon,
    LayersIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarLayout from "@/Layouts/SidebarLayout";
import { useLanguage } from "@/Context/LanguageContext"; // Importe o hook useLanguage

const translations = {
    en: {
        createExpense: "Create Expense",
        amount: "Amount",
        description: "Description",
        expirationDate: "Expiration Date",
        repeatOptions: "Repeat Options",
        doNotRepeat: "Do not repeat",
        always: "Always",
        installments: "Installments",
        frequency: "Frequency",
        monthly: "Monthly",
        semiAnnually: "Every 6 months",
        annually: "Annually",
        numberOfInstallments: "Number of Installments",
        submit: "Submit Expense",
    },
    pt: {
        createExpense: "Criar Despesa",
        amount: "Valor",
        description: "Descrição",
        expirationDate: "Data de Vencimento",
        repeatOptions: "Opções de Repetição",
        doNotRepeat: "Não repetir",
        always: "Sempre",
        installments: "Parcelado",
        frequency: "Frequência",
        monthly: "Mensal",
        semiAnnually: "A cada 6 meses",
        annually: "Anual",
        numberOfInstallments: "Número de Parcelas",
        submit: "Enviar Despesa",
    },
};

export default function ExpenseCreate() {
    const { language } = useLanguage(); // Use o hook useLanguage
    const [repeatOption, setRepeatOption] = useState("doNotRepeat");

    const t = translations[language];

    const { data, setData, post, processing, errors } = useForm({
        amount: "",
        description: "",
        expirationDate: "",
        repeatOption: "doNotRepeat",
        frequency: "",
        numberOfInstallments: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/expenses");
    };

    const headerContent = (
        <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">{t.createExpense}</h1>
        </div>
    );

    return (
        <SidebarLayout headerContent={headerContent}>
            <Head title={t.createExpense} />
            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="mx-auto w-full max-w-[90%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%]">
                        <CardHeader>
                            <CardTitle>{t.createExpense}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="amount">{t.amount}</Label>
                                    <div className="relative">
                                        <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <Input
                                            type="number"
                                            id="amount"
                                            placeholder="0.00"
                                            value={data.amount}
                                            onChange={(e) =>
                                                setData(
                                                    "amount",
                                                    e.target.value
                                                )
                                            }
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        {t.description}
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder={t.description}
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="expirationDate">
                                        {t.expirationDate}
                                    </Label>
                                    <div className="relative">
                                        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <Input
                                            type="date"
                                            id="expirationDate"
                                            value={data.expirationDate}
                                            onChange={(e) =>
                                                setData(
                                                    "expirationDate",
                                                    e.target.value
                                                )
                                            }
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>{t.repeatOptions}</Label>
                                    <RadioGroup
                                        value={repeatOption}
                                        onValueChange={(value) => {
                                            setRepeatOption(value);
                                            setData("repeatOption", value);
                                        }}
                                        className="flex flex-col space-y-1"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="doNotRepeat"
                                                id="doNotRepeat"
                                            />
                                            <Label
                                                htmlFor="doNotRepeat"
                                                className="flex items-center"
                                            >
                                                <ZapIcon className="mr-2 h-4 w-4" />
                                                {t.doNotRepeat}
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="always"
                                                id="always"
                                            />
                                            <Label
                                                htmlFor="always"
                                                className="flex items-center"
                                            >
                                                <RepeatIcon className="mr-2 h-4 w-4" />
                                                {t.always}
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="installments"
                                                id="installments"
                                            />
                                            <Label
                                                htmlFor="installments"
                                                className="flex items-center"
                                            >
                                                <LayersIcon className="mr-2 h-4 w-4" />
                                                {t.installments}
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <AnimatePresence>
                                    {repeatOption === "installments" && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            <div className="space-y-2">
                                                <Label htmlFor="frequency">
                                                    {t.frequency}
                                                </Label>
                                                <Select
                                                    value={data.frequency}
                                                    onValueChange={(value) =>
                                                        setData(
                                                            "frequency",
                                                            value
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder={
                                                                t.frequency
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="monthly">
                                                            {t.monthly}
                                                        </SelectItem>
                                                        <SelectItem value="semiAnnually">
                                                            {t.semiAnnually}
                                                        </SelectItem>
                                                        <SelectItem value="annually">
                                                            {t.annually}
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="numberOfInstallments">
                                                    {t.numberOfInstallments}
                                                </Label>
                                                <Input
                                                    type="number"
                                                    id="numberOfInstallments"
                                                    value={
                                                        data.numberOfInstallments
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "numberOfInstallments",
                                                            e.target.value
                                                        )
                                                    }
                                                    min="1"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {t.submit}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </SidebarLayout>
    );
}
