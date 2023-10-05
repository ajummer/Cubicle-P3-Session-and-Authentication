exports.getDifficultyLevel = (difficultyLevel) => {
  const titles = [
    "Very Easy",
    "Easy",
    "Medium (Standard 3x3)",
    "Intermediate",
    "Expert",
    "Hardcore",
  ];

  // For every title in titles create  a new option and if that option value == difficultyLevel of the passed cube selected will return true 
    const options = titles.map((title, index) => ({
    title: `${index + 1} - ${title}`,
    value: index + 1,
    selected: Number(difficultyLevel) === index + 1,
  }));

  return options;
};


