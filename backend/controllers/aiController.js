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

        try {
            const prompt = `You are an expert book planner specializing in ${style} content. Create a structured outline for a book with the following specifications:

        Book Topic: "${topic}"
        Book Description: "${description}"
        Writing Style: ${style}
        Number of Chapters: ${numChapters}

        Generate exactly ${numChapters} chapters for this book. For each chapter, provide a title and a brief description.

        IMPORTANT: Return ONLY a valid JSON array with this exact structure, with no additional text before or after:
        [
          {"title": "Chapter 1: Chapter Title", "description": "Brief description of what this chapter covers"},
          {"title": "Chapter 2: Chapter Title", "description": "Brief description of what this chapter covers"},
          ...
        ]

        Make sure the chapters are in logical order and cover all important aspects of the topic in a ${style.toLowerCase()} style.`;

            const response = await genAI.models.generateContent({
                model: "gemini-1.5-flash",
                contents: prompt,
            });

            let text = "";
            
            // Handle different response formats from Gemini API
            if (response.text) {
                text = response.text;
            } else if (response.candidates && response.candidates[0]?.content?.parts[0]?.text) {
                text = response.candidates[0].content.parts[0].text;
            } else {
                console.error("Unexpected response format:", JSON.stringify(response));
                throw new Error("Unexpected API response format");
            }

            //find and extract json array from the response text
            const startIndex = text.indexOf("[");
            const endIndex = text.lastIndexOf("]");

            if (startIndex === -1 || endIndex === -1) {
                console.error("No JSON array found in response:", text);
                throw new Error("No JSON array found in response");
            }

            const jsonArrayString = text.substring(startIndex, endIndex + 1);
            //validate if the response is a valid json
            const outline = JSON.parse(jsonArrayString);
            return res.status(200).json({ outline });

        } catch (apiError) {
            console.error("Gemini API Error:", apiError.message);
            
            // Fallback: Generate sample outline if API fails
            console.log("Using fallback outline generation");
            const sampleOutline = generateSampleOutline(topic, numChapters, style);
            return res.status(200).json({ outline: sampleOutline });
        }

    } catch (error) {
        console.error("Error generating book outline:", error.message || error);
        res.status(500).json({ error: "Failed to generate book outline", details: error.message });
    }
}

// Helper function to generate sample outline when API is unavailable
function generateSampleOutline(topic, numChapters, style) {
    const chapters = [];
    for (let i = 1; i <= parseInt(numChapters); i++) {
        chapters.push({
            title: `Chapter ${i}: ${topic} - Part ${i}`,
            description: `This chapter covers the fundamentals and key concepts of ${topic}. Written in a ${style} style, it provides ${i === 1 ? 'an introduction to' : 'deeper insights into'} the subject matter.`
        });
    }
    return chapters;
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