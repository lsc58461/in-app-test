export type TResponsibility =
  | "서비스/판매"
  | "외식/음료"
  | "제조/생산"
  | "경영/사무"
  | "마케팅/영업"
  | "디자인"
  | "농업/어업/축산"
  | "IT/개발"
  | "교육/강사"
  | "무역/물류"
  | "영업/CS"
  | "건설/건축"
  | "엔터테인먼트"
  | "통역/번역"
  | "여행/관광"
  | "카운터/캐셔"
  | "운전/배달"
  | "병원/의료"
  | "문화/스포츠"
  | "R&D"
  | "기타";

const responsibilityList = (): { value: TResponsibility; text: string }[] => {
  return [
    {
      value: "서비스/판매",
      text: "서비스/판매",
    },
    {
      value: "외식/음료",
      text: "외식/음료",
    },
    {
      value: "제조/생산",
      text: "제조/생산",
    },
    {
      value: "경영/사무",
      text: "경영/사무",
    },
    {
      value: "마케팅/영업",
      text: "마케팅/영업",
    },
    {
      value: "디자인",
      text: "디자인",
    },
    {
      value: "농업/어업/축산",
      text: "농업/어업/축산",
    },
    {
      value: "IT/개발",
      text: "IT/개발",
    },
    {
      value: "교육/강사",
      text: "교육/강사",
    },
    {
      value: "무역/물류",
      text: "무역/물류",
    },
    {
      value: "영업/CS",
      text: "영업/CS",
    },
    {
      value: "건설/건축",
      text: "건설/건축",
    },
    {
      value: "엔터테인먼트",
      text: "엔터테인먼트",
    },
    {
      value: "통역/번역",
      text: "통역/번역",
    },
    {
      value: "여행/관광",
      text: "여행/관광",
    },
    {
      value: "카운터/캐셔",
      text: "카운터/캐셔",
    },
    {
      value: "운전/배달",
      text: "운전/배달",
    },
    {
      value: "병원/의료",
      text: "병원/의료",
    },
    {
      value: "문화/스포츠",
      text: "문화/스포츠",
    },
    {
      value: "R&D",
      text: "R&D",
    },
    {
      value: "기타",
      text: "기타",
    },
  ];
};

export { responsibilityList };
