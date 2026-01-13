import { Lightbulb, BookOpen, Download, Library } from "lucide-react";

export const FEATURES = [
  {
    title: "AI-Powered Writing",
    description:
      "Overcome writer’s block with our smart assistant that helps you generate ideas, outlines, and polished content effortlessly.",
    icon: Lightbulb,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Immersive Reader",
    description:
      "Preview your ebook in a clean, read-only format. Adjust font sizes and layouts for a comfortable, distraction-free reading experience.",
    icon: BookOpen,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    title: "One-Click Export",
    description:
      "Export your ebook to PDF and DOCX formats instantly, ready for publishing, sharing, or printing.",
    icon: Download,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "eBook Management",
    description:
      "Organize all your ebook projects in one personal dashboard. Track progress, edit drafts, and manage your library with ease.",
    icon: Library,
    gradient: "from-pink-500 to-rose-600",
  },
];

export const TESTIMONIALS = [
  {
    rating: 5,
    quote:
      "This platform transformed how I write. The AI-powered suggestions cut my writing time in half!",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    author: "Sarah Johnson",
    title: "Fiction Author",
  },
  {
    rating: 5,
    quote:
      "Finally, a tool that makes publishing an ebook simple and accessible. Highly recommended!",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    author: "Michael Chen",
    title: "Self-Published Author",
  },
  {
    rating: 5,
    quote:
      "The immersive reader feature is fantastic. My readers love the reading experience.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    author: "Emma Williams",
    title: "Business Author",
  },
];
