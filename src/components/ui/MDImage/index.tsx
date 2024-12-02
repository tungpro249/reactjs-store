const MDImage = ({
  src,
  alt,
  width,
  height,
  styles,
}: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  styles?: React.CSSProperties;
}) => {
  return (
    <img
      src={`${process.env.REACT_APP_IMAGE_URL}/${src.replace(/\\/g, "/")}`}
      alt={alt}
      width={width ?? "100%"}
      height={height ?? "100%"}
      style={styles}
    />
  );
};

export default MDImage;
