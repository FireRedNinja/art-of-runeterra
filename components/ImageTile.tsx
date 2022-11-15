import Image from "next/image";


type ImageTileProps = {
  title?: string;
  imgPath: string;
  key?: string;
  url?: string;
};

const ImageTile = ({title, imgPath, key, url}: ImageTileProps) => {
  return (
    <a href={`${url ?? "/#"}`}>
      <div className="flex flex-col h-64 bg-gray-900 justify-center items-center">
        <img
          src={imgPath}
          alt=""
          className="h-full object-cover overflow-hidden opacity-40"
          loading="lazy"
          // height={325.5}
          // aspectRatio={2}
          // fit="cover"
          // position="centre"
          // format="avif"
          // quality={50}
        />
        <span className="flex absolute text-white">{title}</span>
      </div>
    </a>
  );
};

export default ImageTile;
