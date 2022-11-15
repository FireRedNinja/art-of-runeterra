import ImageGrid from "../../components/ImageGrid";
import Layout from "../../components/Layout";
import { getRegionByRegionRef, getCardsByRegion, regionsData as regions } from "../../data";

export const getStaticPaths = () => {
  return {
    paths: regions.map((region) => ({
      params: { regionRef: region.nameRef },
    })),
    fallback: false,

  }
};

export const getStaticProps = (context: any) => {
  return {
    props: context.params
  }
}

const Region = ({ regionRef }: any) => {
  const region = getRegionByRegionRef(regionRef);
  const cards = getCardsByRegion(regionRef);

  const gridProps = cards.map((card) => ({
    title: card.name,
    imgPath: card.assets[0].fullAbsolutePath,
    url: `/card/${card.cardCode}`,
  }));

  return (
    <Layout>
      <h1>{region?.name}</h1>
      <ImageGrid data={gridProps} />
    </Layout>
  );
};

export default Region;
