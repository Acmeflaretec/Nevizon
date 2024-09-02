import Typography from "components/Typography";

const categoriesListData = [
  {
    color: "dark",
    icon: <i className="ni ni-mobile-button" style={{ fontSize: "12px" }} />,
    name: "Devices",
    description: (
      <>
        250 in stock,{" "}
        <Typography variant="caption" color="text" fontWeight="medium">
          346+ sold
        </Typography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: <i className="ni ni-tag" style={{ fontSize: "12px" }} />,
    name: "Tickets",
    description: (
      <>
        123 closed,{" "}
        <Typography variant="caption" color="text" fontWeight="medium">
          15 open
        </Typography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: <i className="ni ni-box-2" style={{ fontSize: "12px" }} />,
    name: "Error logs",
    description: (
      <>
        1 is active,{" "}
        <Typography variant="caption" color="text" fontWeight="medium">
          40 closed
        </Typography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: <i className="ni ni-satisfied" style={{ fontSize: "12px" }} />,
    name: "Happy Users",
    description: (
      <>
        <Typography variant="caption" color="text" fontWeight="medium">
          +&nbsp;430
        </Typography>
      </>
    ),
    route: "/",
  },
];

export default categoriesListData;
