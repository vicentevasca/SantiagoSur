<script setup>
import { ref, reactive, nextTick, computed, onMounted } from 'vue';
import QRCode from 'qrcode'; 
import emailjs from '@emailjs/browser';
import html2canvas from 'html2canvas'; 
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

// --- CONFIGURACIÓN FIREBASE (Pega tus datos aquí) ---
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "stgosur-appticket.firebaseapp.com",
  projectId: "stgosur-appticket",
  storageBucket: "stgosur-appticket.firebasestorage.app",
  messagingSenderId: "349001036884",
  appId: "TU_APP_ID"
};

// Inicializar si no existe
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

import matchBg from '../../assets/img/TheMatch/TheMatchBackground.png';
import DjPabloBastias from '../../assets/img/artistas/dj/PabloBastias/DjPabloBastias.png';
import Vassc from '../../assets/img/artistas/dj/Vassc/Vassc.png';

// --- ESTADOS ---
const activeTab = ref('info'); 
const activeMobileDj = ref(null);
const compraStep = ref(1); 
const loading = ref(false);
const processingPayment = ref(false); 
const ticketRef = ref(null);
const generatedQrUrl = ref(null);

const selectedTicket = ref(null);
const buyer = reactive({
  name: '',
  rut: '',
  email: '',
  color: 'verde'
});

const isVip = computed(() => selectedTicket.value?.type === 'VIP');

// --- HELPERS ---
const switchTab = (tab) => { activeTab.value = tab; compraStep.value = 1; };
const handleDjClick = (index) => { activeMobileDj.value = activeMobileDj.value === index ? null : index; };
const selectTicket = (name, price, type) => { selectedTicket.value = { name, price, type }; };
const goToForm = () => { if (selectedTicket.value) compraStep.value = 2; };
const formatPrice = (value) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);

// --- COLORES ---
const colorsMap = {
  verde: '#10b981',
  amarillo: '#f59e0b',
  rojo: '#ef4444'
};
const goldHex = '#FFD700';

// 1. Color Base (Bordes, Badge) -> Siempre el que el usuario elige
const getBaseHex = () => colorsMap[buyer.color] || colorsMap.verde;

// 2. Color Acento (Títulos) -> Dorado si es VIP, Blanco si no
const getAccentHex = () => isVip.value ? goldHex : '#FFFFFF';

// Estilos para el Ticket Visual
const getTicketStyleObject = () => ({
  borderColor: getBaseHex(),
  boxShadow: `0 0 40px ${getBaseHex()}55` // Brillo del color del equipo
});

const getBadgeStyleObject = () => {
  const hex = getBaseHex();
  // Texto blanco solo si es rojo, sino negro
  const textColor = buyer.color === 'rojo' ? '#ffffff' : '#000000';
  return { 
    backgroundColor: hex, 
    color: textColor,
    // Si es VIP, le agregamos un borde dorado al badge
    border: isVip.value ? '2px solid #FFD700' : 'none'
  };
};

// --- WEBPAY ---
const initiateWebpay = async () => {
  if (!buyer.name || !buyer.rut || !buyer.email) return alert("Completa todos los datos");
  loading.value = true;
  const createTx = httpsCallable(functions, 'createWebpayTransaction');

  try {
    localStorage.setItem('temp_buyer', JSON.stringify(buyer));
    localStorage.setItem('temp_ticket', JSON.stringify(selectedTicket.value));

    const result = await createTx({
      amount: selectedTicket.value.price,
      returnUrl: window.location.href 
    });

    const { url, token } = result.data;
    const form = document.createElement('form');
    form.action = url;
    form.method = 'POST';
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'token_ws';
    input.value = token;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();

  } catch (error) {
    console.error(error);
    alert("Error conectando con Webpay.");
    loading.value = false;
  }
};

const confirmPayment = async (token) => {
  processingPayment.value = true;
  activeTab.value = 'info'; 
  
  const savedBuyer = JSON.parse(localStorage.getItem('temp_buyer'));
  const savedTicket = JSON.parse(localStorage.getItem('temp_ticket'));
  if (savedBuyer) Object.assign(buyer, savedBuyer);
  if (savedTicket) selectedTicket.value = savedTicket;

  const commitTx = httpsCallable(functions, 'commitWebpayTransaction');

  try {
    const result = await commitTx({ token, buyerData: buyer, ticketInfo: selectedTicket.value });

    if (result.data.success) {
      const { ticketID } = result.data;
      localStorage.removeItem('temp_buyer');
      localStorage.removeItem('temp_ticket');

      await sendEmail(ticketID);

      compraStep.value = 3;
      await nextTick();
      generateVisualQR(ticketID);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      alert("Pago rechazado.");
      compraStep.value = 1;
    }
  } catch (error) {
    console.error(error);
    alert("Error validando pago.");
  } finally {
    processingPayment.value = false;
  }
};

