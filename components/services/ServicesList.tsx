'use client'

import { motion } from 'framer-motion'
import { Brain, Zap, Eye, MessageSquare, BarChart3, Headphones, ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import Link from 'next/link'

export default function ServicesList() {
    const services = [
        {
            icon: Brain,
            title: 'Machine Learning Development',
            shortDesc: 'Custom ML models from prototype to production deployment',
            description: 'Build production-ready machine learning models tailored to your business needs. From supervised learning (regression, classification) to deep learning (neural networks, CNNs, LSTMs), I develop ML systems that solve real-world problems and deliver measurable ROI.',
            features: [
                'Custom ML model development (TensorFlow, PyTorch)',
                'Time series forecasting (ARIMA, SARIMA, LSTM)',
                'Predictive analytics and recommendation systems',
                'Model training, optimization, and hyperparameter tuning',
                'API deployment using FastAPI for real-time inference',
                'MLOps and continuous model monitoring'
            ],
            useCases: 'Sales forecasting, customer churn prediction, demand prediction, price optimization',
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: Zap,
            title: 'AI Automation with n8n',
            shortDesc: 'Intelligent workflow automation that runs 24/7',
            description: 'As an n8n expert in Nepal, I design and implement intelligent automation workflows that connect your business systems, eliminate manual tasks, and run 24/7 without intervention. Save hundreds of hours monthly while improving accuracy and consistency.',
            features: [
                'Custom n8n workflow design and implementation',
                'Multi-system integration (CRM, email, databases, APIs)',
                'Event-driven automation with webhooks',
                'Scheduled task automation',
                'AI-powered decision-making workflows',
                'Self-hosted n8n setup for data privacy'
            ],
            useCases: 'Lead management, customer onboarding, data synchronization, report generation, email automation',
            color: 'from-teal-500 to-teal-600'
        },
        {
            icon: Eye,
            title: 'Computer Vision Solutions',
            shortDesc: 'Object detection, image classification, and visual AI',
            description: 'Leverage the power of computer vision to automate visual tasks. Using YOLO, CNNs, and state-of-the-art models, I build systems that can detect objects, classify images, segment regions, and extract insights from visual data.',
            features: [
                'Object detection using YOLO (v5, v6, v8)',
                'Image classification and recognition',
                'Face detection and recognition',
                'OCR (Optical Character Recognition)',
                'Video analytics and tracking',
                'Real-time inference on edge devices'
            ],
            useCases: 'Quality control inspection, security surveillance, inventory counting, document digitization',
            color: 'from-purple-500 to-purple-600'
        },
        {
            icon: MessageSquare,
            title: 'NLP & Chatbot Development',
            shortDesc: 'Intelligent conversational AI and text analysis',
            description: 'Build intelligent chatbots and NLP systems that understand natural language, provide 24/7 customer support, analyze sentiment, and extract insights from text data. Improve customer experience while reducing support costs.',
            features: [
                'Custom chatbot development (rule-based & AI-powered)',
                'Sentiment analysis and emotion detection',
                'Text classification and categorization',
                'Named Entity Recognition (NER)',
                'Question-answering systems',
                'Integration with messaging platforms (WhatsApp, Facebook, Slack)'
            ],
            useCases: 'Customer support automation, FAQ bots, feedback analysis, content moderation',
            color: 'from-green-500 to-green-600'
        },
        {
            icon: BarChart3,
            title: 'Data Analytics & Insights',
            shortDesc: 'Transform data into actionable business insights',
            description: 'Turn your raw data into actionable insights. I perform exploratory data analysis, build dashboards, create predictive models, and help you make data-driven decisions that improve business outcomes.',
            features: [
                'Exploratory Data Analysis (EDA)',
                'Data cleaning and preprocessing',
                'Statistical analysis and hypothesis testing',
                'Dashboard creation (interactive visualizations)',
                'Predictive modeling and forecasting',
                'Business intelligence reporting'
            ],
            useCases: 'Sales analysis, customer segmentation, trend identification, performance monitoring',
            color: 'from-orange-500 to-orange-600'
        },
        {
            icon: Headphones,
            title: 'AI Consulting & Strategy',
            shortDesc: 'Expert guidance on AI adoption and implementation',
            description: 'Not sure where to start with AI? I provide strategic consulting to help businesses in Nepal identify AI opportunities, assess feasibility, plan implementation roadmaps, and ensure successful AI adoption.',
            features: [
                'AI readiness assessment',
                'Use case identification and prioritization',
                'Technical feasibility analysis',
                'ROI estimation and cost-benefit analysis',
                'Implementation roadmap and timeline',
                'Team training and knowledge transfer'
            ],
            useCases: 'AI strategy development, proof-of-concept projects, team upskilling, technology evaluation',
            color: 'from-pink-500 to-pink-600'
        }
    ]

    return (
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Comprehensive AI & Machine Learning Services
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        From custom machine learning models to intelligent automation workflows, I offer end-to-end AI services
                        that help businesses across Nepal and globally transform operations and achieve measurable results.
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <AnimatedSection key={index} delay={index * 0.1}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="h-full p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 group"
                            >
                                {/* Icon & Title */}
                                <div className="flex items-start gap-4 mb-6">
                                    <div className={`p-4 rounded-xl bg-gradient-to-br ${service.color} text-white group-hover:scale-110 transition-transform shadow-lg`}>
                                        <service.icon size={28} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                            {service.shortDesc}
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                                        What's Included
                                    </h4>
                                    <ul className="space-y-2">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <ArrowRight size={16} className="text-primary-500 shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Use Cases */}
                                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                        Common Use Cases
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {service.useCases}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* CTA Section */}
                <AnimatedSection delay={0.6} className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-primary-600 to-teal-600 dark:from-primary-700 dark:to-teal-700 rounded-2xl p-10 shadow-2xl">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Need a Custom AI Solution?
                        </h3>
                        <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
                            Every business is unique. Let's discuss your specific needs and create a tailored AI strategy that delivers results.
                        </p>
                        <Link
                            href="#contact"
                            className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
                        >
                            Schedule Free Consultation
                        </Link>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    )
}
