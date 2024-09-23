import { atom } from 'jotai';

export const countAtom = atom(0);
export const createEventAtom = atom({
  title: '',
  description: '',
  endTime: new Date(),
  startTime: new Date(),
  startOpen: false,
  endOpen: false,
  dateOpen: false,
  selectedDate: new Date(),
  isEnabled: false,
  sliderKm: 10,
});
