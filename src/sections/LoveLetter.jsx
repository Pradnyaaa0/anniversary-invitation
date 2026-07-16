import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

// Paragraphs dari surat pribadi, diformat dengan rapi
const letterContent = [
  {
    type: 'heading',
    text: 'HAPPY ANNIVERSARY BEBEEE🤍🤍'
  },
  {
    type: 'body',
    text: "ga nyangkaa jugaa yaa kitaa uda sampee di titik inii🥹 cepett banget rasanyaa waktuu berjalann, padahal kitaa uda saling kenal dari kecill, dari masii TK🤭 siapa sangkaa yaa, setelah sekian lama akhirnya kita bisaa dipertemukan lagi dengan cara yang berbeda, mulai deket, mulai cerita banyak hall, ehh sekarang uda jalan bareng sejauh inii🤍"
  },
  {
    type: 'body',
    text: 'makasiii yaa bebee uda selalu ada buat akuu, uda jadi tempat aku cerita, ngeluh, ketawa, dan jadi salah satu alasan aku semangat jalanin hari harii. maaciii jugaa uda sabar hadapin sifat aku yang kadang nyebelin, suka ngambek, suka overthinking, sama segala kurangnya akuu🥹'
  },
  {
    type: 'body',
    text: 'semogaa hubungan kitaa selalu diberi kebahagiaan, kesehatan, kelancaran, dan selalu dikelilingi hal hal baik yaa bebee. semogaa kitaa bisa terus tumbuh bareng, belajar bareng, perbaiki diri bareng, dan saling dukung satu sama lain buat jadi versi terbaik dari diri kitaa. Astungkaraaa🥰'
  },
  {
    type: 'body',
    text: 'bebee sekarang kitaa uda ngelewatin banyak hall bareng, ada senengnyaa, ada sedihnyaa, ada berantemnyaa juga hihi😆 tapi aku bersyukur banget karena kita selalu berusaha buat balik lagi, buat saling ngerti, dan buat tetap bertahan sampai hari inii🤍'
  },
  {
    type: 'body',
    text: 'semangatt terus yaa bebee buat kejar semua mimpi, cita cita, dan keinginan kamuu. aku bakal selalu support kamu sebisaku, selalu ada buat dengerin cerita kamuu, dan selalu ada di samping kamuu. jangan pernah takut sama masa depann, karena kitaa jalaninnya bareng bareng🤟🔥'
  },
  {
    type: 'body',
    text: "let's grow together, let's heal together, let's learn together, let's achieve our dreams together, and let's stay together as long as we can, because you are one of the best things that ever happened in my life🤍🌈⭐️"
  },
  {
    type: 'body',
    text: 'maaff yaa kalo selama inii aku masii banyak kurangnyaa, masii suka bikin kamu kesel, masii suka salah, dan belum bisa jadi yang sempurna buat kamuu. tapi percayaa, aku bakal terus berusaha jadi lebih baik lagii demi hubungan kitaa🥹🤍'
  },
  {
    type: 'body',
    text: 'jangan pernah berubah yaa bebee, tetep jadi diri kamuu yang aku kenall, yang selalu aku sayangg, yang selalu bikin aku nyaman, dan yang selalu berhasil bikin hari hari aku jadi lebih berwarna😾🤍'
  },
  {
    type: 'closing',
    text: 'sekali lagii happy anniversary yaa sayangnyaa akuuuu🥳🥳🤍 terima kasih karena masih memilih aku sampai hari inii. semogaa ini bukan anniversary terakhir yang kita rayakan, tapi jadi salah satu dari banyak anniversary yang bakal kita rayakan bersama nantinyaa🥹🤍'
  },
  {
    type: 'signature',
    text: 'I LOVEEE UUU SOOO MUCHHHH BEBEEE🤍🌈⭐️🫶'
  }
];

// Animasi stagger untuk efek tinta muncul perlahan
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.6 }
  }
};

const lineVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(2px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function LoveLetter() {
  return (
    <section id="letter" className="relative py-24 z-10 px-4 max-w-4xl mx-auto overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-rose-pink/15 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-dancing text-2xl text-rose-pink font-semibold">Dari Hatiku Untukmu</span>
          <h2 className="font-vibes text-5xl md:text-6xl text-rose-pink font-bold mt-2">
            Surat Cinta Untuk Bebee
          </h2>
          <div className="w-16 h-0.5 bg-rose-pink/40 mx-auto mt-4 rounded-full" />
        </motion.div>
      </div>

      {/* Parchment Letter Sheet */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -0.5 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ type: 'spring', damping: 22, stiffness: 80 }}
        className="bg-[#fcf9f2] border-2 border-[#e8dfc7] px-8 py-12 md:px-14 md:py-14 rounded-xl shadow-2xl relative max-w-2xl mx-auto"
        style={{
          boxShadow: '0 20px 50px rgba(251, 111, 146, 0.10), 0 4px 16px rgba(0,0,0,0.06)'
        }}
      >
        {/* Dekoratif sudut kertas */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-rose-pink/30 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-rose-pink/30 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-rose-pink/30 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-rose-pink/30 rounded-br-lg" />

        {/* Heart sticker di atas surat */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-[#e8dfc7]">
          <Heart className="w-6 h-6 text-rose-pink fill-rose-pink animate-pulse" />
        </div>

        {/* Isi surat dengan animasi stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-5 text-gray-800"
        >
          {letterContent.map((item, i) => {
            if (item.type === 'heading') {
              return (
                <motion.p
                  key={i}
                  variants={lineVariants}
                  className="font-dancing text-2xl md:text-3xl font-extrabold text-rose-pink leading-tight"
                >
                  {item.text}
                </motion.p>
              );
            }
            if (item.type === 'body') {
              return (
                <motion.p
                  key={i}
                  variants={lineVariants}
                  className="font-dancing text-lg md:text-xl leading-relaxed text-gray-700 font-medium tracking-wide text-justify"
                >
                  {item.text}
                </motion.p>
              );
            }
            if (item.type === 'closing') {
              return (
                <motion.p
                  key={i}
                  variants={lineVariants}
                  className="font-dancing text-xl md:text-2xl font-bold text-gray-800 pt-2"
                >
                  {item.text}
                </motion.p>
              );
            }
            if (item.type === 'signature') {
              return (
                <motion.p
                  key={i}
                  variants={lineVariants}
                  className="font-dancing text-4xl md:text-xl text-rose-pink font-bold mt-4 text-center rotate-[-2deg] mr-2"
                >
                  {item.text}
                </motion.p>
              );
            }
            return null;
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
