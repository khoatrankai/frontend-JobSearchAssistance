import { FC, useCallback, useEffect, useRef, useState } from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import { LightGallery as ILightGallery } from "lightgallery/lightgallery";
// import './style.scss';

type Props = {
  src: any;
};

const CustomLightImage = ({ src }: Props) => {
  const [dynamicEl, setdynamicEl] = useState<any>();
  useEffect(() => {
    //console.log(src);
    setdynamicEl([{ src: src }]);
  }, [src]);
  return (
    <>
      <LightGallery plugins={[lgZoom]} speed={500}>
        <img src={src} alt="" className="h-full" />
      </LightGallery>
    </>
  );
};

export default CustomLightImage;
