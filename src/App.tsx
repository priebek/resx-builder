import React, { useState } from "react";
import "./App.css";
import { getTranslate } from "./components/Api";
import {
  Button,
  TextArea,
  Segment,
  Input,
  FlagIcon,
} from "@fluentui/react-northstar";
import getResxStructure from "./components/resx";
import downloadTextAsFile from "./components/download";
import { Model } from "./model/models";

export default function App(): React.ReactElement {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("dog sheep\ncat");
  const [language, setLanguage] = useState("es");
  // const models: Model[] = [{ lang: "", name: "", text: "" }];
  // const [my, setMy] = useState(models);

  const handleResultSelect = async () => {
    let outputResult = "";

    const y: Model[] = [];

    // Split for space, tab, newline and comma
    const inputArray = input.split(/[\s,]+/);
    inputArray.forEach(async (x) => {
      console.log(x);
      const newLocal = await getTranslate(x, language);

      // setMy((my) => [...my, newLocal]);
      y.concat(newLocal);
    });

    //TODO use each translated language
    outputResult += getResxStructure(await getTranslate(input, language));

    setOutput(outputResult);
    copyMessage(outputResult);
  };

  const copyMessage = (txt: string) => {
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = txt;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  };

  return (
    <>
      <Segment color="green" inverted>
        <TextArea
          fluid
          resize="vertical"
          placeholder="Type like 'dog'"
          style={{ height: "200px" }}
          onChange={(e, data) => setInput(data?.value as string)}
          value={input}
        />
        <Input
          fluid
          icon={<FlagIcon />}
          onChange={(e, data) => {
            setLanguage(data?.value as string);
          }}
          clearable
          placeholder="Set language: es"
        />
      </Segment>

      <Segment>
        <Button
          content="Generate resx file"
          primary
          onClick={handleResultSelect}
        />
      </Segment>

      <Segment>
        <TextArea
          fluid
          resize="vertical"
          style={{ height: "200px" }}
          value={output}
        />
        <Button
          content="Download resx file"
          primary
          onClick={() => downloadTextAsFile(output)}
        />
      </Segment>
    </>
  );
}
