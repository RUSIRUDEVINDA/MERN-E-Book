import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";

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

            // Chapter Content
            // TODO: If content is HTML/Markdown, we should ideally parse it. 
            // For now, we assume plain text or raw string.
            // Splitting by newlines to create separate paragraphs implies better formatting.
            const paragraphs = (chapter.content || "").split("\n");

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
