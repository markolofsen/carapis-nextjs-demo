import type { NextApiRequest, NextApiResponse } from 'next';

type HealthResponse = {
    status: 'ok' | 'error';
    timestamp: string;
    uptime: number;
    environment: string;
    version?: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<HealthResponse>
) {
    try {
        const healthData: HealthResponse = {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'unknown',
            version: process.env.npm_package_version || '1.0.0',
        };

        res.status(200).json(healthData);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'unknown',
        });
    }
}
