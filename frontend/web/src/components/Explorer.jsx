import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import {AppBar, Box, Dialog, Divider, IconButton, Toolbar, Typography} from "@mui/material"
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Slide from '@mui/material/Slide';
import React, { useEffect, useState } from 'react';
import { useContextData } from "../context/DataContext";
import MarsRoverSearch from "./MarsRoverSearch";
import ApodSearch from './ApodSearch';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Explorer = ({open, onClose, explorer}) => {
    const [result, setResult] = useState([])

    return (
      <Dialog 
        fullScreen
        open={open}
        onClose={(e) => {
            setResult([])
            onClose(e)
        }}
        slots={{transition: Transition}}
      >
        <AppBar sx={{position: "relative", padding: 1}} className='space-background'>
            <Toolbar>
                <IconButton 
                    onClick={(e) => {
                        setResult([])
                        onClose(e)
                    }}
                >
                    <NavigateBeforeIcon id={"explorer-navigate-back"} htmlColor='gray'/>
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {explorer?.title ?? "Loading..."}
                </Typography>
            </Toolbar>
            
            <div style={{background: "rgb(0 105 220 / 87%)", padding: 8, width: "fit-content", marginLeft: "auto", marginRight: "auto", borderRadius: 5}}>
                {explorer?.name === "marsRover" && <MarsRoverSearch explorer={explorer} onResult={setResult}/>}
                {explorer?.name === "apod" && <ApodSearch explorer={explorer} onResult={setResult}/>}
            </div>
        </AppBar>
        
        <div style={{height: "100%"}} className="space-background">
            <Swiper
                style={{ height: "100%" }}
                pagination={{ type: "progressbar" }}
                navigation
                modules={[Pagination, Navigation]}
            >
                {Array.isArray(result) && result.length > 0 && result?.map((item) => (
                    <SwiperSlide>
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
                                    loading="lazy"
                                />
                            </Box>

                            <Box mt={2}>
                                <Typography color="white" gutterBottom>
                                    {item?.title ?? `${item.rover.name} Rover - ${item.camera.full_name}`}
                                </Typography>
                                <Box
                                    sx={{
                                        width: "100%",
                                        maxHeight: 150,
                                        overflow: "auto",
                                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                                        color: "white",
                                        py: 1,
                                        px: 2,
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
        </div>
      </Dialog>
    )
}

export default Explorer