import { ImageResponse } from '@vercel/og';

import { settings } from '@/core/settings';

import OgImage from '@/components/nextjs/OgImage';

export const runtime = 'edge';

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);

  let title = settings.app.title;
  let subtitle = settings.app.description;

  // Try to decode the base64 data parameter if it exists
  const dataParam = searchParams.get('data');

  if (dataParam) {
    try {
      // Decode base64 and parse JSON
      const decodedData = JSON.parse(Buffer.from(dataParam, 'base64').toString('utf-8'));
      title = decodedData.title || title;
      subtitle = decodedData.subtitle || subtitle;

      console.debug('decodedData');
      console.debug(JSON.stringify(decodedData, null, 2));
    } catch (error) {
      console.error('Error decoding base64 data:', error);
    }
  } else {
    // Fallback to original query parameters for backward compatibility
    title = searchParams.get('title') || title;
    subtitle = searchParams.get('subtitle') || subtitle;
  }
  const fontData = await fetch(`${settings.url}/static/fonts/Manrope/Manrope-Bold.ttf`).then((res) => res.arrayBuffer());

  return new ImageResponse(<OgImage title={title} subtitle={subtitle} />, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Manrope',
        data: fontData,
        weight: 700,
        style: 'normal',
      },
    ],
  });
}
