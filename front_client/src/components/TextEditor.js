import React, { Component } from 'react';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
 // you can import any other locale
 
// Import bootstrap(v3 or v4) dependencies
import 'bootstrap/dist/js/bootstrap.bundle';
 
class RichTextEditor extends Component {
  onChange(content) {
    console.log('onChange: ' + content);
  }
 
  render() {
    return (
      <ReactSummernote
        value="Default value"
        options={{
          height: 50,
          dialogsInBody: true,
          toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
           
          
            ['view', [ 'codeview']]
          ],
          codemirror: {
            theme: 'monokai'
          }
        
        }}
        onChange={this.onChange}
      />
    );
  }
}
 
export default RichTextEditor;