interface ITransformLanguageParams {
  language: string;
}

function transformLanguage({ language }: ITransformLanguageParams) {
  switch (language) {
    case "한국어":
      return "Korean";
    case "영어":
      return "English";
    case "일본어":
      return "Japanese";
    case "몽골어":
      return "Mongolian";
    case "태국어":
      return "Thai";
    case "우즈베크어":
      return "Uzbek";
    case "베트남어":
      return "Vietnamese";
    case "중국어":
      return "Chinese";
    default:
      return language;
  }
}

export { transformLanguage };