const sendEmail = async (ticketID) => {
  const emailParams = {
    to_name: buyer.name,
    to_email: buyer.email,
    ticket_type: selectedTicket.value.name,
    ticket_id: ticketID,
    user_rut: buyer.rut,
    
    // Color elegido (para el borde del ticket)
    ticket_color_name: buyer.color.toUpperCase(),
    ticket_color_hex: getBaseHex(),
    
    // Detalles VIP (Dorados)
    main_title_color: isVip.value ? '#FFD700' : '#FFFFFF',
    subtitle_text: isVip.value ? '★ VIP EXPERIENCE 2026 ★' : 'AÑO NUEVO 2026',
    is_vip_display: isVip.value ? 'block' : 'none'
  };

  try {
    await emailjs.send('service_zwr437a', 'template_mvnkzik', emailParams, '5XCelGkcK7I2UORSA');
  } catch (e) { console.error("Email falló", e); }
};

const generateVisualQR = async (idText) => {
  try {
    const url = await QRCode.toDataURL(idText, { width: 300, margin: 1, color: { dark: '#000000', light: '#ffffff' } });
    generatedQrUrl.value = url;
  } catch (err) { console.error(err); }
};

const downloadTicket = async () => {
  if (!ticketRef.value) return;
  try {
    const canvas = await html2canvas(ticketRef.value, { backgroundColor: '#000000', scale: 2, useCORS: true });
    const link = document.createElement('a');
    link.download = `Ticket_${buyer.name.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (err) { console.error(err); }
};

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token_ws');
  if (token) confirmPayment(token);
});

const lineUp = ref([
  { name: 'DJ PABLO BASTÍAS', genre: 'Reguetón', time: '23:00 - 01:00', image: DjPabloBastias },
  { name: 'VASSC', genre: 'Ultrabailable', time: '01:00 - 03:00', image: Vassc },
  { name: 'NICO B.', genre: 'Tech House', time: '03:00 - CLOSING', image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1200&auto=format&fit=crop' }
]);
</script>

<template>
  <div class="fixed inset-0 z-[100] bg-black text-white w-full h-full overflow-y-auto lg:overflow-hidden font-sans">
    
    <div class="absolute inset-0 z-0 pointer-events-none bg-cover bg-center animate-slow-pan" :style="{ backgroundImage: `url(${matchBg})` }">
      <div class="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black lg:bg-gradient-to-r lg:from-black/90 lg:via-black/60 lg:to-black/80"></div>
    </div>

    <div v-if="processingPayment" class="absolute inset-0 z-[200] bg-black flex flex-col items-center justify-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500 mb-4"></div>
      <h2 class="text-xl font-bold text-white uppercase tracking-widest animate-pulse">Confirmando Pago...</h2>
    </div>

    <div class="relative z-10 min-h-screen lg:min-h-0 lg:h-screen w-full px-6 py-20 lg:py-0 lg:px-16 flex flex-col lg:justify-center">
      
      <button @click="$emit('close')" class="fixed top-6 right-6 z-50 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-yellow-400 transition group mix-blend-difference cursor-pointer">
        <span class="text-xl group-hover:rotate-90 transition-transform duration-300">×</span> Cerrar
      </button>

      <div class="w-full max-w-[1600px] mx-auto flex flex-col h-full lg:h-auto lg:justify-center">
        
        <div v-if="compraStep !== 3 && !processingPayment" class="flex flex-col items-center mb-8 lg:mb-12 animate-fade-in-up">
          <div class="text-center mb-6 lg:mb-8">
            <div class="inline-block px-3 py-1 border border-yellow-500/30 rounded-full mb-2 backdrop-blur-sm"><p class="text-[9px] font-bold tracking-[0.3em] text-yellow-400 uppercase">¡Es Oficial!</p></div>
            <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase drop-shadow-2xl">The <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700">Match</span></h1>
            <p class="text-lg md:text-xl font-serif italic text-neutral-300 mt-1">Gala Año Nuevo 2026</p>
          </div>
          <div class="flex gap-12 border-b border-white/10 px-8">
            <button @click="switchTab('info')" class="pb-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 relative" :class="activeTab === 'info' ? 'text-white' : 'text-neutral-500 hover:text-white'">Info & Tickets<span class="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-500 transition-transform duration-300" :class="activeTab === 'info' ? 'scale-x-100' : 'scale-x-0'"></span></button>
            <button @click="switchTab('lineup')" class="pb-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 relative" :class="activeTab === 'lineup' ? 'text-white' : 'text-neutral-500 hover:text-white'">Line Up<span class="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-500 transition-transform duration-300" :class="activeTab === 'lineup' ? 'scale-x-100' : 'scale-x-0'"></span></button>
          </div>
        </div>

        <Transition name="fade-tab" mode="out-in">
          
          <div v-if="activeTab === 'info'" key="info" class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <div v-if="compraStep !== 3" class="lg:col-span-7 space-y-8">
              <p class="text-neutral-300 text-sm lg:text-base leading-relaxed max-w-2xl">Llega para Buin-Paine un nuevo concepto en fiestas masivas...</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                 <div class="flex items-start gap-3"><span class="text-xl">📍</span><div><span class="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">Ubicación</span><span class="text-sm font-bold text-white">Academia Renacer</span></div></div>
                 <div class="flex items-start gap-3"><span class="text-xl">👠</span><div><span class="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">Dress Code</span><span class="text-sm font-bold text-white">Gala / Semi Formal</span></div></div>
                 <div class="col-span-1 sm:col-span-2 flex flex-wrap gap-3 text-xs text-white/90 mt-2">
                    <span class="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded border border-white/10">🥂 Open Bar</span>
                    <span class="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded border border-white/10">💃 Stage Ultrabailable</span>
                    <span class="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded border border-white/10">🌳 Terraza Open Air</span>
                 </div>
              </div>
            </div>

            <div :class="compraStep === 3 ? 'lg:col-span-12 flex justify-center' : 'lg:col-span-5'">
              <div class="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden transition-all duration-500" :class="compraStep === 3 ? 'max-w-md w-full border-yellow-500/30' : 'min-h-[400px]'">
                
                <div v-if="compraStep === 1" class="animate-fade-in">
                  <h3 class="text-white font-bold uppercase tracking-widest text-sm mb-4">Selecciona tu entrada</h3>
                  <div class="space-y-3 mb-6">
                    <div @click="selectTicket('Preventa 1', 20000, 'Normal')" class="flex items-center justify-between p-3 border rounded transition-all cursor-pointer hover:border-yellow-500/50" :class="selectedTicket?.name === 'Preventa 1' ? 'border-yellow-500 bg-yellow-500/10' : 'border-yellow-500/30 bg-black/40'"><div><div class="flex items-center gap-2"><span class="text-sm font-bold text-white">Preventa 1</span><span class="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold uppercase animate-pulse">¡ÚLTIMAS!</span></div><span class="text-[10px] text-neutral-400 font-mono block">Ticket Normal</span></div><span class="text-lg font-bold text-yellow-400">$20.000</span></div>
                    <div @click="selectTicket('Preventa 2', 25000, 'Normal')" class="flex items-center justify-between p-3 border rounded transition-all cursor-pointer hover:border-yellow-500/50" :class="selectedTicket?.name === 'Preventa 2' ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10 bg-black/40'"><div><span class="text-sm font-bold text-white">Preventa 2</span><span class="text-[10px] text-neutral-400 font-mono block">Ticket Normal</span></div><span class="text-lg font-bold text-white">$25.000</span></div>
                    <div @click="selectTicket('VIP General', 35000, 'VIP')" class="flex items-center justify-between p-3 border rounded transition-all cursor-pointer hover:border-amber-400" :class="selectedTicket?.type === 'VIP' ? 'border-amber-400 bg-amber-500/10' : 'border-white/10 bg-black/40'"><div><span class="text-sm font-bold text-amber-400">★ VIP EXPERIENCE</span><span class="text-[10px] text-neutral-400 font-mono block">Acceso Total</span></div><span class="text-lg font-bold text-amber-400">$35.000</span></div>
                  </div>
                  <button @click="goToForm" :disabled="!selectedTicket" class="w-full py-3 bg-white text-black font-extrabold text-xs tracking-[0.2em] uppercase hover:bg-yellow-400 transition-colors duration-300 rounded-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">{{ selectedTicket ? `Pagar ${formatPrice(selectedTicket.price)}` : 'Selecciona una entrada' }}</button>
                </div>

                <div v-else-if="compraStep === 2" class="animate-fade-in">
                  <div class="flex items-center gap-2 mb-6"><button @click="compraStep = 1" class="text-neutral-400 hover:text-white text-xs uppercase font-bold tracking-widest flex items-center gap-1">← Volver</button><span class="text-neutral-600">|</span><h3 class="text-white font-bold uppercase tracking-widest text-sm">Personaliza tu Ticket</h3></div>
                  <form @submit.prevent="initiateWebpay" class="space-y-4">
                    
                    <div>
                      <label class="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-1">Elige tu Color (Team)</label>
                      <div class="flex gap-4 bg-black/30 p-3 rounded border border-white/10">
                        <button type="button" @click="buyer.color = 'verde'" class="w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center relative" :class="buyer.color === 'verde' ? 'border-white scale-110 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'border-transparent opacity-60 hover:opacity-100'"><div class="w-full h-full bg-emerald-500 rounded-full"></div></button>
                        <button type="button" @click="buyer.color = 'amarillo'" class="w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center relative" :class="buyer.color === 'amarillo' ? 'border-white scale-110 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'border-transparent opacity-60 hover:opacity-100'"><div class="w-full h-full bg-amber-500 rounded-full"></div></button>
                        <button type="button" @click="buyer.color = 'rojo'" class="w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center relative" :class="buyer.color === 'rojo' ? 'border-white scale-110 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'border-transparent opacity-60 hover:opacity-100'"><div class="w-full h-full bg-red-500 rounded-full"></div></button>
                      </div>
                    </div>

                    <div><label class="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1 ml-1">Nombre Completo</label><input v-model="buyer.name" type="text" class="w-full bg-black/50 border border-white/20 rounded px-4 py-3 text-white text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder-neutral-600" placeholder="Ej: Juan Pérez" required /></div>
                    <div><label class="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1 ml-1">RUT</label><input v-model="buyer.rut" type="text" class="w-full bg-black/50 border border-white/20 rounded px-4 py-3 text-white text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder-neutral-600" placeholder="123456789" required /></div>
                    <div><label class="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1 ml-1">Correo Electrónico</label><input v-model="buyer.email" type="email" class="w-full bg-black/50 border border-white/20 rounded px-4 py-3 text-white text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder-neutral-600" placeholder="correo@ejemplo.com" required /></div>
                    
                    <div class="pt-4 border-t border-white/10">
                      <div class="flex justify-between items-center text-xs text-neutral-400 mb-4"><span>Total a Pagar</span><span class="text-yellow-400 font-bold text-xl">{{ formatPrice(selectedTicket.price) }}</span></div>
                      <button type="submit" :disabled="loading" class="w-full py-4 bg-gradient-to-r from-indigo-900 to-indigo-800 border border-indigo-500/50 text-white font-bold text-sm tracking-widest uppercase hover:brightness-110 transition-all shadow-lg relative overflow-hidden group">
                        <span v-if="loading" class="flex items-center justify-center gap-2">Procesando...</span>
                        <span v-else class="flex items-center justify-center gap-2">Pagar con Webpay 💳</span>
                      </button>
                    </div>
                  </form>
                </div>

                <div v-else-if="compraStep === 3" class="animate-fade-in text-center pb-4">
                  <div class="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 text-green-500 text-3xl">✓</div>
                  <h3 class="text-2xl font-black text-white uppercase tracking-tighter mb-2">¡Pago Exitoso!</h3>
                  <p class="text-neutral-400 text-sm mb-6 max-w-xs mx-auto">Tu entrada ha sido generada.</p>

                  <div 
                    ref="ticketRef"
                    class="relative rounded-xl border-4 p-5 max-w-[300px] mx-auto shadow-2xl overflow-hidden mb-6"
                    style="background-color: #000000; color: #ffffff;"
                    :style="getTicketStyleObject()"
                  >
                    <div class="absolute inset-0 z-0" style="background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);"></div>
                    
                    <div class="relative z-10 flex flex-col items-center">
                      <div class="rounded-full px-3 py-1 mb-2 font-bold text-[10px] uppercase tracking-[0.2em]" :style="getBadgeStyleObject()">
                        {{ buyer.color }} ACCESS
                      </div>
                      
                      <h2 class="text-3xl font-black italic leading-none mb-1" :style="{ color: getAccentHex(), textShadow: isVip ? '0 0 15px rgba(255, 215, 0, 0.5)' : '0 4px 10px rgba(0,0,0,0.5)' }">THE MATCH</h2>
                      <p class="text-xs font-medium uppercase tracking-widest mb-6" :style="{ color: getAccentHex() }">{{ isVip ? '★ VIP EXPERIENCE 2026 ★' : 'Año Nuevo 2026' }}</p>
                      
                      <div v-if="isVip" class="mb-1 text-[10px] font-black uppercase tracking-widest" style="color: #FFD700;">★ VIP PASS ★</div>

                      <div class="p-2 rounded-lg mb-6" :style="{ backgroundColor: '#ffffff', border: isVip ? '4px solid #FFD700' : '2px solid #e5e5e5' }">
                        <img v-if="generatedQrUrl" :src="generatedQrUrl" style="width: 160px; height: 160px; display: block;" alt="QR" />
                      </div>
                      
                      <div class="w-full text-left pt-4 space-y-3" :style="{ borderTop: '1px solid rgba(255,255,255,0.15)' }">
                        <div><p class="text-[9px] uppercase font-bold tracking-widest" style="color: #737373;">Asistente</p><p class="text-base font-bold truncate" style="color: #ffffff;">{{ buyer.name.toUpperCase() }}</p></div>
                        <div><p class="text-[9px] uppercase font-bold tracking-widest" style="color: #737373;">Identificación</p><p class="text-sm font-mono tracking-wide" style="color: #d4d4d4;">{{ buyer.rut }}</p></div>
                      </div>
                      <div class="mt-6 pt-2 w-full text-center" style="border-top: 1px dashed rgba(255,255,255,0.2);"><p class="text-[9px] font-bold uppercase tracking-widest" style="color: #525252;">No Transferible</p></div>
                    </div>
                  </div>

                  <button @click="downloadTicket" class="mt-2 text-sm font-bold text-white border-b border-white pb-1 hover:text-yellow-400 hover:border-yellow-400 transition-colors">Descargar Ticket</button>
                </div>

                <div v-if="compraStep === 1" class="flex justify-center gap-4 mt-4 pt-4 border-t border-white/10">
                  <a href="#" class="text-white hover:text-yellow-400 transition-colors text-xl flex items-center gap-2 text-xs uppercase font-bold"><span class="text-lg">📸</span> Instagram</a>
                  <a href="#" class="text-white hover:text-yellow-400 transition-colors text-xl flex items-center gap-2 text-xs uppercase font-bold"><span class="text-lg">💬</span> WhatsApp</a>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="activeTab === 'lineup'" key="lineup" class="w-full h-full lg:h-auto overflow-visible">
             <div class="grid grid-cols-1 md:grid-cols-3 gap-6 h-full pb-20 lg:pb-0">
               <div v-for="(dj, index) in lineUp" :key="index" @click="handleDjClick(index)" class="relative group cursor-pointer overflow-hidden h-[400px] md:h-[500px] rounded-sm border border-white/10 bg-neutral-900">
                 <img :src="dj.image" class="w-full h-full object-cover transition-transform duration-[1.5s] grayscale brightness-75" :class="activeMobileDj === index ? 'scale-110 grayscale-0 brightness-100' : 'group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-100'" />
                 <div class="absolute inset-0 bg-black/40 transition-colors duration-500" :class="activeMobileDj === index ? 'bg-transparent' : 'group-hover:bg-transparent'"></div>
                 <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 transition-all duration-500">
                   <h3 class="text-5xl md:text-6xl font-black uppercase tracking-tighter text-transparent stroke-text text-center leading-none transition-all duration-500 mix-blend-difference" :class="activeMobileDj === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'">{{ dj.name }}</h3>
                   <span class="mt-2 text-yellow-400 font-mono text-sm bg-black/80 px-3 py-1 rounded transition-all duration-500 delay-100" :class="activeMobileDj === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'">SET TIME: {{ dj.time }}</span>
                 </div>
               </div>
             </div>
          </div>

        </Transition>

      </div>
    </div>
  </div>
</template>

<style scoped>
.stroke-text { -webkit-text-stroke: 2px white; color: transparent; }
.animate-slow-pan { animation: panBackground 30s infinite alternate linear; }
@keyframes panBackground { from { transform: scale(1.1) translate(0, 0); } to { transform: scale(1.2) translate(-2%, -2%); } }
.animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; transform: translateY(30px); }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
.animate-fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.fade-tab-enter-active, .fade-tab-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.fade-tab-enter-from { opacity: 0; transform: translateY(10px); }
.fade-tab-leave-to { opacity: 0; transform: translateY(-10px); }
</style>