import ImageGrid from "../components/ImageGrid";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

import { regionsData as regions } from "../data/";

const gridData = regions.map((region) => ({
  imgPath: region.iconAbsolutePath,
  title: region.name,
  key: region.nameRef,
  url: `/region/${region.nameRef}`,
}));

export default function Home() {
  return (
    <Layout>
      <ImageGrid data={gridData} />
    </Layout>
  );
}
