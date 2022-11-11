import ImageTile from "./ImageTile";

const ImageGrid = ({data}: any) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {data.map((item:any) => (
        <div key={item.cardCode}>
          <ImageTile title={item.title} imgPath={item.imgPath} url={item.url} />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
