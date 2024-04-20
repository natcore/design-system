"use client";

import { Highlight } from "../Highlight";
import classnames from "classnames";
import { BasicContainer } from "./BasicContainer";
import { type ReactElement, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";

type ExampleContainerProps = {
  html: string | ReactElement;
  gridColumns?: number | "auto-fit";
  className?: string;
  outputClassName?: string;
};

export const ExampleContainer = ({
  html,
  className,
  outputClassName,
  gridColumns = "auto-fit",
}: ExampleContainerProps) => {
  const [htmlToDisplay, setHtmlToDisplay] = useState("");

  useEffect(() => {
    if (typeof html === "string") {
      setHtmlToDisplay(html);
    } else {
      const div = document.createElement("div");
      const root = createRoot(div);

      setTimeout(() => {
        flushSync(() => {
          root.render(html);
        });
        setHtmlToDisplay(div.innerHTML);
      }, 0);
    }
  }, [html]);

  return (
    <BasicContainer className={classnames("card-ghost", className)}>
      <div
        className={classnames(
          "grid items-center justify-center gap-3",
          outputClassName,
        )}
        style={{
          gridTemplateColumns: `repeat(${gridColumns}, minmax(115px, 1fr))`,
        }}
        {...(typeof html === "string"
          ? { dangerouslySetInnerHTML: { __html: html } }
          : { children: html })}
      />
      <div className="divider divider-secondary mb-2">Source</div>
      <Highlight component="code" content={htmlToDisplay} language="html" />
    </BasicContainer>
  );
};
