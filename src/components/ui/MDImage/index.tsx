const MDImage = ({
    src,
    alt,
    width,
    height,
}: { src: string; alt?: string; width?: number; height?: number }) => {
    return (
        <img
            src={`http://localhost:1000/${src.replace(/\\/g, '/')}`}
            alt={alt}
            width={width ?? '100%'}
            height={height ?? '100%'}
        />
    )
}

export default MDImage
