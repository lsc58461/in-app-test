export type TIsHousingSupport = "DORMITORY" | "MONTHLY_RENT" | "NEGOTIABLE";

const isHousingSupportList = (): {
  value: TIsHousingSupport;
  text: string;
}[] => {
  return [
    {
      value: "DORMITORY",
      text: "label.hasDormitory",
    },
    {
      value: "MONTHLY_RENT",
      text: "label.providesRentSupport",
    },
    {
      value: "NEGOTIABLE",
      text: "label.decideAfterDiscussion",
    },
  ];
};

export { isHousingSupportList };
