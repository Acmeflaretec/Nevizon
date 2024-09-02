import { useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Box from "components/Box";
import Avatar from "components/Avatar";
import Typography from "components/Typography";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function Table({ columns, rows }) {
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const renderColumns = columns.map(({ name, align, width }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <Box
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="secondary"
        opacity={0.7}
        sx={({ palette: { light } }) => ({ borderBottom: `${borderWidth[1]} solid ${light.main}` })}
      >
        {name.toUpperCase()}
      </Box>
    );
  });

  const renderRows = rows.map((row, key) => {
    const rowKey = `row-${key}`;

    const tableRow = columns.map(({ name, align }) => {
      let template;

      if (Array.isArray(row[name])) {
        template = (
          <Box
            key={uuidv4()}
            component="td"
            p={1}
            sx={({ palette: { light } }) => ({
              borderBottom: row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null,
            })}
          >
            <Box display="flex" alignItems="center" py={0.5} px={1}>
              <Box mr={2}>
                <Avatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
              </Box>
              <Typography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
                {row[name][1]}
              </Typography>
            </Box>
          </Box>
        );
      } else {
        template = (
          <Box
            key={uuidv4()}
            component="td"
            p={1}
            textAlign={align}
            verticalAlign="middle"
            lineHeight={0.65}
            sx={({ palette: { light } }) => ({
              borderBottom: row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null,
            })}
          >
            <Typography
              variant="button"
              fontWeight="regular"
              color="secondary"
              sx={{ display: "inline-block", width: "max-content" }}
            >
              {row[name]}
            </Typography>
          </Box>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
    () => (
      <TableContainer>
        <MuiTable>
          <Box component="thead">
            <TableRow>{renderColumns}</TableRow>
          </Box>
          <TableBody>{renderRows}</TableBody>
        </MuiTable>
      </TableContainer>
    ),
    [columns, rows]
  );
}

// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [{}],
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
