
// 'use client';

// import { useRef } from 'react';
// import { useChat } from '@ai-sdk/react';
// import { DefaultChatTransport } from 'ai';
// import { Bot, User, Wrench, Send } from 'lucide-react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

// export default function Chat() {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const { messages, sendMessage, status, error } = useChat({
//     transport: new DefaultChatTransport({ api: '/api/chat' }),
//     onError: (err) => {
//       console.error('Chat API Error:', err);
//     },
//   });

//   const isBusy = status === 'submitted' || status === 'streaming';

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const messageText = inputRef.current?.value.trim();
//     if (!messageText || isBusy) return;

//     await sendMessage({ text: messageText });

//     if (inputRef.current) {
//       inputRef.current.value = '';
//     }
//   };

//   return (
//     <div className="flex flex-col w-full max-w-3xl py-12 mx-auto min-h-screen px-4">
//       <header className="mb-6 text-center">
//         <h1 className="text-3xl font-bold tracking-tight text-gray-900">
//           Autonomous Research Agent
//         </h1>
//         <p className="text-sm text-gray-500 mt-1">
//           Powered by Vercel AI SDK & Tool Calling
//         </p>
//       </header>

//       {error && (
//         <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
//           <strong>API Error:</strong>{' '}
//           {error.message || 'Failed to connect to /api/chat endpoint.'}
//         </div>
//       )}

//       <div className="flex-1 overflow-y-auto space-y-4 mb-6">
//         {messages.map((m) => (
//           <div
//             key={m.id}
//             className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div
//               className={`p-4 rounded-xl max-w-[90%] ${
//                 m.role === 'user' ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'
//               }`}
//             >
//               <div className="flex items-center gap-2 mb-2 font-semibold text-xs opacity-75">
//                 {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
//                 {m.role === 'user' ? 'You' : 'Agent'}
//               </div>

//               {m.parts.map((part, index) => {
//                 if (part.type === 'text') {
//                   return (
//                     <div key={`${m.id}-text-${index}`} className="prose max-w-none text-sm">
//                       <ReactMarkdown
//                         remarkPlugins={[remarkGfm]}
//                         components={{
//                           // Render styled clean tables
//                           table: ({ children }) => (
//                             <div className="overflow-x-auto my-3">
//                               <table className="min-w-full border-collapse border border-gray-300 text-left text-xs">
//                                 {children}
//                               </table>
//                             </div>
//                           ),
//                           thead: ({ children }) => (
//                             <thead className="bg-gray-200 font-semibold">{children}</thead>
//                           ),
//                           th: ({ children }) => (
//                             <th className="border border-gray-300 px-3 py-2">{children}</th>
//                           ),
//                           td: ({ children }) => (
//                             <td className="border border-gray-300 px-3 py-2">{children}</td>
//                           ),
//                           // Clean list items
//                           ul: ({ children }) => (
//                             <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>
//                           ),
//                           ol: ({ children }) => (
//                             <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>
//                           ),
//                           // Clean headers without showing '#'
//                           h1: ({ children }) => <h1 className="text-lg font-bold my-2">{children}</h1>,
//                           h2: ({ children }) => <h2 className="text-base font-bold my-2">{children}</h2>,
//                           h3: ({ children }) => <h3 className="text-sm font-bold my-1">{children}</h3>,
//                         }}
//                       >
//                         {part.text}
//                       </ReactMarkdown>
//                     </div>
//                   );
//                 }

//                 if (part.type === 'dynamic-tool' || part.type.startsWith('tool-')) {
//                   const toolName =
//                     part.type === 'dynamic-tool'
//                       ? part.toolName
//                       : part.type.replace(/^tool-/, '');

//                   return (
//                     <div
//                       key={`${m.id}-tool-${index}`}
//                       className="mt-2 text-xs bg-white/70 p-2 rounded border border-gray-200 text-gray-800"
//                     >
//                       <span className="flex items-center gap-1 font-mono text-blue-600 font-medium">
//                         <Wrench className="w-3 h-3" /> Executing tool: {toolName}
//                       </span>
//                     </div>
//                   );
//                 }

