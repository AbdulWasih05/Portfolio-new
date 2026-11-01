import { useEffect, useState } from 'react';

/** Tailwind's md breakpoint: below it, the long sections fold into disclosures. */
const PHONE = '(max-width: 767px)';

const matches = () => typeof window !== 'undefined' && window.matchMedia(PHONE).matches;

/**
 * True on phone-width screens.
 *
 * Read synchronously on the first render, so a phone paints the folded layout straight away
 * instead of showing everything and collapsing a moment later. Safe because the app mounts
 * with `createRoot`, not `hydrateRoot`: the prerendered HTML (which is the full, unfolded
 * page, so crawlers read all of it) is replaced rather than matched.
 */
export const usePhone = () => {
  const [phone, setPhone] = useState(matches);

  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const sync = () => setPhone(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return phone;
};

export default usePhone;
