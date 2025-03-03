/** DIY Store inspired from Jotai taken from Jack Herrington Youtube Video
 * https://www.youtube.com/watch?v=gg31JTZmFUw
 */
import { useSyncExternalStore } from "react";

interface Atom<AtomType> {
  get: () => AtomType;
  set: (newValue: AtomType) => void;
  subscribe: (callback: (newValue: AtomType) => void) => () => void;
}

type AtomGetter<AtomType> = (
  get: <Target>(a: Atom<Target>) => Target
) => AtomType;

export function atom<AtomType>(
  initialValue: AtomType | AtomGetter<AtomType>
): Atom<AtomType> {
  let value =
    typeof initialValue === "function" ? (null as AtomType) : initialValue;

  const subscribers = new Set<(newValue: AtomType) => void>();

  function get<Target>(atom: Atom<Target>) {
    let currentValue = atom.get();

    atom.subscribe((newValue) => {
      if (newValue === currentValue) return;
      currentValue = newValue;
      computeValue();
      subscribers.forEach((callback) => callback(value));
    });

    return currentValue;
  }

  function computeValue() {
    value =
      typeof initialValue === "function"
        ? (initialValue as AtomGetter<AtomType>)(get)
        : value;
  }

  computeValue();

  return {
    get: () => value,
    set: (newValue: AtomType) => {
      value = newValue;
      subscribers.forEach((callback) => callback(value));
    },
    subscribe: (callback) => {
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
      };
    },
  };
}

export function useAtom<AtomType>(atom: Atom<AtomType>) {
  return [useSyncExternalStore(atom.subscribe, atom.get), atom.set] as const;
}

export function useAtomValue<AtomType>(atom: Atom<AtomType>) {
  return useSyncExternalStore(atom.subscribe, atom.get);
}

/** minimum store  */
/*
import { useSyncExternalStore } from "react";

interface Atom<AtomType> {
  get: () => AtomType;
  set: (newValue: AtomType) => void;
  subscribe: (callback: (newValue: AtomType) => void) => () => void;
}

export function atom<AtomType>(initialValue: AtomType): Atom<AtomType> {
  let value = initialValue;
  const subscribers = new Set<(newValue: AtomType) => void>();
  return {
    get: () => value,
    set: (newValue: AtomType) => {
      value = newValue;
      subscribers.forEach((callback) => callback(value));
    },
    subscribe: (callback) => {
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
      };
    },
  };
}

export function useAtom<AtomType>(atom: Atom<AtomType>) {
  return [useSyncExternalStore(atom.subscribe, atom.get), atom.set] as const;
}
*/
