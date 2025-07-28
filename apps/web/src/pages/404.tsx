import NotFoundLayout from '@/layouts/404';

import { PageWithConfig } from '@carapis/nextjs/utils';

const NotFoundPage: PageWithConfig = () => {
    return <NotFoundLayout />;
};

NotFoundPage.pageConfig = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist',
};

export default NotFoundPage; 