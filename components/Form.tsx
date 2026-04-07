"use client";

import { useState } from "react";
import { FormData } from "@/types/form";
import { printLabel } from "@/utils/print";

export default function Form() {
    const [data, setData] = useState<FormData>({
        numeroTC: "",
        reference: "",
        date: new Date().toISOString().split("T")[0],
        agent: "controle",
        qualite: "B",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handlePrint = () => {
        // Generate label HTML with current data - larger text for 10x10cm label
        const labelHtml = `
            <div style="text-align: center; font-weight: bold; font-size: 32px; color: #1f2937; margin-bottom: 25px; letter-spacing: 1px;">
                ÉTIQUETTE CONTRÔLE
            </div>
            <div style="width: 100%;">
                <p style="font-size: 48px; font-weight: bold; color: #1f2937; margin: 15px 0; text-align: center;">
                    TC: ${data.numeroTC || 'N/A'}
                </p>
                <p style="font-size: 28px; color: #374151; margin: 12px 0; text-align: center; line-height: 1.6;">
                    Réf: ${data.reference || 'N/A'}
                </p>
                <p style="font-size: 24px; color: #374151; margin: 10px 0; text-align: center; line-height: 1.6;">
                    Date: ${data.date}
                </p>
                <p style="font-size: 24px; color: #374151; margin: 10px 0; text-align: center; line-height: 1.6;">
                    Agent: ${data.agent}
                </p>
                <p style="font-size: 24px; color: #374151; margin: 10px 0; text-align: center; line-height: 1.6;">
                    Qualité: ${data.qualite}
                </p>
            </div>
        `;
        printLabel(labelHtml);
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white shadow-2xl rounded-3xl border border-gray-100">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Formulaire Contrôle</h2>
                <p className="text-gray-600">Saisissez les informations de contrôle</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro TC</label>
                    <input
                        name="numeroTC"
                        placeholder="Entrez le numéro TC"
                        className="input"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Référence</label>
                    <input
                        name="reference"
                        placeholder="Entrez la référence"
                        className="input"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                        name="date"
                        value={data.date}
                        readOnly
                        className="input bg-gray-50 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agent</label>
                    <input
                        name="agent"
                        value={data.agent}
                        readOnly
                        className="input bg-gray-50 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualité</label>
                    <select
                        name="qualite"
                        value={data.qualite}
                        onChange={handleChange}
                        className="input"
                    >
                        <option value="B">B - Bon</option>
                        <option value="C">C - Correct</option>
                        <option value="D">D - Défaut</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-4 mt-8">
                <button className="btn-primary flex-1">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Enregistrer
                </button>

                <button
                    type="button"
                    onClick={handlePrint}
                    className="btn-secondary flex-1"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Imprimer
                </button>
            </div>
        </div>
    );
}