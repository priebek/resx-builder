import React, { useState } from "react";
import "./App.css";
import { getLangLinksArray } from "./Api";
import { Button, TextArea, Segment } from "@fluentui/react-northstar";

export default function App(): React.ReactElement {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");

  const handleResultSelect = async () => {
    const s = await getLangLinksArray(input);
    setText(s.map((x) => x.lang).toString());
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
    </>
  );
}
