import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Sobre from './components/Sobre.jsx'

const corazones = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  delay: (i % 6) * 0.8,
  duration: 5 + (i % 5),
  size: 12 + (i % 5) * 5,
}))

function CorazonesFlotantes() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {corazones.map((corazon) => (
        <motion.span
          key={corazon.id}
          className="absolute bottom-[-40px] select-none text-rose-400"
          style={{
            left: corazon.left,
            fontSize: corazon.size,
          }}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, 20, -15, 10, 0],
            opacity: [0, 0.65, 0.65, 0.4, 0],
            rotate: [0, 15, -15, 10, 0],
          }}
          transition={{
            duration: corazon.duration,
            delay: corazon.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  )
}

function App() {
  const [pantalla, setPantalla] = useState('bienvenida')

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#13080f] px-5 py-12 text-rose-50">

      {/* Fondo romántico */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(190, 24, 93, 0.18), transparent 45%),
            radial-gradient(ellipse at 80% 80%, rgba(127, 29, 29, 0.2), transparent 45%)
          `,
        }}
      />

      {/* Luces ambientales */}
      <motion.div
        className="pointer-events-none absolute left-[12%] top-[18%] h-40 w-40 rounded-full bg-rose-600/10 blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <motion.div
        className="pointer-events-none absolute bottom-[10%] right-[10%] h-52 w-52 rounded-full bg-pink-500/10 blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.5, 0.2, 0.5],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <CorazonesFlotantes />

      {/* Contenido de cada etapa */}
      <AnimatePresence mode="wait">
        {pantalla === 'bienvenida' && (
          <motion.section
            key="bienvenida"
            className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25, scale: 0.95 }}
            transition={{ duration: 0.7 }}
          >
            {/* Corazón principal */}
            <motion.div
              className="mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-rose-300/20 bg-rose-500/10"
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  '0 0 30px rgba(244,63,94,0.10)',
                  '0 0 65px rgba(244,63,94,0.30)',
                  '0 0 30px rgba(244,63,94,0.10)',
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <span className="text-5xl text-rose-400">♥</span>
            </motion.div>

            <p className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-rose-300/80 sm:text-sm">
              Una pequeña sorpresa para ti
            </p>

            <h1 className="mb-6 font-['Cormorant_Garamond'] text-5xl font-medium leading-tight sm:text-7xl md:text-8xl">
              Tengo algo
              <br />
              <span className="italic text-rose-400">
                especial para ti
              </span>
            </h1>

            <p className="mb-10 max-w-md text-sm leading-7 text-rose-100/60 sm:text-base">
              A veces, las palabras no son suficientes para expresar
              lo que sentimos. Por eso, hoy quiero regalarte algo
              diferente...
            </p>

            <motion.button
              type="button"
              onClick={() => setPantalla('sobre')}
              className="rounded-full border border-rose-300/30 bg-rose-500/15 px-8 py-4 text-sm font-medium tracking-wide text-rose-50 transition-colors hover:bg-rose-500/25 sm:px-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Descubre tu sorpresa
              <span className="ml-3">→</span>
            </motion.button>

            <p className="mt-8 text-xs tracking-widest text-rose-200/30">
              HECHO CON AMOR ♥
            </p>
          </motion.section>
        )}

        {pantalla === 'sobre' && (
          <motion.section
            key="sobre"
            className="relative z-10 w-full max-w-xl"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10 text-center">
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-rose-300/70">
                He preparado algo para ti
              </p>

              <h2 className="font-['Cormorant_Garamond'] text-4xl italic text-rose-200 sm:text-5xl">
                Una carta desde mi corazón
              </h2>
            </div>

            <Sobre onAbrir={() => setPantalla('carta')} />

            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setPantalla('bienvenida')}
                className="text-sm text-rose-200/50 transition-colors hover:text-rose-100"
              >
                ← Volver
              </button>
            </div>
          </motion.section>
        )}

        {pantalla === 'carta' && (
          <motion.section
            key="carta"
            className="relative z-10 mx-auto w-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-rose-200/20 bg-gradient-to-br from-[#381322] via-[#25101c] to-[#180b13] p-7 shadow-2xl shadow-rose-950/30 sm:p-12">

              {/* Adorno superior */}
              <div className="mb-8 text-center">
                <span className="text-4xl text-rose-400">♥</span>

                <p className="mt-3 text-xs uppercase tracking-[0.35em] text-rose-300/60">
                  Una carta para alguien especial
                </p>
              </div>

              {/* Contenido de la carta */}
              <div className="font-['Cormorant_Garamond'] text-lg leading-8 text-rose-50/90 sm:text-xl sm:leading-9">

                <p className="mb-6 text-2xl italic text-rose-300 sm:text-3xl">
                  Para ti, mi persona especial:
                </p>

                <p className="mb-5">
                  Quería encontrar una manera diferente de decirte
                  algo que llevo en el corazón. A veces, las palabras
                  parecen pequeñas cuando intento explicar lo que
                  significas para mí.
                </p>

                <p className="mb-5">
                  Me gusta pensar que, entre tantas personas y tantos
                  caminos posibles, la vida nos permite compartir
                  momentos que se convierten en recuerdos inolvidables.
                </p>

                <p className="mb-5">
                  Si hay algo que quiero que recuerdes, es que eres
                  alguien especial y que esta pequeña sorpresa fue
                  creada pensando en ti.
                </p>

                <p className="mb-8">
                  No necesito una fecha especial para recordarte
                  cuánto significas para mí. Hoy simplemente quería
                  regalarte un pedacito de mi corazón.
                </p>

                <p className="text-right text-2xl italic text-rose-300 sm:text-3xl">
                  Con todo mi amor ♥
                </p>
              </div>

              {/* Decoración inferior */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="h-px flex-1 bg-rose-200/20" />
                <span className="text-rose-400">♥</span>
                <div className="h-px flex-1 bg-rose-200/20" />
              </div>
            </div>

            {/* Botones inferiores */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">

              <motion.button
                type="button"
                onClick={() => setPantalla('declaracion')}
                className="rounded-full bg-rose-500 px-8 py-4 text-sm font-medium text-white shadow-lg shadow-rose-950/30 transition-colors hover:bg-rose-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                Tengo algo más que decirte ♥
              </motion.button>

              <button
                type="button"
                onClick={() => setPantalla('sobre')}
                className="rounded-full border border-rose-200/20 px-6 py-3 text-sm text-rose-200/70 transition-colors hover:text-rose-100"
              >
                Volver al sobre
              </button>
            </div>
          </motion.section>
        )}

        {pantalla === 'declaracion' && (
          <motion.section
            key="declaracion"
            className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="mb-8 text-7xl text-rose-400 sm:text-8xl"
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ♥
            </motion.span>

            <p className="mb-5 text-xs uppercase tracking-[0.4em] text-rose-300/70">
              Y nunca quiero que lo olvides
            </p>

            <h2 className="mb-8 font-['Cormorant_Garamond'] text-7xl font-semibold italic text-rose-300 sm:text-9xl">
              Te amo
            </h2>

            <p className="mb-10 max-w-lg text-base leading-8 text-rose-100/70 sm:text-lg">
              Si pudiera regalarte algo en este momento,
              te regalaría la oportunidad de verte a través
              de mis ojos, para que entendieras lo especial
              que eres para mí.
            </p>

            <motion.div
              className="mb-10 flex gap-3 text-2xl text-rose-400"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span>♥</span>
              <span>♥</span>
              <span>♥</span>
            </motion.div>

            <button
              type="button"
              onClick={() => setPantalla('bienvenida')}
              className="rounded-full border border-rose-300/30 px-7 py-3 text-sm text-rose-200 transition-colors hover:bg-rose-500/10"
            >
              Volver a vivir la sorpresa ↺
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Firma decorativa */}
      <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-10 text-center">
        <p className="text-[10px] tracking-[0.3em] text-rose-200/20">
          UNA HISTORIA HECHA PARA TI
        </p>
      </div>
    </main>
  )
}

export default App