//                 return null;
//               })}
//             </div>
//           </div>
//         ))}
//       </div>

//       <form onSubmit={onSubmit} className="flex gap-2">
//         <input
//           ref={inputRef}
//           type="text"
//           defaultValue=""
//           placeholder="Ask something (e.g., 'Compare Python vs JavaScript in a table')"
//           className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
//         />
//         <button
//           type="submit"
//           disabled={isBusy}
//           className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition flex items-center justify-center"
//         >
//           <Send className="w-4 h-4" />
//         </button>
//       </form>
//     </div>
//   );
// }

'use client';

import { useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { Bot, User, Wrench, Send, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Chat() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    onError: (err) => {
      console.error('Chat API Error:', err);
    },
  });

  const isBusy = status === 'submitted' || status === 'streaming';

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const messageText = inputRef.current?.value.trim();
    if (!messageText || isBusy) return;

    await sendMessage({ text: messageText });

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl py-12 mx-auto min-h-screen px-4">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-orange-500">
          Autonomous Research Agent
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Powered by Vercel AI SDK & Tool Calling
        </p>
      </header>

      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          <strong>Error:</strong>{' '}
          {error.message || 'Failed to connect to /api/chat endpoint.'}
        </div>
      )}

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-6">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-4 rounded-xl max-w-[90%] ${
                m.role === 'user' ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 font-semibold text-xs opacity-75">
                {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                {m.role === 'user' ? 'You' : 'Agent'}
              </div>

              {m.parts.map((part, index) => {
                if (part.type === 'text') {
                  return (
                    <div key={`${m.id}-text-${index}`} className="prose max-w-none text-sm">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          table: ({ children }) => (
                            <div className="overflow-x-auto my-3">
                              <table className="min-w-full border-collapse border border-gray-300 text-left text-xs">
                                {children}
                              </table>
                            </div>
                          ),
                          thead: ({ children }) => (
                            <thead className="bg-gray-200 font-semibold">{children}</thead>
                          ),
                          th: ({ children }) => (
                            <th className="border border-gray-300 px-3 py-2">{children}</th>
                          ),
                          td: ({ children }) => (
                            <td className="border border-gray-300 px-3 py-2">{children}</td>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>
                          ),
                          h1: ({ children }) => <h1 className="text-lg font-bold my-2">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-base font-bold my-2">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-sm font-bold my-1">{children}</h3>,
                        }}
                      >
                        {part.text}
                      </ReactMarkdown>
                    </div>
                  );
                }

                // if (part.type === 'dynamic-tool' || part.type.startsWith('tool-')) {
                //   const toolName =
                //     part.type === 'dynamic-tool'
                //       ? part.toolName
                //       : part.type.replace(/^tool-/, '');

                  // return (
                  //   <div
                  //     key={`${m.id}-tool-${index}`}
                  //     className="mt-2 text-xs bg-white/70 p-2 rounded border border-gray-200 text-orange-100"
                  //   >
                  //     <span className="flex items-center gap-1 font-mono text-blue-600 font-medium">
                  //       <Wrench className="w-3 h-3" /> Executing tool: {toolName}
                  //     </span>
                  //   </div>
                  // );
                //}

                return null;
              })}
            </div>
          </div>
        ))}

        {/* CUTE THINKING INDICATOR WITH ANIMATED DOTS */}
        {isBusy && (
          <div className="flex gap-3 justify-start">
            <div className="p-4 rounded-xl bg-gray-100 text-gray-700 flex items-center gap-2 text-sm shadow-sm border border-gray-200">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              <span className="font-medium text-xs">Agent is thinking</span>
              <span className="flex gap-1 items-center ml-1">
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
              </span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          defaultValue=""
          placeholder="Ask something (e.g., 'Compare Python vs JavaScript in a table')"
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          disabled={isBusy}
          className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}