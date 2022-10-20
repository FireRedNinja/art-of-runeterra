import React from "react";
import Styles from "./ImageTile.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

type ImageTileProps = {
  title?: string;
  imgPath?: string;
  // key?: string;
  url?: string;
};

const ImageTile = ({ title, imgPath, url }: ImageTileProps) => {
  return (
    <a href={`/art-of-runeterra${url ?? "/#"}`}>
      <div className={Styles.ImageTile}>
        {/* we could maybe use <picture> */}
        {/* <LazyLoadImage
          src={imgPath}
          alt=""
          className="w-full h-full"
          width={600}
          height={400}
        /> */}
        <img src={imgPath} alt="" loading="lazy" />
        <span className={Styles.title}>{title}</span>
      </div>
    </a>
  );
};

export default ImageTile;
