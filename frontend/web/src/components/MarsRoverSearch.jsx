/**
 * @file Component for searching Mars Rover Photos data.
 * Allows users to select a rover, camera, Martian sol, or Earth date to fetch photos.
 */

import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from "react";
import { useContextData } from "../context/DataContext";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../constants";
import SearchComponents from "./SearchComponents";

/**
 * MarsRoverSearch component for fetching Mars Rover photos.
 * @param {object} props - The component props.
 * @param {object} props.explorer - The current explorer object, used to conditionally render.
 * @param {function} props.onResult - Callback function to handle the search results.
 * @returns {JSX.Element|null} The search components for Mars Rover or null if not the active explorer.
 */
const MarsRoverSearch = ({ explorer, onResult }) => {
  const { apiUrl, marsRovers } = useContextData();
  
  /**
   * State for the selected Mars Rover. Default is "Curiosity".
   * @type {[string, Function]}
   */
  const [rover, setRover] = useState("Curiosity");
  
  /**
   * State for the selected camera. Default is "fhaz".
   * @type {[string|undefined, Function]}
   */
  const [camera, setCamera] = useState("fhaz");
  
  /**
   * State for the Martian sol (Martian day). Default is 0.
   * @type {[number, Function]}
   */
  const [sol, setSol] = useState(0);
  
  /**
   * State for the Earth date.
   * @type {[dayjs.Dayjs|undefined, Function]}
   */
  const [earthDate, setEarthDate] = useState();

  /**
   * Fetches Mars Rover photo data from the NASA API.
   * @param {object} options - Options for the data fetching.
   * @param {AbortSignal} options.signal - Abort signal for cancelling the request.
   */
  const getData = async ({ signal }) => {
    try {
      const response = await axios.get(
        `${apiUrl}/mars-rover/`,
        {
          params: {
            rover,
            camera,
            earth_date: earthDate && dayjs(earthDate).format(DATE_FORMAT),
            sol: !earthDate ? sol : null
          },
          signal // for aborting call
        }
      );

      onResult(response.data.photos);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Mars Rover Request canceled");
      } else {
        console.error(err);
      }
    }
  };

  /**
   * Handles changes to the selected rover.
   * Resets the camera selection when the rover changes.
   * @param {object} e - The event object from the select input.
   */
  const handleRoverChange = (e) => {
    setRover(e.target.value);
    setCamera(undefined);
  };

  /**
   * Array of functions, each returning a JSX element for a search input component.
   * @type {Array<Function>}
   */
  const searchComponents = [
    () => (
      <FormControl fullWidth sx={{ minWidth: "125px"}}>
        <InputLabel id="mars-rover-label">Rover</InputLabel>
        <Select
          labelId="mars-rover-select-label"
          id="mars-rover"
          value={rover}
          label="Rover"
          onChange={(e) => handleRoverChange(e)}
        >
          {Object.values(marsRovers ?? {}).map((data) => (
            <MenuItem key={data.name} value={data.name}>{data.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    ),
    () => (
      <FormControl fullWidth sx={{ minWidth: "125px"}}>
        <InputLabel id="mars-rover-camera">Camera</InputLabel>
        <Select
          labelId="mars-rover-camera"
          id="mars-rover-camera-select"
          value={camera}
          label="Camera"
          onChange={(e) => setCamera(e.target.value)}
        >
          <MenuItem value={null}>None</MenuItem>
          {marsRovers[rover]?.cameras.map((camera) => {
            return <MenuItem key={rover + camera.name} value={camera.name.toLowerCase()}>{camera.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    ),
    () => (
      <FormControl fullWidth>
        <TextField
          disabled={earthDate}
          label="Sol"
          type="number"
          value={sol}
          onChange={(e) => {
            const num = Number(e.target.value);
            if (marsRovers[rover] && num > marsRovers[rover].max_sol) {
              setSol(marsRovers[rover].max_sol);
            } else if (num < 0) {
              setSol(0);
            } else {
              setSol(num);
            }
          }}
        />
      </FormControl>
    ),
    () => (
      <FormControl fullWidth>
        <DatePicker
          label="Earth Date"
          onChange={(val) => setEarthDate(val)}
        />
      </FormControl>
    )
  ];

  /**
   * Effect hook to fetch data whenever `rover`, `camera`, `sol`, or `earthDate` changes.
   * Includes a debounce mechanism and request cancellation.
   */
  useEffect(() => {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      getData({ signal: controller.signal });
    }, 500);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [rover, camera, sol, earthDate]);

  return explorer?.name === "marsRover" && <SearchComponents components={searchComponents}/>;
};

export default MarsRoverSearch;