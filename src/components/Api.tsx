import { Model } from "../model/models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const request = async (request: RequestInfo): Promise<any> => {
  const response = await fetch(request);
  return await response.json();
};

export const getTranslate = async (
  input: string,
  language = ""
): Promise<Model[]> => {
  if (input.length === 0)
    return [{ lang: "error", text: "error", name: "error" }];
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
    const id = result.query.pageids;
    const re = /\*/gi;
    const test = JSON.parse(JSON.stringify(result).replace(re, "text"));
    const langlinks = test.query.pages[id].langlinks;

    return [{ lang: langlinks[0].lang, name: input, text: langlinks[0].text }];
  } catch (error) {
    return [{ lang: "error", text: "error", name: "error" }];
  }
};
