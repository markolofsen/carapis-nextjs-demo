import { Box, Typography, useTheme } from '@mui/material';

import { CommonExternalProps, JSONTree } from 'react-json-tree';

import CopyButton from './snippets/CopyButton';

interface JsonTreeComponentProps {
  title?: string;
  data: any;
  config?: Partial<CommonExternalProps>;
}

const JsonTreeComponent = ({ title, data, config }: JsonTreeComponentProps) => {
  const theme = useTheme();

  // JSON Tree theme based on current MUI theme
  const jsonTreeTheme = {
    scheme: theme.palette.mode === 'dark' ? 'monokai' : 'default',
    base00: 'transparent',
    base01: theme.palette.action.hover,
    base02: theme.palette.divider,
    base03: theme.palette.text.disabled,
    base04: theme.palette.text.secondary,
    base05: theme.palette.text.primary,
    base06: theme.palette.text.primary,
    base07: theme.palette.background.paper,
    base08: theme.palette.error.main,
    base09: theme.palette.warning.main,
    base0A: theme.palette.info.main,
    base0B: theme.palette.success.main,
    base0C: theme.palette.primary.main,
    base0D: theme.palette.secondary.main,
    base0E: theme.palette.error.light,
    base0F: theme.palette.warning.dark,
  };

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: 'background.paper',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',

        height: '100%',
        overflow: 'hidden',
      }}
    >
      <CopyButton data={data} />

      {title && (
        <Box
          sx={{
            p: 2.5,
            pl: 3,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">{title}</Typography>
        </Box>
      )}

      <Box
        sx={{
          height: '100%',
          overflow: 'auto',
          p: 2,
          pl: 3,
        }}
      >
        <JSONTree
          data={data}
          theme={jsonTreeTheme}
          invertTheme={false}
          hideRoot={true}
          shouldExpandNodeInitially={() => true}
          keyPath={[]}
          // labelRenderer={([label]) => <span>{label}</span>}
          // valueRenderer={(value: any) => <span>{String(value)}</span>}
          postprocessValue={(value) => value}
          isCustomNode={() => false}
          getItemString={() => null}
          collectionLimit={100}
          sortObjectKeys={false}
          {...config}
        />
      </Box>
    </Box>
  );
};

export default JsonTreeComponent;
