import PageLayout from "layouts/PageLayout";
import Button from "components/Button";
import { Link } from "react-router-dom";
import TableData from "./tableData";

function Banner() {
  return (
    <PageLayout
      title={'Banners'}
      action={
        <Button component={Link} to={`/banners/addBanner`}>Add Banner</Button>
      }
    >
      <TableData />
    </PageLayout>
  );
}

export default Banner;
