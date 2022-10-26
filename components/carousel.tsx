import React, { useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import blantons from "../images/bourbon-blantons.jpeg";
import eagle from "../images/bourbon-eagle.jpeg";
import knob from "../images/bourbon-knob.jpeg";
import oldVanWinkle from "../images/bourbon-old-van-winkle.jpeg";
import stag from "../images/bourbon-stag.jpeg";
import taylor from "../images/bourbon-taylor.jpeg";
import turkey from "../images/bourbon-turkey.jpeg";
import vanWinkle from "../images/bourbon-van-winkle.jpeg";
import weller from "../images/bourbon-weller.jpeg";
import woodford from "../images/bourbon-woodford.jpeg";

export const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  useEffect(() => {
    if (emblaApi) {
      // Embla API is ready
    }
  }, [emblaApi]);

  return (
    <div style={{ overflow: "hidden" }} ref={emblaRef}>
      <div style={{ display: "flex" }}>
        {[
          blantons,
          eagle,
          knob,
          oldVanWinkle,
          stag,
          taylor,
          turkey,
          vanWinkle,
          weller,
          woodford,
        ].map((bourbon, key) => (
          <div key={key} style={{ flex: "0 0 100%" }}>
            <Image src={bourbon} alt="Bourbon pics for auction" />
          </div>
        ))}
      </div>
    </div>
  );
};
