import BulletList from '@tiptap/extension-bullet-list';
import Underline from '@tiptap/extension-underline';
import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react'
import './petDetails.css'

const PetDetails = ({pet}) => {
    const convertJsonToHtml = () => {
        if (pet?.longDescription) {
          const editor = new Editor({
            content: pet.longDescription,
            extensions: [StarterKit, Underline, BulletList],
          });
          return editor.getHTML();
        }
        return "";
      };
    
      const htmlContent = convertJsonToHtml();
      console.log(htmlContent);
  return (
    <div>
       <div id='tiptap' dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  )
}

export default PetDetails
