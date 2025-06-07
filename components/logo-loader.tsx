"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

export function LogoLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Show loader for 3 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-900"
        >
          {/* Background animated gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-orange-50/50 dark:from-blue-950/50 dark:via-purple-950/30 dark:to-orange-950/50"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(249, 115, 22, 0.1))",
                "linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                "linear-gradient(225deg, rgba(147, 51, 234, 0.1), rgba(249, 115, 22, 0.1), rgba(59, 130, 246, 0.1))",
                "linear-gradient(315deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(249, 115, 22, 0.1))",
              ],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-400"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [0, 1, 0],
                rotate: 360,
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo container with pulse effect */}
            <motion.div
              className="relative mb-8"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {/* Outer pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{ width: "120px", height: "120px", left: "-10px", top: "-10px" }}
              />

              {/* Middle pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
                style={{ width: "100px", height: "100px" }}
              />

              {/* Logo */}
              <motion.div
                className="relative w-24 h-24 rounded-full bg-white dark:bg-gray-800 shadow-2xl flex items-center justify-center overflow-hidden"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="EdgeAnimate Tech Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </motion.div>
            </motion.div>

            {/* Animated text */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl font-bold mb-4"
                animate={{
                  background: [
                    "linear-gradient(45deg, #f97316, #ec4899)",
                    "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                    "linear-gradient(45deg, #10b981, #f59e0b)",
                    "linear-gradient(45deg, #f97316, #ec4899)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                EdgeAnimate Tech
              </motion.h1>

              {/* Loading dots */}
              <div className="flex justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>

              <motion.p
                className="text-gray-600 dark:text-gray-400 mt-4 text-lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Crafting Digital Excellence...
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
