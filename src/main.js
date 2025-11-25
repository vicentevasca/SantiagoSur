import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// 1. Importar librería de partículas (Solo una vez)
import Particles from "@tsparticles/vue3";

// 2. Importar los cargadores
import { loadFireworksPreset } from "@tsparticles/preset-fireworks"; // Para The Match
import { loadSlim } from "@tsparticles/slim"; // Para el Aura del Ticket

const app = createApp(App);

// 3. Inicializar el plugin cargando AMBOS motores
app.use(Particles, {
    init: async (engine) => {
        // Cargar soporte para fuegos artificiales
        await loadFireworksPreset(engine);

        // Cargar soporte para partículas estándar (ticket)
        await loadSlim(engine);
    },
});

app.use(router);

app.mount('#app');