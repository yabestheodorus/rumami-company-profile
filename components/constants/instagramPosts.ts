export type PostCategory =
  | 'kitchenset'
  | 'bedroom'
  | 'livingroom'
  | 'workspace'
  | 'other'

export type InstagramPost = {
  id: string
  date: string
  caption: string
  category: PostCategory
} & (
  | { kind: 'image'; src: string }
  | { kind: 'carousel'; sources: string[] }
  | { kind: 'video'; src: string; poster: string }
)

export const categoryLabels: Record<'all' | PostCategory, string> = {
  all: 'Semua',
  kitchenset: 'Kitchen Set',
  bedroom: 'Kamar Tidur',
  livingroom: 'Ruang Tamu',
  workspace: 'Workspace',
  other: 'Lainnya',
}

const IG = '/images/instagram'
const VID = '/videos/instagram'

export const instagramPosts: InstagramPost[] = [
  {
    id: '2026-03-13_17-17-58_UTC',
    date: '2026-03-13',
    category: 'bedroom',
    kind: 'carousel',
    sources: [
      `${IG}/2026-03-13_17-17-58_UTC_1.jpg`,
      `${IG}/2026-03-13_17-17-58_UTC_2.jpg`,
      `${IG}/2026-03-13_17-17-58_UTC_3.jpg`,
      `${IG}/2026-03-13_17-17-58_UTC_4.jpg`,
    ],
    caption: `Client : Mr. R
Location : Jakarta Selatan

Konsultasi dan Survey Gratis
WA : 0877 1872 5531

#interior #masternedroom #kitchenset #designinterior`,
  },
  {
    id: '2026-02-14_16-46-59_UTC',
    date: '2026-02-14',
    category: 'other',
    kind: 'video',
    src: `${VID}/2026-02-14_16-46-59_UTC.mp4`,
    poster: `${IG}/2026-02-14_16-46-59_UTC.jpg`,
    caption: `Wujudkan ruangan impianmu tanpa pusing mikirin biaya awal bersama Rumami Interior! ✨

Punya ide desain tapi bingung mulai dari mana? Tenang saja, kami hadir dengan layanan Gratis Survey dan Konsultasi. Anda bisa berdiskusi langsung dengan tim ahli kami untuk merencanakan interior rumah yang estetik, fungsional, dan tentunya pas dengan budget.

Keunggulan layanan kami:

 ✅ Bebas Biaya Awal: Gratis survey lokasi dan konsultasi desain.

 ✅ Harga Kompetitif: Custom furniture mulai dari Rp 2.000.000/meter.

 ✅ Material Berkualitas: Bebas pilih bahan terbaik (Plywood Multipleks, PVC Board, HMR, Blokboard).

Tunggu apa lagi? Jadikan rumah Anda lebih nyaman sekarang juga.

📞 Hubungi kami untuk jadwalkan survey:
WA: 0877 1872 5531
Atau klik link di bio!

#RumamiInterior #DesainInterior #CustomFurniture #InteriorRumah #GratisSurvey InspirasiKamar InteriorJakarta`,
  },
  {
    id: '2026-01-23_01-29-23_UTC',
    date: '2026-01-23',
    category: 'bedroom',
    kind: 'carousel',
    sources: [
      `${IG}/2026-01-23_01-29-23_UTC_1.jpg`,
      `${IG}/2026-01-23_01-29-23_UTC_2.jpg`,
      `${IG}/2026-01-23_01-29-23_UTC_3.jpg`,
      `${IG}/2026-01-23_01-29-23_UTC_4.jpg`,
      `${IG}/2026-01-23_01-29-23_UTC_5.jpg`,
    ],
    caption: `✨ SPECIAL PROMO: Wujudkan kamar impianmu sekarang! Dapatkan Cashback Up To Rp 3.000.000 untuk setiap pemesanan custom interior (Limited Slot).syarat dan ketentuan berlaku

Definisi istirahat yang sesungguhnya.
✨ Bayangkan pulang ke rumah setelah hari yang panjang dan disambut dengan suasana kamar tidur sehangat ini.

Hubungi kami via DM atau klik link di bio untuk konsultasi gratis! 📩

#interior #interiorjakarta #interiordesign`,
  },
  {
    id: '2026-01-07_09-46-01_UTC',
    date: '2026-01-07',
    category: 'livingroom',
    kind: 'video',
    src: `${VID}/2026-01-07_09-46-01_UTC.mp4`,
    poster: `${IG}/2026-01-07_09-46-01_UTC.jpg`,
    caption: `Finished Project
Client : Mr. R
Location : Kebayoran Baru

Transformasi yang selama ini diimpikan. ✨ Dari ruang biasa, sekarang jadi sudut favorit untuk bersantai. Sentuhan desain baru ini benar-benar membawa kehangatan dan kemewahan yang beda. Living room goals achieved! 🛋️🤎

#kitchensetjakarta #interior #interiorjakarta #desaininterior #kitchensetdepok`,
  },
  {
    id: '2026-01-02_11-00-17_UTC',
    date: '2026-01-02',
    category: 'livingroom',
    kind: 'video',
    src: `${VID}/2026-01-02_11-00-17_UTC.mp4`,
    poster: `${IG}/2026-01-02_11-00-17_UTC.jpg`,
    caption: `Bold, clean, and timeless. 🖤
Desain ruang tamu modern ini mengedepankan prinsip "Less is More". Dengan pemilihan furnitur bergaris tegas dan sentuhan material premium, kami menciptakan ruang yang tampak luas sekaligus berkarakter.
Ruangan ini dirancang untuk Anda yang menghargai efisiensi tanpa mengorbankan gaya. Siap menyambut tamu dengan suasana yang lebih berkelas? 🥂
Konsultasikan desain impianmu bersama kami melalui link di bio!
#moderninterior #livingroomgoals #interiormodern #desaininterio #modernliving`,
  },
  {
    id: '2025-12-31_18-32-22_UTC',
    date: '2025-12-31',
    category: 'other',
    kind: 'video',
    src: `${VID}/2025-12-31_18-32-22_UTC.mp4`,
    poster: `${IG}/2025-12-31_18-32-22_UTC.jpg`,
    caption: `Menutup lembaran 2025 dengan rasa syukur yang mendalam.
Terima kasih kepada seluruh klien yang telah memercayakan transformasi ruangnya kepada kami.
Setiap proyek tahun ini adalah perjalanan kreatif yang luar biasa—dari sketsa di atas kertas hingga menjadi hunian impian yang nyata. Proud of every detail we've built. See you in 2026! ✨🛋️
#interiordesign #projectcompleted #2025reflection #desaininterior #kitchensetminimalis`,
  },
  {
    id: '2025-12-24_12-04-34_UTC',
    date: '2025-12-24',
    category: 'kitchenset',
    kind: 'video',
    src: `${VID}/2025-12-24_12-04-34_UTC.mp4`,
    poster: `${IG}/2025-12-24_12-04-34_UTC.jpg`,
    caption: `Estetika industrial: Dimana fungsionalitas bertemu dengan desain yang tak lekang oleh waktu. Bold, edgy, and timeless.

Contact Us : 0877 1872 5531

#kitchensetminimalis #kitchensetjakarta #kitchenset #interior #interiorjakarta`,
  },
  {
    id: '2025-12-24_08-38-23_UTC',
    date: '2025-12-24',
    category: 'kitchenset',
    kind: 'video',
    src: `${VID}/2025-12-24_08-38-23_UTC.mp4`,
    poster: `${IG}/2025-12-24_08-38-23_UTC.jpg`,
    caption: `Memanfaatkan setiap sudut dengan gaya. Siapa sangka area bawah tangga bisa jadi sefungsional ini?

#kitchensetminimalis #kitchensetjakarta #kitchenset #interior #desaininterior`,
  },
  {
    id: '2025-12-15_02-44-08_UTC',
    date: '2025-12-15',
    category: 'kitchenset',
    kind: 'video',
    src: `${VID}/2025-12-15_02-44-08_UTC.mp4`,
    poster: `${IG}/2025-12-15_02-44-08_UTC.jpg`,
    caption: `Kesederhanaan desain minimalis bertemu dengan sentuhan klasik yang hangat.
Meja marmer putih dipilih untuk memperkuat karakter dapur yang bersih, elegan, dan berkelas.

#kitchensetjakarta #kitchensetminimalis #kitchenset`,
  },
  {
    id: '2025-11-14_07-29-25_UTC',
    date: '2025-11-14',
    category: 'kitchenset',
    kind: 'video',
    src: `${VID}/2025-11-14_07-29-25_UTC.mp4`,
    poster: `${IG}/2025-11-14_07-29-25_UTC.jpg`,
    caption: `Dapur bukan cuma tempat memasak—ini ruang eksplorasi warna dan kreativitas.
Kitchenset modern dengan kombinasi warna ceria untuk vibe yang lebih fresh!

Client : Mrs. A
Location : Depok
Design : Kitchenset Modern

Konsultasi Gratis : 0877-1872-5531

#kitchensetjakarta #kitchensetminimalis #interior #kitchenset #desaininterior #interiorjakarta #kitchensetdepok`,
  },
  {
    id: '2025-11-01_07-25-23_UTC',
    date: '2025-11-01',
    category: 'bedroom',
    kind: 'carousel',
    sources: [
      `${IG}/2025-11-01_07-25-23_UTC_1.jpg`,
      `${IG}/2025-11-01_07-25-23_UTC_2.jpg`,
      `${IG}/2025-11-01_07-25-23_UTC_3.jpg`,
      `${IG}/2025-11-01_07-25-23_UTC_4.jpg`,
      `${IG}/2025-11-01_07-25-23_UTC_5.jpg`,
      `${IG}/2025-11-01_07-25-23_UTC_6.jpg`,
    ],
    caption: `Project Finished ☑️

Client : Mr. S
Location : Tangerang
Design : Master Bedroom

Konsultasi Gratis : 0877-1872-5531

Modern Minimalis
Kesederhanaan yang berkelas.
Kamar tidur utama dengan konsep modern minimalis ini menciptakan ruang yang bersih, fungsional, dan tetap estetik.

#interior #interiorjakarta #kitchensetjakarta #kamartidurminimalis #kamarestetik`,
  },
  {
    id: '2025-10-25_03-31-27_UTC',
    date: '2025-10-25',
    category: 'workspace',
    kind: 'carousel',
    sources: [
      `${IG}/2025-10-25_03-31-27_UTC_1.jpg`,
      `${IG}/2025-10-25_03-31-27_UTC_2.jpg`,
      `${IG}/2025-10-25_03-31-27_UTC_3.jpg`,
      `${IG}/2025-10-25_03-31-27_UTC_4.jpg`,
      `${IG}/2025-10-25_03-31-27_UTC_5.jpg`,
      `${IG}/2025-10-25_03-31-27_UTC_6.jpg`,
    ],
    caption: `Client : Mrs. R
Location : Kebayoran Baru
Design : Worksspace

Konsultasi Gratis : 0877-1872-5531

Produktivitas dimulai dari ruang yang nyaman.
Desain interior ruang kerja yang rapi, fungsional, dan estetik bukan hanya soal tampilan — tapi tentang menciptakan suasana yang mendukung fokus dan kreativitas setiap hari.

✨ Buat ruang kerjamu jadi tempat terbaik untuk berkarya!

#kitchenset #kitchensetjakarta #interiör #interior #interiorjakarta`,
  },
  {
    id: '2025-10-24_09-12-28_UTC',
    date: '2025-10-24',
    category: 'kitchenset',
    kind: 'carousel',
    sources: [
      `${IG}/2025-10-24_09-12-28_UTC_1.jpg`,
      `${IG}/2025-10-24_09-12-28_UTC_2.jpg`,
      `${IG}/2025-10-24_09-12-28_UTC_3.jpg`,
      `${IG}/2025-10-24_09-12-28_UTC_4.jpg`,
      `${IG}/2025-10-24_09-12-28_UTC_5.jpg`,
      `${IG}/2025-10-24_09-12-28_UTC_6.jpg`,
    ],
    caption: `Project Finsihed ☑️

Client : Mr. S
Location : Serpong Garden 3
Design : Kitchenset Modern

✨ Maksimalkan setiap sudut rumah!
Kitchen set elegan ini memanfaatkan area bawah tangga dengan desain yang fungsional dan estetik.
Material premium, finishing rapi, dan tata letak efisien menjadikan dapur kecil tetap nyaman dan stylish.

📍 Cocok untuk rumah minimalis
💡 Desain custom sesuai kebutuhan

Konsultasi Gratis : 0877-1872-5531

#kitchensetjakarta #kichensetminimalis #kichenset #custominterior #desaininteriorjakarta`,
  },
  {
    id: '2025-03-22_08-11-41_UTC',
    date: '2025-03-22',
    category: 'bedroom',
    kind: 'image',
    src: `${IG}/2025-03-22_08-11-41_UTC.jpg`,
    caption: `Kamar Anak Perempuan 🎉🎉

Konsultasi Gratis Via WhatsApp :
087718725531

#interior #designinterior #designinteriorjakarta #kidsroom #kidsroominspiration #kamaranaklucu`,
  },
  {
    id: '2025-03-22_08-08-22_UTC',
    date: '2025-03-22',
    category: 'kitchenset',
    kind: 'image',
    src: `${IG}/2025-03-22_08-08-22_UTC.jpg`,
    caption: `Kichenset Kodern Tema Industrial 🎉🎉

#kitchensetjakarta #kitchensetdepok #kichensetminimalis #kitchensetmodern #interior #interiordesigner #interiorjakarta`,
  },
  {
    id: '2025-03-22_08-06-49_UTC',
    date: '2025-03-22',
    category: 'kitchenset',
    kind: 'image',
    src: `${IG}/2025-03-22_08-06-49_UTC.jpg`,
    caption: `Kitchenset Modern Tema Industrial 🎉🎉

#kitchen #kitchensetjakarta #kitchensetdepok #interior #interiordesigner #designinteriorjakarta`,
  },
  {
    id: '2025-02-06_08-18-20_UTC',
    date: '2025-02-06',
    category: 'kitchenset',
    kind: 'image',
    src: `${IG}/2025-02-06_08-18-20_UTC.jpg`,
    caption: `Inspirasi Desain - Kitchenset Modern

Konsultasi Gratis : 0877-1872-5531

#kitchendesign #kitchensetjakarta #kitchensetdepok #kitchensetbogor`,
  },
  {
    id: '2025-02-05_14-29-00_UTC',
    date: '2025-02-05',
    category: 'kitchenset',
    kind: 'image',
    src: `${IG}/2025-02-05_14-29-00_UTC.jpg`,
    caption: `Inspirasi Desain - Kitchenset Modern

Dapur dengan pemaksimalan penyimpanan yang disesuaikan dengan bentuk ruangan.

#kitchenset #kitchensetminimalis #kitchensetmodern #kitchensetjakarta #kitchensetdepok #interiorjakarta #interiordepok`,
  },
  {
    id: '2025-02-05_14-10-39_UTC',
    date: '2025-02-05',
    category: 'kitchenset',
    kind: 'image',
    src: `${IG}/2025-02-05_14-10-39_UTC.jpg`,
    caption: `Inspirasi Design - Kitchenset Modern

Bangun Interior Impianmu Bersama Kami Rumami.Ind

Konsultasi Gratis : 0878-1872-5531

#kitchenset #kitchensetminimalis #interiordesign #interior #kitchensetjakarta #kitchensetdepok`,
  },
  {
    id: '2025-02-03_14-46-38_UTC',
    date: '2025-02-03',
    category: 'kitchenset',
    kind: 'image',
    src: `${IG}/2025-02-03_14-46-38_UTC.jpg`,
    caption: `POV Kitchenset Terbuka

Kami dapat membuat kitchenset yang sesuai dengan kebutuhan anda, anda ingin banyak tempat penyimpanan ?
Kami bisa wujudkan itu.

Segera Konsultasikan Kebutuhan Interior Anda.
Konsultasi Gratis : 0877-1872-5531

#kitchenset #kitchensetminimalis #kitchensetjakarta #kitchensetbogor #kitchensetdepok #interior #interiorjakarta`,
  },
  {
    id: '2025-02-03_14-38-18_UTC',
    date: '2025-02-03',
    category: 'kitchenset',
    kind: 'image',
    src: `${IG}/2025-02-03_14-38-18_UTC.jpg`,
    caption: `Kitchenset Modern & Partisi Kisi-Kisi

Konsultasi Gratis : 0877-1872-5531

#kitchen #kitchensetminimalis #kitchensetmodern #kitchensetjakarta #kitchensetbogor #kitchensetdepok`,
  },
  {
    id: '2025-02-03_14-36-26_UTC',
    date: '2025-02-03',
    category: 'kitchenset',
    kind: 'image',
    src: `${IG}/2025-02-03_14-36-26_UTC.jpg`,
    caption: `Kitchenset Modern

📍sawangan

#kitchenset #kitchensetminimalis #kitchensetjakarta #kitchensetbogor #kitchensetdepok`,
  },
  {
    id: '2025-02-03_12-53-14_UTC',
    date: '2025-02-03',
    category: 'kitchenset',
    kind: 'image',
    src: `${IG}/2025-02-03_12-53-14_UTC.jpg`,
    caption: `Backsplash Mozaic - Chevron Glossy White

#interior #interiordesign #kitchenset #kitchensetminimalis #kitchensetjakarta #kitchensetbogor #kitchensetdepok`,
  },
  {
    id: '2025-02-03_10-18-21_UTC',
    date: '2025-02-03',
    category: 'kitchenset',
    kind: 'image',
    src: `${IG}/2025-02-03_10-18-21_UTC.jpg`,
    caption: `Meja Island ~ Quadra Simplica Bianca

#kitchenset #kitchensetminimalis #kitchensetjakarta #interior #interiordesign #interiordecor`,
  },
  {
    id: '2025-02-02_10-04-15_UTC',
    date: '2025-02-02',
    category: 'kitchenset',
    kind: 'image',
    src: `${IG}/2025-02-02_10-04-15_UTC.jpg`,
    caption: `Finish Project

Kitchenset & Table Island
📍 Tangerang

Konsultasi Gratis : 0877-1872-5531

#kitchen #kitchensetminimalis #kitchensetjakarta #kitchensetbekasi #kitchensetmodern #interior #interiordesign`,
  },
  {
    id: '2025-02-01_09-43-14_UTC',
    date: '2025-02-01',
    category: 'kitchenset',
    kind: 'image',
    src: `${IG}/2025-02-01_09-43-14_UTC.jpg`,
    caption: `Design Kitchenset Modern Minnimalis

#kitchens #kitchenset #kitchensetminimalis #kitchensetjakarta #kitchensetbekasi #kitchensetmodern #interior #interiordesign #interiorcustom`,
  },
  {
    id: '2025-02-01_09-33-50_UTC',
    date: '2025-02-01',
    category: 'kitchenset',
    kind: 'image',
    src: `${IG}/2025-02-01_09-33-50_UTC.jpg`,
    caption: `Table Island With Woody HPL

#kitchenset #kitchensetminimalis #kitchensetmurah #kitchensetjakarta #kitchensetbandung #kitchensetbekasi #kitchensetmodern #interior #interiorjakarta #tableislanddesign`,
  },
  {
    id: '2025-02-01_09-28-48_UTC',
    date: '2025-02-01',
    category: 'kitchenset',
    kind: 'image',
    src: `${IG}/2025-02-01_09-28-48_UTC.jpg`,
    caption: `Kitchenset With Table Island

#kitchenset #tableisland #design #interior #interirorjakarta #interiordepok #designinterior #kitchensetmurah #kitchensetjakarat`,
  },
  {
    id: '2025-01-27_17-30-37_UTC',
    date: '2025-01-27',
    category: 'kitchenset',
    kind: 'video',
    src: `${VID}/2025-01-27_17-30-37_UTC.mp4`,
    poster: `${IG}/2025-01-27_17-30-37_UTC.jpg`,
    caption: `Mari Wujudkan Impian Dapur Anda Bersama Kami Rumami.Ind 🎉
Konsultasikan Kebutuhan Interior Anda Secara Gratis 👇
0877-1872-5531

#kitchensetminimalis #kitchensetjakarta #desaininterior #interior #kitchendesign #kitchenset #kitchenset #jakartainterior #jakartainterior #interiorjakarta #interiordesign #interiorrumah`,
  },
  {
    id: '2025-01-27_16-55-35_UTC',
    date: '2025-01-27',
    category: 'kitchenset',
    kind: 'carousel',
    sources: [
      `${IG}/2025-01-27_16-55-35_UTC_1.jpg`,
      `${IG}/2025-01-27_16-55-35_UTC_2.jpg`,
      `${IG}/2025-01-27_16-55-35_UTC_3.jpg`,
      `${IG}/2025-01-27_16-55-35_UTC_4.jpg`,
      `${IG}/2025-01-27_16-55-35_UTC_5.jpg`,
    ],
    caption: `Inspiration Design For Kitchenset Modern

Hadirkan keindahan dan kenyamanan di dapur Anda dengan kitchen set modern dan Nikmati kenyamanan memasak dengan kitchen set modern yang sempurna.

#kitchen #kitchensetminimalis #kitchensetmodern #interior #interiordesign #fyp #kitchensetjakarta`,
  },
  {
    id: '2025-01-25_17-35-01_UTC',
    date: '2025-01-25',
    category: 'kitchenset',
    kind: 'video',
    src: `${VID}/2025-01-25_17-35-01_UTC.mp4`,
    poster: `${IG}/2025-01-25_17-35-01_UTC.jpg`,
    caption: `✨ Transformasi Dapur Impian ✨

Sebelum: Dapur yang dulu terasa sempit dan kurang nyaman untuk beraktivitas. Warna kusam, ruang penyimpanan terbatas, dan pencahayaan kurang maksimal. 🫣

Sesudah: Kini dapur kami berubah menjadi tempat yang jauh lebih modern, terang, dan fungsional! 🌟 Dengan desain minimalis, material berkualitas, dan sentuhan estetika yang pas, memasak jadi semakin menyenangkan. 💕👩‍🍳

Konsultasi Gratis : 0877-1872-5531

#kitchensetminimalis #desaininterior #kitchensetjakarta #kitchendesign #kitchenset #interior #jakartainterior #interiorrumah`,
  },
  {
    id: '2025-01-21_08-23-01_UTC',
    date: '2025-01-21',
    category: 'kitchenset',
    kind: 'video',
    src: `${VID}/2025-01-21_08-23-01_UTC.mp4`,
    poster: `${IG}/2025-01-21_08-23-01_UTC.jpg`,
    caption: `Kitchenset Minimalis With Island Table ☑️

Client : Mrs. R
Location : Serpong Garden 3
Item : Kitchenset With Island Table

Ingin dapur anda dibuat seperti ini ?
Hanya dengan 2jtan saja kami dapat membuat tampilan dapur anda menjadi lebih estetik dan fungsional.

Segera konsultasikan kebutuhan interior anda dengan kami Rumami.Ind, Jasa Custom Interior Terpercaya Sejabodetabek .

Hubungi segera
WhatsApp : 0877-1872-5531

#kitchensetminimalis #desaininterior #kitchensetjakarta #kitchendesign #kitchenset #interior
#jakartainterior  #interiorjakart`,
  },
  {
    id: '2025-01-11_16-39-32_UTC',
    date: '2025-01-11',
    category: 'bedroom',
    kind: 'image',
    src: `${IG}/2025-01-11_16-39-32_UTC.jpg`,
    caption: `Wardrobe Unik & Stylish

Konsultasi Gratis : 0877-1872-5531`,
  },
  {
    id: '2025-01-11_16-38-29_UTC',
    date: '2025-01-11',
    category: 'other',
    kind: 'image',
    src: `${IG}/2025-01-11_16-38-29_UTC.jpg`,
    caption: `Lemari Minimalis & Sofa Bench

Konsultasi Gratis : 0877-1872-5531`,
  },
  {
    id: '2025-01-11_16-36-54_UTC',
    date: '2025-01-11',
    category: 'bedroom',
    kind: 'image',
    src: `${IG}/2025-01-11_16-36-54_UTC.jpg`,
    caption: `Lemari Kamar Anak - Unik & Stylish

Konsultasi Gratis : 0877-1872-5531

#interior #interiorjakarta #desaininterior #kamaranakperempuan #desainkamartidur`,
  },
  {
    id: '2025-01-11_16-34-19_UTC',
    date: '2025-01-11',
    category: 'bedroom',
    kind: 'image',
    src: `${IG}/2025-01-11_16-34-19_UTC.jpg`,
    caption: `Minimalis Bedroom

Konsultasi Gratis : 0877-1872-5531

#kithenset #kitchensetjakarta #desaininterior #interiorrumah #interiorminimalis`,
  },
  {
    id: '2025-01-11_16-08-03_UTC',
    date: '2025-01-11',
    category: 'kitchenset',
    kind: 'carousel',
    sources: [
      `${IG}/2025-01-11_16-08-03_UTC_1.jpg`,
      `${IG}/2025-01-11_16-08-03_UTC_2.jpg`,
      `${IG}/2025-01-11_16-08-03_UTC_3.jpg`,
      `${IG}/2025-01-11_16-08-03_UTC_4.jpg`,
      `${IG}/2025-01-11_16-08-03_UTC_5.jpg`,
    ],
    caption: `FINISHED PROJECT ☑️

Client : Mrs. R
Location : Serpong Garden 3
Design : Kitchenset Minimalis

Konsultasi Gratis : 0877-1872-5531

#kitchen #kitchendesign #interiordesign #designinterior #interiorjakarta`,
  },
  {
    id: '2025-01-11_06-52-23_UTC',
    date: '2025-01-11',
    category: 'kitchenset',
    kind: 'carousel',
    sources: [
      `${IG}/2025-01-11_06-52-23_UTC_1.jpg`,
      `${IG}/2025-01-11_06-52-23_UTC_2.jpg`,
      `${IG}/2025-01-11_06-52-23_UTC_3.jpg`,
      `${IG}/2025-01-11_06-52-23_UTC_4.jpg`,
      `${IG}/2025-01-11_06-52-23_UTC_5.jpg`,
    ],
    caption: `PROJECT FINISHED ☑️

Client : Mr.A
Location : Cempaka Putih Timur
Design : Kitchenset Modern

Konsultasi Gratis : 0877-1872-5531

#kitchendesign #kitchensetminimalis #interior #desaininterior #interiordesign #jakartainterior`,
  },
  {
    id: '2024-12-19_23-46-38_UTC',
    date: '2024-12-19',
    category: 'kitchenset',
    kind: 'carousel',
    sources: [
      `${IG}/2024-12-19_23-46-38_UTC_1.jpg`,
      `${IG}/2024-12-19_23-46-38_UTC_2.jpg`,
      `${IG}/2024-12-19_23-46-38_UTC_3.jpg`,
      `${IG}/2024-12-19_23-46-38_UTC_4.jpg`,
      `${IG}/2024-12-19_23-46-38_UTC_5.jpg`,
      `${IG}/2024-12-19_23-46-38_UTC_6.jpg`,
      `${IG}/2024-12-19_23-46-38_UTC_7.jpg`,
    ],
    caption: `Rak Piring pada kitchenset adalah elemen penting untuk menyimpan dan mengorganisasi piring serta peralatan makan dengan rapi dan efisien. Biasanya, rak piring ini terintegrasi dengan desain kitchenset, sehingga menyatu dengan estetika dan fungsionalitas dapur.
Berikut Beberapa Jenis Rak Piring Yang Biasa Digunakan :
1. Rak Piring Gantung
2. Rak Piring Gantung Elevator
3. Rak Piring Tarik

#kitchendesign #kitchenset #kitchensetminimalis #kitchensetjakarta #rakpiringstainless #raksendokgarpu #desaininterior #fyp`,
  },
  {
    id: '2024-12-19_17-40-14_UTC',
    date: '2024-12-19',
    category: 'kitchenset',
    kind: 'carousel',
    sources: [
      `${IG}/2024-12-19_17-40-14_UTC_1.jpg`,
      `${IG}/2024-12-19_17-40-14_UTC_2.jpg`,
      `${IG}/2024-12-19_17-40-14_UTC_3.jpg`,
      `${IG}/2024-12-19_17-40-14_UTC_4.jpg`,
      `${IG}/2024-12-19_17-40-14_UTC_5.jpg`,
    ],
    caption: `Rak sendok yang terintegrasi di kitchenset adalah solusi praktis dan estetis untuk menyimpan peralatan makan serta menjaga dapur tetap rapi. Berikut adalah beberapa hal yang perlu diketahui tentang rak sendok di kitchenset:

1. Rapi dan Terorganisir
2. Menghemat Ruang
3. Estetis
4. Mudah Dibersihkan
5. Customizable

Beberapa Jenis Bahan Rak Sendok Yang Sering Digunakan :
1. Rak Sendok Plastik
Dengan Keunggulan :
Ringan, Tahan Air, Harga Terjangkau, Mudah Dibersihkan, Anti Gores, Tersedia Dalam Berbagai Warna

Dengan Kekurangan:
Beberapa jenis plastik dapat menjadi rapuh jika terkena panas tinggi atau digunakan dalam jangka waktu lama.

2. Rak Sendok Kayu
Dengan Keunggulan :
Ramah Lingkungan, Estetika Alami, Ringan Namun Kokoh, Anti Bakteri Alami, , Tidak Menggores Alat Makan

Dengan Kekurangan:
Membutuhkan perawatan lebih, Harga seringkali lebih mahal dibandingkan rak plastik.

#kitchenset #kitchensetminimalis #drawer #raksendok #kitchensetjakarta`,
  },
  {
    id: '2024-12-19_07-44-48_UTC',
    date: '2024-12-19',
    category: 'kitchenset',
    kind: 'carousel',
    sources: [
      `${IG}/2024-12-19_07-44-48_UTC_1.jpg`,
      `${IG}/2024-12-19_07-44-48_UTC_2.jpg`,
      `${IG}/2024-12-19_07-44-48_UTC_3.jpg`,
      `${IG}/2024-12-19_07-44-48_UTC_4.jpg`,
      `${IG}/2024-12-19_07-44-48_UTC_5.jpg`,
    ],
    caption: `Inspirasi Desain - Modern Kitchenset

Client : Mr. A
Alamat : Cempaka Putih
Tema : Modern Kitchenset

Desain yang berfokus pada pemilihan warna antara terang dan gelap yang menghasilkan suasana yang tegas dan elegant di ruangan dapur anda.

#kitchendesign #kitchensetminimalis #kitchebsetjakarta #desaininterior #interiorrumah #interiorstyling`,
  },
  {
    id: '2024-12-19_05-44-14_UTC',
    date: '2024-12-19',
    category: 'kitchenset',
    kind: 'carousel',
    sources: [
      `${IG}/2024-12-19_05-44-14_UTC_1.jpg`,
      `${IG}/2024-12-19_05-44-14_UTC_2.jpg`,
      `${IG}/2024-12-19_05-44-14_UTC_3.jpg`,
      `${IG}/2024-12-19_05-44-14_UTC_4.jpg`,
      `${IG}/2024-12-19_05-44-14_UTC_5.jpg`,
      `${IG}/2024-12-19_05-44-14_UTC_6.jpg`,
    ],
    caption: `Inspirasi Desain - Kitchenset Modern Minimalis

Client : Mrs. R
Location : Serpong Grden 3,Cluster Volga

Pemilihan material yang tepat dapat membuat suasana dapur anda menjadi berkelas.

#kitchenset #kitchensetminimalis #kitchensetjakarta #interior #desaininterior #desaininteriorrumah`,
  },
]
