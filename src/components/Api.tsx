interface Model {
  lang: string;
  text: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const request = async (request: RequestInfo): Promise<any> => {
  const response = await fetch(request);
  return await response.json();
};

export const getLangLinksArray = async (
  input: string,
  language = ""
): Promise<Model[]> => {
  if (input.length === 0) return [{ lang: "emtpy", text: "" }];
  let result;
  if (language.length === 0) {
    result = await request(
      `https://en.wikipedia.org//w/api.php?action=query&format=json&prop=langlinks&indexpageids=1&titles=${input}&lllimit=200`
    );
  } else {
    result = await request(
      `https://en.wikipedia.org//w/api.php?action=query&format=json&prop=langlinks&indexpageids=1&titles=${input}&lllang=${language}`
    );
  }

  try {
    console.log("result: " + JSON.stringify(result));

    const id = result.query.pageids;
    console.log("id" + id);

    const re = /\*/gi;
    const test = JSON.parse(JSON.stringify(result).replace(re, "text"));
    console.log(JSON.stringify(test));

    const langlinks = test.query.pages[id].langlinks;
    return langlinks;
  } catch (error) {
    return [{ lang: error, text: "" }];
  }
};
