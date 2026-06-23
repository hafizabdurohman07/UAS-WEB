// Component: Landing Page (Public Home)

const Landing = {
    template: `
        <div class="min-h-screen flex flex-col justify-between">
            <!-- Header Navigation -->
            <header class="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-glow">
                            <i class="fa-solid fa-boxes-stacked text-white text-lg"></i>
                        </div>
                        <span class="font-display font-bold text-xl tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            E-Inventory
                        </span>
                    </div>
                    <div>
                        <router-link to="/login" class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 transition duration-150 rounded-lg border border-slate-700 hover:border-slate-600">
                            Masuk <i class="fa-solid fa-arrow-right-to-bracket ml-2"></i>
                        </router-link>
                    </div>
                </div>
            </header>

            <!-- Hero Section -->
            <main class="flex-grow flex items-center justify-center py-16 px-6 relative overflow-hidden">
                <!-- Background decorative elements -->
                <div class="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] top-1/4 -left-64 pointer-events-none"></div>
                <div class="absolute w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] bottom-1/4 -right-32 pointer-events-none"></div>

                <div class="max-w-4xl text-center z-10">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6 uppercase tracking-wider">
                        <i class="fa-solid fa-sparkles mr-1.5 animate-pulse"></i> Sistem Inventaris Modern
                    </span>
                    <h1 class="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                        Manajemen Stok Barang <br/>
                        <span class="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                            Lebih Cepat & Akurat
                        </span>
                    </h1>
                    <p class="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Aplikasi manajemen pergudangan E-Inventory berbasis RESTful API murni dengan perlindungan keamanan JSON Web Token (JWT) dan performa antarmuka yang dinamis.
                    </p>
                    
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <router-link to="/login" class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition duration-150 rounded-xl shadow-glow">
                            Kelola Inventaris <i class="fa-solid fa-chevron-right ml-2 text-sm"></i>
                        </router-link>
                        <a href="https://github.com" target="_blank" class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition duration-150 rounded-xl border border-slate-700">
                            Dokumentasi API <i class="fa-solid fa-book-bookmark ml-2 text-sm text-slate-400"></i>
                        </a>
                    </div>

                    <!-- App Stats / Features Grid -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 text-left">
                        <div class="p-6 bg-slate-800/40 rounded-2xl border border-slate-800 backdrop-blur-sm">
                            <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4">
                                <i class="fa-solid fa-cubes text-lg"></i>
                            </div>
                            <h3 class="text-white font-semibold mb-1">Murni RESTful</h3>
                            <p class="text-xs text-slate-500">Komunikasi data terstruktur berformat JSON.</p>
                        </div>
                        <div class="p-6 bg-slate-800/40 rounded-2xl border border-slate-800 backdrop-blur-sm">
                            <div class="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                                <i class="fa-solid fa-shield-halved text-lg"></i>
                            </div>
                            <h3 class="text-white font-semibold mb-1">Proteksi JWT</h3>
                            <p class="text-xs text-slate-500">Otentikasi aman stateless dengan Bearer Token.</p>
                        </div>
                        <div class="p-6 bg-slate-800/40 rounded-2xl border border-slate-800 backdrop-blur-sm">
                            <div class="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4">
                                <i class="fa-solid fa-code text-lg"></i>
                            </div>
                            <h3 class="text-white font-semibold mb-1">CodeIgniter 4</h3>
                            <p class="text-xs text-slate-500">Backend andal dengan performa performan.</p>
                        </div>
                        <div class="p-6 bg-slate-800/40 rounded-2xl border border-slate-800 backdrop-blur-sm">
                            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                                <i class="fa-solid fa-bolt text-lg"></i>
                            </div>
                            <h3 class="text-white font-semibold mb-1">VueJS 3 SPA</h3>
                            <p class="text-xs text-slate-500">UX mulus tanpa reload halaman.</p>
                        </div>
                    </div>
                </div>
            </main>

            <!-- Footer -->
            <footer class="border-t border-slate-800 py-6 text-center text-xs text-slate-500 bg-slate-950/40 backdrop-blur-sm">
                <div class="max-w-7xl mx-auto px-6">
                    &copy; 2026 E-Inventory System. Tugas Akhir UAS Pemrograman Web.
                </div>
            </footer>
        </div>
    `
};

export default Landing;
