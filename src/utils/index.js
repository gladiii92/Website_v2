// src/utils/index.js

export const createPageUrl = (pageName, lang = 'de') => {
  const name = pageName.toLowerCase();
  let slug = name;
  if (name === 'home') return `/${lang}`;
  if (name === 'datenschutz') slug = 'privacy';
  if (name === 'impressum') slug = 'imprint';
  if (name === 'about') slug = 'about';
  if (name === 'contact') slug = 'contact';
  if (name === 'agb') slug = 'agb';
  return `/${lang}/${slug}`;
};