import { VisaType } from "@/types/visa";

export interface IVisaInfo {
  name: string;
  abbreviation: VisaType;
  visaCode: string;
}

export interface IVisaList {
  [key: string]: IVisaInfo;
}

const VISA_LIST = ({
  noneText,
}: {
  noneText?: "irrelevant" | "unspecified" | "none";
}): IVisaList => ({
  none: {
    name: (() => {
      if (noneText === "irrelevant") return "label.irrelevant";
      if (noneText === "unspecified") return "label.unspecified";
      return "label.deselect";
    })(),
    abbreviation: "NONE",
    visaCode: "NONE",
  },
  diplomacy: {
    name: `${"visaInfo.diplomacy"}(A-1)`,
    abbreviation: "A1",
    visaCode: "A-1",
  },
  civilService: {
    name: `${"visaInfo.civilService"}(A-2)`,
    abbreviation: "A2",
    visaCode: "A-2",
  },
  agreement: {
    name: `${"visaInfo.agreement"}(A-3)`,
    abbreviation: "A3",
    visaCode: "A-3",
  },
  visaWaiver: {
    name: `${"visaInfo.visaWaiver"}(B-1)`,
    abbreviation: "B1",
    visaCode: "B-1",
  },
  sightseeingPassing: {
    name: `${"visaInfo.sightseeingPassing"}(B-2)`,
    abbreviation: "B2",
    visaCode: "B-2",
  },
  temporaryCoverage: {
    name: `${"visaInfo.temporaryCoverage"}(C-1)`,
    abbreviation: "C1",
    visaCode: "C-1",
  },
  shortTermVisit: {
    name: `${"visaInfo.shortTermVisit"}(C-3)`,
    abbreviation: "C3",
    visaCode: "C-3",
  },
  shortTermEmployment: {
    name: `${"visaInfo.shortTermEmployment"}(C-4)`,
    abbreviation: "C4",
    visaCode: "C-4",
  },
  cultureAndArt: {
    name: `${"visaInfo.cultureAndArt"}(D-1)`,
    abbreviation: "D1",
    visaCode: "D-1",
  },
  studyAbroad: {
    name: `${"visaInfo.studyAbroad"}(D-2)`,
    abbreviation: "D2",
    visaCode: "D-2",
  },
  technicalTraining: {
    name: `${"visaInfo.technicalTraining"}(D-3)`,
    abbreviation: "D3",
    visaCode: "D-3",
  },
  generalTraining: {
    name: `${"visaInfo.generalTraining"}(D-4)`,
    abbreviation: "D4",
    visaCode: "D-4",
  },
  cover: {
    name: `${"visaInfo.cover"}(D-5)`,
    abbreviation: "D5",
    visaCode: "D-5",
  },
  religion: {
    name: `${"visaInfo.religion"}(D-6)`,
    abbreviation: "D6",
    visaCode: "D-6",
  },
  preside: {
    name: `${"visaInfo.preside"}(D-7)`,
    abbreviation: "D7",
    visaCode: "D-7",
  },
  corporateInvestment: {
    name: `${"visaInfo.corporateInvestment"}(D-8)`,
    abbreviation: "D8",
    visaCode: "D-8",
  },
  tradeManagement: {
    name: `${"visaInfo.tradeManagement"}(D-9)`,
    abbreviation: "D9",
    visaCode: "D-9",
  },
  jobSearch: {
    name: `${"visaInfo.jobSearch"}(D-10)`,
    abbreviation: "D10",
    visaCode: "D-10",
  },
  professor: {
    name: `${"visaInfo.professor"}(E-1)`,
    abbreviation: "E1",
    visaCode: "E-1",
  },
  paintingMap: {
    name: `${"visaInfo.paintingMap"}(E-2)`,
    abbreviation: "E2",
    visaCode: "E-2",
  },
  research: {
    name: `${"visaInfo.research"}(E-3)`,
    abbreviation: "E3",
    visaCode: "E-3",
  },
  technicalMap: {
    name: `${"visaInfo.technicalMap"}(E-4)`,
    abbreviation: "E4",
    visaCode: "E-4",
  },
  profession: {
    name: `${"visaInfo.profession"}(E-5)`,
    abbreviation: "E5",
    visaCode: "E-5",
  },
  entertainment: {
    name: `${"visaInfo.entertainment"}(E-6)`,
    abbreviation: "E6",
    visaCode: "E-6",
  },
  specificActivity: {
    name: `${"visaInfo.specificActivity"}(E-7)`,
    abbreviation: "E7",
    visaCode: "E-7",
  },
  skilledWorker: {
    name: `${"visaInfo.skilledWorker"}(E-7-4)`,
    abbreviation: "E74",
    visaCode: "E-7-4",
  },
  regionalSkilledWorker: {
    name: `${"visaInfo.regionalSkilledWorker"}(E-7-4R)`,
    abbreviation: "E74R",
    visaCode: "E-7-4R",
  },
  nonProfessionalEmployment: {
    name: `${"visaInfo.nonProfessionalEmployment"}(E-9)`,
    abbreviation: "E9",
    visaCode: "E-9",
  },
  sailorEmployment: {
    name: `${"visaInfo.sailorEmployment"}(E-10)`,
    abbreviation: "E10",
    visaCode: "E-10",
  },
  livingTogether: {
    name: `${"visaInfo.livingTogether"}(F-1)`,
    abbreviation: "F1",
    visaCode: "F-1",
  },
  residence: {
    name: `${"visaInfo.residence"}(F-2)`,
    abbreviation: "F2",
    visaCode: "F-2",
  },
  residenceTalent: {
    name: `${"visaInfo.residenceTalent"}(F-2-7)`,
    abbreviation: "F27",
    visaCode: "F-2-7",
  },
  residenceSpecialization: {
    name: `${"visaInfo.residenceSpecialization"}(F-2-R)`,
    abbreviation: "F2R",
    visaCode: "F-2-R",
  },
  accompany: {
    name: `${"visaInfo.accompany"}(F-3)`,
    abbreviation: "F3",
    visaCode: "F-3",
  },
  overseasKoreans: {
    name: `${"visaInfo.overseasKoreans"}(F-4)`,
    abbreviation: "F4",
    visaCode: "F-4",
  },
  overseasKoreansSpecial: {
    name: `${"visaInfo.overseasKoreansSpecial"}(F-4-R)`,
    abbreviation: "F4R",
    visaCode: "F-4-R",
  },
  permanentResidence: {
    name: `${"visaInfo.permanentResidence"}(F-5)`,
    abbreviation: "F5",
    visaCode: "F-5",
  },
  marriageImmigration: {
    name: `${"visaInfo.marriageImmigration"}(F-6)`,
    abbreviation: "F6",
    visaCode: "F-6",
  },
  etc: {
    name: `${"visaInfo.etc"}(G-1)`,
    abbreviation: "G1",
    visaCode: "G-1",
  },
  tourismEmployment: {
    name: `${"visaInfo.tourismEmployment"}(H-1)`,
    abbreviation: "H1",
    visaCode: "H-1",
  },
  jobVisit: {
    name: `${"visaInfo.jobVisit"}(H-2)`,
    abbreviation: "H2",
    visaCode: "H-2",
  },
});

