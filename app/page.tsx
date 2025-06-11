"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Code,
  Palette,
  Globe,
  Smartphone,
  Zap,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Menu,
  X,
  ExternalLink,
  Rocket,
  Target,
  Users,
  Award,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"
import { submitContactForm } from "./actions"
import { LogoLoader } from "@/components/logo-loader"
import { ThemeToggle } from "@/components/theme-toggle"

const services = [
  {
    icon: Code,
    title: "Custom Web Development",
    description: "Cutting-edge web applications built with modern frameworks like React, Next.js, and Node.js",
    gradient: "from-blue-500 to-cyan-500",
    features: ["React & Next.js", "Full-Stack Solutions", "API Integration", "Database Design"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that enhance user experience and drive conversions",
    gradient: "from-purple-500 to-pink-500",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Responsive designs that look perfect on every device, from mobile to desktop",
    gradient: "from-orange-500 to-red-500",
    features: ["Responsive Design", "Mobile Optimization", "Cross-Browser Testing", "Performance Tuning"],
  },
  {
    icon: Zap,
    title: "Animation & Interactions",
    description: "Engaging animations and micro-interactions that bring your website to life",
    gradient: "from-green-500 to-emerald-500",
    features: ["Framer Motion", "CSS Animations", "Scroll Triggers", "Interactive Elements"],
  },
  {
    icon: Globe,
    title: "E-commerce Solutions",
    description: "Complete online stores with payment integration and inventory management",
    gradient: "from-indigo-500 to-purple-500",
    features: ["Shopping Cart", "Payment Gateway", "Inventory System", "Order Management"],
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    description: "Lightning-fast websites optimized for speed, SEO, and user experience",
    gradient: "from-yellow-500 to-orange-500",
    features: ["SEO Optimization", "Speed Enhancement", "Core Web Vitals", "Analytics Setup"],
  },
]

const portfolioItems = [
  {
    title: "Hisia Youth Organization",
    description: "A vibrant community platform for youth empowerment and counseling services",
    image: "/images/hisia-youth.png",
    url: "https://hisiayouth.org/",
    category: "Non-Profit",
    technologies: ["WordPress", "Custom CSS", "Responsive Design"],
    gradient: "from-red-500 to-pink-500",
  },
  {
    title: "Baraka Mining & Minerals",
    description: "Professional mining company website showcasing services and expertise",
    image: "/images/baraka-mining.png",
    url: "https://barakaminingltd.co.ke/",
    category: "Corporate",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "John Kamau's Portfolio",
    description: "Personal portfolio website showcasing web design and development skills",
    image: "/images/portfolio-site.png",
    url: "https://morde2002.github.io/mordecaiportfolio.github.io",
    category: "Portfolio",
    technologies: ["React", "CSS3", "Responsive Design"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Texol Energies Uganda",
    description: "Energy company website highlighting products and services in the oil industry",
    image: "/images/texol-uganda.png",
    url: "https://morde2002.github.io/texoldemo.github.io",
    category: "Energy",
    technologies: ["HTML5", "CSS3", "JavaScript", "jQuery"],
    gradient: "from-orange-500 to-red-500",
  },
]

const pricingPlans = [
  {
    name: "Student Special",
    price: "2,000 - 5,000",
    currency: "Ksh",
    description: "Perfect for students and personal projects",
    features: [
      "Free consultation & planning",
      "Custom responsive design",
      "Up to 5 pages",
      "Mobile optimization",
      "Basic SEO setup",
      "1 month support",
    ],
    popular: false,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Startup Launch",
    price: "15,000",
    currency: "Ksh",
    description: "Ideal for new businesses and startups",
    features: [
      "Professional design",
      "5-7 responsive pages",
      "Contact forms",
      "SEO optimization",
      "Social media integration",
      "3 months support",
    ],
    popular: false,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "Business Pro",
    price: "25,000",
    currency: "Ksh",
    description: "Complete solution for growing businesses",
    features: [
      "Custom design system",
      "10-15 pages",
      "Advanced animations",
      "Blog/News section",
      "Analytics integration",
      "6 months support",
    ],
    popular: true,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "E-commerce Plus",
    price: "45,000",
    currency: "Ksh",
    description: "Full-featured online store",
    features: [
      "Custom e-commerce design",
      "Product catalog",
      "Shopping cart & checkout",
      "Payment integration",
      "Inventory management",
      "12 months support",
    ],
    popular: false,
    gradient: "from-orange-500 to-red-500",
  },
  {
    name: "Enterprise",
    price: "90,000",
    currency: "Ksh",
    description: "Enterprise-level solution",
    features: [
      "Unlimited pages",
      "Advanced functionality",
      "User portals",
      "CRM integration",
      "Custom development",
      "Unlimited support",
    ],
    popular: false,
    gradient: "from-indigo-500 to-purple-500",
  },
]

const faqs = [
  {
    question: "What makes EaseAnimateUX different from other web agencies?",
    answer:
      "We specialize in creating animated, interactive websites that stand out. Our focus on modern technologies like React, Next.js, and advanced animations sets us apart. We don't just build websites - we create digital experiences that engage users and drive results.",
  },
  {
    question: "How long does it take to complete a website project?",
    answer:
      "Project timelines vary based on complexity. A simple business website takes 2-3 weeks, while complex e-commerce or custom applications can take 6-12 weeks. We provide detailed project timelines and keep you updated throughout the development process.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes! We offer comprehensive support packages including security updates, content updates, performance monitoring, and technical support. Our goal is to ensure your website continues to perform optimally long after launch.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "We specialize in website redesigns and modernization. We can transform your existing site with modern design, improved performance, and enhanced user experience while preserving your brand identity and existing content.",
  },
  {
    question: "What technologies do you use for web development?",
    answer:
      "We use cutting-edge technologies including React, Next.js, Node.js, TypeScript, and modern CSS frameworks. For animations, we leverage Framer Motion and CSS3. We choose the best technology stack based on your specific project requirements.",
  },
]

const testimonials = [
  {
    name: "Sarah Wanjiku",
    role: "Director, Hisia Youth Organization",
    company: "Hisia Youth Organization",
    image: "/images/testimonial-sarah.png",
    content:
      "EaseAnimateUX transformed our vision into reality! The website they created for Hisia Youth Organization perfectly captures our mission of youth empowerment. The animations and user experience are exceptional, and we've seen a 300% increase in online engagement since launch.",
    rating: 5,
    gradient: "from-red-500 to-pink-500",
  },
  {
    name: "James Baraka",
    role: "CEO, Baraka Mining & Minerals Ltd",
    company: "Baraka Mining & Minerals",
    image: "/images/testimonial-james.png",
    content:
      "Professional, reliable, and innovative! EaseAnimateUX delivered a corporate website that truly represents our mining expertise. The clean design and smooth animations have impressed our international clients and helped us secure new partnerships.",
    rating: 5,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "John Kamau",
    role: "Front-End Developer",
    company: "Freelance Developer",
    image: "/images/testimonial-mordecai.png",
    content:
      "Working with EaseAnimateUX on my portfolio website was an amazing experience. They understood my vision as a developer and created a site that perfectly showcases my skills. The attention to detail and modern design approach is outstanding!",
    rating: 5,
    gradient: "from-blue-500 to-cyan-500",
  },
]

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <div
            className={`w-1 h-1 sm:w-2 sm:h-2 rounded-full ${
              i % 3 === 0 ? "bg-blue-400/30" : i % 3 === 1 ? "bg-purple-400/30" : "bg-orange-400/30"
            }`}
          />
        </motion.div>
      ))}
    </div>
  )
}

