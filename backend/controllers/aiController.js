// Using Mistral AI API
const MISTRAL_API_KEY = process.env.HUGGINGFACE_API_KEY; // This is actually Mistral key
const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

//@desc generate a book outline
//@route POST /api/ai/book-outline
//@access private
export const generateBookOutline = async (req, res) => {
    try {
        const { topic, style, numChapters, description } = req.body;

        if (!topic || !style || !numChapters || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            const response = await fetch(MISTRAL_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${MISTRAL_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "mistral-small-latest",
                    messages: [{
                        role: "user",
                        content: `Create a JSON book outline with ${numChapters} chapters for "${topic}". Style: ${style}.
Return ONLY this JSON:
[{"title":"Chapter 1","description":"desc"},{"title":"Chapter 2","description":"desc"}]`
                    }],
                    temperature: 0.7,
                    max_tokens: 500
                }),
            });

            const result = await response.json();

            if (result.error) {
                throw new Error(result.error.message || JSON.stringify(result.error));
            }

            let text = result.choices[0]?.message?.content || "";
            const startIdx = text.indexOf("[");
            const endIdx = text.lastIndexOf("]");

            if (startIdx !== -1 && endIdx !== -1) {
                const outline = JSON.parse(text.substring(startIdx, endIdx + 1));
                return res.status(200).json({ outline });
            }

            throw new Error("Invalid response format");

        } catch (apiError) {
            console.log("Mistral API error:", apiError.message);
            const sampleOutline = generateSampleOutline(topic, numChapters, style);
            return res.status(200).json({ outline: sampleOutline });
        }

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to generate outline" });
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
            return res.status(400).json({ error: "Chapter title and style required" });
        }

        try {
            const response = await fetch(MISTRAL_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${MISTRAL_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "mistral-small-latest",
                    messages: [{
                        role: "user",
                        content: `Write a book chapter titled "${chapterTitle}" in ${style} style.
${chapterDescription ? `Focus: ${chapterDescription}` : ''}
Write detailed content with introduction, main sections, and conclusion.`
                    }],
                    temperature: 0.7,
                    max_tokens: 1000
                }),
            });

            const result = await response.json();

            if (result.error) {
                throw new Error(result.error.message || JSON.stringify(result.error));
            }

            let text = result.choices[0]?.message?.content || "";
            if (text) {
                return res.status(200).json({ content: text });
            }

            throw new Error("Empty response");

        } catch (apiError) {
            console.log("Mistral API error:", apiError.message);
            const sampleContent = generateSampleChapterContent(chapterTitle, chapterDescription, style);
            return res.status(200).json({ content: sampleContent });
        }

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to generate content" });
    }
}

// Hugging Face API Functions
// @desc Generate a summary using Hugging Face
// @route POST /api/ai/summarize
// @access private
export const summarizeText = async (req, res) => {
    try {
        const { text, maxLength = 150, minLength = 50 } = req.body;

        if (!text || text.trim().length === 0) {
            return res.status(400).json({ error: "Text is required" });
        }

        if (!process.env.HUGGINGFACE_API_KEY) {
            return res.status(500).json({ error: "Hugging Face API key not configured" });
        }

        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
            {
                headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
                method: "POST",
                body: JSON.stringify({
                    inputs: text,
                    parameters: {
                        max_length: maxLength,
                        min_length: minLength,
                    },
                }),
            }
        );

        const result = await response.json();
        
        if (!response.ok) {
            console.error("Hugging Face error:", result);
            return res.status(500).json({ error: result.error || "Failed to summarize text" });
        }

        res.status(200).json({
            summary: result[0]?.summary_text || result[0]?.generated_text || "",
        });
    } catch (error) {
        console.error("Summarization error:", error);
        res.status(500).json({ error: "Failed to summarize text" });
    }
};

// @desc Generate keywords using Hugging Face
// @route POST /api/ai/keywords
// @access private
export const extractKeywords = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim().length === 0) {
            return res.status(400).json({ error: "Text is required" });
        }

        if (!process.env.HUGGINGFACE_API_KEY) {
            return res.status(500).json({ error: "Hugging Face API key not configured" });
        }

        const response = await fetch(
            "https://api-inference.huggingface.co/models/yanekyuk/bert-keyword-extractor",
            {
                headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
                method: "POST",
                body: JSON.stringify({ inputs: text }),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            console.error("Hugging Face error:", result);
            return res.status(500).json({ error: result.error || "Failed to extract keywords" });
        }

        res.status(200).json({
            keywords: result,
        });
    } catch (error) {
        console.error("Keyword extraction error:", error);
        res.status(500).json({ error: "Failed to extract keywords" });
    }
};

// @desc Classify text using Hugging Face
// @route POST /api/ai/classify
// @access private
export const classifyText = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim().length === 0) {
            return res.status(400).json({ error: "Text is required" });
        }

        if (!process.env.HUGGINGFACE_API_KEY) {
            return res.status(500).json({ error: "Hugging Face API key not configured" });
        }

        const response = await fetch(
            "https://api-inference.huggingface.co/models/zero-shot-classification-model",
            {
                headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
                method: "POST",
                body: JSON.stringify({
                    inputs: text,
                    parameters: {
                        candidate_labels: ["fiction", "non-fiction", "educational", "self-help", "biography"],
                    },
                }),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            console.error("Hugging Face error:", result);
            return res.status(500).json({ error: result.error || "Failed to classify text" });
        }

        res.status(200).json({
            classification: result,
        });
    } catch (error) {
        console.error("Text classification error:", error);
        res.status(500).json({ error: "Failed to classify text" });
    }
};