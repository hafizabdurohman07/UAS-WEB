// Component: Login Form (Public Page)

const { ref } = Vue;
const { useRouter } = VueRouter;

const Login = {
    template: `
        <div class="min-h-screen flex items-center justify-center py-12 px-6 relative overflow-hidden">
            <!-- Background design blobs -->
            <div class="absolute w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -top-20 -left-20 pointer-events-none"></div>
            <div class="absolute w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none"></div>

            <div class="w-full max-w-md z-10">
                <!-- Brand logo/name -->
                <div class="text-center mb-8">
                    <div class="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 items-center justify-center shadow-glow mb-4">
                        <i class="fa-solid fa-boxes-stacked text-white text-xl"></i>
                    </div>
                    <h2 class="font-display text-3xl font-bold text-white tracking-wide">Selamat Datang</h2>
                    <p class="text-sm text-slate-400 mt-2">Masuk untuk mengelola stok barang inventaris</p>
                </div>

                <!-- Glassmorphic Login Card -->
                <div class="bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-3xl p-8 shadow-glass">
                    
                    <!-- Alert Error -->
                    <div v-if="error" class="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm flex items-start space-x-2.5">
                        <i class="fa-solid fa-circle-exclamation mt-0.5 text-base flex-shrink-0"></i>
                        <span>{{ error }}</span>
                    </div>

                    <form @submit.prevent="handleLogin" class="space-y-6">
                        <!-- Username Field -->
                        <div>
                            <label for="username" class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Username</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                                    <i class="fa-solid fa-user"></i>
                                </span>
                                <input 
                                    v-model="username" 
                                    type="text" 
                                    id="username" 
                                    required 
                                    class="block w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition duration-150 text-sm"
                                    placeholder="Masukkan username"
                                    :disabled="loading"
                                />
                            </div>
                        </div>

                        <!-- Password Field -->
                        <div>
                            <label for="password" class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                                    <i class="fa-solid fa-lock"></i>
                                </span>
                                <input 
                                    v-model="password" 
                                    type="password" 
                                    id="password" 
                                    required 
                                    class="block w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition duration-150 text-sm"
                                    placeholder="••••••••"
                                    :disabled="loading"
                                />
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <button 
                            type="submit" 
                            class="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition duration-150 rounded-xl font-semibold text-white shadow-glow hover:shadow-lg flex items-center justify-center space-x-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            :disabled="loading"
                        >
                            <i v-if="loading" class="fa-solid fa-circle-notch animate-spin"></i>
                            <span>{{ loading ? 'Memverifikasi...' : 'Sign In' }}</span>
                        </button>
                    </form>

                    <!-- Info default user seed -->
                    <div class="mt-6 pt-6 border-t border-slate-700/40 text-center">
                        <p class="text-xs text-slate-500">
                            Akun demo: <code class="text-slate-400">admin</code> / <code class="text-slate-400">password123</code>
                        </p>
                    </div>
                </div>

                <div class="text-center mt-6">
                    <router-link to="/" class="text-xs text-slate-500 hover:text-slate-400 transition">
                        <i class="fa-solid fa-arrow-left mr-1"></i> Kembali ke Beranda
                    </router-link>
                </div>
            </div>
        </div>
    `,
    setup() {
        const router = useRouter();
        const username = ref('');
        const password = ref('');
        const error = ref('');
        const loading = ref(false);

        const handleLogin = async () => {
            error.value = '';
            loading.value = true;

            try {
                const response = await axios.post('/login', {
                    username: username.value,
                    password: password.value
                });

                if (response.data && response.data.status === 200) {
                    const result = response.data.data;
                    
                    // Store details in localStorage
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('user', JSON.stringify(result.user));

                    // Redirect to Admin Dashboard
                    router.push({ name: 'dashboard' });
                }
            } catch (err) {
                console.error(err);
                if (err.response && err.response.data && err.response.data.messages) {
                    // CI4 REST errors response can have an array/object under messages
                    const messages = err.response.data.messages;
                    error.value = typeof messages === 'object' ? Object.values(messages)[0] : messages;
                } else if (err.response && err.response.data && err.response.data.message) {
                    error.value = err.response.data.message;
                } else {
                    error.value = 'Terjadi kesalahan jaringan atau server tidak terjangkau.';
                }
            } finally {
                loading.value = false;
            }
        };

        return {
            username,
            password,
            error,
            loading,
            handleLogin
        };
    }
};

export default Login;
