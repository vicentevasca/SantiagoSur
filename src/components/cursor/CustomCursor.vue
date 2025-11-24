<template>
  <div 
    class="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-100 ease-out flex items-center justify-center will-change-transform"
    :class="[
      { 'mix-blend-difference': !isMatchHover },
      isHidden ? 'opacity-0' : 'opacity-100'
    ]"
    :style="{ 
      transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
    }"
  >
    <div 
      v-if="!isMatchHover"
      class="bg-white rounded-full transition-all duration-300"
      :class="isHovering ? 'w-20 h-20 opacity-20' : 'w-4 h-4 opacity-100'"
    ></div>

    <div v-else class="relative flex items-center justify-center">
      <div class="w-16 h-16 border border-yellow-400 rounded-full animate-spin-slow opacity-80 shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
      <div class="absolute w-2 h-2 bg-yellow-200 rounded-full shadow-[0_0_10px_white]"></div>
      <div class="absolute w-full h-full animate-pulse-fast border border-purple-500/30 rounded-full scale-125"></div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const x = ref(-100);
const y = ref(-100);
const isHovering = ref(false);
const isMatchHover = ref(false);
const isHidden = ref(true); // Por defecto oculto hasta que se mueva el mouse

const updateCursor = (e) => {
  // Solo mostramos el cursor una vez que el usuario mueve el mouse
  if (isHidden.value) isHidden.value = false;

  x.value = e.clientX;
  y.value = e.clientY;
  
  const target = e.target;
  
  // Detección General
  isHovering.value = (
    target.tagName === 'A' || 
    target.tagName === 'BUTTON' ||
    target.closest('a') || 
    target.closest('button') ||
    target.classList.contains('cursor-pointer')
  );

  // Detección The Match
  isMatchHover.value = target.closest('.match-trigger') !== null;
};

// Detección de salida de ventana (para ocultar cursor si sale del navegador)
const handleMouseLeave = () => {
  isHidden.value = true;
};

const handleMouseEnter = () => {
  isHidden.value = false;
};

onMounted(() => {
  // CRUCIAL: Detectamos si el dispositivo soporta hover real (mouse)
  // Si es táctil puro, matchMedia será falso y no agregamos los listeners
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (isDesktop) {
    window.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
  } else {
    // Aseguramos que se quede oculto en móviles
    isHidden.value = true;
  }
});

onUnmounted(() => {
  window.removeEventListener('mousemove', updateCursor);
  document.removeEventListener('mouseleave', handleMouseLeave);
  document.removeEventListener('mouseenter', handleMouseEnter);
});
</script>

<style scoped>
/* Regla Maestra: Ocultar por defecto en todos lados */
.custom-cursor {
  display: none; 
}

/* Regla de Excepción: Solo mostrar en dispositivos con puntero fino (Mouse/Trackpad) */
@media (hover: hover) and (pointer: fine) {
  .custom-cursor {
    display: flex;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin 3s linear infinite;
}
.animate-pulse-fast {
  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1.25); }
  50% { opacity: .5; transform: scale(1.1); }
}
</style>