// GET /api/ping - Health check endpoint
export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const response = {
            ok: true,
            env: {
                mode: process.env.PAYFAST_MODE || 'unset'
            }
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Ping endpoint error:', error);
        res.status(500).json({ 
            ok: false, 
            error: 'Internal server error' 
        });
    }
}
