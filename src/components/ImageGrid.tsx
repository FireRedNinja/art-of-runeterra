import React, { lazy, Suspense } from "react";

// const ImageTile = lazy(() => import("./ImageTile"));
import ImageTile from "./ImageTile";

// <ImageTile
//   title={item.name}
//   imgPath={item.assets[0].fullAbsolutePath}
//   key={item.cardCode}
// />
// type ImageGridProps = {
//   data: [
//     {
//       title: string;
//       imgPath: string;
//       url: string;
//     }
//   ]
// }

const ImageGrid = ({ data }): ImageGridProps => {
  const tiles = data.map((item) => (
    // <Suspense fallback={<div>Testing testing 123</div>}>
    <ImageTile
      title={item.title}
      imgPath={item.imgPath}
      key={item.key}
      url={item.url}
    />
    // </Suspense>
  ));
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {tiles}
    </div>
  );
};

export default ImageGrid;
