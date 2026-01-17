export default function Footer() {
    return (
        <footer className="w-full py-8 border-t border-white/5 bg-black text-center">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
                <p className="text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} BEKFURR. Barcha huquqlar himoyalangan.
                </p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-xs" />
            </div>
        </footer>
    );
}
