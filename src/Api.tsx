interface Model {
  lang: string;
  "*": string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const request = async (request: RequestInfo): Promise<any> => {
  const response = await fetch(request);
  return await response.json();
};

export const getLangLinksArray = async (input: string): Promise<Model[]> => {
  if (input.length === 0) return [{ lang: "emtpy", "*": "" }];

  const result = await request(
    `https://en.wikipedia.org//w/api.php?action=query&format=json&prop=langlinks&titles=${input}&lllimit=200`
  );
  try {
    const id = result.continue.llcontinue.split("|", 1);
    const langlinks = result.query.pages[id].langlinks;
    return langlinks;
  } catch (error) {
    return [{ lang: error, "*": "" }];
  }
};
