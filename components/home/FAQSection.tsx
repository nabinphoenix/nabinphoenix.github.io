'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'

interface FAQ {
    question: string
    answer: string
    category: string
}

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const faqs: FAQ[] = [
        {
            category: "Hiring & Services",
            question: "Why hire a Machine Learning Engineer in Nepal?",
            answer: "Hiring a Machine Learning Engineer in Nepal offers several strategic advantages: **Cost Effectiveness** - Get world-class ML expertise at 40-60% lower cost compared to developers in the US, UK, or Western Europe while maintaining the same quality. **Growing Tech Ecosystem** - Nepal's IT sector is rapidly advancing, producing skilled ML engineers trained on international standards (TensorFlow, PyTorch, scikit-learn). **Time Zone Advantage** - For businesses in Asia-Pacific, Nepal (UTC+5:45) provides excellent timezone overlap with India, Southeast Asia, and parts of Europe. **English Proficiency** - Strong English communication skills ensure smooth collaboration. **Local Business Understanding** - If you operate in Nepal or South Asia, a local ML engineer understands regional challenges, data patterns, and market dynamics. As a top Machine Learning Engineer based in Kathmandu, I combine global technical standards with local market knowledge to deliver AI solutions that truly work for your business."
        },
        {
            category: "AI Automation",
            question: "What does an AI Automation Specialist in Nepal do?",
            answer: "An AI Automation Specialist in Nepal focuses on transforming manual, repetitive business processes into intelligent, automated workflows that run 24/7. My core responsibilities include: **Workflow Automation Design** - Using tools like n8n, I design custom automation workflows connecting different business systems (CRM, email, databases, APIs). **AI Integration** - I integrate AI capabilities (NLP, computer vision, predictive analytics) into automation workflows to make them intelligent. **Process Analysis** - I analyze your current business processes to identify automation opportunities that save the most time and money. **Custom AI Solutions** - I build custom AI models and deploy them as automated services using FastAPI, webhooks, and scheduled tasks. Real-world examples: E-commerce order processing automation, intelligent email sorting and auto-responses, automated data collection and reporting, AI-powered customer support chatbots. As one of the few n8n experts and AI automation specialists in Nepal, I help businesses in Kathmandu and across the country implement these game-changing automations."
        },
        {
            category: "Tools & Technology",
            question: "Why is n8n the best automation tool for businesses in Nepal?",
            answer: "As an n8n specialist in Nepal, I've worked with multiple automation tools, and n8n stands out as the best choice for businesses: **Cost-Effective & Open-Source** - Unlike Zapier or Make which charge per task, n8n is open-source and can be self-hosted, meaning zero per-task costs after initial setup - crucial for Nepal businesses with budget constraints. **Unlimited Workflow Complexity** - Build extremely complex workflows with conditional logic, loops, data transformation, and API integrations in a visual, drag-and-drop interface. **Self-Hosting = Data Privacy** - For businesses handling sensitive data, n8n can be hosted on your own server. Your data never leaves your infrastructure. **400+ Integrations** - Connects to virtually everything your business uses (Google Sheets, MongoDB, Slack, Email, custom APIs, databases). **AI-Ready** - Seamlessly integrates with AI services (OpenAI, custom ML models, NLP tools) for intelligent automation. **Developer-Friendly** - Allows custom JavaScript code within workflows, webhooks, and complex data transformations. Real results: I've helped businesses in Kathmandu save 100+ hours monthly and reduce operational costs by 40% using n8n automation."
        },
        {
            category: "Career & Expertise",
            question: "What is the difference between a Machine Learning Engineer and a Data Scientist?",
            answer: "This is a common question from businesses in Nepal looking to hire AI talent. **Machine Learning Engineer (Like Me)**: Focus on building production-ready ML systems that solve real business problems. Skills include Python, TensorFlow, PyTorch, Model Deployment, FastAPI, MLOps, and Automation. Deliverables are deployed AI systems, automated workflows, APIs, and production models. Think of it as a software engineer specialized in AI systems. **Data Scientist**: Focus on analyzing data, finding insights, and building experimental models. Skills include Statistics, R/Python, Data Analysis, Visualization, and Jupyter Notebooks. Deliverables are reports, insights, experimental models, and recommendations. Think of it as a research analyst with advanced statistical tools. **What You Need**: Hire a Machine Learning Engineer if you want to automate business processes using AI, need deployed production-ready AI systems, want computer vision/NLP/automation solutions, or need AI that runs 24/7 integrated with your systems. Hire a Data Scientist if you want insights from data, need to understand customer behavior patterns, want statistical analysis recommendations, or you're in the exploration phase. As a Machine Learning Engineer in Nepal, I focus on building and deploying AI systems that create tangible business value."
        },
        {
            category: "Business Impact",
            question: "How can AI Automation help small businesses in Nepal?",
            answer: "Small businesses in Nepal often operate with limited budgets and small teams. AI automation is a game-changer because it allows you to do more with less. **Top 5 AI Automation Use Cases**: **1. Customer Service Automation** - Handle 80% of common questions automatically, provide 24/7 support, reduce response time to seconds. Cost savings equivalent to hiring 2-3 customer service staff. **2. Lead Management & Follow-up** - Automatically capture leads from Facebook, website, email, qualify them using AI scoring, and send personalized follow-up emails. Result: Never miss a potential customer, increase conversion by 30%. **3. Content & Social Media Automation** - Schedule and post content across platforms, generate content ideas using AI, monitor engagement. Time saved: 15-20 hours per week. **4. Inventory & Order Management** - Automatically update inventory when orders are placed, send low-stock alerts, generate purchase orders. Benefit: Prevent stockouts and overstocking. **5. Data Entry & Report Generation** - Extract data from invoices/receipts using AI, populate databases automatically, generate daily/weekly reports. Time saved: 10-15 hours per week. Real example: I helped a small online clothing store in Thamel automate their entire order processing workflow using n8n and AI - one-time setup, 60+ hours saved monthly, ROI achieved in the first month."
        },
        {
            category: "Pricing & Timeline",
            question: "How much does AI automation cost in Nepal?",
            answer: "The cost of AI automation in Nepal depends on project complexity, but it's significantly more affordable than international rates while maintaining high quality. **Typical Investment Ranges**: Simple n8n automation workflow (3-5 integrations): NPR 30,000 - 60,000 ($225-450 USD). Custom AI chatbot for customer service: NPR 80,000 - 150,000 ($600-1,125 USD). Computer vision system (object detection, classification): NPR 120,000 - 250,000 ($900-1,875 USD). Full AI automation suite (multiple workflows + ML models): NPR 200,000 - 500,000 ($1,500-3,750 USD). **Why Nepal-based pricing is advantageous**: International ML engineers charge $80-150/hour, Nepal-based rates are 40-60% lower, same quality and expertise, better value for money. **ROI Consideration**: Most automation projects pay for themselves within 2-4 months through time savings and efficiency gains. For example, if automation saves you 50 hours/month and your time is worth NPR 1,000/hour, that's NPR 50,000/month saved - a typical NPR 100,000 automation pays for itself in 2 months. **Free Consultation**: I offer a free initial consultation for Nepal-based businesses to discuss your automation needs and provide accurate estimates."
        },
        {
            category: "Process & Timeline",
            question: "What is your typical project timeline?",
            answer: "Project timelines vary based on complexity, but here's a typical breakdown for different types of AI and automation projects: **n8n Workflow Automation (Simple)**: Discovery & planning: 1-2 days, Development & testing: 3-5 days, Deployment & training: 1-2 days. Total: 1-2 weeks. **AI Chatbot Development**: Requirements gathering: 3-4 days, Data preparation & training: 1 week, Integration & testing: 4-5 days, Deployment & iteration: 3-4 days. Total: 3-4 weeks. **Computer Vision System**: Data collection & labeling: 1-2 weeks, Model training & optimization: 1-2 weeks, API development & integration: 1 week, Testing & deployment: 1 week. Total: 4-6 weeks. **Complex AI Automation Suite**: Planning & architecture: 1 week, Development (multiple workflows + ML models): 3-4 weeks, Testing & optimization: 1-2 weeks, Deployment & training: 1 week. Total: 6-8 weeks. **Process**: Initial consultation (free), Detailed proposal with timeline and milestones, Agile development with weekly updates, Testing & iteration, Deployment to production, Post-launch support (1 month included). Being based in Kathmandu means easy communication and collaboration throughout the project."
        },
        {
            category: "Global Reach",
            question: "Do you work with international clients?",
            answer: "Yes! While I'm based in Kathmandu, Nepal, I work with clients both locally and internationally. **International Collaboration**: I have experience working remotely with clients across different time zones and use modern collaboration tools (Slack, Zoom, GitHub, Notion) to ensure smooth communication. My English proficiency and professional work ethic make international collaboration seamless. **Time Zone Advantage**: Nepal's timezone (UTC+5:45) provides good overlap with: Asia-Pacific region (excellent overlap), Middle East and Europe (morning/afternoon overlap), US East Coast (early morning/late evening possible). **Why International Clients Choose Me**: Cost-effective rates compared to US/European developers (40-60% savings), High-quality work with international standards, Reliable communication and project management, Expertise in cutting-edge AI technologies (TensorFlow, PyTorch, n8n), Production-ready solutions, not just prototypes. **Mode of Work**: Fully remote with regular video calls, Asynchronous communication for global teams, Detailed documentation and version control (GitHub), Flexible working hours for urgent deadlines. Whether you're a startup in San Francisco, an enterprise in Singapore, or a business in Kathmandu, I deliver the same level of expertise and professionalism."
        }
    ]

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-4xl mx-auto">
                <AnimatedSection className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <HelpCircle className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Common questions about hiring a Machine Learning Engineer in Nepal, AI automation, n8n workflows, and working with me. Find answers to help you make informed decisions.
                    </p>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                            >
                                {/* Question Button */}
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                    aria-expanded={openIndex === index}
                                >
                                    <div className="flex-1">
                                        <div className="text-xs font-semibold text-primary-600 dark:text-primary-400 mb-2 uppercase tracking-wider">
                                            {faq.category}
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-relaxed">
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="shrink-0 mt-1"
                                    >
                                        <ChevronDown className="w-6 h-6 text-gray-400" />
                                    </motion.div>
                                </button>

                                {/* Answer Content */}
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-700">
                                                <div
                                                    className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 prose prose-sm dark:prose-invert max-w-none"
                                                    dangerouslySetInnerHTML={{
                                                        __html: faq.answer
                                                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white">$1</strong>')
                                                            .replace(/\n\n/g, '</p><p class="mt-4">')
                                                            .replace(/^(.+)$/, '<p>$1</p>')
                                                    }}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* CTA Section */}
                <AnimatedSection delay={0.4} className="mt-12 text-center">
                    <div className="bg-gradient-to-r from-primary-50 to-teal-50 dark:from-primary-900/20 dark:to-teal-900/20 rounded-2xl p-8 border border-primary-100 dark:border-primary-800">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Still Have Questions?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                            I'm here to help! Get in touch for a free consultation about your AI automation or machine learning project.
                        </p>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
                        >
                            Get Free Consultation
                        </a>
                    </div>
                </AnimatedSection>
            </div>

            {/* Schema.org FAQPage Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer.replace(/\*\*/g, '')
                            }
                        }))
                    })
                }}
            />
        </section>
    )
}
