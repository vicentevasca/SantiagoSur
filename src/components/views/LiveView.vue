<template>
  <div>
    <LiveSection />
  </div>
</template>

<script setup>
// 1. Importar el componente visual
import LiveSection from '../../components/Live/LiveSection.vue';

// 2. Importar el composable de animaciones (para que funcionen los efectos .reveal)
import { useScrollReveal } from '../../composables/useScrollReveal';

// 3. Activar animaciones al entrar a esta página
useScrollReveal();
</script>