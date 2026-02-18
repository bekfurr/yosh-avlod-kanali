import { getRamadanSchedules } from '@/lib/ramadan';
import RamadanCalendarClient from './RamadanCalendarClient';

export default async function RamadanCalendarPage() {
  const schedules = await getRamadanSchedules();

  return <RamadanCalendarClient schedules={schedules} />;
}
