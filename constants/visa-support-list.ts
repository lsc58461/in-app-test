export type TVisaSupport = "TRUE" | "FALSE" | "NEGOTIABLE";

const visaSupportList = (
  isJobPosting?: boolean
): { value: TVisaSupport; text: string }[] => {
  return [
    {
      value: "TRUE",
      text: isJobPosting
        ? "label.visaSponsorship"
        : "label.yesVisaSupportAvailable",
    },
    {
      value: "FALSE",
      text: "label.noVisaSupportUnavailable",
    },
    {
      value: "NEGOTIABLE",
      text: isJobPosting ? "label.negotiable3" : "label.decideAfterDiscussion",
    },
  ];
};

export { visaSupportList };
