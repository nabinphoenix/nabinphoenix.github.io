// components/Footer.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Facebook, Heart, Mail, Phone, MapPin, Instagram } from 'lucide-react'
import SocialIcon from './SocialIcon'

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
    url: 'https://www.facebook.com/nabin.nepali.ml/',
    color: 'hover:text-blue-500',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/nabinepali012/',
    color: 'hover:text-pink-600',
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


