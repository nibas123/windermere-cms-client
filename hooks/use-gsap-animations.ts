"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function useGSAPAnimations() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Quick fade-in for cards - no delays
      gsap.fromTo(
        ".animate-card",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
          stagger: 0.05,
        },
      )

      // Instant stats animation
      gsap.fromTo(
        ".animate-stat",
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power1.out",
          stagger: 0.02,
        },
      )

      // Quick sidebar items
      gsap.fromTo(
        ".animate-sidebar-item",
        {
          opacity: 0,
          x: -15,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.2,
          ease: "power1.out",
          stagger: 0.02,
        },
      )

      // Instant header
      gsap.fromTo(
        ".animate-header",
        {
          opacity: 0,
          y: -10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power1.out",
        },
      )

      // Quick chart bars
      gsap.fromTo(
        ".animate-chart-bar",
        {
          scaleY: 0,
          transformOrigin: "bottom",
        },
        {
          scaleY: 1,
          duration: 0.4,
          ease: "power1.out",
          stagger: 0.02,
        },
      )

      // Fast progress bars
      gsap.fromTo(
        ".animate-progress",
        {
          width: "0%",
        },
        {
          width: "var(--progress-width)",
          duration: 0.5,
          ease: "power1.out",
        },
      )

      // Subtle floating - very gentle
      gsap.to(".animate-float", {
        y: -2,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      })

      // Quick scroll animations
      gsap.utils.toArray(".animate-on-scroll").forEach((element: any) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power1.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return containerRef
}

export function useHoverAnimations() {
  useEffect(() => {
    const cards = document.querySelectorAll(".hover-lift")

    cards.forEach((card) => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -3,
          duration: 0.2,
          ease: "power1.out",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        })
      }

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          duration: 0.2,
          ease: "power1.out",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        })
      }

      card.addEventListener("mouseenter", handleMouseEnter)
      card.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter)
        card.removeEventListener("mouseleave", handleMouseLeave)
      }
    })
  }, [])
}

export function useButtonAnimations() {
  useEffect(() => {
    const buttons = document.querySelectorAll(".animate-button")

    buttons.forEach((button) => {
      const handleMouseEnter = () => {
        gsap.to(button, {
          y: -1,
          duration: 0.15,
          ease: "power1.out",
        })
      }

      const handleMouseLeave = () => {
        gsap.to(button, {
          y: 0,
          duration: 0.15,
          ease: "power1.out",
        })
      }

      button.addEventListener("mouseenter", handleMouseEnter)
      button.addEventListener("mouseleave", handleMouseLeave)
    })
  }, [])
}
