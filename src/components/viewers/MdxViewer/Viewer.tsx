import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import NextImage, { ImageProps as NextJSImageProps } from 'next/image';
import NextLink from 'next/link';
import React from 'react';

import Box, { BoxProps } from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiLink, { LinkProps } from '@mui/material/Link';
import Typography, { TypographyProps } from '@mui/material/Typography';

import { Language } from 'prism-react-renderer';

import PrettyCode from '../PrettyCode';

// Custom MDX components replacing default HTML tags
const mdxComponents = {
    h1: (props: TypographyProps) => (
        <Typography variant="h1" component="h1" gutterBottom {...props} />
    ),
    h2: (props: TypographyProps) => (
        <Typography variant="h2" component="h2" gutterBottom {...props} />
    ),
    h3: (props: TypographyProps) => (
        <Typography variant="h3" component="h3" gutterBottom {...props} />
    ),
    p: (props: TypographyProps) => (
        <Typography variant="body1" component="p" {...props} />
    ),
    a: (props: LinkProps) => {
        const isBlank = (props.href as string).startsWith('http');
        return (
            <MuiLink
                component={NextLink}
                color="primary"
                target={isBlank ? '_blank' : undefined}
                sx={{
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                }}
                {...props}
            />
        )
    },
    ul: (props: BoxProps) => (
        <Box component="ul" sx={{ pl: 4, mb: 2 }} {...props} />
    ),
    li: (props: BoxProps) => (
        <Box component="li" sx={{ mb: 1, typography: 'body1' }} {...props} />
    ),
    hr: () => (
        <Box py={1}>
            <Divider />
        </Box>
    ),
    blockquote: (props: TypographyProps) => (
        <Typography
            component="blockquote"
            sx={{
                borderLeft: '4px solid gray',
                pl: 2,
                color: 'text.secondary',
                fontStyle: 'italic',
                mb: 2,
            }}
            {...props}
        />
    ),
    img: (props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
        const { src, alt, width, height, ...rest } = props;

        if (!src) {
            return <Box component="span" sx={{ display: 'inline-block', width: 50, height: 50, backgroundColor: 'grey.300' }} />;
        }

        const hasNumericDimensions = typeof width === 'number' && typeof height === 'number';

        if (hasNumericDimensions) {
            return (
                <NextImage
                    src={src}
                    alt={alt || ''}
                    width={width as number}
                    height={height as number}
                    {...(rest as any)}
                />
            );
        } else {
            return (
                <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                    <NextImage
                        src={src}
                        alt={alt || ''}
                        fill
                        style={{ objectFit: 'contain' }}
                        {...(rest as any)}
                    />
                </Box>
            );
        }
    },
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
        const codeElement = React.Children.toArray(props.children).find(
            (child): child is React.ReactElement<{ className?: string; children?: React.ReactNode }> =>
                React.isValidElement(child) && child.type === 'code'
        );

        if (codeElement) {
            const { className, children: codeContent } = codeElement.props;
            const language = className?.replace(/language-/, '').trim() as Language || 'plaintext';
            const code = typeof codeContent === 'string' ? codeContent.trim() : '';

            return <PrettyCode data={code} language={language} sx={{ my: 2 }} />;
        }

        return <pre {...props} />;
    },
};

interface MdxViewRemoteProps {
    mdxSource: MDXRemoteSerializeResult;
    MdxContentComponent?: never; // Ensure MdxContentComponent is not provided with mdxSource
    filePath?: string; // Retaining for potential future use like an edit link
}

interface MdxViewDirectProps {
    mdxSource?: never; // Ensure mdxSource is not provided with MdxContentComponent
    MdxContentComponent: React.ComponentType<any>; // Type for a React component
    filePath?: string; // Retaining for potential future use
}

type MdxViewProps = MdxViewRemoteProps | MdxViewDirectProps;

const MdxViewer = (props: MdxViewProps) => {
    const { mdxSource, MdxContentComponent } = props;

    let contentToRender;

    if (MdxContentComponent) {
        // Render the passed-in MDX component, applying our custom components
        const Component = MdxContentComponent;
        contentToRender = <Component components={mdxComponents as any} />;
    } else if (mdxSource) {
        // Render using MDXRemote for serialized content
        contentToRender = (
            <MDXRemote
                {...mdxSource} // Spreads compiledSource, scope, frontmatter
                components={mdxComponents as any}
            />
        );
    }

    return (
        <Box sx={{
            "&": {
                ...(Object.fromEntries(
                    ["p", "ul", "ol"].flatMap(tag =>
                        Array.from({ length: 6 }, (_, i) => [`${tag} + h${i + 1}`, {
                            mt: 1,
                        }])
                    )
                )),
            },
            "p + p": {
                mt: 1,
            },
        }}>
            {contentToRender}
            {/* {editLink()} */}
        </Box>
    );
};

export default MdxViewer;


