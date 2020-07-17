import React, { useState } from "react";
import "./App.css";
import { getLangLinksArray } from "./Api";
import {
  Button,
  TextArea,
  Segment,
  Input,
  FlagIcon,
} from "@fluentui/react-northstar";
import getResxStructure from "./resx";

export default function App(): React.ReactElement {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("dog");
  const [language, setLanguage] = useState("es");

  const handleResultSelect = async () => {
    const s = await getLangLinksArray(input, language);
    const newLocal = s.map((x) => x.text).toString();
    setOutput(newLocal);

    console.log(newLocal);
    copyMessage(newLocal);

    return;
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
          onClick={() => {
            handleResultSelect().then(() => {
            });
          }}
        />
      </Segment>

      <Segment>
        <TextArea
          fluid
          disabled
          resize="vertical"
          style={{ height: "200px" }}
          value={output}
        />
      </Segment>
      <Button
        onClick={() => getResxStructure()}
        content="Copy to clipboard"
      ></Button>
    </>
  );
}
