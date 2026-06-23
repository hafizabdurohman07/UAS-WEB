// Component: Product Management (Protected Page)

const { ref, onMounted } = Vue;
const { useRouter } = VueRouter;

const Product = {
    template: `
        <div class="min-h-screen flex bg-slate-950">
            <!-- Sidebar Navigation -->
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
                <!-- Top Header -->
                <header class="h-16 border-b border-slate-800 bg-slate-900/40 backdrop-blur-md px-6 flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <button class="text-slate-400 hover:text-white md:hidden">
                            <i class="fa-solid fa-bars text-lg"></i>
                        </button>
                        <h2 class="font-display font-semibold text-lg text-white">Inventaris Barang</h2>
                    </div>
                    <div>
                        <!-- Add Button -->
                        <button 
                            @click="openAddModal" 
                            class="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-glow transition duration-150"
                        >
                            <i class="fa-solid fa-plus mr-1.5"></i> Tambah Produk
                        </button>
                    </div>
                </header>

                <!-- Products Content -->
                <main class="flex-grow p-6 overflow-y-auto space-y-6">
                    
                    <!-- Alert Success -->
                    <div v-if="successMsg" class="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-450 text-emerald-400 text-sm flex items-start justify-between">
                        <div class="flex items-center space-x-2.5">
                            <i class="fa-solid fa-circle-check text-base"></i>
                            <span>{{ successMsg }}</span>
                        </div>
                        <button @click="successMsg = ''" class="text-emerald-400 hover:text-white">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <!-- Alert Error -->
                    <div v-if="errorMsg" class="p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm flex items-start justify-between">
                        <div class="flex items-center space-x-2.5">
                            <i class="fa-solid fa-triangle-exclamation text-base"></i>
                            <span>{{ errorMsg }}</span>
                        </div>
                        <button @click="errorMsg = ''" class="text-red-400 hover:text-white">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <!-- Inventory Table and Filter Header -->
                    <div class="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-glass">
                        <div class="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h3 class="font-display font-semibold text-white">Daftar Inventaris</h3>
                                <p class="text-xs text-slate-500 mt-1">Total terdapat {{ products.length }} produk di dalam sistem</p>
                            </div>
                            <div class="flex items-center max-w-sm w-full">
                                <div class="relative w-full">
                                    <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <input 
                                        v-model="searchQuery" 
                                        type="text" 
                                        class="block w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs" 
                                        placeholder="Cari nama barang..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="overflow-x-auto">
                            <table class="w-full text-left text-sm text-slate-350">
                                <thead class="bg-slate-950 text-xs font-semibold text-slate-450 uppercase border-b border-slate-800">
                                    <tr>
                                        <th class="px-6 py-4">ID</th>
                                        <th class="px-6 py-4">Nama Produk</th>
                                        <th class="px-6 py-4">Kategori</th>
                                        <th class="px-6 py-4 text-center">Stok</th>
                                        <th class="px-6 py-4">Harga</th>
                                        <th class="px-6 py-4 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-800/60">
                                    <tr v-if="loading" class="hover:bg-slate-900/50">
                                        <td colspan="6" class="px-6 py-12 text-center text-slate-500">
                                            <i class="fa-solid fa-circle-notch animate-spin mr-2"></i> Mengambil data...
                                        </td>
                                    </tr>
                                    <tr v-else-if="filteredProducts.length === 0" class="hover:bg-slate-900/50">
                                        <td colspan="6" class="px-6 py-12 text-center text-slate-500">
                                            {{ searchQuery ? 'Produk dengan nama tersebut tidak ditemukan.' : 'Belum ada data produk inventaris.' }}
                                        </td>
                                    </tr>
                                    <tr v-else v-for="product in filteredProducts" :key="product.id" class="hover:bg-slate-900/40 transition">
                                        <td class="px-6 py-4 text-xs font-mono text-slate-500">#{{ product.id }}</td>
                                        <td class="px-6 py-4 font-medium text-white">{{ product.name }}</td>
                                        <td class="px-6 py-4">
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-800 text-blue-400 border border-slate-700/60">
                                                {{ product.category_name || 'Tanpa Kategori' }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            <span 
                                                class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold"
                                                :class="product.stock < 5 ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-slate-850 text-slate-300 border border-slate-800'"
                                            >
                                                {{ product.stock }} pcs
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-emerald-400 font-medium">Rp {{ formatCurrency(product.price) }}</td>
                                        <td class="px-6 py-4 text-center">
                                            <div class="inline-flex space-x-2">
                                                <!-- Edit button -->
                                                <button 
                                                    @click="openEditModal(product)"
                                                    class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-amber-500/10 text-slate-400 hover:text-amber-400 border border-slate-750 transition flex items-center justify-center text-xs"
                                                    title="Edit Produk"
                                                >
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <!-- Delete button -->
                                                <button 
                                                    @click="handleDelete(product.id)"
                                                    class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-500/10 text-slate-400 hover:text-red-400 border border-slate-750 transition flex items-center justify-center text-xs"
                                                    title="Hapus Produk"
                                                >
                                                    <i class="fa-solid fa-trash-can"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            <!-- Add/Edit Product Modal Box (Tailwind CSS Overlay) -->
            <div 
                v-if="showModal" 
                class="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto"
            >
                <!-- Backdrop blur -->
                <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
                
                <!-- Modal Card -->
                <div class="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-glass z-10 overflow-hidden transform transition-all my-8">
                    <!-- Modal Header -->
                    <div class="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
                        <h3 class="font-display font-bold text-lg text-white">
                            {{ isEditMode ? 'Edit Produk Inventaris' : 'Tambah Produk Baru' }}
                        </h3>
                        <button @click="closeModal" class="text-slate-450 hover:text-white transition">
                            <i class="fa-solid fa-xmark text-lg"></i>
                        </button>
                    </div>

                    <!-- Modal Body -->
                    <form @submit.prevent="submitForm">
                        <div class="p-6 space-y-5">
                            <!-- Name Field -->
                            <div>
                                <label for="prod_name" class="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2">Nama Barang</label>
                                <input 
                                    v-model="form.name" 
                                    type="text" 
                                    id="prod_name" 
                                    required 
                                    class="block w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="Masukkan nama barang"
                                />
                            </div>

                            <!-- Category Field -->
                            <div>
                                <label for="prod_category" class="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2">Kategori</label>
                                <select 
                                    v-model="form.category_id" 
                                    id="prod_category" 
                                    required 
                                    class="block w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                >
                                    <option value="" disabled>Pilih kategori</option>
                                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                                        {{ cat.name }}
                                    </option>
                                </select>
                            </div>

                            <!-- Stock & Price Fields (Grid) -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label for="prod_stock" class="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2">Stok Awal</label>
                                    <input 
                                        v-model.number="form.stock" 
                                        type="number" 
                                        id="prod_stock" 
                                        required 
                                        min="0"
                                        class="block w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label for="prod_price" class="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2">Harga Satuan (Rp)</label>
                                    <input 
                                        v-model.number="form.price" 
                                        type="number" 
                                        id="prod_price" 
                                        required 
                                        min="0"
                                        class="block w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Modal Footer -->
                        <div class="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end space-x-3">
                            <button 
                                type="button" 
                                @click="closeModal" 
                                class="px-4 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-300 text-xs font-semibold transition"
                            >
                                Batal
                            </button>
                            <button 
                                type="submit" 
                                class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-glow transition flex items-center space-x-2"
                                :disabled="saving"
                            >
                                <i v-if="saving" class="fa-solid fa-circle-notch animate-spin"></i>
                                <span>{{ saving ? 'Menyimpan...' : 'Simpan' }}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    setup() {
        const router = useRouter();
        const currentUser = ref(JSON.parse(localStorage.getItem('user') || '{}'));
        const products = ref([]);
        const loading = ref(true);
        const searchQuery = ref('');
        const successMsg = ref('');
        const errorMsg = ref('');

        // Modal triggers and form bindings
        const showModal = ref(false);
        const isEditMode = ref(false);
        const saving = ref(false);
        const editId = ref(null);

        const form = ref({
            name: '',
            category_id: '',
            stock: 0,
            price: 0
        });

        // Static Category List matching seeded db values
        const categories = ref([
            { id: 1, name: 'Elektronik' },
            { id: 2, name: 'Alat Tulis Kantor' },
            { id: 3, name: 'Peralatan Rumah Tangga' }
        ]);

        // Computed products list based on search query
        const filteredProducts = Vue.computed(() => {
            if (!searchQuery.value) return products.value;
            return products.value.filter(p => 
                p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
            );
        });

        // CRUD: Fetch all products from API
        const fetchProducts = async () => {
            loading.value = true;
            try {
                const response = await axios.get('/products');
                if (response.data && response.data.status === 200) {
                    products.value = response.data.data;
                }
            } catch (err) {
                console.error(err);
                errorMsg.value = 'Gagal memuat daftar produk inventaris.';
            } finally {
                loading.value = false;
            }
        };

        // Modal Actions
        const openAddModal = () => {
            isEditMode.value = false;
            editId.value = null;
            form.value = {
                name: '',
                category_id: '',
                stock: 0,
                price: 0
            };
            errorMsg.value = '';
            showModal.value = true;
        };

        const openEditModal = (product) => {
            isEditMode.value = true;
            editId.value = product.id;
            form.value = {
                name: product.name,
                category_id: parseInt(product.category_id),
                stock: parseInt(product.stock),
                price: parseFloat(product.price)
            };
            errorMsg.value = '';
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
        };

        // CRUD: Submit Create or Update
        const submitForm = async () => {
            saving.value = true;
            errorMsg.value = '';
            successMsg.value = '';

            try {
                if (isEditMode.value) {
                    // Update Product
                    const response = await axios.put(`/products/${editId.value}`, form.value);
                    if (response.data && response.data.status === 200) {
                        successMsg.value = `Produk "${form.value.name}" berhasil diperbarui.`;
                        closeModal();
                        fetchProducts();
                    }
                } else {
                    // Create Product
                    const response = await axios.post('/products', form.value);
                    if (response.data && response.data.status === 201) {
                        successMsg.value = `Produk "${form.value.name}" berhasil ditambahkan.`;
                        closeModal();
                        fetchProducts();
                    }
                }
            } catch (err) {
                console.error(err);
                if (err.response && err.response.data && err.response.data.messages) {
                    const messages = err.response.data.messages;
                    errorMsg.value = typeof messages === 'object' ? Object.values(messages).join(', ') : messages;
                } else if (err.response && err.response.data && err.response.data.message) {
                    errorMsg.value = err.response.data.message;
                } else {
                    errorMsg.value = 'Gagal memproses data produk. Cek koneksi Anda.';
                }
            } finally {
                saving.value = false;
            }
        };

        // CRUD: Delete Product
        const handleDelete = async (id) => {
            if (!confirm('Apakah Anda yakin ingin menghapus produk ini secara permanen?')) {
                return;
            }

            errorMsg.value = '';
            successMsg.value = '';

            try {
                const response = await axios.delete(`/products/${id}`);
                if (response.data && response.data.status === 200) {
                    successMsg.value = 'Produk berhasil dihapus dari inventaris.';
                    fetchProducts();
                }
            } catch (err) {
                console.error(err);
                errorMsg.value = 'Gagal menghapus produk. Cek otoritas atau jaringan Anda.';
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
            fetchProducts();
        });

        return {
            currentUser,
            products,
            filteredProducts,
            loading,
            searchQuery,
            successMsg,
            errorMsg,
            showModal,
            isEditMode,
            saving,
            form,
            categories,
            openAddModal,
            openEditModal,
            closeModal,
            submitForm,
            handleDelete,
            handleLogout,
            formatCurrency
        };
    }
};

export default Product;
