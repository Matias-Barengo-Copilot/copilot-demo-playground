/**
 * Layout for the agent chat page: full viewport (100vh), dark background only,
 * no outer scroll — only the chat messages area scrolls.
 */
export default function AgentChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-linear-to-b from-zinc-950 to-zinc-900">
      {children}
    </div>
  );
}
