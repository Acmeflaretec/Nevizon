import Button from 'components/Button';
import { Link } from 'react-router-dom';
import PageLayout from "layouts/PageLayout";
import TableData from "./tableData";

function Products() {
  return (
    <PageLayout
      title={'Products'}
      action={
        <Button component={Link} to={`/products/addProducts`}>Add Products</Button>
      }
    >
      <TableData/>
    </PageLayout>
  );
}

export default Products;
