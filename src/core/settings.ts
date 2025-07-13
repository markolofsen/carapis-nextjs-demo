const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

export const settings = {
  isDev,
  isProd,

  app: {
    icon: '/favicon.png',
    name: 'VamCar',
    title: 'VamCar',
    description: 'VamCar',
    email: 'hello@reforms.ai',
    version: '0.0.1',
  },

  url: process.env.NEXT_PUBLIC_URL as string,
  apiUrl: process.env.NEXT_PUBLIC_API_URL as string,
  apiKey: process.env.CARAPIS_APIKEY as string,
  googleTagId: process.env.NEXT_PUBLIC_GOOGLE_TAG_ID as string,
};
