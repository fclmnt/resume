// Single source of truth: the existing _data/{en,fr}/*.yml files.
// Imported at build time via @rollup/plugin-yaml.

import enHeader from '../../_data/en/header.yml';
import enAbout from '../../_data/en/about.yml';
import enExperience from '../../_data/en/experience.yml';
import enEducation from '../../_data/en/education.yml';
import enProjects from '../../_data/en/projects.yml';
import enMore from '../../_data/en/more.yml';

import frHeader from '../../_data/fr/header.yml';
import frAbout from '../../_data/fr/about.yml';
import frExperience from '../../_data/fr/experience.yml';
import frEducation from '../../_data/fr/education.yml';
import frProjects from '../../_data/fr/projects.yml';
import frMore from '../../_data/fr/more.yml';

export type Lang = 'en' | 'fr';

export interface ResumeData {
  header: any;
  about: any;
  experience: any;
  education: any;
  projects: any;
  more: any;
}

const DATA: Record<Lang, ResumeData> = {
  en: { header: enHeader, about: enAbout, experience: enExperience, education: enEducation, projects: enProjects, more: enMore },
  fr: { header: frHeader, about: frAbout, experience: frExperience, education: frEducation, projects: frProjects, more: frMore },
};

export function getResume(lang: Lang): ResumeData {
  return DATA[lang];
}

// UI strings that aren't part of the content YAML.
export const UI: Record<Lang, Record<string, string>> = {
  en: {
    summary: 'Summary',
    experience: 'Experience',
    projects: 'Selected Projects',
    education: 'Education',
    publications: 'Publications & Speaking',
    contact: 'Contact',
    skills: 'Core Skills',
    downloadPdf: 'Download PDF',
    present: 'Present',
    viewWeb: 'View online',
    otherLang: 'Français',
    otherLangPath: 'fr',
  },
  fr: {
    summary: 'Profil',
    experience: 'Expérience',
    projects: 'Projets Sélectionnés',
    education: 'Formation',
    publications: 'Publications & Conférences',
    contact: 'Contact',
    skills: 'Compétences Clés',
    downloadPdf: 'Télécharger le PDF',
    present: 'Présent',
    viewWeb: 'Voir en ligne',
    otherLang: 'English',
    otherLangPath: 'en',
  },
};

// Core skills, grouped — used by both web and print. Kept here (not in content
// YAML) because the original resume scattered them across project tags.
export const SKILLS: Record<Lang, { group: string; items: string }[]> = {
  en: [
    { group: 'Languages', items: 'Swift 6, Objective-C' },
    { group: 'Other languages', items: 'Python, Kotlin, TypeScript' },
    { group: 'iOS / Apple', items: 'SwiftUI, UIKit, async/await, Combine, StoreKit 2, tvOS, Core Data' },
    { group: 'AI / LLM', items: "OpenAI Realtime API, RAG, prompt engineering, LLM-as-judge eval, TTS" },
    { group: 'Backend / Platform', items: 'gRPC, Protobuf, OAuth, FFmpeg, Firebase, REST' },
    { group: 'Practices', items: 'CI/CD (Xcode Cloud, GitHub Actions), Fastlane, MVVM, Redux, Coordinator' },
    { group: 'Languages spoken', items: 'French (native), English (fluent)' },
  ],
  fr: [
    { group: 'Langages', items: 'Swift 6, Objective-C' },
    { group: 'Autres langages', items: 'Python, Kotlin, TypeScript' },
    { group: 'iOS / Apple', items: 'SwiftUI, UIKit, async/await, Combine, StoreKit 2, tvOS, Core Data' },
    { group: 'IA / LLM', items: "API Realtime OpenAI, RAG, ingénierie de prompts, évaluation LLM-juge, TTS" },
    { group: 'Backend / Plateforme', items: 'gRPC, Protobuf, OAuth, FFmpeg, Firebase, REST' },
    { group: 'Pratiques', items: 'CI/CD (Xcode Cloud, GitHub Actions), Fastlane, MVVM, Redux, Coordinator' },
    { group: 'Langues parlées', items: 'Français (natif), Anglais (courant)' },
  ],
};
