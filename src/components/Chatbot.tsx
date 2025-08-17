import React, { useState, useRef, useEffect } from "react";
import "../index.css";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  hasOptions?: boolean;
  options?: string[];
}

interface FAQ {
  question: string;
  answer: string;
  followUp?: string[];
  keywords: string[];
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 Welcome to Zentroverse! I'm here to help you grow your business with our comprehensive digital marketing solutions.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStage, setConversationStage] = useState("greeting");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Comprehensive FAQ Database based on  Digital services
  const faqs: FAQ[] = [
    {
      question: "What services does Zentroverse offer?",
      answer:
        "We offer comprehensive digital marketing services including:\n\n🔍 **SEO & Search Engine Optimization** - Boost your rankings\n📱 **Social Media Marketing** - Engage your audience\n💰 **PPC & Google Ads** - Drive instant traffic\n🎨 **Website Design & Development** - Create stunning websites\n📧 **Email Marketing** - Nurture leads effectively\n📊 **Analytics & Reporting** - Track your success\n✍️ **Content Marketing** - Tell your story\n🎯 **Brand Strategy** - Build powerful brand identity",
      followUp: [
        "Tell me about SEO services",
        "How much do your services cost?",
        "Can you help my small business?",
      ],
      keywords: ["services", "what do you do", "offerings", "help", "provide"],
    },
    {
      question: "How can Zentroverse grow my business?",
      answer:
        "We transform your digital presence through:\n\n📈 **Increased Online Visibility** - Get found by more customers\n🎯 **Targeted Marketing** - Reach the right audience\n💡 **Data-Driven Strategies** - Make informed decisions\n🚀 **Lead Generation** - Convert visitors to customers\n📊 **Performance Tracking** - Measure real results\n🔄 **Continuous Optimization** - Always improving your ROI\n\nWe've helped 500+ businesses increase their revenue by 300% on average!",
      followUp: [
        "What makes you different?",
        "Show me success stories",
        "How long to see results?",
      ],
      keywords: [
        "grow",
        "business growth",
        "increase sales",
        "revenue",
        "help business",
        "results",
      ],
    },
    {
      question: "Tell me about your SEO services",
      answer:
        "Our SEO services include:\n\n🔍 **Keyword Research** - Find profitable search terms\n📝 **On-Page Optimization** - Optimize your website content\n🔗 **Link Building** - Build authority and trust\n📊 **Technical SEO** - Fix technical issues\n📍 **Local SEO** - Dominate local search\n📈 **SEO Audits** - Comprehensive website analysis\n📱 **Mobile Optimization** - Ensure mobile-friendliness\n\n95% client retention rate with 70% average traffic increase in 6 months!",
      followUp: [
        "How much does SEO cost?",
        "How long for SEO results?",
        "Local SEO for my area?",
      ],
      keywords: [
        "seo",
        "search engine optimization",
        "ranking",
        "google",
        "search",
        "traffic",
        "keywords",
      ],
    },
    {
      question: "What about Social Media Marketing?",
      answer:
        "Our social media services cover:\n\n📱 **Platform Management** - Facebook, Instagram, LinkedIn, Twitter\n🎨 **Content Creation** - Engaging posts, graphics, videos\n🎯 **Targeted Advertising** - Reach your ideal customers\n📊 **Community Management** - Build engaged followers\n📈 **Social Media Strategy** - Align with business goals\n🔍 **Social Listening** - Monitor brand mentions\n📱 **Influencer Marketing** - Partner with relevant influencers\n\nWe manage 200+ social accounts with 280% average engagement increase!",
      followUp: [
        "Which platforms work best?",
        "Social media advertising costs?",
        "Content creation process?",
      ],
      keywords: [
        "social media",
        "facebook",
        "instagram",
        "twitter",
        "linkedin",
        "social",
        "posts",
        "content",
      ],
    },
    {
      question: "How much do your services cost?",
      answer:
        "Our pricing is customized based on your needs:\n\n💼 **Starter Package** - $999/month\n• Basic SEO + Social Media Management\n• Perfect for small businesses\n\n🚀 **Growth Package** - $2,499/month\n• SEO + PPC + Social Media + Analytics\n• Ideal for growing businesses\n\n🏆 **Enterprise Package** - $4,999+/month\n• Full-service digital marketing\n• Custom strategies for large businesses\n\n✨ **Want a custom quote?** Let's discuss your specific needs!",
      followUp: [
        "📞 Get Custom Quote",
        "What's included in each package?",
        "Do you have contracts?",
      ],
      keywords: [
        "price",
        "cost",
        "pricing",
        "budget",
        "how much",
        "expensive",
        "packages",
        "plans",
      ],
    },
    {
      question: "How long does it take to see results?",
      answer:
        "Timeline varies by service:\n\n⚡ **Immediate (0-30 days):**\n• PPC campaigns show instant traffic\n• Social media engagement improves\n• Website improvements go live\n\n📈 **Short-term (1-3 months):**\n• Improved search rankings\n• Increased social followers\n• Better lead generation\n\n🏆 **Long-term (3-12 months):**\n• Significant SEO improvements\n• Brand authority building\n• Sustained revenue growth\n\nWe provide monthly reports showing your progress every step of the way!",
      followUp: [
        "What results do you guarantee?",
        "Can I see case studies?",
        "How do you measure success?",
      ],
      keywords: [
        "results",
        "time",
        "how long",
        "when",
        "duration",
        "fast",
        "quick",
      ],
    },
    {
      question: "Do you work with small businesses?",
      answer:
        "Absolutely! We love helping small businesses succeed:\n\n🏪 **Local Business Focus** - We understand local market needs\n💰 **Budget-Friendly Options** - Packages starting at $999/month\n🎯 **Targeted Strategies** - Focus on high-impact activities\n📞 **Personal Service** - Direct access to our team\n📊 **Transparent Reporting** - See exactly what we're doing\n🚀 **Scalable Solutions** - Grow services as your business grows\n\n85% of our clients are small to medium businesses, and we've helped them compete with larger competitors!",
      followUp: [
        "Local SEO for my area?",
        "Small business success stories",
        "What makes you different?",
      ],
      keywords: [
        "small business",
        "startup",
        "local business",
        "small company",
        "local",
        "budget",
      ],
    },
    {
      question: "Can you redesign my website?",
      answer:
        "Yes! Our website services include:\n\n🎨 **Custom Design** - Unique, professional websites\n📱 **Mobile Responsive** - Perfect on all devices\n⚡ **Fast Loading** - Optimized for speed\n🔍 **SEO-Optimized** - Built for search engines\n🛒 **E-commerce Ready** - Online store capabilities\n🔒 **Secure & Reliable** - SSL certificates & hosting\n✏️ **Easy Content Management** - Update content yourself\n\nOur websites convert 40% better than industry average!",
      followUp: [
        "Website redesign cost?",
        "How long does it take?",
        "Do you provide hosting?",
      ],
      keywords: [
        "website",
        "web design",
        "redesign",
        "website development",
        "site",
        "online",
      ],
    },
    {
      question: "What makes Zentroverse different?",
      answer:
        "What sets us apart:\n\n🏆 **Proven Results** - 500+ successful projects, 95% client retention\n🎯 **Data-Driven Approach** - Every decision backed by analytics\n👥 **Dedicated Team** - Your own account manager\n🔄 **Transparent Process** - Know exactly what we're doing\n📊 **Regular Reporting** - Monthly performance updates\n🚀 **Innovation Focus** - Latest tools and techniques\n💡 **Strategic Thinking** - Not just tactics, but strategy\n\nWe don't just execute - we partner with you for long-term success!",
      followUp: [
        "Show me case studies",
        "Meet the team",
        "What tools do you use?",
      ],
      keywords: [
        "different",
        "why choose",
        "unique",
        "better",
        "advantage",
        "special",
        "best",
      ],
    },
    {
      question: "How do I get started?",
      answer:
        "Getting started is easy:\n\n📞 **Step 1: Free Consultation** - 30-minute strategy call\n📊 **Step 2: Digital Audit** - We analyze your current presence\n📋 **Step 3: Custom Proposal** - Tailored strategy & pricing\n🤝 **Step 4: Onboarding** - Meet your team & set up tracking\n🚀 **Step 5: Launch** - Start your campaigns!\n\n✨ **Ready to start?** Click below to contact us!",
      followUp: [
        "📞 Contact Us Now",
        "What info do you need?",
        "How long is onboarding?",
      ],
      keywords: [
        "get started",
        "begin",
        "start",
        "contact",
        "consultation",
        "sign up",
        "ready",
      ],
    },
    {
      question: "Do you provide analytics and reporting?",
      answer:
        "Yes! Our reporting includes:\n\n📊 **Monthly Reports** - Comprehensive performance analysis\n📈 **Real-Time Dashboard** - Track progress 24/7\n🎯 **Goal Tracking** - Monitor key objectives\n💰 **ROI Analysis** - See your return on investment\n📱 **Mobile Reports** - Access data anywhere\n🔍 **Competitive Analysis** - See how you stack up\n📧 **Email Alerts** - Get notified of important changes\n\nOur clients love our transparent, easy-to-understand reports!",
      followUp: [
        "See sample report",
        "What metrics do you track?",
        "How often do we review?",
      ],
      keywords: [
        "analytics",
        "reporting",
        "reports",
        "data",
        "tracking",
        "performance",
        "metrics",
        "dashboard",
      ],
    },
    {
      question: "What are your success stories?",
      answer:
        "Here are some recent wins:\n\n🏪 **Local Restaurant Chain:**\n• 400% increase in online orders\n• 250% boost in social media followers\n\n🏥 **Healthcare Practice:**\n• 300% more patient inquiries\n• #1 ranking for local medical terms\n\n🛍️ **E-commerce Store:**\n• 500% increase in organic traffic\n• 200% boost in online sales\n\n🏢 **B2B Software Company:**\n• 350% more qualified leads\n• 180% increase in conversion rate\n\n*Results vary by industry and investment level",
      followUp: [
        "More case studies",
        "Results in my industry?",
        "How do you guarantee results?",
      ],
      keywords: [
        "success",
        "case studies",
        "results",
        "examples",
        "clients",
        "testimonials",
        "proof",
      ],
    },
  ];

