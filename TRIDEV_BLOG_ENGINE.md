# Documentation: Tridev Innovation Autonomous Content Engine

## 1. Executive Summary
The Tridev Innovation Autonomous Content Engine is a specialized AI pipeline designed to establish Tridev as a thought leader in the AI and Automation space. It automatically researches, writes, and publishes deep-dive technical articles that showcase the company’s expertise in AI/ML, Robotics, IoT, and Modern Web Development.

## 2. Updated Core Specializations
The engine is programmed to emphasize Tridev's core competencies in every publication:
- **Artificial Intelligence:** AI/ML solutions, AI Agents, and Automation.
- **Development:** MERN Stack, Full-stack web, and Mobile App development.
- **Hardware & IoT:** Robotics and Internet of Things (IoT) integrations.

## 3. The n8n Workflow Architecture

### A. Intelligence Layer (The "Brain")
- **Frequency:** Once daily (18:00 / 6:00 PM).
- **Core Model:** Google Gemini 2.5 Flash.
- **Logic:** Combines 17 tech pillars with 12 subtopics and 7 strategic angles to ensure high-variety output.

### B. Persistence Layer (Google Sheets)
- **ID:** `1gUgJswwiPLhoZCC1Gf-hKtFD2Klr6YSTEdd6hKOtgiM`
- **Function:** Stores published Titles and Slugs to act as a "memory," preventing the AI from ever repeating a topic.

### C. Generation & Quality Control
- **Output:** 2000–2500 words of semantic HTML.
- **SEO Strategy:** Focuses on scannable 2-4 sentence paragraphs, H2/H3 hierarchies, and strategic bolding.
- **Conversion:** Every article concludes with a custom CTA (Call to Action) leading potential clients to Tridev's consultation services.

## 4. Technical Integration
- **Platform:** n8n Workflow.
- **API Endpoint:** `https://www.nabinnepali.com.np/api/blog/create`.
- **Method:** REST Post Request with Title, Slug, and Content payloads.

---
*Maintained by the Tridev Innovation Engineering Team*
