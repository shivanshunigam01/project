import React, { useEffect, useRef, useState } from "react";
import {
  ChevronRight,
  Users,
  TrendingUp,
  X,
  Calendar,
  Clock,
  Eye,
  Heart,
  Share2,
  BookOpen,
  Tag,
  User,
  ArrowLeft,
  ArrowRight,
  Search,
} from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const blogData = [
  {
    id: 1,
    category: "Digital Trends",
    readTime: "5 min read",
    title: "The Future of Digital Marketing in 2024",
    summary:
      "Explore emerging trends and technologies shaping the digital marketing landscape.",
    date: "Dec 15, 2023",
    views: "2.4k",
    likes: "145",
    author: "Sarah Johnson",
    authorRole: "Digital Strategy Lead",
    tags: ["AI Marketing", "Automation", "Future Trends", "Technology"],
    fullContent: `
      <h2>The Digital Marketing Revolution Continues</h2>
      <p>As we move into 2024, digital marketing is experiencing unprecedented transformation. Artificial intelligence, machine learning, and automation are no longer futuristic concepts—they're essential tools for modern marketers.</p>
      
      <h3>Key Trends Shaping 2024</h3>
      <ul>
        <li><strong>AI-Powered Personalization:</strong> Advanced algorithms are enabling hyper-personalized customer experiences at scale.</li>
        <li><strong>Voice Search Optimization:</strong> With smart speakers in 50% of homes, voice SEO is becoming critical.</li>
        <li><strong>Interactive Content:</strong> AR/VR experiences and interactive videos are driving engagement rates up by 300%.</li>
        <li><strong>Privacy-First Marketing:</strong> Cookie-less tracking and first-party data strategies are the new norm.</li>
      </ul>
      
      <h3>What This Means for Your Business</h3>
      <p>Companies that adapt to these trends early will gain significant competitive advantages. The key is to start experimenting with these technologies now, rather than waiting for them to become mainstream.</p>
      
      <blockquote>"The future belongs to marketers who can blend human creativity with AI efficiency." - Marketing Innovation Report 2024</blockquote>
      
      <h3>Action Steps for 2024</h3>
      <p>To stay ahead of the curve, consider implementing chatbots for customer service, experimenting with programmatic advertising, and investing in marketing automation platforms that can scale with your business growth.</p>
    `,
    relatedPosts: [2, 3, 5],
  },
  {
    id: 2,
    category: "Analytics",
    readTime: "8 min read",
    title: "ROI-Driven Marketing: Measuring What Matters",
    summary:
      "A comprehensive guide to tracking and optimizing marketing performance.",
    date: "Dec 10, 2023",
    views: "3.1k",
    likes: "198",
    author: "Michael Chen",
    authorRole: "Analytics Director",
    tags: ["ROI", "Analytics", "KPIs", "Data-Driven Marketing"],
    fullContent: `
      <h2>Beyond Vanity Metrics: Real ROI Measurement</h2>
      <p>In today's competitive landscape, marketing budgets are under intense scrutiny. Every dollar spent must be justified with measurable returns. This comprehensive guide will help you establish a robust ROI measurement framework.</p>
      
      <h3>Essential KPIs for ROI Measurement</h3>
      <ul>
        <li><strong>Customer Acquisition Cost (CAC):</strong> The total cost of acquiring a new customer across all channels.</li>
        <li><strong>Customer Lifetime Value (CLV):</strong> The total revenue expected from a customer relationship.</li>
        <li><strong>Marketing Qualified Leads (MQLs):</strong> Leads that meet specific criteria indicating sales readiness.</li>
        <li><strong>Attribution Analysis:</strong> Understanding which touchpoints contribute to conversions.</li>
      </ul>
      
      <h3>Building Your Attribution Model</h3>
      <p>Multi-touch attribution is crucial for understanding the customer journey. Linear, time-decay, and position-based models each offer different insights into campaign effectiveness.</p>
      
      <h3>Tools and Technologies</h3>
      <p>Modern analytics platforms like Google Analytics 4, Adobe Analytics, and specialized tools like Salesforce Pardot provide sophisticated tracking capabilities. The key is choosing tools that integrate well with your existing tech stack.</p>
      
      <h3>Common Pitfalls to Avoid</h3>
      <p>Many organizations focus too heavily on last-click attribution or ignore the impact of upper-funnel activities. A balanced approach considers the full customer journey while maintaining focus on bottom-line results.</p>
    `,
    relatedPosts: [1, 4, 6],
  },
  {
    id: 3,
    category: "SEO",
    readTime: "6 min read",
    title: "Local SEO Strategies for Small Businesses",
    summary: "Boost your local visibility and attract nearby customers.",
    date: "Dec 5, 2023",
    views: "1.8k",
    likes: "156",
    author: "Emma Rodriguez",
    authorRole: "SEO Specialist",
    tags: [
      "Local SEO",
      "Small Business",
      "Google My Business",
      "Local Marketing",
    ],
    fullContent: `
      <h2>Dominating Local Search Results</h2>
      <p>For small businesses, local SEO isn't just important—it's essential for survival. With 46% of Google searches having local intent, optimizing for local visibility can make or break your business.</p>
      
      <h3>Google My Business Optimization</h3>
      <p>Your Google My Business profile is your digital storefront. Complete every section, upload high-quality photos, and encourage customer reviews. Businesses with complete profiles are 2.7x more likely to be considered reputable.</p>
      
      <h3>Local Keyword Strategy</h3>
      <ul>
        <li>Research geo-specific keywords using tools like SEMrush or Ahrefs</li>
        <li>Include city names and neighborhood references in your content</li>
        <li>Target "near me" searches with location-based landing pages</li>
        <li>Optimize for mobile searches, which account for 60% of local queries</li>
      </ul>
      
      <h3>Citation Building and NAP Consistency</h3>
      <p>Ensure your Name, Address, and Phone number (NAP) are consistent across all online directories. Inconsistent information confuses search engines and potential customers.</p>
      
      <h3>Review Management Strategy</h3>
      <p>Actively request reviews from satisfied customers and respond professionally to all feedback. Businesses with 50+ reviews see a 54% increase in click-through rates.</p>
      
      <h3>Local Link Building</h3>
      <p>Partner with other local businesses, sponsor community events, and engage with local news outlets to build high-quality local backlinks that boost your domain authority.</p>
    `,
    relatedPosts: [4, 5, 6],
  },
  {
    id: 4,
    category: "Social Media",
    readTime: "7 min read",
    title: "Social Media Marketing for B2B Companies",
    summary:
      "Effective strategies to leverage social platforms for business growth.",
    date: "Nov 28, 2023",
    views: "2.7k",
    likes: "203",
    author: "David Park",
    authorRole: "Social Media Strategist",
    tags: [
      "B2B Marketing",
      "LinkedIn",
      "Social Media Strategy",
      "Lead Generation",
    ],
    fullContent: `
      <h2>B2B Social Media: Beyond the Basics</h2>
      <p>While B2C brands have long embraced social media, B2B companies are discovering the immense potential of social platforms for lead generation, thought leadership, and customer engagement.</p>
      
      <h3>Platform-Specific Strategies</h3>
      <h4>LinkedIn - The B2B Powerhouse</h4>
      <ul>
        <li>Share industry insights and thought leadership content</li>
        <li>Utilize LinkedIn Sales Navigator for prospecting</li>
        <li>Create compelling company pages with regular updates</li>
        <li>Engage in industry-specific LinkedIn Groups</li>
      </ul>
      
      <h4>Twitter - Real-Time Engagement</h4>
      <ul>
        <li>Join industry conversations with relevant hashtags</li>
        <li>Share quick insights and company updates</li>
        <li>Engage with industry leaders and potential clients</li>
        <li>Use Twitter Lists to monitor competitors and prospects</li>
      </ul>
      
      <h3>Content Strategy for B2B Social</h3>
      <p>B2B social content should educate, inform, and establish credibility. Share case studies, industry reports, behind-the-scenes content, and employee spotlights to humanize your brand.</p>
      
      <h3>Measuring B2B Social ROI</h3>
      <p>Track metrics like lead quality, engagement rates, and social listening sentiment. Use UTM parameters to track traffic from social platforms to your website and measure conversion rates.</p>
      
      <h3>Employee Advocacy Programs</h3>
      <p>Empower employees to share company content and industry insights. Employee-shared content receives 8x more engagement than brand-shared content.</p>
    `,
    relatedPosts: [1, 2, 5],
  },
  {
    id: 5,
    category: "Content Strategy",
    readTime: "9 min read",
    title: "Content Marketing That Converts",
    summary: "Creating compelling content that drives engagement and sales.",
    date: "Nov 20, 2023",
    views: "4.2k",
    likes: "287",
    author: "Lisa Thompson",
    authorRole: "Content Marketing Manager",
    tags: [
      "Content Marketing",
      "Conversion Optimization",
      "Storytelling",
      "Content Strategy",
    ],
    fullContent: `
      <h2>The Art and Science of Converting Content</h2>
      <p>Content marketing generates 3x more leads than traditional marketing while costing 62% less. But not all content is created equal. The difference between content that converts and content that doesn't lies in strategic planning and execution.</p>
      
      <h3>Understanding Your Audience Journey</h3>
      <p>Map content to each stage of the buyer's journey:</p>
      <ul>
        <li><strong>Awareness Stage:</strong> Educational blog posts, infographics, and social media content</li>
        <li><strong>Consideration Stage:</strong> Comparison guides, webinars, and case studies</li>
        <li><strong>Decision Stage:</strong> Free trials, demos, and testimonials</li>
      </ul>
      
      <h3>The Psychology of Persuasive Content</h3>
      <p>Effective content leverages psychological principles like social proof, scarcity, and reciprocity. Include customer testimonials, showcase limited-time offers, and provide valuable free resources.</p>
      
      <h3>Content Formats That Convert</h3>
      <ul>
        <li><strong>Interactive Content:</strong> Quizzes and calculators generate 2x more conversions</li>
        <li><strong>Video Content:</strong> Landing pages with video see 80% higher conversion rates</li>
        <li><strong>Long-Form Content:</strong> Articles over 2,000 words generate 9x more leads</li>
        <li><strong>User-Generated Content:</strong> Increases engagement by 28% and builds trust</li>
      </ul>
      
      <h3>Optimization and Testing</h3>
      <p>Continuously test headlines, CTAs, content length, and formatting. A/B test email subject lines, social media captions, and landing page copy to improve performance.</p>
      
      <h3>Content Distribution Strategy</h3>
      <p>Great content means nothing without proper distribution. Use a mix of owned, earned, and paid media to maximize reach and engagement.</p>
    `,
    relatedPosts: [1, 3, 6],
  },
  {
    id: 6,
    category: "PPC",
    readTime: "10 min read",
    title: "PPC Campaign Optimization Techniques",
    summary:
      "Advanced strategies to maximize your pay-per-click advertising ROI.",
    date: "Nov 15, 2023",
    views: "3.5k",
    likes: "234",
    author: "Robert Kim",
    authorRole: "PPC Specialist",
    tags: ["PPC", "Google Ads", "Campaign Optimization", "Paid Advertising"],
    fullContent: `
      <h2>Mastering PPC: From Good to Great</h2>
      <p>Pay-per-click advertising can be incredibly effective when properly optimized. The difference between a good PPC campaign and a great one often lies in the details—keyword selection, ad copy, landing page optimization, and bid management.</p>
      
      <h3>Advanced Keyword Strategies</h3>
      <ul>
        <li><strong>Long-Tail Keywords:</strong> More specific, less competitive, higher converting</li>
        <li><strong>Negative Keywords:</strong> Prevent ads from showing for irrelevant searches</li>
        <li><strong>Keyword Match Types:</strong> Balance reach and relevance with proper match type usage</li>
        <li><strong>Search Term Analysis:</strong> Regular review of actual search queries triggering ads</li>
      </ul>
      
      <h3>Ad Copy That Converts</h3>
      <p>Compelling ad copy addresses pain points, highlights unique value propositions, and includes strong calls-to-action. Use ad extensions to provide additional information and increase click-through rates.</p>
      
      <h3>Landing Page Optimization</h3>
      <p>Your landing page should match the intent and messaging of your ad. Key elements include:</p>
      <ul>
        <li>Clear, benefit-focused headlines</li>
        <li>Compelling value propositions</li>
        <li>Trust signals and social proof</li>
        <li>Streamlined conversion forms</li>
        <li>Mobile-optimized design</li>
      </ul>
      
      <h3>Bid Management and Budget Allocation</h3>
      <p>Smart bidding strategies like Target CPA and Target ROAS can improve performance, but manual oversight is still crucial. Allocate budget to high-performing keywords and campaigns.</p>
      
      <h3>Performance Monitoring and Analysis</h3>
      <p>Track key metrics like Quality Score, Click-Through Rate, Conversion Rate, and Cost Per Acquisition. Use Google Analytics to understand post-click behavior and optimize accordingly.</p>
    `,
    relatedPosts: [2, 4, 5],
  },
  {
    id: 7,
    category: "Email Marketing",
    readTime: "7 min read",
    title: "Email Marketing Automation That Works",
    summary:
      "Build automated email sequences that nurture leads and drive conversions.",
    date: "Nov 10, 2023",
    views: "2.9k",
    likes: "176",
    author: "Jennifer Walsh",
    authorRole: "Email Marketing Specialist",
    tags: [
      "Email Marketing",
      "Automation",
      "Lead Nurturing",
      "Customer Retention",
    ],
    fullContent: `
      <h2>The Power of Email Marketing Automation</h2>
      <p>Email marketing continues to deliver the highest ROI of any digital marketing channel, with an average return of $42 for every $1 spent. Automation takes this further by delivering personalized messages at scale.</p>
      
      <h3>Essential Automated Email Workflows</h3>
      <ul>
        <li><strong>Welcome Series:</strong> Introduce new subscribers to your brand and set expectations</li>
        <li><strong>Abandoned Cart Recovery:</strong> Recover lost sales with targeted reminders</li>
        <li><strong>Lead Nurturing Sequences:</strong> Guide prospects through the sales funnel</li>
        <li><strong>Re-engagement Campaigns:</strong> Win back inactive subscribers</li>
        <li><strong>Post-Purchase Follow-up:</strong> Encourage reviews and repeat purchases</li>
      </ul>
      
      <h3>Segmentation Strategies</h3>
      <p>Segment your email list based on demographics, behavior, purchase history, and engagement levels. Segmented campaigns receive 14.3% higher open rates and 100.9% higher click-through rates.</p>
      
      <h3>Personalization Beyond First Names</h3>
      <p>Use dynamic content to personalize email based on user behavior, preferences, and past purchases. Personalized emails deliver 6x higher transaction rates.</p>
      
      <h3>Testing and Optimization</h3>
      <p>Continuously test subject lines, send times, content, and CTAs. Monitor deliverability metrics and maintain good sender reputation through proper list hygiene.</p>
    `,
    relatedPosts: [1, 3, 5],
  },
  {
    id: 8,
    category: "Conversion Optimization",
    readTime: "8 min read",
    title: "CRO: Turning Visitors into Customers",
    summary: "Proven techniques to increase your website's conversion rate.",
    date: "Nov 5, 2023",
    views: "3.8k",
    likes: "221",
    author: "Alex Martinez",
    authorRole: "CRO Specialist",
    tags: [
      "Conversion Rate Optimization",
      "A/B Testing",
      "User Experience",
      "Website Optimization",
    ],
    fullContent: `
      <h2>The Science of Conversion Rate Optimization</h2>
      <p>Conversion Rate Optimization (CRO) is the systematic process of increasing the percentage of website visitors who take desired actions. Small improvements can yield significant results—a 1% increase in conversion rate can double your profits.</p>
      
      <h3>CRO Fundamentals</h3>
      <ul>
        <li><strong>Data-Driven Decisions:</strong> Use analytics to identify optimization opportunities</li>
        <li><strong>User Experience Focus:</strong> Remove friction from the conversion process</li>
        <li><strong>Testing Methodology:</strong> Implement systematic A/B testing programs</li>
        <li><strong>Continuous Improvement:</strong> CRO is an ongoing process, not a one-time project</li>
      </ul>
      
      <h3>High-Impact Areas to Test</h3>
      <ul>
        <li>Headlines and value propositions</li>
        <li>Call-to-action buttons (color, text, placement)</li>
        <li>Form fields and checkout processes</li>
        <li>Social proof and testimonials</li>
        <li>Page loading speed and mobile optimization</li>
      </ul>
      
      <h3>Common Conversion Killers</h3>
      <p>Identify and eliminate barriers to conversion such as complex forms, slow loading times, lack of trust signals, poor mobile experience, and unclear value propositions.</p>
      
      <h3>Tools and Technologies</h3>
      <p>Utilize tools like Google Optimize, Hotjar, Crazy Egg, and Optimizely to test hypotheses and measure results. Heat mapping and user session recordings provide valuable insights into user behavior.</p>
    `,
    relatedPosts: [2, 5, 6],
  },
];