  const greetingResponses = [
    "Hi there! 👋",
    "Hello! 👋",
    "Hey! 👋",
    "Hi! 👋",
    "Hello there! 👋",
    "Hey there! 👋",
  ];

  const mainMenuOptions = [
    "🚀 How can you grow my business?",
    "💼 What services do you offer?",
    "💰 What are your pricing packages?",
    "📈 Show me success stories",
    "📞 Contact Us Now",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Optional: Only auto-scroll for the initial message or when user is near bottom
  useEffect(() => {
    // Only auto-scroll for the first message (welcome message)
    if (messages.length === 1) {
      scrollToBottom();
    }
  }, [messages]);

  // Check if user is near bottom of chat
  // Check if user is near bottom of chat
  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom && messages.length > 3);
    }
  };

  const handleContactRedirect = () => {
    // Close the chatbot
    setIsOpen(false);

    // Check if we're already on a page with the contact section
    const contactSection = document.getElementById("contact");

    if (contactSection) {
      // If contact section exists on current page, scroll to it
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Also update the URL hash
      window.location.hash = "contact";
    } else {
      // If contact section doesn't exist, navigate to home page with hash
      // This handles cases where chatbot might be on other pages
      if (window.location.pathname !== "/") {
        window.location.href = "/#contact";
      } else {
        // Fallback: try to navigate to contact hash
        window.location.hash = "contact";

        // Wait a moment and try to scroll again (in case of lazy loading)
        setTimeout(() => {
          const contactSectionDelayed = document.getElementById("contact");
          if (contactSectionDelayed) {
            contactSectionDelayed.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 300);
      }
    }
  };

  const isGreeting = (text: string): boolean => {
    const greetings = [
      "hi",
      "hello",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
    ];
    return greetings.some((greeting) => text.toLowerCase().includes(greeting));
  };

  const findBestAnswer = (
    userInput: string
  ): { answer: string; followUp?: string[] } => {
    const input = userInput.toLowerCase();

    // Handle greetings
    if (isGreeting(input)) {
      return {
        answer:
          "Hello! 👋 Great to meet you! I'm here to help you discover how Zentroverse can transform your digital presence and grow your business.\n\nWhat would you like to know about?",
        followUp: mainMenuOptions,
      };
    }

    // Find matching FAQ
    for (const faq of faqs) {
      if (
        faq.keywords.some((keyword) => input.includes(keyword.toLowerCase()))
      ) {
        return {
          answer: faq.answer,
          followUp: faq.followUp,
        };
      }
    }

    // Default response for unmatched queries
    return {
      answer:
        "That's a great question! 🤔 I'd love to help you with that. For specific details about your unique situation, I'd recommend speaking with our team directly.\n\nWhat would you like to do?",
      followUp: [
        "📞 Contact Our Team",
        "🚀 How can you grow my business?",
        "💼 What services do you offer?",
      ],
    };
  };

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend) return;

    // Handle contact button clicks
    if (
      textToSend.includes("Contact Us Now") ||
      textToSend.includes("Get Custom Quote") ||
      textToSend.includes("Contact Our Team") ||
      textToSend.includes("📞 Contact Us Now") ||
      textToSend.includes("📞 Get Custom Quote") ||
      textToSend.includes("📞 Contact Our Team")
    ) {
      // Add user message
      const userMessage: Message = {
        id: Date.now(),
        text: textToSend,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Add bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now() + 1,
          text: "Perfect! I'm redirecting you to our contact page where you can get in touch with our team directly. They'll be happy to discuss your specific needs and provide a custom quote! 🚀",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);

        // Redirect to contact section after a short delay
        setTimeout(() => {
          handleContactRedirect();
        }, 1500);
      }, 800);

      setInputValue("");
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: textToSend,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const response = findBestAnswer(textToSend);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response.answer,
        isUser: false,
        timestamp: new Date(),
        hasOptions: !!response.followUp,
        options: response.followUp,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">{/* <span>360</span> */}</div>
            <div>
              <h4>Zentroverse Assistant</h4>
              <span className="status">Online</span>
            </div>
          </div>
          <button className="close-btn" onClick={toggleChat}>
            ✕
          </button>
        </div>

        {/* Messages */}
        <div
          className="chatbot-messages"
          ref={messagesContainerRef}
          onScroll={handleScroll}
        >
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`message ${
                  message.isUser ? "user-message" : "bot-message"
                }`}
              >
                <div className="message-content">
                  <p style={{ whiteSpace: "pre-line" }}>{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {/* Quick Reply Options */}
              {message.hasOptions && message.options && (
                <div className="quick-replies">
                  {message.options.map((option, index) => (
                    <button
                      key={index}
                      className="quick-reply-btn"
                      onClick={() => handleSendMessage(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="message bot-message">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <button
            className="scroll-to-bottom-btn"
            onClick={scrollToBottom}
            title="Scroll to bottom"
          >
            ↓ New messages
          </button>
        )}

        {/* Initial Quick Questions - only show when just opened */}
        {messages.length === 1 && (
          <div className="quick-questions">
            <p>Try saying:</p>
            <div className="greeting-options">
              {["Hi!", "Hello!", "Hey there!"].map((greeting, index) => (
                <button
                  key={index}
                  className="greeting-btn"
                  onClick={() => handleSendMessage(greeting)}
                >
                  {greeting}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="chatbot-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message or say hi..."
            disabled={isTyping}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="send-btn"
          >
            ➤
          </button>
        </div>
      </div>

      {/* Chatbot Toggle Button */}
      <div
        className="fixed bottom-28 right-6 z-30 w-14 h-14 bg-blue-500 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
        onClick={toggleChat}
      >
        {isOpen ? (
          // Close icon when open
          <div className="w-14 h-14 flex items-center justify-center bg-red-500 text-white rounded-full shadow-md hover:shadow-lg">
            ✕
          </div>
        ) : (
          // Chat assistant icon when closed
          <div className="relative w-14 h-14 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:shadow-lg">
            <span className="text-xl">🙋🏻‍♂️</span> {/* Assistant icon */}
            <div className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
