import React, { useState } from "react";
import "./App.css";
import { getLangLinksArray } from "./Api";
import { Button, TextArea, Segment } from "@fluentui/react-northstar";

export default function App(): React.ReactElement {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");

  const handleResultSelect = async () => {
    const s = await getLangLinksArray(input);
    // const newLocal = generateResx(input, s.find(x => x.lang === "da")?.text.toString() as string);
    const newLocal = s.map((x) => x.lang + x.text).toString();
    setText(newLocal);
  };

  const copyMessage = () => {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  return (
    <>
      <Segment color="green" inverted>
        <TextArea
          fluid
          resize="vertical"
          placeholder="Type like 'dog'"
          style={{ height: "200px" }}
          onChange={(e, data) => setInput(data?.value as string)}
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
          disabled
          resize="vertical"
          style={{ height: "200px" }}
          value={text}
        />
      </Segment>
      <Button onClick={() => copyMessage()} content="Copy to clipboard" ></Button>
    </>
  );
}
