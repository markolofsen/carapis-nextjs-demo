// src/pages/api/robots.ts

import type { NextApiRequest, NextApiResponse } from 'next'

// Function to generate rules for each User-agent
const generateUserAgentRules = (userAgent: string, rules: string[]) => {
    return [`User-agent: ${userAgent}`, ...rules].join('\n')
}

// Main function to generate the robots.txt content
const generateRobotsTxtContent = (req: NextApiRequest) => {
    // Build the base URL for the Sitemap
    const baseUrl =
        process.env.NEXT_PUBLIC_URL ||
        `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`

    // Base rules
    const rules = [
        'Allow: /',
        'Disallow: /me/',
        'Disallow: /auth/',
        // Optionally add Sitemap if needed
        // `Sitemap: ${baseUrl}/sitemap.xml`,
    ]

    // Add specific rules for different User-agents (example)
    const userAgentRules = [
        generateUserAgentRules('*', rules),
        // Uncomment these lines if you want Googlebot or Bingbot rules
        // generateUserAgentRules('Googlebot', ['Disallow: /no-googlebot/']),
        // generateUserAgentRules('Bingbot', ['Disallow: /no-bingbot/']),
    ]

    return userAgentRules.join('\n\n')
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET')
        return res.status(405).end('Method Not Allowed')
    }

    const content = generateRobotsTxtContent(req)

    res.setHeader('Content-Type', 'text/plain')
    res.status(200).send(content)
}
