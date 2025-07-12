import React from 'react';

import { Alert, AlertTitle, Box, Typography } from '@mui/material';

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Caught by ErrorBoundary:', error, errorInfo);
    }

    renderMessage() {
        return this.props.fallback || (
            <Alert severity="error">
                <AlertTitle variant="h6">Something went wrong</AlertTitle>
                <Typography variant="subtitle2">{this.state.error?.message}</Typography>
            </Alert>
        );
    }

    render() {
        if (this.state.hasError) {
            return this.renderMessage();
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
