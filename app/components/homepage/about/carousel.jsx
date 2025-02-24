import { personalData } from "@/utils/data/personal-data";
import CarouselHelper from "../../helper/carouselHelper";
const AboutCarousel = () => {
  return (
    <CarouselHelper>
      {personalData.description.map((desc, index) => (
        <div key={index}>
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            {desc.title}
          </p>
          <p className="text-gray-200 text-sm lg:text-lg">{desc.description}</p>
        </div>
      ))}
    </CarouselHelper>
  );
};

export default AboutCarousel;
