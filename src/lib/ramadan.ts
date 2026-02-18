import { readFile } from 'node:fs/promises';
import path from 'node:path';

export interface RamadanDay {
  ramadanDay: number;
  weekDay: string;
  dateLabel: string;
  dateISO: string;
  saharlik: string;
  iftorlik: string;
}

export type RamadanScheduleByRegion = Record<string, RamadanDay[]>;

const MONTH_INDEX: Record<string, number> = {
  yanvar: 1,
  fevral: 2,
  mart: 3,
  aprel: 4,
  may: 5,
  iyun: 6,
  iyul: 7,
  avgust: 8,
  sentyabr: 9,
  oktyabr: 10,
  noyabr: 11,
  dekabr: 12,
};

const DATA_ROW_REGEX = /^(\d{1,2})\s+(\S+)\s+(.+?)\s+(\d{2}:\d{2})\s+(\d{2}:\d{2})$/;

let cachedSchedule: RamadanScheduleByRegion | null = null;

function normalizeMonthName(monthName: string): string {
  return monthName
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .trim();
}

function toISODate(dateLabel: string): string | null {
  const parts = dateLabel.trim().split(/\s+/);
  if (parts.length < 3) {
    return null;
  }

  const day = Number.parseInt(parts[0], 10);
  const year = Number.parseInt(parts[parts.length - 1], 10);
  const monthName = normalizeMonthName(parts.slice(1, -1).join(' '));
  const month = MONTH_INDEX[monthName];

  if (!Number.isFinite(day) || !Number.isFinite(year) || !month) {
    return null;
  }

  const monthText = String(month).padStart(2, '0');
  const dayText = String(day).padStart(2, '0');
  return `${year}-${monthText}-${dayText}`;
}

function normalizeRegionName(region: string): string {
  return region.replace(/\s+/g, ' ').trim();
}

export async function getRamadanSchedules(): Promise<RamadanScheduleByRegion> {
  if (cachedSchedule) {
    return cachedSchedule;
  }

  const filePath = path.join(process.cwd(), 'TAQVIM_hammasi.txt');
  const rawText = await readFile(filePath, 'utf8');
  const lines = rawText.split(/\r?\n/);

  const schedules: RamadanScheduleByRegion = {};
  let currentRegion = '';

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      continue;
    }

    if (/^kun\b/i.test(line)) {
      continue;
    }

    const match = line.match(DATA_ROW_REGEX);
    if (match) {
      if (!currentRegion) {
        continue;
      }

      const ramadanDay = Number.parseInt(match[1], 10);
      const weekDay = match[2];
      const dateLabel = match[3];
      const saharlik = match[4];
      const iftorlik = match[5];
      const dateISO = toISODate(dateLabel);

      if (!dateISO || !Number.isFinite(ramadanDay)) {
        continue;
      }

      schedules[currentRegion] ??= [];
      schedules[currentRegion].push({
        ramadanDay,
        weekDay,
        dateLabel,
        dateISO,
        saharlik,
        iftorlik,
      });

      continue;
    }

    currentRegion = normalizeRegionName(line);
    schedules[currentRegion] ??= [];
  }

  for (const region of Object.keys(schedules)) {
    schedules[region].sort((a, b) => a.dateISO.localeCompare(b.dateISO));
  }

  cachedSchedule = schedules;
  return schedules;
}
