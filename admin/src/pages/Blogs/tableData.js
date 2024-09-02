/* eslint-disable react/prop-types */
import Box from "components/Box";
import Typography from "components/Typography";
import Table from "examples/Tables/Table";
import { Avatar, Icon } from "@mui/material";
import Badge from "components/Badge";
import { Link } from "react-router-dom";
import { useGetBlogs } from "queries/StoreQuery";

function Blogs({ image, name, desc }) {
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
  const { data, isLoading } = useGetBlogs({ pageNo: 1, pageCount: 100 });
  const columns = [
    { name: "Blogs", align: "left" },
    { name: "url", align: "center" },
    { name: "status", align: "center" },
    { name: "createdon", align: "center" },
    { name: "Lastupdated", align: "center" },
    { name: "action", align: "center" },
  ]

  const rows = data?.data?.map(item => ({
    Blogs: <Blogs image={`${process.env.REACT_APP_API_URL}/uploads/${item?.image}`} name={item?.title} desc={item?.subtitle} />,
    url: (
      <Typography variant="caption" color="secondary" fontWeight="medium">
        <a href={item?.url}>{item?.url}</a>
      </Typography>
    ),
    status: (
      <Badge variant="gradient" badgeContent={item?.status ? 'Available' : 'Unavailable'} color={item?.status ? "success" : 'secondary'} size="xs" container />
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
      <Link to={`/blogs/editBlog/${item?._id}`}>
        <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
          more_vert
        </Icon>
      </Link>
    ),
  }))
  return isLoading ? <Typography fontSize={14} sx={{ paddingX: 5 }}>loading...</Typography> : <Table columns={columns} rows={rows} />
};

export default TableData;
