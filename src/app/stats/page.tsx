import { getChannelStats } from '@/lib/youtube';
import StatsClient from './StatsClient';

export default async function StatsPage() {
    const stats = await getChannelStats();

    return <StatsClient stats={stats} />;
}
