// components/Footer.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Facebook, Heart, Mail, Phone, MapPin } from 'lucide-react'

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/nabinphoenix',
    color: 'hover:text-gray-700 dark:hover:text-white',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/nabinnepali',
    color: 'hover:text-blue-600',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://www.facebook.com/nab.in.nepali.149047/',
    color: 'hover:text-blue-500',
  },
]

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '/skills' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">Nabin Nepali</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ML Engineer passionate about building scalable systems and applying AI solutions to real-world problems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail size={16} className="text-primary-600 dark:text-primary-400" />
                <span>nabinepali012@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone size={16} className="text-primary-600 dark:text-primary-400" />
                <span>+977-9829592158</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={16} className="text-primary-600 dark:text-primary-400" />
                <span>Kathmandu, Nepal</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Me</h4>
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <SocialIcon key={social.name} social={social} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>© {new Date().getFullYear()} Nabin Nepali. Built with</span>
              <Heart size={16} className="text-red-500 fill-red-500" />
              <span>using Next.js</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ social }: { social: typeof socialLinks[0] }) {
  const Icon = social.icon

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative"
    >
      {/* Icon Wrapper */}
      <div className="relative w-[60px] h-[60px] bg-white dark:bg-gray-800 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out group-hover:scale-110 border border-gray-200 dark:border-gray-700 shadow-sm group-hover:shadow-md">
        <Icon
          size={24}
          className="text-gray-700 dark:text-gray-300 transition-colors duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-400"
        />
      </div>

      {/* Speech Bubble Label */}
      <div className="absolute bottom-[75px] left-1/2 -translate-x-1/2 bg-primary-500 dark:bg-primary-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-y-1.5 transition-all duration-250 ease-in-out pointer-events-none z-10">
        {social.name}
        {/* Tail */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-primary-500 dark:border-t-primary-600"></div>
      </div>
    </a>
  )
}
