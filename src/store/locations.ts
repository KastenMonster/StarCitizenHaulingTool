import { atom, useAtom } from 'jotai';

const locationAtom = atom<string[]>([]);

export const useLocations = () => useAtom(locationAtom);
