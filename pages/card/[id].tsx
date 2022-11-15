import Layout from "../../components/Layout";

import { cardCodes, getCardById } from "../../data";

export const getStaticPaths = () => {
  return {
    paths: cardCodes.map((id) => ({
      params: { id },
    })),
    fallback: false,
  }
};

export const getStaticProps = (context: any) => {
  return {
    props: context.params,
  }
}

const Card = ({ id }: any) => {
  const card = getCardById(id);
  return (
    <Layout>
      <h1>{`${card?.name} by ${card?.artistName}`}</h1>
      <p>{card?.flavorText}</p>
      {/* <Image src={card?.assets[0].fullAbsolutePath} alt="" height={1024} aspectRatio={2}/> */}
      <div className="flex justify-center">
        <img
          src={card?.assets[0].fullAbsolutePath}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
    </Layout>
  );
};

export default Card;
