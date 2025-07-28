import dynamic from 'next/dynamic';

const lottieFiles = {
    rocket: '/static/lottie/rocket.json',
    chat: '/static/lottie/chat.json',
    email: '/static/lottie/email.json',
    data: '/static/lottie/data.json',
    leads: '/static/lottie/leads.json',
    automation: '/static/lottie/automation.json',
    mailman: '/static/lottie/mailman.json',
};

const Player = dynamic(() => import('./Player'), { ssr: false });

export { lottieFiles, Player };
