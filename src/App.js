import React, { Component } from "react";
import AceEditor from "react-ace";
import MarkdownView from "react-showdown";
import themes from "./themes";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: `# :wave: Hello there! I'm a Markdown Editor. Edit me and view the changes you make.`,
      theme: "github"
    };
  }

  updateEditorTheme(selectedTheme) {
    this.setState({
      theme: selectedTheme
    });
  }

  render() {
    const { markdown, theme } = this.state;
    const themeOptions = themes.map((theme, i) => (
      <option className="theme-option" key={i}>
        {theme}
      </option>
    ));

    return (
      <div className="App">
        <h1 className="app-title">Markdown Editor</h1>

        <div className="editor-and-panel">
          <div className="theme-selector-and-editor">
            <div className="theme-selector">
              <label>Select Editor Theme: </label>
              <select
                name="theme-names"
                id="theme-names"
                aria-label="Select a theme for your editor"
                aria-required="false"
                onChange={e => this.updateEditorTheme(e.target.value)}
              >
                {themeOptions}
              </select>
            </div>
            <AceEditor
              className="editor"
              mode="markdown"
              theme={theme}
              onChange={(value, stat) => {
                this.setState({
                  markdown: value
                });
                console.log("onChange", value, stat);
              }}
              highlightActiveLine={true}
              wrapEnabled={true}
              fontSize={14}
              width={"320px"}
              height={"300px"}
              value={markdown}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
            />
          </div>
          <MarkdownView
            className="view-panel"
            markdown={markdown}
            options={{
              strikethrough: true,
              underline: true,
              tables: true,
              emoji: true
            }}
          />
        </div>
        <footer>
          Made with React,{" "}
          <a href="https://github.com/securingsincity/react-ace">react-ace</a>,
          and{" "}
          <a href="https://github.com/jerolimov/react-showdown">
            react-showdown
          </a>
        </footer>
      </div>
    );
  }
}
