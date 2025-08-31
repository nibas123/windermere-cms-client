"use client"

import type React from "react"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Set default GSAP settings for instant, smooth animations
    gsap.defaults({
      duration: 0.4,
      ease: "power1.out",
    })

    // Global animation settings
    gsap.set("*", { willChange: "auto" })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return <>{children}</>
}
