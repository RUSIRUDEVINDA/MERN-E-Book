import { GoogleGenAI } from "@google/genai";

// Lazy initialization to ensure env vars are loaded
let ai = null;
const getAI = () => {
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: process.env.Gemini_API_Key });
    }
    return ai;
};

//@desc generate a book outline
//@route POST /api/ai/book-outline
//@access private
export const generateBookOutline = async (req, res) => {
    try {
        const genAI = getAI();
        const { topic, style, numChapters, description } = req.body;

        if (!topic || !style || !numChapters || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const prompt = `You are an expert writer specializing in ${style} content. Write a complete chapter for a book with the following specifications:

        Chapter Title: "${chapterTitle}"
        ${chapterDescription ? `Chapter Description: ${chapterDescription}` : ''}
        Writing Style: ${style}
        Target Length: Comprehensive and detailed (aim for 1500-2500 words)

        Requirements:
        1. Write in a ${style.toLowerCase()} tone throughout the chapter
        2. Structure the content with clear sections and smooth transitions
        3. Include relevant examples, explanations, or anecdotes as appropriate for the style
        4. Ensure the content flows logically from introduction to conclusion
        5. Make the content engaging and valuable to readers
        ${chapterDescription ? '6. Cover all points mentioned in the chapter description' : ''}

        Format Guidelines:
        - Start with a compelling opening paragraph
        - Use clear paragraph breaks for readability
        - Include subheadings if appropriate for the content length
        - End with a strong conclusion or transition to the next chapter
        - Write in plain text without markdown formatting

        Begin writing the chapter content now:`;


        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const text = response.text;

        //find and extract json array from the response text
        const startIndex = text.indexOf("[");
        const endIndex = text.lastIndexOf("]");

        if (startIndex === -1 || endIndex === -1) {
            return res.status(500).json({ error: "failed to parse ai response, no json array found " });
        }

        const jsonArrayString = text.substring(startIndex, endIndex + 1);
        //validate if the response is a valid json
        try {
            const outline = JSON.parse(jsonArrayString);
            return res.status(200).json({ outline });
        } catch (e) {
            console.error("Failed to parse Ai response:", e);
            res.status(500).json({ message: "Failed to generate valid outline. The Ai response was not valid json" });
        }

    } catch (error) {
        console.error("Error generating book outline:", error.message || error);
        res.status(500).json({ error: "Failed to generate book outline", details: error.message });
    }
}

//@desc generate book content
//@route POST /api/ai/book-content
//@access private
export const generateBookContent = async (req, res) => {
    try {
        const {chapterTitle, chapterDescription, style} = req.body;

        if (!chapterTitle || !chapterDescription || !style) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const genAI = getAI();

        const prompt = `You are an expert writer specializing in ${style} content. Write a complete chapter for a book with the following specifications:

        Chapter Title: "${chapterTitle}"
        ${chapterDescription ? `Chapter Description: ${chapterDescription}` : ''}
        Writing Style: ${style}
        Target Length: Comprehensive and detailed (aim for 1500-2500 words)

        Requirements:
        1. Write in a ${style.toLowerCase()} tone throughout the chapter
        2. Structure the content with clear sections and smooth transitions
        3. Include relevant examples, explanations, or anecdotes as appropriate for the style
        4. Ensure the content flows logically from introduction to conclusion
        5. Make the content engaging and valuable to readers
        ${chapterDescription ? '6. Cover all points mentioned in the chapter description' : ''}

        Format Guidelines:
        - Start with a compelling opening paragraph
        - Use clear paragraph breaks for readability
        - Include subheadings if appropriate for the content length
        - End with a strong conclusion or transition to the next chapter
        - Write in plain text without markdown formatting

        Begin writing the chapter content now:`;

        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const text = response.text;
        return res.status(200).json({ content: text });

    } catch (error) {
        console.error("Error generating chapter", error)
        res.status(500).json({ error: "Failed to generate chapter content" });
    }
}