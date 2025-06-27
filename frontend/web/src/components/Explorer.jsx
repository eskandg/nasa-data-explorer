/**
 * @file Explorer component for displaying NASA API results in a full-screen dialog.
 * It integrates search components for APOD and Mars Rover and displays results in a Swiper carousel.
 */

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { AppBar, Box, Dialog, IconButton, Toolbar, Typography } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Slide from '@mui/material/Slide';
import React, { useState } from 'react';
import MarsRoverSearch from "./MarsRoverSearch";
import ApodSearch from './ApodSearch';

/**
 * Custom transition component for the Dialog.
 * @param {object} props - The component props.
 * @param {React.Ref} ref - The ref to forward to the Slide component.
 * @returns {JSX.Element} A Slide component with an "up" direction.
 */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Explorer component displays NASA API search results in a full-screen dialog.
 * It dynamically renders either `MarsRoverSearch` or `ApodSearch` based on the `explorer` prop.
 * Results are shown in a swipeable carousel.
 * @param {object} props - The component props.
 * @param {boolean} props.open - Controls the open/close state of the dialog.
 * @param {function} props.onClose - Callback function to close the dialog.
 * @param {object} props.explorer - An object containing details about the selected explorer (e.g., { name: "apod", title: "APOD" }).
 * @returns {JSX.Element} The Explorer dialog component.
 */
const Explorer = ({ open, onClose, explorer }) => {
    /**
     * State to store the results fetched from the NASA APIs.
     * Can be an array of APOD data or Mars Rover photos.
     * @type {[Array<object>, Function]}
     */
    const [result, setResult] = useState([]);

    return (
      <Dialog
        fullScreen
        open={open}
        onClose={(e) => {
            setResult([]); // Clear results on close
            onClose(e);
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", padding: 1 }} className='space-background'>
            <Toolbar>
                <IconButton
                    onClick={(e) => {
                        setResult([]); // Clear results on close
                        onClose(e);
                    }}
                >
                    <NavigateBeforeIcon id={"explorer-navigate-back"} htmlColor='gray'/>
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {explorer?.title ?? "Loading..."}
                </Typography>
            </Toolbar>
            
            <Box sx={{ background: "rgb(0 105 220 / 87%)", padding: 1, width: "fit-content", mx: "auto", borderRadius: 1 }}>
                {explorer?.name === "marsRover" && <MarsRoverSearch explorer={explorer} onResult={setResult}/>}
                {explorer?.name === "apod" && <ApodSearch explorer={explorer} onResult={setResult}/>}
            </Box>
        </AppBar>
        
        <Box sx={{ height: "100%" }} className="space-background">
            <Swiper
                style={{ height: "100%" }}
                pagination={{ type: "progressbar" }}
                navigation
                modules={[Pagination, Navigation]}
            >
                {Array.isArray(result) && result.length > 0 && result?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                p: 2,
                                boxSizing: "border-box",
                            }}
                        >
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    minHeight: 0,
                                    maxHeight: "60vh",
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    className="explorer-img"
                                    src={explorer?.name === "apod" ? item.url : item.img_src}
                                    alt={item?.title ?? `Image from ${item.rover?.name} rover`}
                                    loading="lazy"
                                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                                />
                            </Box>

                            <Box mt={2}>
                                <Typography color="white" gutterBottom>
                                    {item?.title ? `${item.title} | ${item.date}` : `${item.rover?.name} Rover - ${item.camera?.full_name}`}
                                </Typography>
                                <Box
                                    sx={{
                                        width: "100%",
                                        maxHeight: 150,
                                        overflow: "auto",
                                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                                        color: "white",
                                        py: 1,
                                        pr: 2,
                                        borderRadius: 1,
                                    }}
                                >
                                    <Typography variant="body2" color="gray" whiteSpace="pre-line">
                                        {item?.explanation ?? `Martian sol: ${item.sol}, Earth date: ${item.earth_date}`}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
      </Dialog>
    );
};

export default Explorer;