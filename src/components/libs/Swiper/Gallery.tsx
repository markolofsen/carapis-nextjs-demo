'use client';

import React, { useState } from 'react';

// Import MUI components
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import { useTheme } from '@mui/material/styles'; // Import useTheme

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { EffectFade, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { Swiper as SwiperCore } from 'swiper';
// Define the expected shape of image objects
interface GalleryImage {
    id: string | number;
    image_url: string;
    description?: string; // Optional alt text
}

interface SwiperImageGalleryProps {
    images: GalleryImage[];
    /** Optional default alt text if description is missing */
    defaultAlt?: string;
    /** Optional: Add custom class names */
    mainSwiperClassName?: string;
    thumbsSwiperClassName?: string;
}

const SwiperImageGallery: React.FC<SwiperImageGalleryProps> = ({
    images,
    defaultAlt = 'Gallery image',
    mainSwiperClassName = 'swiper-gallery-main',
    thumbsSwiperClassName = 'swiper-gallery-thumbs',
}) => {
    const theme = useTheme(); // Get theme object
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
    const [activeIndex, setActiveIndex] = useState(0); // State for active index

    if (!images || images.length === 0) {
        // Optionally render a placeholder or null if no images
        return <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>No images available.</Box>;
    }

    // Define heights - adjust these as needed
    const thumbHeight = '90px'; // Keep thumb height relatively fixed

    return (
        // Use Flexbox to distribute height
        <Box className="swiper-gallery-wrapper" sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%' // Ensure wrapper takes full height of its container
        }}>
            {/* Main Image Slider - Takes remaining space */}
            <Box sx={{
                flexGrow: 1,
                minHeight: 0,
                backgroundColor: '#f0f0f0',
                borderRadius: `${theme.shape.borderRadius}px`, // Apply theme border radius
                overflow: 'hidden' // Ensure content is clipped
            }}> {/* Allow shrinking and set background */}
                <Swiper
                    modules={[Navigation, Thumbs, EffectFade]}
                    effect="fade"
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    loop={images.length > 1}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Update active index on change
                    className={mainSwiperClassName}
                    style={{
                        '--swiper-navigation-color': theme.palette.common.white, // Use theme color if desired
                        '--swiper-pagination-color': theme.palette.common.white,
                        // Remove fixed aspect ratio/margin, let flexbox handle height
                        // aspectRatio: '4 / 3',
                        // marginBottom: '8px'
                        height: '100%' // Make swiper fill the flex item
                    } as React.CSSProperties}
                >
                    {images.map((image) => (
                        <SwiperSlide key={`main-${image.id}`}>
                            <CardMedia
                                component="img"
                                src={image.image_url}
                                alt={image.description || defaultAlt}
                                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>

            {/* Thumbnails Slider - Fixed height part */}
            {images.length > 1 && (
                <Box sx={{ height: thumbHeight, flexShrink: 0, pt: '8px' }}> {/* Set fixed height and padding top */}
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        modules={[Thumbs, FreeMode]}
                        spaceBetween={10}
                        slidesPerView={5}
                        freeMode={true}
                        watchSlidesProgress={true}
                        className={thumbsSwiperClassName}
                        style={{
                            // Remove fixed height, let Box control it
                            // height: '80px',
                            height: '100%'
                        } as React.CSSProperties}
                        // ... breakpoints ...
                        breakpoints={{
                            320: { slidesPerView: 3, spaceBetween: 8 },
                            480: { slidesPerView: 4, spaceBetween: 10 },
                            768: { slidesPerView: 5, spaceBetween: 10 },
                            1024: { slidesPerView: 6, spaceBetween: 10 }
                        }}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide
                                key={`thumb-${image.id}`}
                                className="swiper-slide-thumb"
                            >
                                <Box sx={{
                                    width: '100%',
                                    height: '100%',
                                    cursor: 'pointer',
                                    transition: 'border-color 0.3s ease',
                                    border: '0px solid transparent',
                                    ...(activeIndex === index && {
                                        border: `3px solid ${theme.palette.primary.main}`
                                    }),
                                    borderRadius: `${theme.shape.borderRadius}px`, // Use theme border radius
                                    overflow: 'hidden',
                                    boxSizing: 'border-box',
                                }}>
                                    <CardMedia
                                        component="img"
                                        src={image.image_url}
                                        alt={`Thumbnail ${image.description || defaultAlt}`}
                                        sx={{
                                            display: 'block',
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '0 !important'
                                        }}
                                    />
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            )}
        </Box>
    );
};

export default SwiperImageGallery;


// Example CSS you might add globally or scoped:
/*
.swiper-gallery-thumbs .swiper-slide-thumb {
  border: 3px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.swiper-gallery-thumbs .swiper-slide-thumb-active {
  border-color: /* Your theme primary color or CSS variable */
/* }
*/