const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className="h-6 w-6 group-hover:animate-bounce" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default function EaseAnimateUX() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 10 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 10 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "portfolio", "testimonials", "pricing", "faq", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setSubmitStatus("success")
        setSubmitMessage("Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
        setSubmitMessage(result.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setSubmitMessage("Failed to send message. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-x-hidden transition-colors duration-300">
      <LogoLoader />
      {/* Cursor follower - hidden on mobile */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Back to Top Button */}
      <BackToTopButton />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm"
      >
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <div className="relative w-100 h-100 sm:w-40 sm:h-20">
              <Image
                src="/images/logo.png"
                alt="EaseMotionUX Logo Light"
                width={140}
                height={140}
                className="block dark:hidden object-contain"
              />
              <Image
                src="/images/logo2.png"
                alt="EaseMotionUX Logo Dark"
                width={140}
                height={140}
                className="hidden dark:block object-contain"
              />
            </div>
            {/* Logo text removed since it's already in the logo image */}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {["home", "about", "services", "portfolio", "testimonials", "pricing", "faq", "contact"].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === item ? "text-orange-500" : "text-gray-700 dark:text-gray-200 hover:text-orange-500"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                {activeSection === item && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500"
                  />
                )}
              </motion.button>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-700 dark:text-gray-200 p-2"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="container mx-auto px-4 py-2 space-y-2">
                {["home", "about", "services", "portfolio", "testimonials", "pricing", "faq", "contact"].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors py-2"
                    whileHover={{ x: 10 }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.button>
                ))}
                <div className="pt-2">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
      >
        <FloatingElements />
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-orange-50/50 dark:from-blue-950/50 dark:via-purple-950/30 dark:to-orange-950/50"
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-6 sm:mb-8"
            >
              <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium mb-4">
                🚀 Crafting Digital Excellence
              </Badge>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Where{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Innovation
              </span>{" "}
              Meets{" "}
              <span className="text-transparent bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text">
                Animation
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              We transform ideas into stunning, animated web experiences that captivate users and drive business growth.
              Your vision, our expertise, limitless possibilities.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Button
                onClick={() => scrollToSection("portfolio")}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View Our Work
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Start Your Project
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {[
                { number: 50, label: "Projects Completed", suffix: "+" },
                { number: 100, label: "Happy Clients", suffix: "%" },
                { number: 24, label: "Support Hours", suffix: "/7" },
                { number: 3, label: "Years Experience", suffix: "+" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                    <AnimatedCounter end={stat.number} />
                    {stat.suffix}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="text-gray-400 dark:text-gray-600 h-6 w-6 sm:h-8 sm:w-8" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-12 sm:mb-16"
          >
            <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium mb-4">
              About EaseAnimateUX
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 px-2">
              Pioneering the Future of{" "}
              <span className="text-transparent bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text">
                Web Development
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed">
              At EaseAnimateUX, we're not just developers – we're digital architects who craft immersive web
              experiences. Our passion lies in combining cutting-edge technology with stunning animations to create
              websites that don't just function, they fascinate.
            </p>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              From startups to enterprises, we've helped businesses across Kenya and beyond establish powerful online
              presences that drive growth, engage audiences, and deliver measurable results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Target,
                title: "Our Mission",
                description:
                  "To democratize exceptional web design by making cutting-edge, animated websites accessible to businesses of all sizes.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Users,
                title: "Our Approach",
                description:
                  "We believe in collaborative partnerships, working closely with clients to understand their vision and exceed expectations.",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: Award,
                title: "Our Promise",
                description:
                  "Every project receives our full attention, ensuring quality, performance, and results that make a lasting impact.",
                gradient: "from-orange-500 to-red-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="text-center group p-4"
              >
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-800 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium mb-4">
              Our Services
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 px-2">
              Comprehensive{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Digital Solutions
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              From concept to launch, we provide end-to-end web development services that transform your digital
              presence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 h-full shadow-sm hover:shadow-lg">
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <service.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl mb-2">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                        >
                          <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-12 sm:py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium mb-4">
              Our Portfolio
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 px-2">
              Featured{" "}
              <span className="text-transparent bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text">
                Projects
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Discover how we've helped businesses across various industries establish powerful online presences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl">
                  <div className="relative h-48 sm:h-64 overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <Badge className={`bg-gradient-to-r ${item.gradient} text-white text-xs`}>{item.category}</Badge>
                    </div>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Button
                        asChild
                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                      >
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          Visit Site
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-300">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {item.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-12"
          >
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-800 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium mb-4">
              Client Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 px-2">
              What Our{" "}
              <span className="text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text">
                Clients Say
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Don't just take our word for it. Here's what our satisfied clients have to say about working with
              EaseAnimateUX.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 h-full shadow-sm hover:shadow-lg">
                  <CardHeader className="text-center pb-4">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${testimonial.gradient} p-0.5`}>
                        <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                          <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        </motion.div>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <blockquote className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center mb-4 italic leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-800 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium mb-4">
              Transparent Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 px-2">
              Affordable{" "}
              <span className="text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text">
                Excellence
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Choose the perfect package for your project. All plans include responsive design, SEO optimization, and
              ongoing support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 shadow-lg text-xs">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <Card
                  className={`bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 h-full shadow-sm hover:shadow-lg ${
                    plan.popular ? "ring-2 ring-orange-500/20 shadow-lg" : ""
                  }`}
                >
                  <CardHeader className="text-center p-4 sm:p-6">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <span className="text-white font-bold text-sm sm:text-xl">{plan.currency}</span>
                    </div>
                    <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl mb-2">{plan.name}</CardTitle>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.currency} {plan.price}
                    </div>
                    <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-4 sm:p-6 pt-0">
                    <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-1">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2">
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm`}
                      onClick={() => scrollToSection("contact")}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 sm:py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium mb-4">
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 px-2">
              Frequently Asked{" "}
              <span className="text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
                Questions
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Get answers to common questions about our services and process
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FAQItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-800 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge className="bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium mb-4">
              Get In Touch
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 px-2">
              Ready to{" "}
              <span className="text-transparent bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text">
                Get Started?
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Let's discuss your project and bring your vision to life. We're here to help you succeed online.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-gray-900 dark:text-white text-xl sm:text-2xl">Send us a message</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Input
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={`border-gray-300 dark:border-gray-700 focus:border-orange-500 focus:ring-orange-500 ${
                            formErrors.name ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.name && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {formErrors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          placeholder="Your Email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`border-gray-300 dark:border-gray-700 focus:border-orange-500 focus:ring-orange-500 ${
                            formErrors.email ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-xs mt-1 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Input
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className={`border-gray-300 dark:border-gray-700 focus:border-orange-500 focus:ring-orange-500 ${
                          formErrors.subject ? "border-red-500" : ""
                        }`}
                      />
                      {formErrors.subject && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {formErrors.subject}
                        </p>
                      )}
                    </div>
                    <div>
                      <Textarea
                        placeholder="Tell us about your project..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className={`border-gray-300 dark:border-gray-700 focus:border-orange-500 focus:ring-orange-500 ${
                          formErrors.message ? "border-red-500" : ""
                        }`}
                      />
                      {formErrors.message && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {formErrors.message}
                        </p>
                      )}
                    </div>

                    {submitStatus !== "idle" && (
                      <Alert
                        className={
                          submitStatus === "success" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
                        }
                      >
                        <div className="flex items-center">
                          {submitStatus === "success" ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                          )}
                          <AlertDescription className={submitStatus === "success" ? "text-green-700" : "text-red-700"}>
                            {submitMessage}
                          </AlertDescription>
                        </div>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  Let's Connect
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <motion.div className="flex items-center space-x-3 sm:space-x-4" whileHover={{ x: 10 }}>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-gray-300 font-semibold text-sm sm:text-base">Phone</p>
                      <a
                        href="tel:0707240014"
                        className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors text-sm sm:text-base"
                      >
                        0707240014
                      </a>
                    </div>
                  </motion.div>

                  <motion.div className="flex items-center space-x-3 sm:space-x-4" whileHover={{ x: 10 }}>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-gray-300 font-semibold text-sm sm:text-base">Email</p>
                      <a
                        href="mailto:easeanimateux@gmail.com"
                        className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors text-sm sm:text-base"
                      >
                        easeanimateux@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div className="flex items-center space-x-3 sm:space-x-4" whileHover={{ x: 10 }}>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-gray-300 font-semibold text-sm sm:text-base">Location</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Nairobi, Kenya</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Follow Our Journey
                </h4>
                <div className="flex space-x-3 sm:space-x-4">
                  {[
                    { icon: Facebook, href: "#", color: "from-blue-600 to-blue-700" },
                    { icon: Twitter, href: "#", color: "from-sky-400 to-sky-500" },
                    { icon: Instagram, href: "#", color: "from-pink-500 to-purple-500" },
                    { icon: Linkedin, href: "#", color: "from-blue-700 to-blue-800" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 p-4 sm:p-6 rounded-2xl border border-orange-200">
                <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">Ready to Start?</h4>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                  Book a free consultation call to discuss your project requirements and get a custom quote.
                </p>
                <Button
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-sm sm:text-base"
                  onClick={() => window.open("tel:0707240014")}
                >
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="relative w-100 h-100 sm:w-40 sm:h-20">
                  <Image
                    src="/images/logo2.png"
                    alt="EaseMotionUX Logo Dark"
                    width={140}
                    height={140}
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Transforming ideas into stunning, animated web experiences that drive business growth and user
                engagement.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-1 sm:space-y-2">
                {["Home", "About", "Services", "Portfolio", "Pricing", "Contact"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-gray-400 hover:text-orange-400 transition-colors text-xs sm:text-sm"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                <li>Custom Web Development</li>
                <li>UI/UX Design</li>
                <li>E-commerce Solutions</li>
                <li>Mobile-First Design</li>
                <li>Animation & Interactions</li>
                <li>Performance Optimization</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact Info</h4>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                <p>📍 Nairobi, Kenya</p>
                <p>📞 0707240014</p>
                <p>✉️ easeanimateux@gmail.com</p>
              </div>
              <div className="flex space-x-2 sm:space-x-3 mt-3 sm:mt-4">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Linkedin, href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © {new Date().getFullYear()} EaseAnimateUX. All rights reserved. | Crafted with ❤️ in Kenya
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      whileHover={{ borderColor: "rgb(209 213 219)" }}
    >
      <motion.button
        className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-900 dark:text-white font-semibold pr-4 text-sm sm:text-base">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-3 sm:pb-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed pt-3 sm:pt-4 text-sm sm:text-base">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
