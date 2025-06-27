import axios from "axios"
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from "react"
import { useContextData } from "../context/DataContext"
import dayjs from "dayjs";
import { DATE_FORMAT } from "../constants";
import SearchComponents from "./SearchComponents";

const ApodSearch = ({explorer, onResult}) => {
  const {apiUrl, marsRovers} = useContextData()
  const [startDate, setStartDate] = useState(dayjs())
  const [endDate, setEndDate] = useState()

  const getData = async ({ signal }) => {
    try {
      const response = await axios.get(
        `${apiUrl}/apod/`,
        {
          params: {
            start_date: startDate && dayjs(startDate).format(DATE_FORMAT),
            end_date: endDate && dayjs(endDate).format(DATE_FORMAT)
          },
          signal // for aborting call
        }
      )
      
      onResult(response.data)
    } 
    catch (err) {
      if (axios.isCancel(err)) {
        console.log("APOD Request canceled")
      } 
      else {
        console.error(err)
      }
    }
  }

  const handleEndDateChange = (val) => {
    if (!val) {
      setStartDate(undefined)
      setEndDate(undefined)
      return
    }

    setEndDate(val)
  }

  const searchComponents = [
    () => (
      <FormControl fullWidth>
        <DatePicker
          label="Start Date"
          onChange={(val) => setStartDate(val)}
        />
      </FormControl>
    ),
    () => (
      <FormControl fullWidth>
        <DatePicker
          disabled={!startDate}
          label="End Date"
          onChange={(val) => handleEndDateChange(val)}
        />
      </FormControl>
    ),
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
  }, [startDate, endDate])

  return explorer?.name === "apod" && <SearchComponents components={searchComponents}/>
}

export default ApodSearch