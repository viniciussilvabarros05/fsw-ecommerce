import Image, { ImageProps } from "next/image";
const PromoBanner = ({ alt, ...props }: ImageProps) => (
  <Image
    height={0}
    width={0}
    alt={alt}
    sizes="100vw"
    className="h-auto w-full px-5"
    {...props}
  />
);

export default PromoBanner