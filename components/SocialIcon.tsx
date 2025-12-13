'use client'

import React from 'react'

interface SocialIconProps {
    social: {
        name: string
        icon: React.ElementType
        url: string
        color?: string
    }
}

export default function SocialIcon({ social }: SocialIconProps) {
    const Icon = social.icon

    return (
        <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            aria-label={social.name}
        >
            {/* Icon Wrapper */}
            <div className="relative w-[60px] h-[60px] bg-white dark:bg-gray-800 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out group-hover:scale-110 border border-gray-200 dark:border-gray-700 shadow-sm group-hover:shadow-md">
                <Icon
                    size={24}
                    className={`text-gray-700 dark:text-gray-300 transition-colors duration-300 ${social.color
                            ? social.color.split(' ').map(c => c.replace('hover:', 'group-hover:')).join(' ')
                            : 'group-hover:text-primary-600 dark:group-hover:text-primary-400'
                        }`}
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
