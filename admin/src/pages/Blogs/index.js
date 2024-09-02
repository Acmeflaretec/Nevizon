import PageLayout from "layouts/PageLayout";
import Button from "components/Button";
import { Link } from "react-router-dom";
import TableData from "./tableData";

function Blogs() {
  return (
    <PageLayout
      title={'Blogs'}
      action={
        <Button component={Link} to={`/blogs/addBlog`}>Add Blog</Button>
      }
    >
      <TableData/>
    </PageLayout>
  );
}

export default Blogs;
