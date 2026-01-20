import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

// Convert markdown to plain text by stripping HTML tags
const markdownToPlainText = (markdown) => {
    if (!markdown) return "";
    const html = md.render(markdown);
    // Strip HTML tags
    return html.replace(/<[^>]*>/g, "").trim();
};

export const generateDocx = async (book) => {
    const children = [];

    // Title Page
    children.push(
        new Paragraph({
            text: book.title,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
        })
    );

    if (book.subtitle) {
        children.push(
            new Paragraph({
                text: book.subtitle,
                heading: HeadingLevel.SUBTITLE,
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
            })
        );
    }

    children.push(
        new Paragraph({
            text: `Author: ${book.author}`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 800 }, // Large gap before content
        })
    );

    // Chapters
    if (book.chapters && book.chapters.length > 0) {
        book.chapters.forEach((chapter) => {
            // Chapter Title
            children.push(
                new Paragraph({
                    text: chapter.title,
                    heading: HeadingLevel.HEADING_1,
                    pageBreakBefore: true,
                    spacing: { after: 200 },
                })
            );

            // Chapter Content - Convert markdown to plain text
            const plainText = markdownToPlainText(chapter.content || "");
            const paragraphs = plainText.split("\n");

            paragraphs.forEach((para) => {
                if (para.trim()) {
                    children.push(
                        new Paragraph({
                            children: [new TextRun(para)],
                            spacing: { after: 100 },
                        })
                    );
                }
            });
        });
    }

    const doc = new Document({
        sections: [
            {
                properties: {},
                children: children,
            },
        ],
    });

    return await Packer.toBuffer(doc);
};
