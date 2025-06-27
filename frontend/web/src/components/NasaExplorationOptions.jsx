/**
 * @file Component for displaying NASA exploration options (e.g., APOD, Mars Rover Photos).
 * Fetches initial data for each option and presents them as clickable image list items.
 */

import axios from "axios";
import { IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useState, useEffect } from "react";
import { useContextData } from "../context/DataContext";

/**
 * NasaExplorationOptions component displays available NASA exploration options.
 * It fetches initial data for APOD and Mars Rover, then presents them as interactive cards.
 * @param {object} props - The component props.
 * @param {function} props.onClick - Callback function when an exploration option is clicked.
 * @param {object} [props.style={}] - Optional inline style for the component's root div.
 * @returns {JSX.Element} The NASA exploration options display.
 */
const NasaExplorationOptions = ({ onClick, style = {} }) => {
    const { apiUrl, setMarsRovers } = useContextData();
    
    /**
     * State to manage the loading status of the options data.
     * @type {[boolean, Function]}
     */
    const [loading, setLoading] = useState(true);
    
    /**
     * State to store the fetched exploration options data.
     * @type {[object, Function]}
     */
    const [options, setOptions] = useState({});

    /**
     * Fetches initial data for APOD and Mars Rover options and updates the state.
     */
    const setupOptionsData = async () => {
        const apodOption = await axios.get(`${apiUrl}/apod`)
        .then((res) => ({
            ...res.data,
            title: "Astronomy Picture of the Day",
            subtitle: "See the Astronomy Picture of the Day going back as far as June 16 1995!"
        }))
        .catch((e) => {
            console.error("Error fetching APOD data:", e);
            return null;
        });

        const marsRoverOption = await axios.get(`${apiUrl}/mars-rover`)
        .then((res) => {
            const marsRoverNames = [];
            const roversObj = {};
            const rovers = res.data.rovers;
            for (const rover of rovers) {
                marsRoverNames.push(rover.name);
                roversObj[rover.name] = rover;
            }

            setMarsRovers(roversObj);
            
            return {
                data: rovers,
                url: "https://science.nasa.gov/wp-content/uploads/2024/07/pia26344-1600x.gif",
                title: "Mars Rover Photos",
                subtitle: `Explore photos on the surface of Mars taken by the ${marsRoverNames.join(", ")} rovers!`
            };
        })
        .catch((e) => {
            console.error("Error fetching Mars Rover data:", e);
            return null;
        })
        .finally(() => {
            setLoading(false);
        });

        setOptions({
            apod: apodOption,
            marsRover: marsRoverOption
        });
    };

    /**
     * Handles the click event on an exploration option.
     * @param {object} optionSelected - An object containing the name and title of the selected option.
     */
    const handleOnClick = (optionSelected) => {
        onClick(optionSelected);
    };

    /**
     * Effect hook to call `setupOptionsData` once when the component mounts.
     */
    useEffect(() => {
        setupOptionsData();
    }, []);

    return (
        <div className="nasa-exploration-options" style={style}>
            {loading && <Typography sx={{ color: "white" }}>Loading...</Typography>}
            {!loading &&
                <ImageList className="explorer-options-list" sx={{ width: "100vw", height: "100vh" }}>
                    {Object.entries(options).map(([name, item]) => (
                        item && ( // Render only if item is not null (i.e., data fetched successfully)
                            <ImageListItem
                                key={item.url}
                                onClick={() => handleOnClick({ name: name, title: item.title })}
                                classes={{ img: "explorer-options-img" }}
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    src={`${item.url}`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    classes={{ subtitle: "explorer-options-subtitle" }}
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    actionIcon={
                                        <IconButton
                                            classes={{ root: "explorer-options-button-icon" }}
                                            aria-label={`info about ${item.title}`}
                                        >
                                            <TravelExploreIcon/>
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        )
                    ))}
                </ImageList>
            }
        </div>
    );
};

export default NasaExplorationOptions;