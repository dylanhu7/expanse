"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/app/_components/ui/accordion";
import { cn } from "~/lib/utils";

const itemStyle =
  "flex flex-col overflow-auto flex-auto data-[state=closed]:flex-none w-full";
const triggerStyle = "pt-0 pb-1 font-semibold hover:no-underline select-none";
const contentStyle =
  "flex-auto overflow-auto data-[state=closed]:animate-none data-[state=open]:animate-none";

export const Sidebar = () => {
  return (
    <aside className="flex h-full w-full flex-shrink-0 basis-1/3 flex-col overflow-hidden bg-background py-2 pb-10 pr-10">
      <Accordion
        type="multiple"
        className="flex h-full flex-auto flex-col gap-2"
        defaultValue={["outline", "editor"]}
      >
        <AccordionItem value="outline" className={cn(itemStyle, "basis-1/2")}>
          <AccordionTrigger className={triggerStyle}>OUTLINE</AccordionTrigger>
          <AccordionContent className={contentStyle}>lol lol</AccordionContent>
        </AccordionItem>
        <AccordionItem value="editor" className={cn(itemStyle, "basis-1/2")}>
          <AccordionTrigger className={triggerStyle}>EDITOR</AccordionTrigger>
          <AccordionContent className={contentStyle}>lol</AccordionContent>
        </AccordionItem>
        <AccordionItem value="json" className={cn(itemStyle, "basis-full")}>
          <AccordionTrigger className={triggerStyle}>JSON</AccordionTrigger>
          <AccordionContent className={contentStyle}>lol</AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};
