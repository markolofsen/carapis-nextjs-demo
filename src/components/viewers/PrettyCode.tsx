import { Box } from '@mui/material';
import { SxProps, useTheme } from '@mui/material/styles';

import { Highlight, Language, themes } from 'prism-react-renderer';

import CopyButton from './snippets/CopyButton';

interface PrettyCodeProps {
    data: string | object;
    language: Language;
    sx?: SxProps;
    mode?: 'dark' | 'light';
}

const PrettyCode = ({ data, language, sx, mode }: PrettyCodeProps) => {
    const muiTheme = useTheme();

    // Determine the theme mode: forced via prop or from MUI theme
    const effectiveMode = mode || muiTheme.palette.mode;

    // Select the Prism theme based on the effective mode
    const prismTheme = effectiveMode === 'dark' ? {
        ...themes.vsDark,
        plain: {
            ...themes.vsDark.plain,
            backgroundColor: 'transparent'
        }
    } : {
        ...themes.vsLight,
        plain: {
            ...themes.vsLight.plain,
            backgroundColor: 'transparent'
        }
    };

    // Convert form object to JSON string with proper formatting
    const contentJson = typeof data === 'string' ? data : JSON.stringify(data || {}, null, 2);


    return (
        <Box sx={{
            position: 'relative',
            height: '100%',
            bgcolor: 'background.paper',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            ...sx,
        }}>

            <CopyButton data={data} />

            <Box sx={{
                height: '100%',
                overflow: 'auto',
                '& pre': {
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                }
            }}>

                <Highlight
                    theme={prismTheme}
                    code={contentJson}
                    language={language}
                >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre style={{
                            ...style,
                            margin: 0,
                            padding: '1rem',
                            fontSize: '0.875rem',
                            lineHeight: 1.5,
                            fontFamily: 'monospace',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word'
                        }}>
                            {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({ line })}>
                                    {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({ token })} />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
            </Box>
        </Box>
    );
};

export default PrettyCode;