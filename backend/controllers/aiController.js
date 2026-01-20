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

        Generate exactly ${numChapters} chapters for this book. For each chapter, provide a MEANINGFUL title (not just "Chapter X: Topic - Part X") and a brief description. The titles should be specific, descriptive, and cover different aspects of the topic.

        IMPORTANT: Return ONLY a valid JSON array with this exact structure, with no additional text before or after:
        [
          {"title": "Chapter 1: Meaningful Chapter Title", "description": "Brief description of what this chapter covers"},
          {"title": "Chapter 2: Different Meaningful Chapter Title", "description": "Brief description of what this chapter covers"},
          ...
        ]

        Make sure:
        - Each chapter title is unique and describes the specific content
        - The chapters are in logical order
        - They cover all important aspects of the topic in a ${style.toLowerCase()} style
        - Do NOT use generic titles like "Part 1", "Part 2", etc.`;

            const response = await genAI.models.generateContent({
                model: "gemini-2.0-flash-exp",
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
    const chapterTitles = {
        1: `Understanding the Fundamentals of ${topic}`,
        2: `Core Principles and Key Concepts`,
        3: `Practical Applications and Implementation`,
        4: `Advanced Techniques and Strategies`,
        5: `Real-World Examples and Case Studies`,
        6: `Common Challenges and Solutions`,
        7: `Best Practices and Industry Standards`,
        8: `Tools, Resources, and Technology`,
        9: `Future Trends and Developments`,
        10: `Creating Your Action Plan`,
    };

    const chapters = [];
    for (let i = 1; i <= parseInt(numChapters); i++) {
        const baseTitle = chapterTitles[i] || `Chapter ${i}: ${topic} - Key Insight ${i}`;
        chapters.push({
            title: `Chapter ${i}: ${baseTitle}`,
            description: `This chapter explores ${baseTitle.toLowerCase().replace('chapter ' + i + ': ', '')} in the context of ${topic}. Written in a ${style} style, it provides essential knowledge and insights for understanding this important aspect of the subject matter.`
        });
    }
    return chapters;
}

// Helper function to generate sample chapter content when API is unavailable
function generateSampleChapterContent(chapterTitle, chapterDescription, style) {
    const sections = [
        `Introduction to "${chapterTitle}"`,
        `Understanding the Core Concepts`,
        `Practical Implementation`,
        `Real-World Examples`,
        `Key Takeaways and Insights`
    ];

    let content = `# ${chapterTitle}\n\n`;
    content += `## Introduction\n\n`;
    content += `Welcome to this chapter on ${chapterTitle}. `;
    content += `This section explores the important concepts and practices related to ${chapterTitle.toLowerCase()}. `;
    if (chapterDescription) {
        content += `Specifically, we will focus on ${chapterDescription.toLowerCase()}.\n\n`;
    } else {
        content += `Throughout this chapter, you will gain valuable insights and practical knowledge.\n\n`;
    }

    for (let i = 1; i < sections.length; i++) {
        content += `## ${sections[i]}\n\n`;
        content += `In this section, we explore the important aspects of ${chapterTitle.toLowerCase()}. `;
        content += `Understanding these concepts is crucial for ${style.toLowerCase()} understanding and application. `;
        content += `Consider how these principles apply to your own context and explore the implications.\n\n`;
    }

    content += `## Conclusion\n\n`;
    content += `This chapter has provided a comprehensive overview of ${chapterTitle.toLowerCase()}. `;
    content += `The key concepts and practices discussed here form the foundation for deeper exploration and application. `;
    content += `As you move forward, consider how these insights can be applied in your own work and understanding.\n\n`;
    content += `Continue to the next chapter to build upon this foundation and explore more advanced topics.`;

    return content.replace(/\n/g, '\n');
}

//@desc generate book content
//@route POST /api/ai/book-content
//@access private
export const generateBookContent = async (req, res) => {
    try {
        const {chapterTitle, chapterDescription, style} = req.body;

        if (!chapterTitle || !style) {
            return res.status(400).json({ error: "Chapter title and style are required" });
        }

        try {
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
                model: "gemini-2.0-flash-exp",
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

            return res.status(200).json({ content: text });

        } catch (apiError) {
            console.error("Gemini API Error:", apiError.message);
            
            // Fallback: Generate sample chapter content if API fails
            console.log("Using fallback chapter content generation");
            const sampleContent = generateSampleChapterContent(chapterTitle, chapterDescription, style);
            return res.status(200).json({ content: sampleContent });
        }

    } catch (error) {
        console.error("Error generating chapter content:", error.message || error)
        res.status(500).json({ error: "Failed to generate chapter content" });
    }
}