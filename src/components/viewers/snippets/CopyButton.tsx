import { useCallback, useState } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, IconButton, Snackbar, Tooltip } from '@mui/material';

interface CopyButtonProps {
    data: any;
}

const CopyButton = (props: CopyButtonProps) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    let data = props.data;
    if (typeof data === 'object') {
        data = JSON.stringify(data, null, 2);
    }

    // Copy debug data to clipboard
    const copyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(data)
            .then(() => {
                setSnackbarOpen(true);
            })
            .catch(err => {
                console.error('Failed to copy to clipboard:', err);
            });
    }, []);

    // Close snackbar
    const handleCloseSnackbar = useCallback(() => {
        setSnackbarOpen(false);
    }, []);

    return (
        <Box sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
        }}>

            <Tooltip title="Copy to clipboard">
                <IconButton
                    size="small"
                    onClick={copyToClipboard}
                    sx={{
                        color: 'inherit',
                        opacity: 0.5,
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                            opacity: 1,
                        },
                    }}
                >
                    <ContentCopyIcon fontSize="small" />
                </IconButton>
            </Tooltip>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message="Copied to clipboard"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    );
};

export default CopyButton;