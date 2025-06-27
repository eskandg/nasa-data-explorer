/**
 * @file Component for rendering a collection of search input components in a responsive grid.
 */

import { Box, Grid } from "@mui/material";

/**
 * SearchComponents component renders an array of functional components within a responsive Material-UI Grid.
 * Each functional component in the `components` array is expected to return a JSX element representing a search input.
 * @param {object} props - The component props.
 * @param {Array<Function>} props.components - An array of functions, where each function returns a JSX element for a search input.
 * @returns {JSX.Element} A Box containing a Grid with the rendered search components.
 */
const SearchComponents = ({ components }) => {
  return (
    <>
      <Box width={"100%"}>
          <Grid container spacing={2} justifyContent={"center"} fullWidth>
            {components.map((RenderComponent, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                {/* Each RenderComponent is a function that returns a JSX element */}
                {RenderComponent()}
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default SearchComponents;