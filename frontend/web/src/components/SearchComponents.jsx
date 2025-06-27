import { Box, Grid } from "@mui/material"

const SearchComponents = ({components}) => {
  return (
    <>
      <Box width={"100%"}>
          <Grid container spacing={2} justifyContent={"center"} fullWidth>
            {components.map((RenderComponent, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                {RenderComponent()}
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  )
} 

export default SearchComponents