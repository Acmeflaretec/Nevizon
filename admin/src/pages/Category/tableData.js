/* eslint-disable react/prop-types */
import Box from "components/Box";
import Typography from "components/Typography";
import Avatar from "components/Avatar";
import Badge from "components/Badge";
import { useGetCategory } from "queries/ProductQuery";
import Table from "examples/Tables/Table";
import { Icon } from "@mui/material";
import { Link } from "react-router-dom";

function Category({ image, name, desc }) {
  return (
    <Box display="flex" alignItems="center" px={1} py={0.5}>
      <Box mr={2}>
        <Avatar src={image} alt={name} size="sm" variant="rounded" />
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography variant="button" fontWeight="medium">
          {name}
        </Typography>
        <Typography variant="caption" color="secondary">
          {desc}
        </Typography>
      </Box>
    </Box>
  );
}

const TableData = () => {
  const { data, isLoading } = useGetCategory({ pageNo: 1, pageCount: 100 });
  const columns = [
    { name: "category", align: "left" },
    { name: "status", align: "center" },
    { name: "createdon", align: "center" },
    { name: "Lastupdated", align: "center" },
    { name: "action", align: "center" },
  ]
console.log('data',data);
  const rows = data?.data?.map(item => ({
    category: <Category image={`${process.env.REACT_APP_API_URL}/uploads/${item?.image}`} name={item?.name} desc={item?.desc} />,
    status: (
      <Badge variant="gradient" badgeContent={item?.isAvailable ? 'Available' : 'Unavailable'} color={item?.isAvailable ? "success" : 'secondary'} size="xs" container />
    ),
    createdon: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {new Date(item?.createdAt).toDateString()}
      </Typography>
    ),
    Lastupdated: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        {new Date(item?.updatedAt).toDateString()}
      </Typography>
    ),
    action: (
      <Link to={`/category/editCategory/${item?._id}`}>
        <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
          more_vert
        </Icon>
      </Link>
    ),
  }))
  return isLoading ? <Typography fontSize={14} sx={{ paddingX: 5 }}>loading...</Typography> : <Table columns={columns} rows={rows} />
};

export default TableData;
