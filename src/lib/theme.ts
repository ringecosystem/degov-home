export const THEME_STORAGE_KEY = 'degov-theme';

export type ThemeChoice = 'light' | 'dark' | 'system';

export const THEME_BOOTSTRAP = `(function(){try{var choice=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(choice!=='light'&&choice!=='dark'&&choice!=='system')choice='system';var dark=choice==='dark'||(choice!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);var root=document.documentElement;root.dataset.theme=dark?'dark':'light';root.dataset.themeChoice=choice;}catch(e){document.documentElement.dataset.theme='dark';document.documentElement.dataset.themeChoice='system';}})();`;

export function isThemeChoice(value: string | undefined): value is ThemeChoice {
  return value === 'light' || value === 'dark' || value === 'system';
}

const themeListeners = new Set<() => void>();

function emitThemeChoice() {
  themeListeners.forEach((listener) => listener());
}

export function getThemeChoice(): ThemeChoice {
  const current = document.documentElement.dataset.themeChoice;
  return isThemeChoice(current) ? current : 'system';
}

export function subscribeTheme(listener: () => void) {
  themeListeners.add(listener);
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const onChange = () => {
    if (document.documentElement.dataset.themeChoice === 'system') applyThemeChoice('system');
    else listener();
  };
  media.addEventListener('change', onChange);
  return () => {
    themeListeners.delete(listener);
    media.removeEventListener('change', onChange);
  };
}

export function applyThemeChoice(choice: ThemeChoice) {
  const dark =
    choice === 'dark' ||
    (choice !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.documentElement.dataset.themeChoice = choice;
  localStorage.setItem(THEME_STORAGE_KEY, choice);
  emitThemeChoice();
}
