export type TIsWorkPermitHolder = "HAVE" | "NONE" | "UNKNOWN";

const isWorkPermitHolderList = (): {
  value: TIsWorkPermitHolder;
  text: string;
}[] => {
  return [
    {
      value: "HAVE",
      text: "label.hasWorkPermit",
    },
    {
      value: "NONE",
      text: "label.noWorkPermit",
    },
    {
      value: "UNKNOWN",
      text: "label.notSure",
    },
  ];
};

export { isWorkPermitHolderList };
