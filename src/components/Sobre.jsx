import { motion } from 'motion/react'

function Sobre({ onAbrir }) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-sm cursor-pointer"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.button
        type="button"
        onClick={onAbrir}
        className="relative block w-full border-0 bg-transparent p-0 text-left"
        whileHover={{ scale: 1.03, y: -5 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Abrir la carta de amor"
      >
        {/* Sombra del sobre */}
        <div className="absolute -inset-3 rounded-2xl bg-rose-500/10 blur-2xl" />

        {/* Cuerpo del sobre */}
        <div className="relative h-56 overflow-hidden rounded-xl border border-rose-200/20 bg-gradient-to-br from-rose-950 via-rose-900 to-[#3b1025] shadow-2xl">

          {/* Textura decorativa */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-rose-300/10" />

          {/* Líneas diagonales del sobre */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(145deg, transparent 49.5%, rgba(255,190,210,0.18) 50%, transparent 50.5%),
                linear-gradient(215deg, transparent 49.5%, rgba(255,190,210,0.18) 50%, transparent 50.5%)
              `,
            }}
          />

          {/* Sello */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-full border border-rose-200/40 bg-rose-400/15 shadow-lg backdrop-blur-sm"
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  '0 0 15px rgba(244,63,94,0.1)',
                  '0 0 35px rgba(244,63,94,0.3)',
                  '0 0 15px rgba(244,63,94,0.1)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-3xl text-rose-200">♥</span>
            </motion.div>

            <p className="mt-5 font-['Cormorant_Garamond'] text-2xl italic text-rose-100">
              Para ti, con amor
            </p>
          </div>
        </div>
      </motion.button>

      {/* Instrucción */}
      <motion.p
        className="mt-7 text-center text-sm tracking-wide text-rose-200/60"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        Pulsa el sobre para descubrir tu carta ♥
      </motion.p>
    </motion.div>
  )
}

export default Sobre