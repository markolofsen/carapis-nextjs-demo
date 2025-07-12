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
  apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
  googleTagId: 'G-625RR7KQZX',
};
