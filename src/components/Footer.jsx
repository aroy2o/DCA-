import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  ArrowUp,
  Heart,
  Star,
  Award,
  Users,
  Send
} from 'lucide-react'
import { BUTTON_STYLES } from '../constants/styles'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    setSubscribed(true)
    setTimeout(() => {
      setSubscribed(false)
      setEmail('')
    }, 3000)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Programs', href: '/programs' },
      { name: 'Coaches', href: '/about#coaches' },
      { name: 'Success Stories', href: '/about#success' },
    ],
    programs: [
      { name: 'Junior Cricket', href: '/programs#junior' },
      { name: 'Senior Training', href: '/programs#senior' },
      { name: 'Women Cricket', href: '/programs#women' },
      { name: 'Professional Coaching', href: '/programs#professional' },
    ],
    support: [
      { name: 'Contact Us', href: '/#contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Admissions', href: '/admissions' },
      { name: 'Facilities', href: '/facilities' },
    ]
  }

  const contactInfo = [
    {
      icon: Phone,
      label: 'Call Us',
      value: '+91 98765 43210',
      href: 'tel:+919876543210'
    },
    {
      icon: Mail,
      label: 'Email Us',
      value: 'info@doarscricket.com',
      href: 'mailto:info@doarscricket.com'
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      value: 'Alipurduar, West Bengal, India',
      href: 'https://maps.google.com'
    },
    {
      icon: Clock,
      label: 'Training Hours',
      value: '6:00 AM - 8:00 PM',
      href: null
    }
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-amber-600' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-orange-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-red-600' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-rose-600' },
  ]

  const achievements = [
    { icon: Users, number: '500+', label: 'Students Trained' },
    { icon: Award, number: '15+', label: 'Years Experience' },
    { icon: Star, number: '50+', label: 'State Players' },
    { icon: Trophy, number: '98%', label: 'Success Rate' }
  ]

  return (
    <footer className="relative py-8 sm:py-12 lg:py-16">
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 text-gray-900">
        {/* Main Footer Content */}
        <div className="py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16">
            
            {/* Company Info & Newsletter */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center sm:text-left"
              >
                {/* Logo with Cricket Academy Colors */}
                <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 mb-3 sm:mb-4 lg:mb-6">
                  <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                    <Trophy className="w-4 sm:w-5 lg:w-7 h-4 sm:h-5 lg:h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-black text-gray-900">Doars Cricket</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Academy</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 sm:mb-6 lg:mb-8 leading-relaxed text-xs sm:text-sm lg:text-base px-2 sm:px-0">
                  West Bengal's premier cricket academy dedicated to nurturing talent and creating champions. 
                  Join us to transform your passion into excellence.
                </p>

                {/* Newsletter Signup with Cricket Academy Colors */}
                <div className="mb-4 sm:mb-6 lg:mb-8">
                  <h4 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 text-center sm:text-left">Stay Updated</h4>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-2 sm:space-y-3">
                    <div className="flex flex-col gap-2 sm:gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-3 py-2.5 sm:py-3 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 shadow-lg shadow-gray-500/10 text-xs sm:text-sm lg:text-base"
                        required
                      />
                      <motion.button
                        type="submit"
                        className="w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white font-semibold rounded-xl sm:rounded-2xl hover:from-amber-600 hover:via-orange-700 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-orange-500/30 text-xs sm:text-sm lg:text-base"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send className="w-3 sm:w-4 h-3 sm:h-4" />
                        {subscribed ? 'Subscribed!' : 'Subscribe'}
                      </motion.button>
                    </div>
                  </form>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 text-center sm:text-left">Follow Us</h4>
                  <div className="flex justify-center sm:justify-start flex-wrap gap-2 sm:gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        className={`w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl sm:rounded-2xl flex items-center justify-center text-gray-600 ${social.color} transition-all duration-300 hover:scale-110 shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-amber-500/20`}
                        whileHover={{ y: -3 }}
                        aria-label={social.label}
                      >
                        <social.icon className="w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                
                {/* Company Links */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-center sm:text-left"
                >
                  <h4 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Company</h4>
                  <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                    {footerLinks.company.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.href}
                          className="text-gray-600 hover:text-amber-600 transition-colors duration-300 hover:translate-x-1 inline-block text-xs sm:text-sm lg:text-base"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Programs Links */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center sm:text-left"
                >
                  <h4 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Programs</h4>
                  <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                    {footerLinks.programs.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.href}
                          className="text-gray-600 hover:text-orange-600 transition-colors duration-300 hover:translate-x-1 inline-block text-xs sm:text-sm lg:text-base"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Support Links */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center sm:text-left"
                >
                  <h4 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Support</h4>
                  <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                    {footerLinks.support.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.href}
                          className="text-gray-600 hover:text-red-600 transition-colors duration-300 hover:translate-x-1 inline-block text-xs sm:text-sm lg:text-base"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center sm:text-left"
              >
                <h4 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Contact Info</h4>
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  {contactInfo.map((contact, index) => (
                    <div key={index} className="flex items-start justify-center sm:justify-start space-x-2 sm:space-x-3">
                      <div className="w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-gray-500/10">
                        <contact.icon className="w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5 text-amber-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-500 mb-1">{contact.label}</p>
                        {contact.href ? (
                          <a
                            href={contact.href}
                            className="text-gray-900 hover:text-amber-600 transition-colors duration-300 text-xs sm:text-sm lg:text-base font-medium break-words"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <p className="text-gray-900 text-xs sm:text-sm lg:text-base font-medium break-words">{contact.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="py-4 sm:py-6 lg:py-8 border-t border-gray-200/30"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 rounded-xl sm:rounded-2xl mx-auto mb-1 sm:mb-2 lg:mb-3 flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <achievement.icon className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-white" />
                </div>
                <div className="text-base sm:text-xl lg:text-2xl font-black text-gray-900 mb-0.5 sm:mb-1">{achievement.number}</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium px-1 leading-tight">{achievement.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-4 sm:py-6 lg:py-8 border-t border-gray-200/30">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 text-gray-600 text-xs sm:text-sm lg:text-base"
            >
              <span className="text-gray-600">© 2025 Doars Cricket Academy.</span>
              <div className="flex items-center gap-1">
                <span className="text-gray-600">Made with</span>
                <Heart className="w-3 sm:w-4 h-3 sm:h-4 text-red-500 animate-pulse" />
                <span className="text-gray-600">in West Bengal</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 lg:gap-6"
            >
              <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                <Link to="/privacy" className="text-gray-600 hover:text-amber-600 transition-colors duration-300 text-xs sm:text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-600 hover:text-orange-600 transition-colors duration-300 text-xs sm:text-sm">
                  Terms of Service
                </Link>
              </div>
              <motion.button
                onClick={scrollToTop}
                className="w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl sm:rounded-2xl flex items-center justify-center text-gray-600 hover:text-amber-600 transition-all duration-300 shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-amber-500/20"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
