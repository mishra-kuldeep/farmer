import Section1Home from "@/component/homepage/section1/Section1Home";
import Section2Home from "@/component/homepage/section2/Section2Home";
import Section3Home from "@/component/homepage/section3/Section3Home";
import Slider from "@/component/slider/Slider";

export default function Home() {
  return (
    <>
    <Slider/>
    <Section1Home/>
    <Section2Home/>
    <Section3Home/>
    </>
  );
}
