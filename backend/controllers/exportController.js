import  {MarkdownIt} from 'markdown-it';
import  {Book} from '../models/Book.js';
import {path} from 'path';
import fs from 'fs';

const md = new MarkdownIt();

//Typography configuration matching the pdf export styles

const DOCX_STYLES = {
    fonts:{
        body:"Charter, serif",
        heading:"Inter, sans-serif"
    },
    sizes:{
        title:32,
        subtitle:20,
        author:18,
        chapterTitle:24,
        h1:20,
        h2:18,
        h3:16,
        body:12,
    },
    spacing:{
        paragraphBefore:200,
        paragraphAfter:200,
        chapterBefore:400,
        chapterAfter:300,
        headingBefore:300,
        headingAfter:150,
    },
}

const exportAsDocument = async (req,res) =>{
    try{
        const book = await Book.findById(req.params.id); // req.para mean the id from the url

    }catch(error){

    }
}