type Blog = (typeof blogData)[number];

const BlogsPage = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", ...new Set(blogData.map((blog) => blog.category))];

  const filteredBlogs = blogData.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openModal = (blog: any) => {
    setSelectedBlog(blog);
  };

  const closeModal = () => {
    setSelectedBlog(null);
  };

  const getRelatedPosts = (currentBlog: any) => {
    return currentBlog.relatedPosts
      .map((id: any) => blogData.find((blog) => blog.id === id))
      .filter(Boolean);
  };

  return (
    <>
      <section className="pt-24 pb-12 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-6 md:mb-8">
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm md:text-base"
            >
              Back to Home
            </button>
          </div>
          <div ref={sectionRef} className="opacity-100 translate-y-0">
            <div className="text-center mb-8 md:mb-16">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6">
                Marketing Insights & Blog
              </h1>
              <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                Stay updated with the latest marketing trends, strategies, and
                industry insights from our team of experts.
              </p>
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span>50+ Marketing Experts</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span>Actionable Industry Tips</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>Weekly Updates</span>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="max-w-4xl mx-auto mb-6 md:mb-8 px-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                  {/* <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div> */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-600 hover:bg-blue-50"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredBlogs.map((blog, index) => (
                <div
                  key={blog.id}
                  className="bg-white shadow-lg rounded-2xl p-4 md:p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <span className="text-xs md:text-sm text-blue-500 font-semibold uppercase bg-blue-50 px-2 md:px-3 py-1 rounded-full">
                        {blog.category}
                      </span>
                      <div className="flex items-center text-gray-400 text-xs md:text-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{blog.views}</span>
                      </div>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed line-clamp-3">
                      {blog.summary}
                    </p>

                    <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 2 && (
                        <span className="text-xs text-gray-400">
                          +{blog.tags.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 md:mb-4 text-xs md:text-sm text-gray-500 space-y-2 sm:space-y-0">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center space-x-2 md:space-x-3">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{blog.readTime}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{blog.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <button
                        onClick={() => openModal(blog)}
                        className="inline-flex items-center text-blue-600 text-sm md:text-base font-medium hover:text-blue-700 transition-colors group-hover:underline"
                      >
                        Read Full Article{" "}
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </button>
                      <div className="flex items-center space-x-2 text-gray-400 self-start sm:self-auto">
                        <button className="hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                        <span className="text-xs md:text-sm">{blog.likes}</span>
                        <button className="hover:text-blue-500 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBlogs.length === 0 && (
              <div className="text-center py-8 md:py-12">
                <p className="text-gray-500 text-base md:text-lg">
                  No articles found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 text-blue-600 hover:underline text-sm md:text-base"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start md:items-center justify-center p-2 md:p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[98vh] md:max-h-[95vh] overflow-y-auto mt-2 md:mt-0">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b p-4 md:p-6 flex justify-between items-start z-10">
              <div className="flex-1 pr-2 md:pr-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <span className="text-xs md:text-sm text-blue-500 font-semibold uppercase bg-blue-50 px-2 md:px-3 py-1 rounded-full">
                    {selectedBlog.category}
                  </span>
                  <div className="flex items-center text-gray-400 text-xs md:text-sm">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>{selectedBlog.views}</span>
                  </div>
                </div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                  {selectedBlog.title}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center text-xs md:text-sm text-gray-600 space-y-1 sm:space-y-0">
                  <span className="font-medium">{selectedBlog.author}</span>
                  <span className="hidden sm:inline mx-2">•</span>
                  <span>{selectedBlog.authorRole}</span>
                  <span className="hidden sm:inline mx-2">•</span>
                  <span>{selectedBlog.date}</span>
                  <span className="hidden sm:inline mx-2">•</span>
                  <span>{selectedBlog.readTime}</span>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 md:p-6">
              {/* Article Content */}
              <div className="prose prose-sm md:prose-lg max-w-none mb-6 md:mb-8">
                <div
                  dangerouslySetInnerHTML={{ __html: selectedBlog.fullContent }}
                />
              </div>

              {/* Tags */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {selectedBlog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center px-2 md:px-3 py-2 text-xs md:text-sm text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Tag className="w-3 h-3 inline mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Info */}
              <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg mr-3 md:mr-4">
                    {selectedBlog.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-semibold text-gray-800">
                      {selectedBlog.author}
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      {selectedBlog.authorRole}
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              {getRelatedPosts(selectedBlog).length > 0 && (
                <div className="mb-6 md:mb-8">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">
                    Related Articles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {getRelatedPosts(selectedBlog).map((relatedPost: any) => (
                      <div
                        key={relatedPost.id}
                        className="bg-gray-50 rounded-lg p-3 md:p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => setSelectedBlog(relatedPost)}
                      >
                        <div className="text-xs text-blue-500 font-semibold uppercase mb-1 md:mb-2">
                          {relatedPost.category}
                        </div>
                        <h4 className="text-sm md:text-base font-medium text-gray-800 mb-1 md:mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{relatedPost.readTime}</span>
                          <span className="mx-2">•</span>
                          <span>{relatedPost.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 md:py-6 border-t border-gray-200 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <button className="flex items-center space-x-1 md:space-x-2 text-gray-600 hover:text-red-500 transition-colors text-sm">
                    <Heart className="w-5 h-5" />
                    <span>{selectedBlog.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 md:space-x-2 text-gray-600 hover:text-blue-500 transition-colors text-sm">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
                <div className="flex items-center space-x-1 md:space-x-2">
                  <button
                    onClick={() => {
                      const currentIndex = blogData.findIndex(
                        (blog) => blog.id === selectedBlog.id
                      );
                      const prevBlog = blogData[currentIndex - 1];
                      if (prevBlog) setSelectedBlog(prevBlog);
                    }}
                    disabled={
                      blogData.findIndex(
                        (blog) => blog.id === selectedBlog.id
                      ) === 0
                    }
                    className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" /> Previous
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = blogData.findIndex(
                        (blog) => blog.id === selectedBlog.id
                      );
                      const nextBlog = blogData[currentIndex + 1];
                      if (nextBlog) setSelectedBlog(nextBlog);
                    }}
                    disabled={
                      blogData.findIndex(
                        (blog) => blog.id === selectedBlog.id
                      ) ===
                      blogData.length - 1
                    }
                    className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center p-4 md:p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Ready to Implement These Strategies?
                </h3>
                <p className="text-sm md:text-base mb-4">
                  Let our experts help you apply these insights to grow your
                  business.
                </p>
                <Link to={"/contact"}>
                  <button className="bg-white text-blue-600 px-4 md:px-6 py-2 rounded-lg text-sm md:text-base font-medium hover:bg-gray-100 transition-colors">
                    Get Expert Consultation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogsPage;
