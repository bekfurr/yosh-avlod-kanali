'use client';

import { useEffect, useState } from 'react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Download, Package } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Program } from '@/lib/types';

// Fallback data if Supabase is not connected
const MOCK_PROGRAMS: Program[] = [
    {
        id: 1,
        title: 'Yosh Avlod Helper Tool',
        description: 'Avtomatlashtirish va ish jarayonini optimallashtirish uchun yordamchi dastur.',
        download_url: '#',
        version: 'v1.2.0',
        created_at: new Date().toISOString(),
    },
    {
        id: 2,
        title: 'O\'quv To\'plami 2024',
        description: 'Bizning eng yangi video darslarimiz uchun to\'liq manbalar to\'plami.',
        download_url: '#',
        version: 'v2.0.1',
        created_at: new Date().toISOString(),
    },
];

export default function ProgramsPage() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPrograms() {
            try {
                const { data, error } = await supabase
                    .from('programs')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error || !data || data.length === 0) {
                    console.log('Using mock data (Supabase empty or error)');
                    setPrograms(MOCK_PROGRAMS);
                } else {
                    setPrograms(data);
                }
            } catch (err) {
                console.error('Error fetching programs:', err);
                setPrograms(MOCK_PROGRAMS);
            } finally {
                setLoading(false);
            }
        }

        fetchPrograms();
    }, []);

    return (
        <div className="pt-8 px-6 max-w-7xl mx-auto min-h-screen">
            <Section>
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Dasturlar va Resurslar</h1>
                    <p className="text-gray-400 max-w-2xl">
                        Yosh Avlod Kanali tomonidan yuklangan videolarda foydalanilgan va boshqa foydali dasturlar va resurslar.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2].map((i) => (
                            <div key={i} className="h-48 bg-white/5 animate-pulse rounded-xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {programs.map((program) => (
                            <Card key={program.id} className="p-6 flex flex-col justify-between hover:border-blue-500/30 transition-colors">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                                        <Package className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{program.title}</h3>
                                        <p className="text-sm text-blue-400 font-mono mt-1">{program.version}</p>
                                    </div>
                                    <p className="text-gray-400 text-sm">{program.description}</p>
                                </div>

                                <div className="mt-6 pt-6 border-t border-white/5">
                                    <a href={program.download_url} target="_blank" rel="noopener noreferrer" className="block">
                                        <Button className="w-full" glow>
                                            <Download className="w-4 h-4 mr-2" /> Yuklab Olish
                                        </Button>
                                    </a>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </Section>
        </div>
    );
}
