import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Users, Award, Star, ArrowRight, Play, CheckCircle, Zap, Shield, Target, Crown, Sparkles, MousePointer, Calendar, Phone, Mail, MapPin, ChevronDown, TrendingUp, Heart, Flame, BarChart3, Brain, Rocket, Globe, Medal, Activity } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { TextPlugin } from 'gsap/TextPlugin'
import Hero from '../components/Home/Hero'
import Stats from '../components/Home/Stats'
import Features from '../components/Home/Features'
import Newsletter from '../components/Home/Newsletter'
import AwardWinningAnimations from '../components/Home/AwardWinningAnimations'
import MicroInteractions from '../components/Home/MicroInteractions'
import ChampionSuccessStories from '../components/Home/ChampionSuccessStories'
import SectionSeparator from '../components/Home/SectionSeparator'
import { motion } from 'framer-motion'


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, TextPlugin)

const Home = () => {
  const ctaRef = useRef(null)
  const testimonialRef = useRef(null)
  const interactiveRef = useRef(null)
  const magicCursorRef = useRef(null)
  const heroSectionRef = useRef(null)
  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  const specializationRef = useRef(null)
  const programsPreviewRef = useRef(null)
  const coachesRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isVisible, setIsVisible] = useState({})
  const [testimonialAnimated, setTestimonialAnimated] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    // Smooth scroll tracking for parallax effects
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Enhanced Mouse Tracking with Magic Cursor
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Update magic cursor position with smooth easing
      if (magicCursorRef.current) {
        gsap.to(magicCursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: "power2.out"
        })
      }
    }

    // Interactive Elements Detection with enhanced effects
    const interactiveElements = document.querySelectorAll('.magic-hover')
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        setCursorVariant('hover')
        gsap.to(magicCursorRef.current, {
          scale: 2.5,
          backgroundColor: 'rgba(79, 195, 247, 0.4)',
          borderColor: 'rgba(255, 214, 0, 0.6)',
          duration: 0.3,
          ease: "back.out(1.7)"
        })
      })
      
      element.addEventListener('mouseleave', () => {
        setCursorVariant('default')
        gsap.to(magicCursorRef.current, {
          scale: 1,
          backgroundColor: 'rgba(0, 43, 91, 0.2)',
          borderColor: 'transparent',
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Enhanced CTA section animation with advanced effects
    const ctaTl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        onEnter: () => setIsVisible(prev => ({ ...prev, cta: true })),
        onLeave: () => setIsVisible(prev => ({ ...prev, cta: false }))
      }
    })

    // ADVANCED PRE-LOADING: Set up animations before scroll events
    const preLoadAnimations = () => {
      // Pre-cache all animation elements
      const textElements = document.querySelectorAll('.animate-text')
      const cardElements = document.querySelectorAll('.success-story-card')
      
      // Immediately prepare elements for animation only if they exist
      if (textElements.length > 0) {
        textElements.forEach(el => {
          gsap.set(el, {
            opacity: 0,
            y: 3,
            force3D: true,
            transformOrigin: 'center center'
          })
        })
      }
      
      if (cardElements.length > 0) {
        cardElements.forEach(el => {
          gsap.set(el, {
            opacity: 0,
            y: 5,
            scale: 0.999,
            force3D: true,
            transformOrigin: 'center center'
          })
        })
      }
    }

    // Run pre-loading immediately
    preLoadAnimations()

    // PERFORMANCE BOOST: Custom Intersection Observer for ultra-fast detection
    const observerOptions = {
      root: null,
      rootMargin: '50px 0px 0px 0px', // Trigger even earlier
      threshold: 0.01
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('success-story-section')) {
          // Ultra-fast simultaneous animation with perfect sync
          const textElements = entry.target.querySelectorAll('.animate-text')
          const cardElements = entry.target.querySelectorAll('.success-story-card')
          
          // Only animate if elements exist
          if (textElements.length > 0 && cardElements.length > 0) {
            // Create a single timeline for perfect synchronization
            const syncTl = gsap.timeline()
            
            syncTl
              .to(textElements, {
                opacity: 1,
                y: 0,
                duration: 0.12,
                stagger: 0.001,
                ease: "power1.out"
              }, 0) // Start at time 0
              .to(cardElements, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.12,
                stagger: 0.001,
                ease: "power1.out"
              }, 0) // Start at exact same time
          }
        }
      })
    }, observerOptions)

    // Observe success stories section
    const successSection = document.querySelector('.success-story-section')
    if (successSection) {
      observer.observe(successSection)
    }

    // ZERO-LAG SYSTEM: Instant pre-setup with aggressive optimization
    if (typeof window !== 'undefined') {
      // Force immediate visibility for all elements with hardware acceleration
      const elements = document.querySelectorAll('.animate-text, .success-story-card, .testimonial-float, .cta-stagger')
      elements.forEach(el => {
        el.style.visibility = 'visible'
        el.style.willChange = 'transform, opacity'
        el.style.transform = 'translateZ(0)' // Force GPU acceleration
        el.style.backfaceVisibility = 'hidden'
      })
    }

    // Success Stories section removed - now handled by separate component

    // ULTRA-FAST: Testimonials with instant mounting - REDUCED LAG  
    const testimonialTl = gsap.timeline({
      scrollTrigger: {
        trigger: testimonialRef.current,
        start: "top 99%", // Even earlier trigger
        toggleActions: "play none none reverse", 
        refreshPriority: 25,
        once: false,
        fastScrollEnd: true // Prevent lag on fast scroll
      }
    })

    // Pre-setup for zero-delay mounting with GPU acceleration
    if (testimonialRef.current) {
      gsap.set([testimonialRef.current], { 
        visibility: 'visible',
        force3D: true,
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden'
      })
    }

    // Success Stories animations removed - handled by separate component

    // TESTIMONIALS: Ultra-fast appearance
    if (testimonialRef.current) {
      testimonialTl.fromTo(testimonialRef.current, {
        opacity: 0,
        y: 8
      }, {
        opacity: 1,
        y: 0,
        duration: 0.25, // Faster duration
        ease: "power1.out"
      })
    }

    // PERFECT SYNCHRONIZATION: Text and cards appear simultaneously with ZERO lag  
    const textElements = document.querySelectorAll('.success-story-section .animate-text')
    const cardElements = document.querySelectorAll('.success-story-card')
    
    if (textElements.length > 0 && cardElements.length > 0) {
      gsap.set(textElements, { 
        visibility: 'visible',
        opacity: 0,
        force3D: true,
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden'
      })
      
      gsap.set(cardElements, { 
        visibility: 'visible',
        opacity: 0,
        force3D: true,
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden'
      })
    }

    // INSTANT SYNC: Text and cards appear at exactly the same time - OPTIMIZED
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.success-story-section',
        start: "top 99%", // Even earlier
        toggleActions: "play none none reverse",
        refreshPriority: 30, // Highest priority
        fastScrollEnd: true
      }
    })

    masterTl
      .fromTo('.success-story-section .animate-text', {
        opacity: 0,
        y: 3
      }, {
        opacity: 1,
        y: 0,
        duration: 0.2, // Ultra-fast
        stagger: 0.001, // Microsecond stagger
        ease: "power1.out"
      }, 0) // Start immediately
      .fromTo('.success-story-card', {
        opacity: 0,
        y: 5,
        scale: 0.999
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.2, // Ultra-fast
        stagger: 0.001, // Same microsecond stagger
        ease: "power1.out"
      }, 0) // Start at EXACT same time as text

    // PREMIUM: Advanced performance-optimized parallax animations
    gsap.utils.toArray('.parallax-element').forEach((element, index) => {
      gsap.to(element, {
        yPercent: -40 - (index * 8),
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5, // Smoother scrub for better performance
          refreshPriority: -1 // Lower priority for performance
        }
      })
    })

    // ENHANCED: Cricket Ball Physics Animation with realistic motion
    const ballMotionPath = "M50,320 Q180,80 320,320 Q480,580 620,320 Q760,80 900,320"
    
    gsap.utils.toArray('.cricket-ball').forEach((ball, index) => {
      gsap.to(ball, {
        motionPath: {
          path: ballMotionPath,
          autoRotate: true,
          alignOrigin: [0.5, 0.5]
        },
        duration: 16 + index * 2.5, // Faster, more dynamic movement
        repeat: -1,
        ease: "none",
        delay: index * 3
      })
    })

    // ADVANCED: Dynamic text reveal with word-based animation
    gsap.utils.toArray('.premium-text-reveal').forEach(text => {
      const words = text.textContent.split(' ')
      text.innerHTML = words.map(word => 
        `<span class="word" style="display: inline-block; transform: translateY(100px) rotateX(90deg); opacity: 0; margin-right: 0.25em;">${word}</span>`
      ).join('')
      
      gsap.to(text.querySelectorAll('.word'), {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      })
    })

    // Testimonial cards floating animation with physics
    gsap.utils.toArray('.testimonial-float').forEach((element, index) => {
      const floatTl = gsap.timeline({ repeat: -1, yoyo: true })
      
      floatTl.to(element, {
        y: -20 - (index * 4),
        rotation: 3 + (index * 1.5),
        scale: 1.03,
        duration: 5 + index * 1.2,
        ease: "sine.inOut"
      })
    })

    // Enhanced Interactive Section Animation
    const interactiveTl = gsap.timeline({
      scrollTrigger: {
        trigger: interactiveRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        onEnter: () => setIsVisible(prev => ({ ...prev, interactive: true })),
        onLeave: () => setIsVisible(prev => ({ ...prev, interactive: false }))
      }
    })

    interactiveTl.fromTo(interactiveRef.current,
      { 
        opacity: 0, 
        y: 120,
        scale: 0.95,
        rotationX: 10
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "power3.out"
      }
    )

    // Enhanced Parallax and Floating Animations
    gsap.utils.toArray('.parallax-element').forEach((element, index) => {
      gsap.to(element, {
        yPercent: -30 - (index * 10),
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8
        }
      })
    })

    // Cricket Ball Bounce Animation with improved physics
    gsap.utils.toArray('.cricket-ball').forEach((ball, index) => {
      const bounceTl = gsap.timeline({ repeat: -1 })
      bounceTl.to(ball, {
        y: -25,
        rotation: 180,
        duration: 1,
        ease: "power2.out"
      }).to(ball, {
        y: 0,
        rotation: 360,
        duration: 1,
        ease: "bounce.out"
      })
      
      bounceTl.delay(index * 0.5)
    })

    // Advanced Text Animation on Scroll with character reveals
    gsap.utils.toArray('.animate-text').forEach(text => {
      const chars = text.textContent.split('')
      text.innerHTML = chars.map(char => 
        char === ' ' ? ' ' : `<span class="char" style="display: inline-block; transform: translateY(120px) rotateX(90deg); opacity: 0;">${char}</span>`
      ).join('')
      
      gsap.to(text.querySelectorAll('.char'), {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 0.06,
        stagger: 0.03,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
    })

    ctaTl.fromTo(ctaRef.current,
      { 
        opacity: 0, 
        y: 120,
        scale: 0.9,
        rotationX: 15
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.4,
        ease: "power3.out"
      }
    )

    // Advanced staggered animations for CTA elements
    gsap.fromTo('.cta-stagger', {
      opacity: 0,
      y: 80,
      scale: 0.8,
      rotationY: 10
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationY: 0,
      duration: 1,
      stagger: 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    })

    // Enhanced floating animations with physics
    gsap.utils.toArray('.cta-float').forEach((element, index) => {
      const floatTl = gsap.timeline({ repeat: -1, yoyo: true })
      
      floatTl.to(element, {
        y: -25 - (index * 6),
        rotation: 6 + (index * 2),
        scale: 1.06,
        duration: 4 + index * 0.8,
        ease: "sine.inOut"
      })
    })

    // Interactive Parallax Effects with scroll-based transforms
    gsap.utils.toArray('.parallax-element').forEach((element) => {
      gsap.to(element, {
        yPercent: -60,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 2
        }
      })
    })

    // Advanced Morphing Background
    const morphingBg = gsap.timeline({ repeat: -1 })
    morphingBg.to('.morphing-gradient', {
      backgroundPosition: '200% 200%',
      duration: 25,
      ease: "none"
    })

    // Cricket Ball Physics Animation with motion paths
    const ballPath = "M50,320 Q180,80 320,320 Q480,580 620,320 Q760,80 900,320"
    
    gsap.utils.toArray('.cricket-ball').forEach((ball, index) => {
      gsap.to(ball, {
        motionPath: {
          path: ballPath,
          autoRotate: true,
          alignOrigin: [0.5, 0.5]
        },
        duration: 18 + index * 3,
        repeat: -1,
        ease: "none",
        delay: index * 4
      })
    })

    // Enhanced Magnetic Effect for Interactive Elements
    const magneticElements = document.querySelectorAll('.magnetic')
    
    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = (e.clientX - centerX) * 0.4
        const deltaY = (e.clientY - centerY) * 0.4
        
        gsap.to(element, {
          x: deltaX,
          y: deltaY,
          rotation: deltaX * 0.1,
          duration: 0.4,
          ease: "power2.out"
        })
      })
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        })
      })
    })

    // Micro-interactions for buttons and cards
    gsap.utils.toArray('.micro-interact').forEach(element => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.05,
          y: -3,
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          duration: 0.3,
          ease: "power2.out"
        })
      })
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          y: 0,
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })

    // ULTIMATE: Performance-optimized smooth scroll and enhanced interactions
    const setupAdvancedInteractions = () => {
      // Smooth scroll enhancement for all navigation
      const smoothScrollLinks = document.querySelectorAll('a[href^="#"]')
      smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          const target = document.querySelector(link.getAttribute('href'))
          if (target) {
            gsap.to(window, {
              duration: 1.5,
              scrollTo: { y: target, offsetY: 100 },
              ease: "power3.inOut"
            })
          }
        })
      })

      // PREMIUM: Advanced cursor trail system
      const cursorTrail = []
      const trailLength = 8
      
      for (let i = 0; i < trailLength; i++) {
        const trail = document.createElement('div')
        trail.className = 'fixed w-2 h-2 bg-[#4FC3F7]/30 rounded-full pointer-events-none z-[9998] transition-all duration-300'
        trail.style.transform = 'scale(0)'
        document.body.appendChild(trail)
        cursorTrail.push(trail)
      }

      let trailIndex = 0
      const updateCursorTrail = (e) => {
        const trail = cursorTrail[trailIndex]
        if (trail) {
          gsap.set(trail, {
            x: e.clientX - 4,
            y: e.clientY - 4,
            scale: 1 - (trailIndex * 0.1),
            opacity: 1 - (trailIndex * 0.15)
          })
          
          gsap.to(trail, {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
          })
        }
        trailIndex = (trailIndex + 1) % trailLength
      }

      document.addEventListener('mousemove', updateCursorTrail)

      // Advanced intersection observer for performance
      const observerOptions = {
        root: null,
        rootMargin: '20%',
        threshold: [0.1, 0.5, 0.9]
      }

      const performanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-viewport')
            // Trigger specific animations based on element type
            if (entry.target.classList.contains('success-story-card')) {
              gsap.to(entry.target, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out",
                yoyo: true,
                repeat: 1
              })
            }
          } else {
            entry.target.classList.remove('in-viewport')
          }
        })
      }, observerOptions)

      // Observe all interactive elements
      document.querySelectorAll('.success-story-card, .testimonial-float, .interactive-card').forEach(el => {
        performanceObserver.observe(el)
      })

      return () => {
        document.removeEventListener('mousemove', updateCursorTrail)
        cursorTrail.forEach(trail => document.body.removeChild(trail))
        performanceObserver.disconnect()
      }
    }

    // Initialize advanced interactions
    const cleanupAdvanced = setupAdvancedInteractions()
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', () => {})
        element.removeEventListener('mouseleave', () => {})
      })
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      if (cleanupAdvanced) cleanupAdvanced()
      observer.disconnect() // Cleanup intersection observer
    }
  }, [])

  // Unified data with consistent warm color palette
  const achievements = [
    { 
      number: '500+', 
      label: 'Students Trained', 
      icon: Users,
      description: 'Champions developed with personalized training',
      color: 'text-amber-600',
      bgColor: 'from-amber-50 to-orange-100'
    },
    { 
      number: '15+', 
      label: 'Years Experience', 
      icon: Trophy,
      description: 'Decades of proven coaching excellence',
      color: 'text-orange-600',
      bgColor: 'from-orange-50 to-red-100'
    },
    { 
      number: '50+', 
      label: 'State Players', 
      icon: Award,
      description: 'State and national level representatives',
      color: 'text-red-600',
      bgColor: 'from-red-50 to-rose-100'
    },
    { 
      number: '98%', 
      label: 'Success Rate', 
      icon: Star,
      description: 'Guaranteed skill improvement methodology',
      color: 'text-rose-600',
      bgColor: 'from-rose-50 to-pink-100'
    },
  ]

  const features = [
    {
      icon: Trophy,
      title: 'BCCI Certified Training',
      description: 'Professional coaching with certified trainers following international standards and modern methodologies.',
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
      iconColor: 'text-amber-600'
    },
    {
      icon: Users,
      title: 'All Age Groups',
      description: 'Specialized programs for juniors, youth, seniors, and women cricketers with tailored approaches.',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      iconColor: 'text-orange-600'
    },
    {
      icon: Award,
      title: 'State-Level Success',
      description: 'Over 50 students have represented at state and national levels with our proven training methods.',
      gradient: 'from-red-500 to-rose-500',
      bgGradient: 'from-red-50 to-rose-50',
      iconColor: 'text-red-600'
    },
    {
      icon: Star,
      title: 'Modern Facilities',
      description: 'World-class infrastructure with latest training equipment and cutting-edge technology systems.',
      gradient: 'from-rose-500 to-pink-500',
      bgGradient: 'from-rose-50 to-pink-50',
      iconColor: 'text-rose-600'
    }
  ]

    return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Award-Winning Animation System */}
      <AwardWinningAnimations />

      {/* Enhanced Magic Cursor with warm theme */}
      <div
        ref={magicCursorRef}
        className="fixed w-8 h-8 bg-amber-600/20 rounded-full pointer-events-none z-[9999] mix-blend-multiply magic-cursor border-2 border-transparent backdrop-blur-sm"
        style={{ 
          left: mousePosition.x - 16, 
          top: mousePosition.y - 16,
          transition: 'background-color 0.3s ease, border-color 0.3s ease, transform 0.1s ease'
        }}
      />

      {/* Unified Background System */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-white via-amber-50/5 to-orange-50/10"></div>

      {/* Award-Winning Animation System */}
      <AwardWinningAnimations />

      {/* Hero Section */}
      <div className="hero-section">
        <Hero />
      </div>

      {/* Section Separator */}
      <SectionSeparator variant="wave" />

      {/* Stats Section */}
      <div className="stats-section">
        <Stats achievements={achievements} />
      </div>

      {/* Features Section - seamless integration */}
      <div className="features-section">
        <Features features={features} />
      </div>

      {/* Mobile-Optimized "Why Choose DCA" Section */}
      <section ref={interactiveRef} className="why-choose-section py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-amber-50/30 via-white to-orange-50/20">
        {/* Consistent Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.02)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 opacity-[0.015] sm:opacity-[0.02] h-full w-full bg-[linear-gradient(to_right,#F59E0B_1px,transparent_1px),linear-gradient(to_bottom,#F59E0B_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Mobile-Optimized Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center px-4 sm:px-5 md:px-6 py-2 sm:py-3 bg-white/95 backdrop-blur-xl border border-amber-200/50 rounded-xl sm:rounded-2xl text-gray-800 font-semibold mb-6 sm:mb-8 shadow-lg shadow-amber-500/10 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-500 group">
              <Crown className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-amber-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              <span className="text-xs sm:text-sm tracking-wide font-bold">WHY CHOOSE DCA</span>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full ml-2 sm:ml-3 animate-pulse"></div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-4 sm:mb-5 md:mb-6 leading-tight">
              Excellence Through
              <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent font-black mt-1 sm:mt-2">
                Innovation
              </span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl sm:max-w-4xl mx-auto leading-relaxed font-medium px-4 sm:px-0">
              Experience next-generation cricket training with our cutting-edge methodologies and proven success rates.
            </p>
          </div>

          {/* Mobile-Optimized Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 mb-12 sm:mb-14 md:mb-16">
            {[
              {
                icon: BarChart3,
                title: "AI-Powered Analytics",
                description: "Revolutionary performance tracking with machine learning insights and real-time biomechanical analysis for precision improvement.",
                iconColor: "text-amber-600",
                bgGradient: "from-amber-50 to-orange-100",
                hoverColor: "hover:border-amber-500/20"
              },
              {
                icon: Target,
                title: "Precision Training",
                description: "Millimeter-perfect training drills with haptic feedback technology and personalized skill development programs.",
                iconColor: "text-orange-600",
                bgGradient: "from-orange-50 to-red-100",
                hoverColor: "hover:border-orange-500/20"
              },
              {
                icon: Medal,
                title: "Elite Coaching",
                description: "One-on-one guidance from international champions and former national team players with proven methodologies.",
                iconColor: "text-red-600",
                bgGradient: "from-red-50 to-rose-100",
                hoverColor: "hover:border-red-500/20"
              },
              {
                icon: Rocket,
                title: "Advanced Technology",
                description: "Cutting-edge biomechanics lab with motion capture technology for technique optimization and analysis.",
                iconColor: "text-rose-600",
                bgGradient: "from-rose-50 to-pink-100",
                hoverColor: "hover:border-rose-500/20"
              },
              {
                icon: Trophy,
                title: "Match Preparation",
                description: "Advanced match simulation with VR technology and psychological conditioning programs for competitive edge.",
                iconColor: "text-pink-600",
                bgGradient: "from-pink-50 to-pink-100",
                hoverColor: "hover:border-pink-500/20"
              },
              {
                icon: Activity,
                title: "Success Methodology",
                description: "Data-driven methodology with 98% success rate and guaranteed skill advancement tracking systems.",
                iconColor: "text-amber-700",
                bgGradient: "from-amber-100 to-orange-100",
                hoverColor: "hover:border-amber-500/20"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`group bg-white/95 backdrop-blur-xl border border-amber-200/30 rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg shadow-amber-500/10 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 ${feature.hoverColor}`}
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${feature.bgGradient} rounded-xl sm:rounded-2xl mb-4 sm:mb-5 md:mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <feature.icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${feature.iconColor} group-hover:rotate-6 transition-transform duration-300`} />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Unified Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.bgGradient} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}></div>
              </div>
            ))}
          </div>

          {/* Mobile-Optimized CTA Section */}
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-2 bg-white/95 backdrop-blur-xl border border-amber-200/50 rounded-xl sm:rounded-2xl shadow-lg shadow-amber-500/10">
              <Link
                to="/programs"
                className="group relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden w-full sm:w-auto"
              >
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-black text-sm sm:text-base">START YOUR JOURNEY</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              
              <a
                href="#contact"
                className="group relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-amber-300 text-amber-800 font-bold rounded-lg sm:rounded-xl hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-black text-sm sm:text-base">BOOK TRIAL</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <SectionSeparator variant="wave" />

      {/* Mobile-Optimized CTA Section */}
      <section ref={ctaRef} className="cta-section py-20 sm:py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-orange-50/30 via-white to-red-50/20">
        {/* Mobile-Optimized Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,88,12,0.02)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 opacity-[0.015] sm:opacity-[0.02] h-full w-full bg-[linear-gradient(to_right,#EA580C_1px,transparent_1px),linear-gradient(to_bottom,#EA580C_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem]"></div>
          {/* Mobile-optimized floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-br from-amber-100 to-orange-200 rounded-full opacity-5 sm:opacity-10"></div>
            <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-24 sm:w-40 h-24 sm:h-40 bg-gradient-to-br from-orange-100 to-red-200 rounded-full opacity-5 sm:opacity-10"></div>
            <div className="absolute top-1/2 left-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-red-100 to-rose-200 rounded-full opacity-5 sm:opacity-10"></div>
            <div className="absolute top-1/3 right-1/3 w-12 sm:w-20 h-12 sm:h-20 bg-gradient-to-br from-rose-100 to-pink-200 rounded-full opacity-5 sm:opacity-10"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="max-w-4xl sm:max-w-5xl mx-auto">
            {/* Mobile-Optimized Heading Section */}
            <div className="mb-8 sm:mb-10 md:mb-12">
              <div className="inline-flex items-center px-4 sm:px-5 md:px-6 py-2 sm:py-3 bg-white/95 backdrop-blur-xl border border-orange-200/50 rounded-xl sm:rounded-2xl text-gray-800 font-semibold mb-6 sm:mb-8 shadow-lg shadow-orange-500/10 hover:shadow-xl hover:shadow-red-500/20 transition-all duration-500 group">
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-600 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                <span className="font-bold text-sm sm:text-base">Ready to Begin?</span>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full ml-2 animate-pulse"></div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-6 sm:mb-8 leading-tight">
                Ready to Start Your
                <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent font-black mt-1 sm:mt-2">
                  Cricket Journey?
                </span>
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed font-medium max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-0">
                Join India's premier cricket academy and train with the best coaches in West Bengal.
                <span className="block font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mt-2 sm:mt-3 text-lg sm:text-xl md:text-2xl">
                  🏏 Book your free trial session today!
                </span>
              </p>
            </div>

            {/* Mobile-Optimized Action Buttons */}
            <div className="flex flex-col gap-4 sm:gap-6 justify-center mb-12 sm:mb-14 md:mb-16 px-4 sm:px-0">
              <Link
                to="/programs"
                className="cta-button group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-500 hover:scale-105 transform overflow-hidden w-full sm:w-auto"
              >
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-black">Explore Programs</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              
              <a
                href="#contact"
                className="cta-button group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 bg-white/95 backdrop-blur-xl border border-orange-200/50 text-orange-800 font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl hover:bg-orange-50 transition-all duration-500 shadow-lg shadow-orange-500/10 hover:shadow-xl hover:shadow-red-500/20 transform hover:scale-105 w-full sm:w-auto"
              >
                <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                <span className="font-black">Book Free Trial</span>
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
            
            {/* Mobile-Optimized Activity Indicator */}
            <div className="inline-flex items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-white/95 backdrop-blur-xl border border-orange-200/50 rounded-xl sm:rounded-2xl text-gray-800 mb-8 sm:mb-10 md:mb-12 hover:bg-orange-50/95 transition-all duration-500 shadow-lg shadow-orange-500/10 max-w-full mx-auto">
              <div className="relative mr-3 sm:mr-4">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-500 flex-shrink-0" />
              <span className="font-bold text-sm sm:text-base md:text-lg text-center">243 active students training right now</span>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 text-amber-600 animate-bounce flex-shrink-0" />
            </div>

            {/* Mobile-Optimized Success Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto px-2 sm:px-0">
              {[
                { number: "98%", label: "Success Rate", icon: Target, iconColor: "text-amber-600", bgGradient: "from-amber-50 to-orange-100" },
                { number: "500+", label: "Champions Trained", icon: Trophy, iconColor: "text-orange-600", bgGradient: "from-orange-50 to-red-100" },
                { number: "50+", label: "State Players", icon: Award, iconColor: "text-red-600", bgGradient: "from-red-50 to-rose-100" },
                { number: "15+", label: "Years Excellence", icon: Star, iconColor: "text-rose-600", bgGradient: "from-rose-50 to-pink-100" }
              ].map((metric, index) => (
                <div 
                  key={index} 
                  className="group bg-white/95 backdrop-blur-xl border border-orange-200/30 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 hover:bg-orange-50/95 transition-all duration-500 shadow-lg shadow-orange-500/10 hover:shadow-xl hover:shadow-red-500/20 transform hover:-translate-y-1 hover:scale-105"
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br ${metric.bgGradient} rounded-lg sm:rounded-xl md:rounded-2xl mb-2 sm:mb-3 md:mb-4 mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <metric.icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${metric.iconColor} group-hover:rotate-6 transition-transform duration-300`} />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-1 sm:mb-2 group-hover:scale-105 transition-transform duration-300">
                    {metric.number}
                  </div>
                  <div className="text-gray-600 font-semibold text-xs sm:text-sm lg:text-base">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Consistent particles with warm colors */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full opacity-10 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </section>

      {/* Section Separator */}
      <SectionSeparator variant="wave" />
      
      {/* Champion Success Stories Component */}
      <ChampionSuccessStories />

      {/* Section Separator */}
      <SectionSeparator variant="wave" />

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <Newsletter />
      </div>

      {/* Social Links Bar - Added for hackathon polish */}
      <footer className="w-full py-8 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 border-t border-orange-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-lg font-bold text-gray-800 mb-2 sm:mb-0">Connect with us:</div>
          <div className="flex gap-5">
            {[
              { href: 'https://instagram.com/', label: 'Instagram', icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="20" height="20" x="2" y="2" rx="6" strokeWidth="2"/><circle cx="12" cy="12" r="5" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
              ) },
              { href: 'https://facebook.com/', label: 'Facebook', icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="20" height="20" x="2" y="2" rx="6" strokeWidth="2"/><path d="M16 8h-2a2 2 0 00-2 2v2h4l-.5 3H12v7" strokeWidth="2"/></svg>
              ) },
              { href: 'https://twitter.com/', label: 'Twitter', icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="20" height="20" x="2" y="2" rx="6" strokeWidth="2"/><path d="M8 19c7.5 0 11.5-6.2 11.5-11.5v-.5A8.2 8.2 0 0022 5.5a8.1 8.1 0 01-2.3.6A4.1 4.1 0 0021.5 3a8.2 8.2 0 01-2.6 1A4.1 4.1 0 0012 8.1c0 .3 0 .6.1.9A11.7 11.7 0 013 4.1a4.1 4.1 0 001.3 5.5A4.1 4.1 0 012 8.6v.1a4.1 4.1 0 003.3 4A4.1 4.1 0 012 13v.1a8.2 8.2 0 005.5 1.6" strokeWidth="2"/></svg>
              ) },
              { href: 'https://youtube.com/', label: 'YouTube', icon: (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="20" height="20" x="2" y="2" rx="6" strokeWidth="2"/><polygon points="10,8 16,12 10,16" fill="currentColor"/></svg>
              ) },
            ].map((social, idx) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-800 transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 8 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
