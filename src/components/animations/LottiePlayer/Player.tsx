import React from "react";

import { Box, SxProps } from "@mui/material";

import Lottie from "react-lottie-player";

export interface LottieCarProps {
  animationData?: object;
  path?: string;
  width?: string | number;
  height?: string | number;
  play?: boolean;
  loop?: boolean;
  sx?: SxProps;
}

const LottieCar: React.FC<LottieCarProps> = ({
  animationData,
  path,
  width = "100%",
  height = "auto",
  sx,
  play = true,
  loop = true,
}) => {
  return (
    <Box
      sx={{
        width: width,
        height: height,
        ...sx,
      }}
    >
      <Lottie
        loop={loop}
        path={path}
        animationData={animationData}
        play={play}
        className="lottie-player"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
};

export default LottieCar;
