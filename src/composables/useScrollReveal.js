// src/composables/useScrollReveal.js
import { onMounted, onUnmounted, nextTick } from 'vue';

export function useScrollReveal() {
    let observer;

    const startObserver = () => {
        // Limpieza por seguridad
        if (observer) observer.disconnect();

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Dejar de observar una vez animado para ahorrar recursos
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Buscar elementos .reveal
        const elements = document.querySelectorAll('.reveal');
        if (elements.length > 0) {
            elements.forEach(el => observer.observe(el));
        }
    };

    // ACTIVACIÓN AUTOMÁTICA AL MONTAR LA PÁGINA
    onMounted(async () => {
        await nextTick(); // Esperar a que el HTML exista
        setTimeout(startObserver, 100); // Pequeño respiro para asegurar renderizado
    });

    // LIMPIEZA AL SALIR DE LA PÁGINA
    onUnmounted(() => {
        if (observer) observer.disconnect();
    });
}