import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import bannersApi from "@/api/banner/apiBanner";
import { DotButton, NextButton, PrevButton } from "./Components";
import "./style.scss";
import "./BannerComponent.scss";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import SkeletonAll from "@/util/SkeletonAll";

type Props = {
  // setScrollPosition: React.Dispatch<SetStateAction<Number>>;
};

const BannerComponent = (props: Props) => {
  const options: EmblaOptionsType = {
    loop: true,
    align: "center",
  };

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [reponsiveMobile, setReponsiveMobile] = useState<boolean>(false);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [dataBanners, setDataBanners] = useState<any>([]);
  const emblaContainerRef = React.useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 1000000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const getBannersApi = async () => {
    const result = await bannersApi.getBannersApi("vi", null);
    try {
      if (result) {
        console.log(result);
        setDataBanners(result.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getBannersApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const SLIDE_COUNT = dataBanners.length;
  const slideCount = useRef(dataBanners.length);
  slideCount.current = dataBanners.length;
  const slides = useMemo(() => {
    return Array.from(Array(15).keys());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imageByIndex = (index: number): any =>
    dataBanners[index % dataBanners.length];

  const handleMouseEvent = () => {
    const { current: emblaContainerEl } = emblaContainerRef;

    if (emblaContainerEl) {
      emblaContainerEl.addEventListener("mousedown", () => {
        emblaContainerEl.style.cursor = "grabbing";
        // (emblaApi as any)?.clickAllowed();
      });

      emblaContainerEl.addEventListener("mouseup", () => {
        emblaContainerEl.style.cursor = "grab";
      });
    }
  };

  React.useEffect(() => {
    handleMouseEvent();
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1350) {
        setReponsiveMobile(true);
      } else {
        setReponsiveMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="flex flex-col items-center relative mt-5 w-full justify-center">
      <div className={`embla w-full !p-0  image-bg-item`}>
        <SkeletonAll data={dataBanners}>
          {dataBanners && dataBanners.length > 0 && (
            <>
              <div className="embla__viewport !rounded-none" ref={emblaRef}>
                <div
                  className="embla__container"
                  ref={emblaContainerRef}
                  style={
                    {
                      // marginLeft: "1px",
                      // borderRadius: "20px",
                      // columnGap: "20px",
                    }
                  }
                >
                  {slides?.map((value: any, index: number) => (
                    <div className="embla__slide" key={index}>
                      <div className="embla__slide__number">
                        <span>{index + 1}</span>
                      </div>
                      <div className="w-full h-full gradient-bg-item">
                        <div className="embla__slide__img">
                          <img
                            className="w-screen img-item"
                            src={
                              imageByIndex(index)
                                ? imageByIndex(index).image
                                : ""
                            }
                            alt={`ảnh banner`}
                          />
                          <div
                            className={`w-full content-item ${
                              reponsiveMobile ? "px-4" : "px-32"
                            } py-8 flex justify-between`}
                          >
                            <div>
                              <p className="font-bold text-white">
                                The Global Leader of Advanced Construction
                                Materials
                              </p>
                              <p className="font-medium text-gray-300">
                                Công ty cổ phần Silkroad Hà Nội
                              </p>
                            </div>
                            <div className="rounded-xl border-2 p-2 h-fit font-semibold text-white hover:bg-white hover:text-blue-500 cursor-pointer">
                              Apply
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`${reponsiveMobile ? " -translate-y-48" : ""}`}>
                  <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                  <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
                </div>
              </div>

              <div className="embla__dots">
                {scrollSnaps.map((_, index) => (
                  <DotButton
                    key={index}
                    selected={index === selectedIndex}
                    onClick={() => scrollTo(index)}
                  />
                ))}
              </div>
            </>
          )}
        </SkeletonAll>
      </div>
    </div>
  );
};

export default BannerComponent;
