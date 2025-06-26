import axios from "axios";
import {AppBar, Dialog, Divider, IconButton, Toolbar, Typography} from "@mui/material"
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Slide from '@mui/material/Slide';
import React, { useEffect } from 'react';
import { useContextData } from "../context/DataContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Explorer = ({open, onClose, explorer}) => {
    const {apiUrl, marsRover} = useContextData()

    const getApodData = async (params) => {
        return await axios.get(`${apiUrl}/apod`)
    }

    const getMarsRoverData = async (params) => {
        return await axios.get(`${apiUrl}/mars-rover`)
    }

    const getExplorerData = async (params) => {
        try {
            return await actions[explorer.name](params)
        }
        catch (e) {
            console.error(e)
            return 
        }
    }

    const actions = {
        apod: getApodData,
        marsRover: getMarsRoverData
    }

    return (
      <Dialog 
        fullScreen
        open={open}
        onClose={onClose}
        slots={{transition: Transition}}
      >
        <AppBar sx={{position: "relative", padding: 1}} className='space-background'>
          <Toolbar>
            <IconButton onClick={onClose}>
              <NavigateBeforeIcon id={"explorer-navigate-back"} htmlColor='gray'/>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {explorer?.title ?? "Loading..."}
            </Typography>
          </Toolbar>
        </AppBar>
        
        <div style={{height: "100%"}} className="space-background">

        </div>
      </Dialog>
    )
}

export default Explorer