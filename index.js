const { 
    Client, 
    GatewayIntentBits, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle 
} = require('discord.js');
require('dotenv').config();

// Inisialisasi client bot dengan intent yang dibutuhkan
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Ambil Channel ID dari Environment Variables (Railway / .env)
const TARGET_CHANNEL_ID = process.env.TARGET_CHANNEL_ID;

client.once('ready', async () => {
    console.log(`Bot sudah aktif sebagai ${client.user.tag}!`);

    // Otomatis kirim pesan berisi tombol begitu bot menyala
    if (!TARGET_CHANNEL_ID) {
        console.log('⚠️ PERINGATAN: TARGET_CHANNEL_ID belum diatur di Variable Railway/ENV!');
        return;
    }

    try {
        const channel = await client.channels.fetch(TARGET_CHANNEL_ID);
        if (channel) {
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('btn_cac_import')
                        .setLabel('📥 Jalankan /cac import')
                        .setStyle(ButtonStyle.Primary)
                );

            await channel.send({
                content: '🤖 **Panel Kontrol Otomatis**\nSilakan klik tombol di bawah untuk menjalankan proses `/cac import` secara instan:',
                components: [row]
            });
            console.log('✅ Berhasil mengirim panel tombol otomatis ke channel.');
        } else {
            console.log('❌ Channel tujuan tidak ditemukan. Pastikan ID channel benar dan bot ada di dalam server tersebut.');
        }
    } catch (error) {
        console.error('❌ Gagal mengirim pesan otomatis:', error);
    }
});

// Menangani ketika tombol diklik oleh pengguna
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'btn_cac_import') {
        // Balasan awal saat tombol diklik
        await interaction.reply({ 
            content: '⚙️ Memproses perintah `/cac import` secara otomatis...', 
            ephemeral: false // Ubah ke true jika pesannya hanya boleh dilihat oleh orang yang mengklik
        });

        // ==========================================
        // TEMPAT MASUKKAN LOGIKA / FUNGSI UTAMA ANDA DI SINI
        // Contoh: panggil fungsi import database atau API Anda
        // ==========================================
        console.log(`Tombol import ditekan oleh ${interaction.user.tag}`);
    }
});

// Login bot menggunakan token dari Environment Variables
client.login(process.env.DISCORD_TOKEN);
