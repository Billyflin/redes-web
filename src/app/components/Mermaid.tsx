import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.initialize({ startOnLoad: true, theme: "default" });
      try {
        mermaid.contentLoaded();
      } catch (error) {
        console.error("Mermaid failed to render the diagram:", error);
      }
    }
  }, []);

  return (
    <div
      className="mermaid"
      ref={mermaidRef}
      dangerouslySetInnerHTML={{ __html: chart }}
    />
  );
}
