import type { Hints } from "codemirror";
import { sqlHint } from "../hintHelpers";

export enum SQLDataType {
  unknown = "unknown",
  keyword = "keyword",
  text = "text",
  int4 = "int4",
  table = "table",
}
export function getHintDetailsFromClassName(
  text: string,
  className?: string,
): {
  hintType: string;
  iconText: string;
  iconBgType: string;
} {
  switch (className) {
    case "CodeMirror-hint-table":
      const hintDataType = sqlHint.datasourceTableKeys[text];
      return hintDataType
        ? {
            hintType: hintDataType,
            iconText: hintDataType.charAt(0).toLocaleUpperCase(),
            iconBgType: hintDataType || SQLDataType.unknown,
          }
        : {
            hintType: SQLDataType.unknown,
            iconText: "U",
            iconBgType: SQLDataType.unknown,
          };

    case "CodeMirror-hint-keyword":
      return {
        hintType: SQLDataType.keyword,
        iconText: "K",
        iconBgType: SQLDataType.keyword,
      };
    default:
      return {
        hintType: SQLDataType.unknown,
        iconText: "U",
        iconBgType: SQLDataType.unknown,
      };
  }
}

const MAX_NUMBER_OF_SQL_HINTS = 200;

export function filterCompletions(completions: Hints) {
  completions.list = completions.list.slice(0, MAX_NUMBER_OF_SQL_HINTS);
  return completions;
}
