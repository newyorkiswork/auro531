"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, X } from "lucide-react";

export function ChatDashModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 shadow-lg flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90"
          size="icon"
          aria-label="Open Voice Assistant"
        >
          <Mic className="h-8 w-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-full h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Voice/Chat Assistant
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1">
          <iframe
            src="https://agency-9e064f.chat-dash.com/prototype/683a99083ca574b13da8970f"
            title="ChatDash Assistant"
            width="100%"
            height="100%"
            style={{ border: "none", minHeight: "60vh" }}
            allow="microphone; camera"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 