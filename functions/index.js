const functions = require("firebase-functions");
const admin = require("firebase-admin");
const WebpayPlus = require("transbank-sdk").WebpayPlus;
const { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } = require("transbank-sdk");

admin.initializeApp();

// CONFIGURACIÓN DE PRUEBAS (INTEGRACIÓN)
// Cuando pases a producción, cambia esto por tus credenciales reales
const tx = new WebpayPlus.Transaction(new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
));

// 1. CREAR TRANSACCIÓN (Inicia el pago)
exports.createWebpayTransaction = functions.https.onCall(async (data, context) => {
    const buyOrder = "BO-" + Math.floor(Math.random() * 10000000);
    const sessionId = "S-" + Math.floor(Math.random() * 10000000);
    const amount = data.amount; // El precio viene del frontend
    const returnUrl = data.returnUrl; // URL a donde vuelve el cliente

    try {
        const response = await tx.create(buyOrder, sessionId, amount, returnUrl);
        return {
            url: response.url,
            token: response.token,
            buyOrder: buyOrder
        };
    } catch (error) {
        throw new functions.https.HttpsError('internal', 'Error iniciando Webpay', error);
    }
});

// 2. CONFIRMAR TRANSACCIÓN (Valida y Guarda en BD)
exports.commitWebpayTransaction = functions.https.onCall(async (data, context) => {
    const token = data.token;
    const buyerData = data.buyerData; // Datos del cliente pasados desde el front
    const ticketInfo = data.ticketInfo; // Info del ticket seleccionado

    try {
        // A. Confirmar con Transbank
        const response = await tx.commit(token);

        if (response.status === 'AUTHORIZED' && response.response_code === 0) {

            // B. Generar ID Único de Ticket
            const ticketID = "TM-" + Math.random().toString(36).substr(2, 9).toUpperCase();

            // C. GUARDAR EN FIRESTORE (Base de Datos)
            // Esto garantiza que el ticket existe antes de mostrar éxito
            const newTicket = {
                evento_id: "THE_MATCH_2026",
                nombre_cliente: buyerData.name.toUpperCase(),
                rut: buyerData.rut,
                email: buyerData.email,

                // Datos de Venta
                tipo_ticket: ticketInfo.type, // 'Normal' o 'VIP'
                nombre_ticket: ticketInfo.name, // 'Preventa 1'
                precio_pagado: response.amount,
                fase_venta: "WEB_ONLINE",

                // Diseño Visual
                color_ticket: buyerData.color, // 'verde', 'amarillo' o 'rojo'

                // Datos Técnicos
                id_ticket_visual: ticketID, // El ID que sale en el QR
                webpay_token: token,
                webpay_order: response.buy_order,
                fecha_compra: admin.firestore.FieldValue.serverTimestamp(),

                // Estado Inicial
                estado: "PAGADO_ONLINE", // Listo para entrar
                fecha_checkin: null
            };

            await admin.firestore().collection("tickets").add(newTicket);

            return {
                success: true,
                ticketID: ticketID, // Devolvemos el ID para generar el QR en el front
                ticketData: newTicket
            };
        } else {
            return { success: false, message: "Pago rechazado o anulado." };
        }

    } catch (error) {
        console.error(error);
        return { success: false, message: "Error validando transacción." };
    }
});