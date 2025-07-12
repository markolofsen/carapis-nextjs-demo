import { Box, SxProps, Theme } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import {
  Icon as IconifyIcon,
  IconifyIcon as IconifyIconType,
} from '@iconify/react';

type IconInput = string | IconifyIconType;

type Props = {
    icon: IconInput;
    size?: number;
    color?: string;
    sx?: SxProps<Theme>;
    inline?: boolean;
};

export default function Icon({
    icon,
    size = 20,
    color = 'inherit',
    sx,
}: Props) {
    const theme = useTheme();
    const getColor = () => {
        if (color === 'inherit') {
            return theme.palette.text.secondary;
        }
        return color;
    };

    return (
        <Box
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: '2px',
                ...sx,
            }}
        >
            <IconifyIcon
                icon={icon}
                width={size}
                height={size}
                color={getColor()}
            />
        </Box>
    );
}
