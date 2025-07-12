import { NextPageContext } from 'next';

import ErrorLayout from '@/layouts/Error';

interface ErrorProps {
    statusCode?: number;
    err?: Error;
}

// Create a type that combines the Next.js page and our custom properties
type ErrorPageType = React.FC<ErrorProps> & {
    pageConfig: {
        title: string;
        description: string;
        appBar: {};
    };
    getInitialProps: (ctx: NextPageContext) => Promise<ErrorProps> | ErrorProps;
};

const ErrorPage: ErrorPageType = ({ statusCode, err }) => {
    return <ErrorLayout
        statusCode={statusCode}
        errorMessage={err?.message}
    />;
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
    const statusCode = res ? res.statusCode : err ? (err as any).statusCode ?? 500 : 404;
    return { statusCode, err: err as Error };
};

// Page configuration
ErrorPage.pageConfig = {
    title: 'Error Occurred',
    description: 'An error occurred while processing your request',
    appBar: {},
};

export default ErrorPage; 