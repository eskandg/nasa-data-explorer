import axios from "axios"
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from "react"
import { useContextData } from "../context/DataContext"
import dayjs from "dayjs";
import { DATE_FORMAT } from "../constants";
import SearchComponents from "./SearchComponents";

const MarsRoverSearch = ({explorer, onResult}) => {
  const {apiUrl, marsRovers} = useContextData()
  const [rover, setRover] = useState("Curiosity")
  const [camera, setCamera] = useState("fhaz")
  const [sol, setSol] = useState(0)
  const [earthDate, setEarthDate] = useState()

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
      )

      onResult(response.data.photos)
    } 
    catch (err) {
      if (axios.isCancel(err)) {
        console.log("Mars Rover Request canceled")
      } 
      else {
        console.error(err)
      }
    }
  }

  const handleRoverChange = (e) => {
    setRover(e.target.value)
    setCamera(undefined)
  }

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
            return <MenuItem key={rover + camera.name} value={camera.name.toLowerCase()}>{camera.name}</MenuItem>
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
            const num = Number(e.target.value)
            if (num > marsRovers[rover].max_sol) {
              setSol(marsRovers[rover].max_sol)
            }
            else if (num < 0) {
              setSol(0)
            }
            else {
              setSol(num)
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
  ]

  useEffect(() => {
    const controller = new AbortController()

    const timeout = setTimeout(() => {
      getData({ signal: controller.signal })
    }, 500)

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [rover, camera, sol, earthDate])

  return explorer?.name === "marsRover" && <SearchComponents components={searchComponents}/>
}

export default MarsRoverSearch