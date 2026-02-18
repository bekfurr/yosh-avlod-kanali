'use client';

import { useEffect, useMemo, useState } from 'react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import type { RamadanDay, RamadanScheduleByRegion } from '@/lib/ramadan';

const TASHKENT_TIME_ZONE = 'Asia/Tashkent';

const dayDateFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: TASHKENT_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const timeFormatter = new Intl.DateTimeFormat('uz-UZ', {
  timeZone: TASHKENT_TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const dateFormatter = new Intl.DateTimeFormat('uz-UZ', {
  timeZone: TASHKENT_TIME_ZONE,
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

function getDateISOInTashkent(date: Date): string {
  const parts = dayDateFormatter.formatToParts(date);
  const year = parts.find((part) => part.type === 'year')?.value ?? '0000';
  const month = parts.find((part) => part.type === 'month')?.value ?? '01';
  const day = parts.find((part) => part.type === 'day')?.value ?? '01';

  return `${year}-${month}-${day}`;
}

function formatRegionName(region: string): string {
  const lower = region.toLowerCase();
  return lower.replace(/(^|[\s(])([a-z])/g, (_, prefix: string, char: string) => {
    return `${prefix}${char.toUpperCase()}`;
  });
}

function findToday(entries: RamadanDay[], todayISO: string): RamadanDay | null {
  return entries.find((entry) => entry.dateISO === todayISO) ?? null;
}

export default function RamadanCalendarClient({
  schedules,
}: {
  schedules: RamadanScheduleByRegion;
}) {
  const regions = useMemo(() => Object.keys(schedules), [schedules]);
  const defaultRegion =
    regions.find((region) => region.toUpperCase() === 'TOSHKENT') ?? regions[0] ?? '';

  const [selectedRegion, setSelectedRegion] = useState(defaultRegion);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateClock = () => setNow(new Date());
    updateClock();
    const interval = window.setInterval(updateClock, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const selectedEntries = schedules[selectedRegion] ?? [];
  const todayISO = now ? getDateISOInTashkent(now) : '';
  const todayData = todayISO ? findToday(selectedEntries, todayISO) : null;
  const realTime = now ? timeFormatter.format(now) : '--:--:--';
  const realDate = now ? dateFormatter.format(now) : '--';

  return (
    <div className="pt-8 px-6 max-w-7xl mx-auto min-h-screen">
      <Section>
        <div className="mb-8 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Ramazon Taqvimi</h1>
          <p className="text-gray-400 max-w-3xl">
            Saharlik (og&apos;iz yopish) va iftorlik (og&apos;iz ochish) vaqtlarini viloyat bo&apos;yicha
            real vaqtda kuzating.
          </p>
        </div>

        <div className="mb-10 max-w-lg">
          <label htmlFor="region-select" className="block text-sm font-medium text-gray-300 mb-2">
            Viloyatni tanlang
          </label>
          <select
            id="region-select"
            value={selectedRegion}
            onChange={(event) => setSelectedRegion(event.target.value)}
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-white/30"
          >
            {regions.map((region) => (
              <option key={region} value={region} className="bg-black text-white">
                {formatRegionName(region)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="p-8 text-center border-blue-500/30">
            <p className="text-gray-400 text-sm mb-3">Saharlik (og&apos;iz yopish)</p>
            <p className="text-5xl md:text-6xl font-bold font-mono tracking-tight">
              {todayData?.saharlik ?? '--:--'}
            </p>
          </Card>

          <Card className="p-8 text-center border-green-500/30">
            <p className="text-gray-400 text-sm mb-3">Iftorlik (og&apos;iz ochish)</p>
            <p className="text-5xl md:text-6xl font-bold font-mono tracking-tight">
              {todayData?.iftorlik ?? '--:--'}
            </p>
          </Card>

          <Card className="p-8 text-center border-white/20">
            <p className="text-gray-400 text-sm mb-3">Hozirgi vaqt (Toshkent)</p>
            <p className="text-5xl md:text-6xl font-bold font-mono tracking-tight">{realTime}</p>
          </Card>
        </div>

        <Card className="p-5 mb-10" hoverEffect={false}>
          <p className="text-lg font-semibold">{realDate}</p>
          <p className="text-gray-400 mt-1">
            {todayData
              ? `Bugun ${formatRegionName(selectedRegion)} bo'yicha saharlik ${todayData.saharlik}, iftorlik ${todayData.iftorlik}.`
              : "Bugungi sana uchun ma'lumot topilmadi."}
          </p>
        </Card>

        <Card className="p-0 overflow-hidden" hoverEffect={false}>
          <div className="px-5 py-4 border-b border-white/10">
            <h2 className="text-2xl font-semibold">1 oylik taqvim</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5">
                <tr className="text-left text-gray-300">
                  <th className="px-4 py-3">Kun</th>
                  <th className="px-4 py-3">Hafta kuni</th>
                  <th className="px-4 py-3">Sana</th>
                  <th className="px-4 py-3">Saharlik</th>
                  <th className="px-4 py-3">Iftorlik</th>
                </tr>
              </thead>
              <tbody>
                {selectedEntries.map((entry) => {
                  const isToday = entry.dateISO === todayISO;
                  return (
                    <tr
                      key={`${entry.dateISO}-${entry.ramadanDay}`}
                      className={isToday ? 'bg-white/10' : 'border-t border-white/5'}
                    >
                      <td className="px-4 py-3 font-mono">{entry.ramadanDay}</td>
                      <td className="px-4 py-3">{entry.weekDay}</td>
                      <td className="px-4 py-3">{entry.dateLabel}</td>
                      <td className="px-4 py-3 font-mono">{entry.saharlik}</td>
                      <td className="px-4 py-3 font-mono">{entry.iftorlik}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </Section>
    </div>
  );
}
