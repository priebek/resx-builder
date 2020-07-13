interface Model {
  lang: string;
  text: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const request = async (request: RequestInfo): Promise<any> => {
  const response = await fetch(request);
  return await response.json();
};

export const getLangLinksArray = async (input: string): Promise<Model[]> => {
  if (input.length === 0) return [{ lang: "emtpy", text: "" }];

  const result = await request(
    `https://en.wikipedia.org//w/api.php?action=query&format=json&prop=langlinks&titles=${input}&lllimit=200`
  );
  try {
    const re = /\*/gi;

     console.log(JSON.stringify(result));
    const test = JSON.stringify(result).replace(re, "text");
    console.log(JSON.stringify(test));

    const id = (JSON.parse(test)).continue.llcontinue.split("|", 1);
    const langlinks = result.query.pages[id].langlinks;
    return langlinks;
  } catch (error) {
    return [{ lang: error, text: "" }];
  }
};
