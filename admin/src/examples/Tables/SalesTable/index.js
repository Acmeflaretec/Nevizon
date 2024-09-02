import { useMemo } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "components/Typography";
import Box from "components/Box";
import SalesTableCell from "examples/Tables/SalesTable/SalesTableCell";

function SalesTable({ title, rows }) {
  const renderTableCells = rows.map((row, key) => {
    const tableRows = [];
    const rowKey = `row-${key}`;

    Object.entries(row).map(([cellTitle, cellContent]) =>
      Array.isArray(cellContent)
        ? tableRows.push(
            <SalesTableCell
              key={cellContent[1]}
              title={cellTitle}
              content={cellContent[1]}
              image={cellContent[0]}
              noBorder={key === rows.length - 1}
            />
          )
        : tableRows.push(
            <SalesTableCell
              key={cellContent}
              title={cellTitle}
              content={cellContent}
              noBorder={key === rows.length - 1}
            />
          )
    );

    return <TableRow key={rowKey}>{tableRows}</TableRow>;
  });

  return (
    <TableContainer sx={{ height: "100%" }}>
      <Table>
        <TableHead>
          <Box component="tr" width="max-content" display="block" mb={1.5}>
            <Typography variant="h6" component="td">
              {title}
            </Typography>
          </Box>
        </TableHead>
        <TableBody>{useMemo(() => renderTableCells, [rows])}</TableBody>
      </Table>
    </TableContainer>
  );
}

// Setting default values for the props of SalesTable
SalesTable.defaultProps = {
  rows: [{}],
};

// Typechecking props for the SalesTable
SalesTable.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default SalesTable;
