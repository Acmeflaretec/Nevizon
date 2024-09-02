import React from 'react'
import PropTypes from 'prop-types';
import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";

const PageLayout = ({ title, action, children }) => {
  return (
    <Box py={3}>
      <Card sx={{ boxShadow: 10, minHeight: '70vh' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <Typography variant="h6">{title}</Typography>
          {action}
        </Box>
        <Box
          sx={{
            "& .MuiTableRow-root:not(:last-child)": {
              "& td": {
                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              },
            },
          }}
        >
          {children}
        </Box>
      </Card>
    </Box>
  )
}

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default PageLayout