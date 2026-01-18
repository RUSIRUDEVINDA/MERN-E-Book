import PDFDocument from "pdfkit";

export const generatePdf = async (book, res) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });

            // Handle stream errors
            doc.on("error", (err) => {
                console.error("PDFDoc Error:", err);
                reject(err);
            });

            // Pipes to the response
            doc.pipe(res);

            // Metadata
            doc.info.Title = book.title;
            doc.info.Author = book.author;

            doc.moveDown(2);
            doc.fontSize(24).text(book.title, { align: "center" });

            if (book.subtitle) {
                doc.moveDown(0.5);
                doc.fontSize(18).text(book.subtitle, { align: "center" });
            }

            doc.moveDown(1);
            doc.fontSize(14).text(`Author: ${book.author}`, { align: "center" });

            if (book.chapters && book.chapters.length > 0) {
                doc.addPage(); // Page break after title

                book.chapters.forEach((chapter, index) => {
                    if (index > 0) doc.addPage();

                    doc.fontSize(20).text(chapter.title, { align: "left" });
                    doc.moveDown(0.5);

                    doc.fontSize(12).font("Helvetica").text(chapter.content || "", {
                        align: "justify",
                        paragraphGap: 5,
                    });
                });
            }

            // Finalize PDF file
            doc.end();

            // We resolve when the writing to response is finished
            res.on("finish", resolve);
            res.on("error", reject);

        } catch (error) {
            console.error("Generate PDF Error:", error);
            reject(error);
        }
    });
};
