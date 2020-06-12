import React, { PureComponent } from 'react';
import ReactQuill from 'react-quill';
import './Editor.scss';
import '../../../node_modules/react-quill/dist/quill.snow.css'


class Editor extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { editorHtml: this.props.value }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
    this.props.onEditChanged(this.state.editorHtml)
  }

  render() {
    return (
      <div className="app">
        <ReactQuill
          theme='snow'
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={'.app'}
          placeholder=''
        />
      </div>
    )
  }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,

  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

export default Editor
