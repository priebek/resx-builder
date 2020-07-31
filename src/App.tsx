import React, { useState } from "react";
import "./App.css";
import { getTranslate } from "./components/Api";
import {
  Button,
  TextArea,
  Segment,
  Input,
  FlagIcon,
  Header,
  Text,
} from "@fluentui/react-northstar";
import getResxStructure from "./components/resx";
import downloadTextAsFile from "./components/download";
import { Model } from "./model/models";

export default function App(): React.ReactElement {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("es");

  const handleResultSelect = async () => {
    let outputResult = "";

    const y: Model[] = [];

    // Split for space, tab, newline and comma
    const inputArray = input.split(/[\s,]+/);

    new Promise((resolve) => {
      inputArray.forEach(async (x) => {
        const newLocal = await getTranslate(x, language);
        y.push(...newLocal);

        if (y.length === inputArray.length) resolve();
      });
    }).then(async () => {
      outputResult += getResxStructure(y);
      setOutput(outputResult);
      copyMessage(outputResult);
    });
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
      <Header
        content="RESX Builder"
        align="center"
        description="Translate and build resx file"
      />
      <Segment color="green" inverted>
        <Text content="List words to translate" />
        <TextArea
          fluid
          resize="vertical"
          placeholder="dog sheep cat"
          style={{ height: "200px" }}
          onChange={(e, data) => setInput(data?.value as string)}
          value={input}
        />
        <Text content="Translate to this language" />
        <Input
          fluid
          icon={<FlagIcon />}
          onChange={(e, data) => {
            setLanguage(data?.value as string);
          }}
          clearable
          placeholder="es"
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
