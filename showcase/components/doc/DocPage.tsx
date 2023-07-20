import classnames from "classnames";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react";
import { OnThisPage } from "./OnThisPage";

type DocPageProps = {
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
};

const MutedText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={classnames("tracking-wider text-gray-600", className)}>
      {children}
    </p>
  );
};

type SectionTree = {
  title: string;
  children?: SectionTree[];
};

export const DocPage = ({ children, title, description }: DocPageProps) => {
  children = Children.map(children, (child) => {
    if (isValidElement(child) && child.type === DocSection) {
      return cloneElement(child as ReactElement<DocSectionProps>, {
        level: 2 as const,
      });
    }

    return child;
  });

  const sectionsTree = Children.toArray(children).flatMap(
    function createSectionTree(child): SectionTree[] {
      if (isValidElement(child) && child.type === DocSection) {
        return [
          {
            title: child.props.title as string,
            children: Children.toArray(child.props.children).flatMap(
              createSectionTree,
            ),
          },
        ];
      }

      return [];
    },
  );

  return (
    <div className="flex items-start gap-8 scroll-smooth">
      <article className="flex-1">
        <h1 id={title}>{title}</h1>

        {description && <MutedText className="mb-7">{description}</MutedText>}

        {children}
      </article>
      <div className="sticky top-0 mt-6 hidden min-w-max flex-initial lg:block">
        <OnThisPage tree={sectionsTree} />
      </div>
    </div>
  );
};

type DocSectionProps = DocPageProps & { level?: 1 | 2 | 3 | 4 | 5 | 6 };

export const DocSection = ({
  children,
  title,
  description,
  level = 2,
}: DocSectionProps) => {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements;
  children = Children.map(children, (child) => {
    if (isValidElement(child) && child.type === DocSection) {
      return cloneElement(child as ReactElement<DocSectionProps>, {
        level: (level + 1) as DocSectionProps["level"],
      });
    }

    return child;
  });

  return (
    <>
      <Heading id={title}>{title}</Heading>
      {description && <MutedText>{description}</MutedText>}
      {children}
    </>
  );
};
