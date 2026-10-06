"use client";

import { useEffect, useState } from 'react';

// Live HH:MM in a time zone (visitor's own when omitted).
// Empty until mounted so server and client HTML match.
export function useClock(timeZone?: string) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', timeZone });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}
