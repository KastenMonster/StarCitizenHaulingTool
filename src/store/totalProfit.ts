import { atom, useAtom, useAtomValue } from 'jotai';

const totalProfitAtom = atom<number>(0);

export const useTotalProfit = () => useAtom(totalProfitAtom);
export const useTotalProfitValue = () => useAtomValue(totalProfitAtom);
