import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiGithub, FiShield } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const MAX_MESSAGES = 3;
  const COOLDOWN_PERIOD = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const MIN_MESSAGE_INTERVAL = 60 * 1000; // 1 minute between messages
  const access_key = import.meta.env.VITE_ACCESS_KEY;

  // Generate device fingerprint
  const getDeviceFingerprint = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.textBaseline = "top";
    ctx.font = "14px Arial";
    ctx.fillText("Device fingerprint", 2, 2);

    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + "x" + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL(),
    ].join("|");

    // Simple hash function
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString();
  };

  // Check rate limits on component mount
  useEffect(() => {
    const deviceId = getDeviceFingerprint();
    const storageKey = `contact_messages_${deviceId}`;
    const timeKey = `last_message_${deviceId}`;

    const storedCount = localStorage.getItem(storageKey);
    const storedTime = localStorage.getItem(timeKey);

    if (storedCount && storedTime) {
      const count = parseInt(storedCount);
      const time = parseInt(storedTime);
      const timeSinceLastMessage = Date.now() - time;

      // Reset count if cooldown period has passed
      if (timeSinceLastMessage > COOLDOWN_PERIOD) {
        localStorage.removeItem(storageKey);
        localStorage.removeItem(timeKey);
        setMessageCount(0);
        setIsLimitReached(false);
      } else {
        setMessageCount(count);
        setLastMessageTime(time);
        setIsLimitReached(count >= MAX_MESSAGES);
      }
    }
  }, []);

  const validateInput = (data: typeof formData) => {
    // Basic input validation
    if (data.name.length < 2 || data.name.length > 50) {
      throw new Error("Name must be between 2 and 50 characters");
    }

    if (data.message.length < 10 || data.message.length > 1000) {
      throw new Error("Message must be between 10 and 1000 characters");
    }

    // Check for spam patterns
    const spamKeywords = [
      "free",
      "click here",
      "urgent",
      "casino",
      "lottery",
      "viagra",
    ];
    const messageText = data.message.toLowerCase();
    const hasSpam = spamKeywords.some((keyword) => messageText.includes(keyword));

    if (hasSpam) {
      throw new Error("Message contains inappropriate content");
    }

    // Check for repeated characters (possible spam)
    if (/(.)\1{10,}/.test(data.message)) {
      throw new Error("Message contains suspicious patterns");
    }

    return true;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if limit is reached
      if (isLimitReached) {
        toast({
          title: "🚫 Message limit reached",
          description: `You can only send ${MAX_MESSAGES} messages per day. Please try again tomorrow.`,
        });
        return;
      }

      // Check minimum interval between messages
      const timeSinceLastMessage = Date.now() - lastMessageTime;
      if (timeSinceLastMessage < MIN_MESSAGE_INTERVAL && lastMessageTime > 0) {
        const remainingTime = Math.ceil(
          (MIN_MESSAGE_INTERVAL - timeSinceLastMessage) / 1000
        );
        toast({
          title: "⏰ Please wait",
          description: `You can send another message in ${remainingTime} seconds.`,
        });
        return;
      }

      // Validate input
      validateInput(formData);

      // Check if access key is loaded
      if (!access_key) {
        toast({
          title: "❌ Configuration Error",
          description: "Service temporarily unavailable. Please try again later.",
        });
        return;
      }

      const requestBody = {
        access_key: access_key,
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        from_name: formData.name.trim(),
        subject: `Portfolio Contact: ${formData.name.trim()}`,
        // Add security headers
        "h:X-Forwarded-For": "rate-limited",
        "h:X-Device-ID": getDeviceFingerprint().substring(0, 8),
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Update rate limiting counters
        const deviceId = getDeviceFingerprint();
        const newCount = messageCount + 1;
        const currentTime = Date.now();

        localStorage.setItem(`contact_messages_${deviceId}`, newCount.toString());
        localStorage.setItem(`last_message_${deviceId}`, currentTime.toString());

        setMessageCount(newCount);
        setLastMessageTime(currentTime);
        setIsLimitReached(newCount >= MAX_MESSAGES);

        toast({
          title: "✅ Message sent successfully!",
          description: `Thank you for reaching out! (${newCount}/${MAX_MESSAGES} messages used today)`,
        });

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);

      toast({
        title: "❌ Error sending message",
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: "Email",
      icon: FiMail,
      url: "mailto:abdlwasih4life@gmail.com",
      label: "Send me an email",
    },
    {
      name: "LinkedIn",
      icon: FiLinkedin,
      url: "https://www.linkedin.com/in/abdul-wasih-977a702b9/",
      label: "Connect on LinkedIn",
    },
    {
      name: "Github",
      icon: FiGithub,
      url: "https://github.com/AbdulWasih05",
      label: "View my Github profile",
    },
  ];

  return (
    <section id="contact" className="bg-white py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          className="text-3xl font-semibold text-gray-900 text-center mb-4 brand-name"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Let's Create Something Amazing
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to bring your vision to life? Let's discuss your project and
          explore how great design can elevate your brand.
        </motion.p>

        {/* Rate Limit Status */}
        {/* <motion.div
          className="flex items-center justify-center mb-8 p-3 bg-gray-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <FiShield className="w-4 h-4 mr-2 text-gray-600" />
          <span className="text-sm text-gray-600">
            Messages used today: {messageCount}/{MAX_MESSAGES}
            {isLimitReached && " • Limit reached"}
          </span>
        </motion.div> */}

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                maxLength={50}
                disabled={isLimitReached}
                className="border border-gray-300 focus:border-black focus:ring-2 focus:ring-black rounded-lg px-4 py-3 w-full transition-colors duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                aria-label="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
                disabled={isLimitReached}
                className="border border-gray-300 focus:border-black focus:ring-2 focus:ring-black rounded-lg px-4 py-3 w-full transition-colors duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                aria-label="Your email address"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  const form = e.currentTarget.form;
                  if (form) {
                    form.requestSubmit();
                  }
                }
              }}
              placeholder="Tell me about your project... (10-1000 characters)"
              rows={6}
              required
              minLength={10}
              maxLength={1000}
              disabled={isLimitReached}
              className="border border-gray-300 focus:border-black focus:ring-2 focus:ring-black rounded-lg px-4 py-3 w-full resize-none transition-colors duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              aria-label="Your message"
            />
            <div className="mt-1 text-right text-xs text-gray-500">
              {formData.message.length}/1000 characters
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting || isLimitReached}
            className="w-full bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none brand-name"
            whileHover={!isSubmitting && !isLimitReached ? { scale: 1.05 } : {}}
            whileTap={!isSubmitting && !isLimitReached ? { scale: 0.98 } : {}}
          >
            {isSubmitting
              ? "Sending..."
              : isLimitReached
              ? "Daily limit reached"
              : "Send Message"}
          </motion.button>
        </motion.form>

        {/* Social Links */}
        <motion.div
          className="flex justify-center space-x-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:opacity-70 transition-opacity p-2 focus:outline-none focus:ring-2 focus:ring-black rounded"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.2, y: -4 }}
              whileTap={{ scale: 0.9 }}
              viewport={{ once: true }}
              aria-label={link.label}
            >
              <link.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
