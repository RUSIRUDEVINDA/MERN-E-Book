import mongoose from "mongoose";
import Book from "../models/Book.js";
import { generateDocx } from "../utils/docx.generator.js";
import { generatePdf } from "../utils/pdf.generator.js";

/**
 * Export book as .docx
 * @route GET /api/books/:bookId/export/docx
 */
export const exportAsDocx = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Book ID format" });
        }

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ error: "No such book exists!" });
        }
        // ... (rest of function)


        // Verify ownership
        if (book.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                error: "You are not authorized to export this book.",
            });
        }

        const docBuffer = await generateDocx(book);

        const safeTitle = book.title.replace(/[^a-zA-Z0-9]/g, "_");

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${safeTitle}.docx"`
        );
        res.setHeader("Content-Length", docBuffer.length);

        res.send(docBuffer);
    } catch (error) {
        console.error("Error exporting as DOCX:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: error.message || "Failed to export DOCX" });
        }
    }
};

/**
 * Export book as .pdf
 * @route GET /api/books/:bookId/export/pdf
 */
export const exportAsPdf = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Book ID format" });
        }

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ error: "No such book exists!" });
        }

        // Verify ownership
        if (!req.user || (book.userId.toString() !== req.user._id.toString())) {
            return res.status(403).json({
                error: "You are not authorized to export this book.",
            });
        }

        console.log(`Starting PDF export for book: ${book.title}`);

        const safeTitle = book.title.replace(/[^a-zA-Z0-9]/g, "_");

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${safeTitle}.pdf"`
        );

        // generatePdf pipes directly to res
        await generatePdf(book, res);

    } catch (error) {
        console.error("Error exporting as PDF:", error);
        // Only send error response if headers haven't been sent (streaming hasn't started)
        if (!res.headersSent) {
            res.status(500).json({
                error: "PDF Generation Failed",
                details: error.message
            });
        }
    }
};