const VISA_LIST_KOREAN = {
  none: {
    name: "NONE",
    abbreviation: "NONE",
    visaCode: "NONE",
  },
  diplomacy: {
    name: "외교(A-1)",
    abbreviation: "A1",
    visaCode: "A-1",
  },
  civilService: {
    name: "공무(A-2)",
    abbreviation: "A2",
    visaCode: "A-2",
  },
  agreement: {
    name: "협정(A-3)",
    abbreviation: "A3",
    visaCode: "A-3",
  },
  visaWaiver: {
    name: "사증면제(B-1)",
    abbreviation: "B1",
    visaCode: "B-1",
  },
  sightseeingPassing: {
    name: "관광·통과(B-2)",
    abbreviation: "B2",
    visaCode: "B-2",
  },
  temporaryCoverage: {
    name: "일시취재(C-1)",
    abbreviation: "C1",
    visaCode: "C-1",
  },
  shortTermVisit: {
    name: "단기방문(C-3)",
    abbreviation: "C3",
    visaCode: "C-3",
  },
  shortTermEmployment: {
    name: "단기취업(C-4)",
    abbreviation: "C4",
    visaCode: "C-4",
  },
  cultureAndArt: {
    name: "문화예술(D-1)",
    abbreviation: "D1",
    visaCode: "D-1",
  },
  studyAbroad: {
    name: "유학(D-2)",
    abbreviation: "D2",
    visaCode: "D-2",
  },
  technicalTraining: {
    name: "기술연수(D-3)",
    abbreviation: "D3",
    visaCode: "D-3",
  },
  generalTraining: {
    name: "일반연수(D-4)",
    abbreviation: "D4",
    visaCode: "D-4",
  },
  cover: {
    name: "취재(D-5)",
    abbreviation: "D5",
    visaCode: "D-5",
  },
  religion: {
    name: "종교(D-6)",
    abbreviation: "D6",
    visaCode: "D-6",
  },
  preside: {
    name: "주재(D-7)",
    abbreviation: "D7",
    visaCode: "D-7",
  },
  corporateInvestment: {
    name: "기업투자(D-8)",
    abbreviation: "D8",
    visaCode: "D-8",
  },
  tradeManagement: {
    name: "무역경영(D-9)",
    abbreviation: "D9",
    visaCode: "D-9",
  },
  jobSearch: {
    name: "구직(D-10)",
    abbreviation: "D10",
    visaCode: "D-10",
  },
  professor: {
    name: "교수(E-1)",
    abbreviation: "E1",
    visaCode: "E-1",
  },
  paintingMap: {
    name: "회화지도(E-2)",
    abbreviation: "E2",
    visaCode: "E-2",
  },
  research: {
    name: "연구(E-3)",
    abbreviation: "E3",
    visaCode: "E-3",
  },
  technicalMap: {
    name: "기술지도(E-4)",
    abbreviation: "E4",
    visaCode: "E-4",
  },
  profession: {
    name: "전문직업(E-5)",
    abbreviation: "E5",
    visaCode: "E-5",
  },
  entertainment: {
    name: "예술흥행(E-6)",
    abbreviation: "E6",
    visaCode: "E-6",
  },
  specificActivity: {
    name: "특정활동(E-7)",
    abbreviation: "E7",
    visaCode: "E-7",
  },
  skilledWorker: {
    name: "숙련기능인력(E-7-4)",
    abbreviation: "E74",
    visaCode: "E-7-4",
  },
  regionalSkilledWorker: {
    name: "지역특화숙련기능인력(E-7-4R)",
    abbreviation: "E74R",
    visaCode: "E-7-4R",
  },
  nonProfessionalEmployment: {
    name: "비전문취업(E-9)",
    abbreviation: "E9",
    visaCode: "E-9",
  },
  sailorEmployment: {
    name: "선원취업(E-10)",
    abbreviation: "E10",
    visaCode: "E-10",
  },
  livingTogether: {
    name: "방문동거(F-1)",
    abbreviation: "F1",
    visaCode: "F-1",
  },
  residence: {
    name: "거주(F-2)",
    abbreviation: "F2",
    visaCode: "F-2",
  },
  residenceTalent: {
    name: "우수인재(F-2-7)",
    abbreviation: "F27",
    visaCode: "F-2-7",
  },
  residenceSpecialization: {
    name: "지역특화(F-2-R)",
    abbreviation: "F2R",
    visaCode: "F-2-R",
  },
  accompany: {
    name: "동반(F-3)",
    abbreviation: "F3",
    visaCode: "F-3",
  },
  overseasKoreans: {
    name: "재외동포(F-4)",
    abbreviation: "F4",
    visaCode: "F-4",
  },
  overseasKoreansSpecial: {
    name: "지역특화재외동포(F-4-R)",
    abbreviation: "F4R",
    visaCode: "F-4-R",
  },
  permanentResidence: {
    name: "영주(F-5)",
    abbreviation: "F5",
    visaCode: "F-5",
  },
  marriageImmigration: {
    name: "결혼이민(F-6)",
    abbreviation: "F6",
    visaCode: "F-6",
  },
  etc: {
    name: "기타(G-1)",
    abbreviation: "G1",
    visaCode: "G-1",
  },
  tourismEmployment: {
    name: "관광취업(H-1)",
    abbreviation: "H1",
    visaCode: "H-1",
  },
  jobVisit: {
    name: "방문취업(H-2)",
    abbreviation: "H2",
    visaCode: "H-2",
  },
};

export { VISA_LIST, VISA_LIST_KOREAN };
