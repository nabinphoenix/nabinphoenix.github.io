'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const ChatWidget = dynamic(() => import('./ChatWidget'), {
    ssr: false,
    loading: () => null
})

export default function ClientChatWidget() {
    const [shouldLoad, setShouldLoad] = useState(false)

    useEffect(() => {
        // Delay chat widget loading by 3 seconds to prioritize core page rendering & TBT
        const timer = setTimeout(() => {
            setShouldLoad(true)
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    if (!shouldLoad) return null

    return <ChatWidget />
}
