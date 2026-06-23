// Component: Admin Dashboard (Protected Page)

const { ref, onMounted } = Vue;
const { useRouter } = VueRouter;

const Dashboard = {
    template: `
        <div class="min-h-screen flex bg-slate-950">
            <!-- Sidebar Sidebar Navigasi -->
            <aside class="w-64 border-r border-slate-800 bg-slate-900 flex flex-col justify-between hidden md:flex">
                <div>
                    <!-- Brand -->
                    <div class="h-16 px-6 flex items-center space-x-3 border-b border-slate-800">
                        <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center">
                            <i class="fa-solid fa-boxes-stacked text-white text-sm"></i>
                        </div>
                        <span class="font-display font-bold text-lg text-white">E-Inventory</span>
                    </div>

                    <!-- Menu List -->
                    <nav class="p-4 space-y-2">
                        <router-link 
                            to="/dashboard" 
                            class="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition group"
                        >
                            <i class="fa-solid fa-chart-pie text-slate-400 group-hover:text-blue-400"></i>
                            <span class="text-sm font-medium">Dashboard</span>
                        </router-link>
                        <router-link 
                            to="/products" 
                            class="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition group"
                        >
                            <i class="fa-solid fa-box-open text-slate-400 group-hover:text-blue-400"></i>
                            <span class="text-sm font-medium">Inventaris Produk</span>
                        </router-link>
                    </nav>
                </div>

                <!-- User Profile & Logout -->
                <div class="p-4 border-t border-slate-800 bg-slate-900/60">
                    <div class="flex items-center space-x-3 mb-4">
                        <div class="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-semibold uppercase">
                            {{ currentUser.username ? currentUser.username[0] : 'U' }}
                        </div>
                        <div>
                            <p class="text-sm font-semibold text-white truncate max-w-[120px]">{{ currentUser.username }}</p>
                            <p class="text-xs text-slate-500">Administrator</p>
                        </div>
                    </div>
                    <button 
                        @click="handleLogout" 
                        class="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-850 hover:bg-red-500/10 text-slate-450 hover:text-red-400 border border-slate-800 hover:border-red-550/20 transition rounded-xl text-xs font-semibold"
                    >
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <!-- Main Panel -->
            <div class="flex-grow flex flex-col min-w-0">
                <!-- Top Navbar -->
                <header class="h-16 border-b border-slate-800 bg-slate-900/40 backdrop-blur-md px-6 flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <button class="text-slate-400 hover:text-white md:hidden">
                            <i class="fa-solid fa-bars text-lg"></i>
                        </button>
                        <h2 class="font-display font-semibold text-lg text-white">Ringkasan Analitik</h2>
                    </div>
                    <div class="flex items-center space-x-4">
                        <!-- Date Widget -->
                        <span class="text-xs text-slate-450 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                            <i class="fa-regular fa-calendar mr-1.5"></i> {{ currentDate }}
                        </span>
                    </div>
                </header>

                <!-- Dashboard Content -->
                <main class="flex-grow p-6 overflow-y-auto space-y-8">
                    <!-- Welcoming Banner -->
                    <div class="relative overflow-hidden bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-3xl p-6 sm:p-8">
                        <div class="relative z-10 max-w-lg">
                            <h3 class="font-display text-2xl sm:text-3xl font-bold text-white mb-2">Halo, {{ currentUser.username }}!</h3>
                            <p class="text-sm text-slate-300 leading-relaxed mb-4">
                                Selamat datang di dashboard E-Inventory. Berikut ringkasan performa stok inventaris barang gudang hari ini.
                            </p>
                            <router-link to="/products" class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-glow transition">
                                Kelola Produk <i class="fa-solid fa-arrow-right ml-1.5"></i>
                            </router-link>
                        </div>
                        <div class="absolute right-8 bottom-0 top-0 items-center justify-center hidden lg:flex opacity-25">
                            <i class="fa-solid fa-chart-line text-8xl text-blue-400"></i>
                        </div>
                    </div>

                    <!-- Statistics Cards -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Card 1: Total Products -->
                        <div class="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between">
                            <div>
                                <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Produk</p>
                                <h4 class="text-3xl font-display font-bold text-white">{{ stats.totalProducts }}</h4>
                            </div>
                            <div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <i class="fa-solid fa-box text-xl"></i>
                            </div>
                        </div>

                        <!-- Card 2: Low Stock Alerts -->
                        <div class="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between">
                            <div>
                                <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Stok Menipis (&lt; 5)</p>
                                <h4 class="text-3xl font-display font-bold" :class="stats.lowStock > 0 ? 'text-amber-450 text-amber-400' : 'text-white'">
                                    {{ stats.lowStock }}
                                </h4>
                            </div>
                            <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="stats.lowStock > 0 ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-500'">
                                <i class="fa-solid fa-triangle-exclamation text-xl"></i>
                            </div>
                        </div>

                        <!-- Card 3: Total Asset Value -->
                        <div class="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex items-center justify-between">
                            <div>
                                <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Nilai Aset</p>
                                <h4 class="text-2xl font-display font-bold text-emerald-400">Rp {{ formatCurrency(stats.totalValue) }}</h4>
                            </div>
                            <div class="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                <i class="fa-solid fa-rupiah-sign text-lg"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Products Table -->
                    <div class="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden">
                        <div class="p-6 border-b border-slate-800 flex items-center justify-between">
                            <h3 class="font-display font-semibold text-white">Produk Terbaru</h3>
                            <router-link to="/products" class="text-xs font-semibold text-blue-400 hover:text-blue-300">
                                Lihat Semua <i class="fa-solid fa-arrow-right ml-1"></i>
                            </router-link>
                        </div>
                        
                        <div class="overflow-x-auto">
                            <table class="w-full text-left text-sm text-slate-350">
                                <thead class="bg-slate-950 text-xs font-semibold text-slate-450 uppercase border-b border-slate-800">
                                    <tr>
                                        <th class="px-6 py-4">Nama Produk</th>
                                        <th class="px-6 py-4">Kategori</th>
                                        <th class="px-6 py-4">Stok</th>
                                        <th class="px-6 py-4">Harga</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-800/60">
                                    <tr v-if="loading" class="hover:bg-slate-900/50">
                                        <td colspan="4" class="px-6 py-8 text-center text-slate-500">
                                            <i class="fa-solid fa-circle-notch animate-spin mr-2"></i> Mengambil data...
                                        </td>
                                    </tr>
                                    <tr v-else-if="recentProducts.length === 0" class="hover:bg-slate-900/50">
                                        <td colspan="4" class="px-6 py-8 text-center text-slate-500">
                                            Belum ada data produk inventaris.
                                        </td>
                                    </tr>
                                    <tr v-else v-for="product in recentProducts" :key="product.id" class="hover:bg-slate-900/40 transition">
                                        <td class="px-6 py-4 font-medium text-white">{{ product.name }}</td>
                                        <td class="px-6 py-4">
                                            <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-800 text-slate-350 border border-slate-700/60">
                                                {{ product.category_name || 'Tanpa Kategori' }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4">
                                            <span :class="product.stock < 5 ? 'text-red-400 font-semibold' : 'text-slate-300'">
                                                {{ product.stock }} pcs
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-emerald-400 font-medium">Rp {{ formatCurrency(product.price) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    `,
    setup() {
        const router = useRouter();
        const currentUser = ref(JSON.parse(localStorage.getItem('user') || '{}'));
        const recentProducts = ref([]);
        const loading = ref(true);
        const currentDate = ref(new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
        
        const stats = ref({
            totalProducts: 0,
            lowStock: 0,
            totalValue: 0
        });

        const fetchDashboardData = async () => {
            loading.value = true;
            try {
                const response = await axios.get('/products');
                if (response.data && response.data.status === 200) {
                    const allProducts = response.data.data;
                    
                    // Sort descending by ID to simulate "Recent"
                    const sorted = [...allProducts].sort((a, b) => b.id - a.id);
                    recentProducts.value = sorted.slice(0, 5); // Take top 5

                    // Calculate stats
                    stats.value.totalProducts = allProducts.length;
                    stats.value.lowStock = allProducts.filter(p => parseInt(p.stock) < 5).length;
                    stats.value.totalValue = allProducts.reduce((acc, curr) => acc + (parseFloat(curr.price) * parseInt(curr.stock)), 0);
                }
            } catch (err) {
                console.error('Gagal mengambil data dashboard:', err);
            } finally {
                loading.value = false;
            }
        };

        const handleLogout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
            router.push({ name: 'login' });
        };

        const formatCurrency = (value) => {
            return parseFloat(value).toLocaleString('id-ID');
        };

        onMounted(() => {
            fetchDashboardData();
        });

        return {
            currentUser,
            recentProducts,
            loading,
            stats,
            currentDate,
            handleLogout,
            formatCurrency
        };
    }
};

export default Dashboard;
