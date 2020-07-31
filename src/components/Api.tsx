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
  let apiResult;
  if (language.length === 0) {
    apiResult = await request(
      `https://en.wikipedia.org//w/api.php?action=query&format=json&prop=langlinks&indexpageids=1&titles=${input}&lllimit=200&origin=*`
    );
  } else {
    apiResult = await request(
      `https://en.wikipedia.org//w/api.php?action=query&format=json&prop=langlinks&indexpageids=1&titles=${input}&lllang=${language}&origin=*`
    );
  }

  try {
    const id = apiResult.query.pageids;
    const re = /\*/gi;
    const test = JSON.parse(JSON.stringify(apiResult).replace(re, "text"));
    const langlinks = test.query.pages[id].langlinks;

    const models: Model[] = [];

    langlinks.forEach((x: Model) => {
      models.push({ lang: x.lang, name: input, text: x.text });
    });

    return models;
  } catch (error) {
    return [{ lang: "error", text: "error", name: "error" }];
  }
};
