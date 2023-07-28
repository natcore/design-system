import { type PluginAPI } from "tailwindcss/types/config";
import { createVariants } from "../colors";

export default (theme: PluginAPI["theme"]) => ({
  ".tabs": {
    ...createVariants("tabs", { defaultColor: "surface" }),

    // display: "grid",
    // gridTemplateColumns: "repeat(auto-fill, minmax(max-content, 1px))",
    // gridTemplateRows: "auto 1fr",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    rowGap: theme("spacing.2")!,

    "> .tab": {
      padding: `${theme("spacing.2")!} ${theme("spacing.4")!}`,
      color: "currentColor",
      opacity: "0.75",
      cursor: "pointer",
    },

    "input[type=radio]": {
      display: "none",
    },

    ".tab-content": {
      order: "100",
      width: "100%",
    },

    "> input[type=radio]:not(:checked) + .tab + .tab-content": {
      display: "none",
    },

    "> input[type=radio]:checked + .tab": {
      opacity: "1",
      fontWeight: theme("fontWeight.medium")!,
      borderBottomWidth: theme("borderWidth.2")!,
      borderBottomColor: "var(--tabs-active)",
      color: "var(--tabs-active)",
    },

    "> input[type=radio]:disabled + .tab": {
      cursor: "not-allowed",
      opacity: "0.5",
    },
  },
});
