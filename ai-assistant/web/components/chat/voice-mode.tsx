"use client";

import { useState } from "react";
import { LiveKitRoom, VoiceAssistantControlBar } from "@livekit/components-react";
import { MicIcon, MicOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function VoiceMode() {
  const [connected, setConnected] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  async function toggleVoice() {
    if (connected) {
      setConnected(false);
      return;
    }

    try {
      const res = await fetch("/api/voice/token");
      const data = await res.json();
      setToken(data.token);
      setConnected(true);
    } catch (e) {
      console.error("Failed to connect to voice agent", e);
    }
  }

  if (!connected || !token) {
    return (
      <Button
        variant="secondary"
        size="sm"
        className="gap-2 rounded-full px-4"
        onClick={toggleVoice}
      >
        <MicIcon className="h-4 w-4" />
        Voice Mode
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <LiveKitRoom
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL || "wss://localhost:7880"}
        token={token}
        connect={true}
        onDisconnected={() => setConnected(false)}
      >
        <div className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-card border shadow-xl">
          <div className="relative">
             <div className="h-32 w-32 rounded-full bg-primary/20 animate-pulse flex items-center justify-center">
                <MicIcon className="h-12 w-12 text-primary" />
             </div>
          </div>
          <h3 className="text-xl font-semibold">Avora AI Voice Agent</h3>
          <p className="text-muted-foreground text-center max-w-xs">
            I can hear you now! Just start speaking.
          </p>
          <div className="flex gap-4">
            <VoiceAssistantControlBar />
            <Button
              variant="destructive"
              onClick={() => setConnected(false)}
            >
              End Call
            </Button>
          </div>
        </div>
      </LiveKitRoom>
    </div>
  );
}
