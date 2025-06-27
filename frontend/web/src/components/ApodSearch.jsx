/**
 * @file Component for searching Astronomy Picture of the Day (APOD) data.
 * Allows users to select a start and end date to fetch APOD images.
 */

import axios from "axios";
import { FormControl } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from "react";
import { useContextData } from "../context/DataContext";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../constants";
import SearchComponents from "./SearchComponents";

/**
 * ApodSearch component for fetching Astronomy Picture of the Day (APOD) data.
 * @param {object} props - The component props.
 * @param {object} props.explorer - The current explorer object, used to conditionally render.
 * @param {function} props.onResult - Callback function to handle the search results.
 * @returns {JSX.Element|null} The search components for APOD or null if not the active explorer.
 */
const ApodSearch = ({ explorer, onResult }) => {
  const { apiUrl } = useContextData();
  
  /**
   * State for the selected start date.
   * @type {[dayjs.Dayjs|undefined, Function]}
   */
  const [startDate, setStartDate] = useState(dayjs());
  
  /**
   * State for the selected end date.
   * @type {[dayjs.Dayjs|undefined, Function]}
   */
  const [endDate, setEndDate] = useState();

  /**
   * Fetches APOD data from the NASA API.
   * @param {object} options - Options for the data fetching.
   * @param {AbortSignal} options.signal - Abort signal for cancelling the request.
   */
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
      );
      
      onResult(response.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("APOD Request canceled");
      } else {
        console.error(err);
      }
    }
  };

  /**
   * Handles changes to the end date.
   * If the value is null, both start and end dates are reset.
   * @param {dayjs.Dayjs|null} val - The new end date value.
   */
  const handleEndDateChange = (val) => {
    if (!val) {
      setStartDate(undefined);
      setEndDate(undefined);
      return;
    }

    setEndDate(val);
  };

  /**
   * Array of functions, each returning a JSX element for a search input component.
   * @type {Array<Function>}
   */
  const searchComponents = [
    () => (
      <FormControl fullWidth>
        <DatePicker
          label="Start Date"
          onChange={(val) => setStartDate(val)}
          minDate={dayjs("1995-06-16")}
          maxDate={dayjs()}
        />
      </FormControl>
    ),
    () => (
      <FormControl fullWidth>
        <DatePicker
          disabled={!startDate}
          label="End Date"
          onChange={(val) => handleEndDateChange(val)}
          minDate={dayjs("1995-06-16")}
          maxDate={dayjs()}
        />
      </FormControl>
    ),
  ];

  /**
   * Effect hook to fetch data whenever `startDate` or `endDate` changes.
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
  }, [startDate, endDate]);

  return explorer?.name === "apod" && <SearchComponents components={searchComponents}/>;
};

export default ApodSearch;