import { Project } from './projects'

export const aiAgents: Project[] = [
    {
        id: 101,
        title: 'Automated Blog Generation Engine',
        date: 'December 2025',
        description: 'The content creator that never sleeps. A sophisticated AI system that transforms your website into a self-sustaining content powerhouse.',
        fullDescription: 'This isn\'t a simple content spinner. The Automated Blog Generation Engine is a production-ready AI agent that operates as a tireless content team. Built on n8n and powered by Google Gemini 2.5 Flash, it autonomously researches, drafts, optimizes, and publishes professional articles every four hours. It intelligently combines 17 technology topics with 12 subtopic angles to ensure zero duplication, validating every post against your entire publication history before it goes live.',
        technologies: ['n8n', 'Google Gemini 2.5 Flash', 'Google Sheets API', 'REST API', 'JavaScript', 'Webhooks'],
        image: '/assets/images/blog-agent-dashboard.png',
        githubUrl: null,
        liveUrl: null,
        features: [
            'Autonomous scheduling (runs every 4 hours, 24/7)',
            'Smart duplication prevention (50-attempt validation loop)',
            'SEO-optimized structure (H2/H3, bullet points, CTAs)',
            'Direct CMS publishing via REST API',
            'Centralized tracking and logging via Google Sheets',
            'Graceful failure handling and auto-recovery'
        ],
        workflowAnalysis: {
            pattern: 'Scheduled Trigger -> Ideation -> Validation -> Generation -> Publishing -> Tracking',
            whatItDoes: 'The agent wakes up every 4 hours, scans your existing content history, and algorithmically generates a unique topic intersection (e.g., "Future of Edge Computing in 2025"). It validates this against your database to guarantee originality. Once validated, it prompts Gemini 2.5 Flash to author a 2500-word article with specific SEO requirements. The output is formatted into clean HTML and pushed directly to your website\'s database, with the final status logged in Google Sheets.',
            replaces: 'Entire Content Team: Content Strategist (ideation), Copywriter (drafting), SEO Specialist (optimization), and Web Producer (publishing).',
            totalSavings: '90% Cost Reduction. Replacing ~180 manual articles/month (approx. market value $18,000) with a system costing ~$5-85/month in API fees.',
            setupTime: '2-3 Hours. Includes n8n workflow import, Google Cloud project setup, API credentials configuration, and topic customization.',
            realAdvantage: 'Consistency at Scale. Humans fatigue; this agent delivers professional, SEO-ready content on a strict schedule, building domain authority while you sleep.',
            workflowSteps: [
                'Trigger: 4-Hour Cron Schedule',
                'History Check: Fetch existing slugs from Google Sheets',
                'Strategy: Generate unique topic/angle/subtopic combination',
                'Validation: Check uniqueness (Retry Limit: 50)',
                'Production: Generate 2.5k words via Gemini 2.5 Flash',
                'Formatting: Convert Markdown to HTML & structure data',
                'Publishing: POST payload to /api/blog/create',
                'Logging: Update history in Google Sheets'
            ],
            workflowImage: '/assets/ai_agents/workflow_image/Automated Blo_Generation_Engine.png'
        }
    },
    {
        id: 102,
        title: 'Maya - AI Shopping Assistant',
        date: 'December 2025',
        description: 'An AI agent that processes e-commerce orders end-to-end with zero human intervention. From product search to order confirmation in under 2 seconds.',
        fullDescription: 'Maya is a production-ready conversational AI agent built for SastoSale Nepal that handles complete e-commerce operations autonomously. It chats naturally with customers, searches product databases, validates order details, processes payments, and sends confirmations—all automatically. This isn\'t just a chatbot; it\'s a complete customer service team that works 24/7 without breaks, errors, or fatigue.',
        technologies: ['n8n', 'Google Gemini AI', 'MongoDB', 'Pinecone Vector DB', 'LangChain', 'Gmail API', 'Google Sheets'],
        image: '/assets/ai_agents/maya_hero.png',
        githubUrl: null,
        liveUrl: null,
        features: [
            'Natural conversation in multiple languages (English, Nepali)',
            'Intelligent product search across unlimited categories',
            'Real-time validation (phone, email, address)',
            'Complete order processing from inquiry to confirmation',
            'Automatic database logging + Google Sheets tracking',
            'Professional email confirmations',
            'Handles 100 customers as easily as 1',
            'Professional de-escalation for difficult customers'
        ],
        workflowAnalysis: {
            pattern: 'Customer Inquiry → Product Search → Order Collection → Validation → Database Save → Email Confirmation',
            whatItDoes: 'Customer asks about a product → Maya searches the database → Customer decides to buy → Maya collects details through conversation → Validates everything in real-time → Saves order to MongoDB → Logs to Google Sheets → Sends confirmation email → Done. All in under 2 seconds with zero human intervention.',
            replaces: '💼 What This Replaces:\n\n• 3-5 customer service reps ($500-800/month each)\n• Order entry clerks ($400-600/month)\n• Email management staff ($300-500/month)\n• Manual spreadsheet work\n• Human errors in data entry',
            totalSavings: '💰 Cost Savings:\n\n• Monthly: $1,500-2,500 saved\n• Annual: $18,000-30,000 saved\n• Break-even: First month\n• Operating cost: $50-150/month (API usage)',
            setupTime: '⚡ Setup: 1-2 Days\n\n• Import workflow & configure databases\n• Connect APIs (Gemini, Gmail, Sheets)\n• Customize for your brand\n• Test & deploy\n\n✅ Fully operational in 48 hours',
            realAdvantage: '🚀 Real Advantages:\n\n• 24/7 operation - never miss after-hours orders\n• Handles 100 customers as easily as 1\n• Responds in under 2 seconds\n• Zero training required\n• Complete conversation history for analytics\n• Scales without hiring\n• Professional handling of difficult customers',
            workflowSteps: [
                'Customer sends message via chat widget',
                'AI classifies intent (browsing/buying/support)',
                'Searches product database with smart filters',
                'Presents products in natural conversation',
                'Collects order details (name, phone, email, address)',
                'Validates data in real-time',
                'Generates unique Order ID',
                'Saves to MongoDB database',
                'Logs to Google Sheets',
                'Sends professional confirmation email',
                'Returns success message to customer'
            ],
            workflowImage: '/assets/ai_agents/workflow_image/maya_ai_agent.png'
        }
    },
    {
        id: 103,
        title: 'Smart Feedback Classification & Automation Agent',
        date: 'December 2025',
        description: 'A fully automated AI-driven feedback handling system that classifies, routes, and acknowledges user submissions in real-time.',
        fullDescription: 'The Smart Feedback Classification & Automation Agent is a high-performance n8n ecosystem designed to revolutionize how businesses handle user input. By combining Google Gemini 2.0 Flash with Airtable and Slack, it autonomously triages feedback into actionable categories—Complaints, Compliments, or Requests. It ensures critical issues never slip through the cracks while providing users with immediate, professional acknowledgments.',
        technologies: ['n8n', 'Google Gemini 2.0 Flash', 'Airtable', 'Slack API', 'Gmail API', 'REST API', 'Webhooks'],
        image: '/assets/ai_agents/feedback_agent.png',
        githubUrl: null,
        liveUrl: null,
        features: [
            'Automated AI classification (Complaint, Compliment, Request)',
            'Smart routing to department-specific databases',
            'Real-time Slack notifications for instant response',
            'Automated personalized email acknowledgments',
            'Advanced natural language parsing via Gemini AI',
            'Scalable multi-channel feedback management'
        ],
        workflowAnalysis: {
            pattern: 'Feedback Collection -> AI Classification -> Smart Routing -> Internal Notification -> User Acknowledgment',
            whatItDoes: 'The agent captures feedback via forms/webhooks -> Processes text with Gemini 2.0 Flash to identify intent -> Atomically routes data to the correct Airtable tables (Complaints, Compliments, or Feature Requests) -> Notifies relevant teams on Slack -> Sends an immediate confirmation email to the user. The entire cycle completes in milliseconds.',
            replaces: '💼 What This Replaces:\n\n• Manual feedback triage and categorization\n• Manual email responses and acknowledgments\n• Hand-routing feedback to different departments\n• Multiple spreadsheet management\n• Delayed response times due to human oversight',
            totalSavings: '💰 Cost Savings:\n\n• Saves 20-30 hours of support work per week\n• Eliminates 98% of routing errors\n• Monthly: Estimated $1,200-$2,000 in labor overhead\n• Annual: Over $20,000 in operational efficiency',
            setupTime: '⚡ Setup: < 1 Hour\n\n• Import pre-built n8n workflow\n• Link Airtable, Slack, and Gmail credentials\n• Simple field mapping for your specific needs\n• Test and go live immediately',
            realAdvantage: '🚀 Real Advantages:\n\n• Zero Manual Triage: Everything is categorized and routed automatically\n• Instant Visibility: Slack alerts prioritize critical complaints for immediate action\n• Improved CX: Users feel heard through instant, accurate acknowledgments\n• Data-Decision Ready: Structured Airtable data makes trend analysis effortless\n• Unlimited Scale: Processes 1 or 1,000 submissions with equal speed',
            workflowSteps: [
                'Webhook/Form receives user feedback data',
                'Gemini 2.0 Flash classifies intent with high precision',
                'Flow splits based on Category (Complaint / Compliment / Request)',
                'Record created in the corresponding Airtable database',
                'Slack notification sent to the responsible internal team',
                'Professional acknowledgment email sent via Gmail API',
                'Consolidated log updated for operational audit'
            ],
            workflowImage: '/assets/ai_agents/workflow_image/Feedback_ai_agent.png'
        }
    }
]
