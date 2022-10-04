import React from "react";
import Styles from "./ImageTile.module.scss";

type ImageTileProps = {
  title: string;
  imgPath: string;
  // key?: string;
  url?: string;
};

const ImageTile = ({ title, imgPath, url }): ImageTileProps => {
  return (
    <a href={url ?? "#"}>
      <div className={Styles.ImageTile}>
        {/* we could maybe use <picture> */}
        <img src={imgPath} alt="" />
        <span className={Styles.title}>{title}</span>
      </div>
    </a>
  );
};

export default ImageTile;
