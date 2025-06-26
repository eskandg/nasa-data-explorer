import axios from "axios"
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from "@mui/material"
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useState } from "react";
import { useEffect } from "react";
import { useContextData } from "../context/DataContext";

const NasaExplorationOptions = ({style = {}}) => {
    const {apiUrl} = useContextData()
    const [options, setOptions] = useState([])

    const setupOptionsData = async () => {
        const apodOption = await axios.get(`${apiUrl}/apod`)
        .then((res) => ({...res.data, title: "Astronomy Picture of the Day", subtitle: "See the Astronomy Picture of the Day going back as far as June 6 1995!"}))
        .catch((e) => {
            console.error(e)
            return null
        })

        const marsRoverOption = await axios.get(`${apiUrl}/mars-rover`)
        .then((res) => {
            const marsRoverNames = []
            const rovers = res.data.rovers
            for (const rover of rovers) {
                marsRoverNames.push(rover.name)
            }
            
            return {
                data: rovers, 
                url: "https://science.nasa.gov/wp-content/uploads/2024/07/pia26344-1600x.gif",
                title: "Mars Rover Photos",
                subtitle: `Explore photos on the surface of Mars taken by the ${marsRoverNames.join(", ")} rovers!`
            }
        })

        setOptions([
            apodOption,
            marsRoverOption
        ])
    }

    useEffect(() => {
        setupOptionsData()
    }, [])

    // useEffect(() => {
    //     console.log(options)
    // }, [options])

    return (
        <ImageList className="explorer-options-list" sx={{width: "100vw", height: "100vh"}}>
            {options.map((item) => (
                <ImageListItem 
                    key={item.url}
                    classes={{img: "explorer-options-img"}}
                    style={{cursor: "pointer"}}
                    
                >
                    <img
                        src={`${item.url}`}
                        alt={item.title}
                        loading="lazy"                   
                    />
                    <ImageListItemBar
                        classes={{subtitle: "explorer-options-subtitle"}}
                        title={item.title}
                        subtitle={item.subtitle}
                        actionIcon={
                            <IconButton
                                classes={{root: "explorer-options-button-icon"}}
                                aria-label={`info about ${item.title}`}
                            >
                                <TravelExploreIcon/>
                            </IconButton>
                        }
                    >

                    </ImageListItemBar>
                </ImageListItem>
            ))}
        </ImageList>
    )
}

export default NasaExplorationOptions