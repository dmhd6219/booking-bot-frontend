import LocalizationEn from "../static/localization/en.json"
import LocalizationRu from "../static/localization/ru.json"

export const range = (start: number, end: number, step = 1): number[] => {
    const result: number[] = [];
    for (let i = start; i < end; i += step) {
        result.push(i);
    }
    return result;
};

export const step = 15;

export const timezone = 3;

export interface Localization {
    "App": {
        "TelegramWebAppError": string
    },

    "Rules": {
        "Title": string,
        "FirstRule": {
            "FirstParagraph": string,
            "SecondParagraph": string
        },
        "SecondRule": {
            "FirstParagraph": string,
            "SecondParagraph": string,
            "Button": string
        },
        "ThirdRule": {
            "FirstParagraph": string,
            "SecondParagraph": string
        },
        "FourthRule": {
            "FirstParagraph": string,
            "SecondParagraph": string
        }
    },

    "Navigation": {
        "Title": string,
        "Book": string,
        "All": string,
        "My": string,
        "Rules": string
    },
    "My": {
        "Title": string,
        "Empty": string,
        "At": string,
        "From": string,
        "To": string
    },
    "Book": {
        "Date": string,
        "Time": string,
        "Duration": string,
        "Room": string,
        "Title": string,
        "Confirm": string,
        "Cancel": string,
        "Book": string,
        "At": string,
        "For": string,
        "Minutes": string
    }
}

export const LOCALE: { en: Localization, ru: Localization } = {
    en: LocalizationEn.LocalizationEn,
    ru: LocalizationRu.LocalizationRu,
}