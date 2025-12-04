// src/components/WhatsAppAssistant.jsx
const WhatsAppAssistant = () => {
  const phone = "918738030604";
  const text = encodeURIComponent("Hello August");
  const url = `https://api.whatsapp.com/send/?phone=${phone}&text=${text}&type=phone_number&app_absent=0`;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Small label bubble (like AI assistant) */}
      <div className="mb-2 hidden sm:flex items-center gap-2 bg-white shadow-lg rounded-full px-4 py-2 text-xs text-gray-700 border border-gray-200">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        <span>Need help? Chat with us</span>
      </div>

      {/* WhatsApp button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 shadow-xl hover:scale-105 active:scale-95 transition-transform"
      >
        {/* Simple WhatsApp-like icon using SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white"
        >
          <path d="M16.01 5.003c-5.5 0-9.97 4.465-9.97 9.957 0 1.755.46 3.463 1.34 4.977L5 27l7.25-2.36c1.46.8 3.11 1.22 4.76 1.22h.01c5.49 0 9.98-4.465 9.98-9.957 0-2.663-1.04-5.17-2.93-7.05-1.88-1.88-4.39-2.85-7.06-2.85zm-.01 2.33c2.06 0 3.99.8 5.45 2.25 1.46 1.45 2.27 3.38 2.27 5.43 0 4.24-3.47 7.7-7.72 7.7h-.01c-1.43 0-2.84-.4-4.07-1.15l-.29-.17-4.3 1.4 1.4-4.18-.19-.3c-.82-1.33-1.26-2.87-1.26-4.4 0-4.23 3.46-7.68 7.71-7.68zm4.18 4.4c-.23-.12-1.38-.68-1.6-.76-.21-.08-.36-.12-.52.12-.15.23-.6.76-.74.92-.14.15-.27.17-.5.06-.23-.12-.97-.36-1.85-1.15-.68-.6-1.14-1.34-1.27-1.57-.13-.23-.01-.35.1-.47.1-.1.23-.27.35-.4.12-.14.16-.23.24-.38.08-.15.05-.29-.02-.41-.07-.12-.52-1.25-.71-1.71-.19-.46-.38-.39-.52-.39-.14 0-.29-.02-.44-.02-.16 0-.41.06-.62.29-.21.23-.81.79-.81 1.93 0 1.14.83 2.24.95 2.4.12.15 1.64 2.67 3.97 3.74.56.24.99.38 1.33.49.56.18 1.07.15 1.47.09.45-.07 1.38-.56 1.57-1.1.19-.54.19-1 .13-1.1-.06-.1-.21-.16-.44-.27z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppAssistant;
// src/components/WhatsAppAssistant.jsx
const WhatsAppAssistant = () => {
  const phone = "918738030604";
  const text = encodeURIComponent("Hello August");
  const url = `https://api.whatsapp.com/send/?phone=${phone}&text=${text}&type=phone_number&app_absent=0`;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Small label bubble (like AI assistant) */}
      <div className="mb-2 hidden sm:flex items-center gap-2 bg-white shadow-lg rounded-full px-4 py-2 text-xs text-gray-700 border border-gray-200">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        <span>Need help? Chat with us</span>
      </div>

      {/* WhatsApp button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 shadow-xl hover:scale-105 active:scale-95 transition-transform"
      >
        {/* Simple WhatsApp-like icon using SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white"
        >
          <path d="M16.01 5.003c-5.5 0-9.97 4.465-9.97 9.957 0 1.755.46 3.463 1.34 4.977L5 27l7.25-2.36c1.46.8 3.11 1.22 4.76 1.22h.01c5.49 0 9.98-4.465 9.98-9.957 0-2.663-1.04-5.17-2.93-7.05-1.88-1.88-4.39-2.85-7.06-2.85zm-.01 2.33c2.06 0 3.99.8 5.45 2.25 1.46 1.45 2.27 3.38 2.27 5.43 0 4.24-3.47 7.7-7.72 7.7h-.01c-1.43 0-2.84-.4-4.07-1.15l-.29-.17-4.3 1.4 1.4-4.18-.19-.3c-.82-1.33-1.26-2.87-1.26-4.4 0-4.23 3.46-7.68 7.71-7.68zm4.18 4.4c-.23-.12-1.38-.68-1.6-.76-.21-.08-.36-.12-.52.12-.15.23-.6.76-.74.92-.14.15-.27.17-.5.06-.23-.12-.97-.36-1.85-1.15-.68-.6-1.14-1.34-1.27-1.57-.13-.23-.01-.35.1-.47.1-.1.23-.27.35-.4.12-.14.16-.23.24-.38.08-.15.05-.29-.02-.41-.07-.12-.52-1.25-.71-1.71-.19-.46-.38-.39-.52-.39-.14 0-.29-.02-.44-.02-.16 0-.41.06-.62.29-.21.23-.81.79-.81 1.93 0 1.14.83 2.24.95 2.4.12.15 1.64 2.67 3.97 3.74.56.24.99.38 1.33.49.56.18 1.07.15 1.47.09.45-.07 1.38-.56 1.57-1.1.19-.54.19-1 .13-1.1-.06-.1-.21-.16-.44-.27z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppAssistant;
