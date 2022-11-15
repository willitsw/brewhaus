import React, { useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import blantons from "../images/bourbon-blantons.jpg";
import eagle from "../images/bourbon-eagle.jpg";
import oldVanWinkle from "../images/bourbon-old-van-winkle.jpg";
import taylor from "../images/bourbon-taylor.jpg";
import vanWinkle from "../images/bourbon-van-winkle.jpg";
import weller from "../images/bourbon-weller.jpg";
import woodford from "../images/bourbon-woodford.jpg";

export const CarouselBourbon = () => {
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
          oldVanWinkle,
          taylor,
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
