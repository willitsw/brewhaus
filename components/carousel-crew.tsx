import React, { useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import crew1 from "../images/brewhaus-group-1.png";
import crew2 from "../images/brewhaus-group-1.png";
import crew3 from "../images/brewhaus-group-1.png";
import crew4 from "../images/brewhaus-group-1.png";
import crew5 from "../images/brewhaus-group-1.png";
import crew6 from "../images/brewhaus-group-1.png";
import crew7 from "../images/brewhaus-group-1.png";

export const CarouselCrew = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  useEffect(() => {
    if (emblaApi) {
      // Embla API is ready
    }
  }, [emblaApi]);

  return (
    <div style={{ overflow: "hidden" }} ref={emblaRef}>
      <div style={{ display: "flex" }}>
        {[crew1, crew2, crew7, crew3, crew4, crew5, crew6].map(
          (bourbon, key) => (
            <div key={key} style={{ flex: "0 0 100%" }}>
              <Image src={bourbon} alt="The Brew Crew" />
            </div>
          )
        )}
      </div>
    </div>
  );
};
