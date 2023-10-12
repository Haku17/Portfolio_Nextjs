import { useActiveSectionContext } from "@/context/ActiveSectionContext";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { type SectionName } from "@/lib/types";

export function useSectionInView(sectionName: SectionName, threshold = 0.75) {
  // ref: ref to be attached to element
  // inView: boolean that says if ref is within viewport
  // threshold: percentage of ref in viewport before activation
  const { ref, inView } = useInView({
    threshold,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName);
    }
  }, [inView, timeOfLastClick, sectionName]);

  return {
    ref,
  };
}
