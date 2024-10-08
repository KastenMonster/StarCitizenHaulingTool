import { atom, useAtom } from 'jotai';

interface Settings {
  quickMode: boolean;
  scu: number;
  clearOnStart: boolean
}

const localSettingsAtom = atom<Settings>({
  quickMode: true,
  scu: 96,
  clearOnStart: false
});

const settingsAtom = atom(
  (get) => get(localSettingsAtom),
  (get, set, setting: keyof Settings, value: any) => {
    const settings = get(localSettingsAtom);
    const newSettings: Settings = { ...settings, [setting]: value };
    set(localSettingsAtom, newSettings);
  }
);

export const useSettings = () => useAtom(settingsAtom);
