import { uz } from './uz';
import { en } from './en';
import { ru } from './ru';

export type Locale = 'uz' | 'en' | 'ru';

export type TranslationSchema = typeof uz;

export const translations: Record<Locale, TranslationSchema> = {
    uz,
    en,
    ru,
};

export const languages: { code: Locale; label: string; flag: string }[] = [
    { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
];
