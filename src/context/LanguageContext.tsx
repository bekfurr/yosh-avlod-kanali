'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Locale, TranslationSchema, translations } from '@/translations';

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType>({
    locale: 'uz',
    setLocale: () => {},
    t: translations.uz,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [locale, setLocaleState] = useState<Locale>('uz');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        try {
            const saved = localStorage.getItem('yosh_avlod_locale') as Locale | null;
            if (saved && (saved === 'uz' || saved === 'en' || saved === 'ru')) {
                setLocaleState(saved);
            }
        } catch {
            // Ignore localStorage errors
        }
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        try {
            localStorage.setItem('yosh_avlod_locale', newLocale);
            document.documentElement.lang = newLocale;
        } catch {
            // Ignore localStorage errors
        }
    };

    const currentT = translations[locale] || translations.uz;

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t: currentT }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
