import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

// --- Interfaces for Context Data ---
interface GenerateNarrativePayload {
  emotion: string;
  intensity_level: number;
  word_count: number;
  purpose: string;
  colorScheme: string; // Added colorScheme to payload
}

interface WebSocketContextType {
  sessionId: string;
  summary: string;
  visualizationImages: string[];
  currentImageIndex: number;
  nextImage: () => void;
  prevImage: () => void;
  recommendedEmotion: string;
  recommendedEmotionReason: string;
  inappropriateEmotion: string;
  inappropriateEmotionReason: string;
  isLoading: boolean;
  loadingMessage: string;
  isOutputReady: boolean;
  sendMessage: (payload: any) => void; // Function to send messages via WebSocket
}

// --- Create the Context ---
const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

// --- WebSocketProvider Component ---
interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const [sessionId] = useState(() => uuidv4());
  const ws = useRef<WebSocket | null>(null);

  // States that will be shared via context
  const [summary, setSummary] = useState<string>("");
  const [visualizationImages, setVisualizationImages] = useState<string[]>([
    "https://placehold.co/500x300/e0e0e0/333333?text=Visualization+Placeholder", // Initial placeholder
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [recommendedEmotion, setRecommendedEmotion] = useState<string>("");
  const [recommendedEmotionReason, setRecommendedEmotionReason] =
    useState<string>("");
  const [inappropriateEmotion, setInappropriateEmotion] = useState<string>("");
  const [inappropriateEmotionReason, setInappropriateEmotionReason] =
    useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] =
    useState<string>("Preparing data...");
  const [isOutputReady, setIsOutputReady] = useState<boolean>(false);

  // Function to send messages over WebSocket
  const sendMessage = useCallback((payload: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(payload));
      console.log("Sent data via WebSocket:", payload);
    } else {
      console.warn("WebSocket is not open. Cannot send data.");
      // Optionally, queue messages or show an error to the user
    }
  }, []);

  // WebSocket connection and message handling
  useEffect(() => {
    console.log("WebSocket: Attempting connection with Session ID:", sessionId);
    ws.current = new WebSocket(`ws://127.0.0.1:8000/websocket/ws/${sessionId}`);

    ws.current.onopen = () => {
      console.log("WebSocket: Connected with Session ID:", sessionId);
    };

    ws.current.onmessage = (event) => {
      console.log("WebSocket: Message Received:", event.data);
      try {
        const message = JSON.parse(event.data);
        switch (message["data"]["title"]) {
          case "affective_narrative":
            setSummary(message["data"]["result"]);
            break;
          case "recommended_emotion":
            setRecommendedEmotion(message["data"]["result"]["emotion"]);
            setRecommendedEmotionReason(message["data"]["result"]["reason"]);
            break;
          case "inappropriate_emotion":
            setInappropriateEmotion(
              message["data"]["result"]["is_there_inappropriate_emotion"]
            );
            setInappropriateEmotionReason(message["data"]["result"]["reason"]);
            break;
          default:
            console.warn("WebSocket: Unknown message type:", message.type);
        }
      } catch (e) {
        console.error("WebSocket: Failed to parse message:", e, event.data);
        setSummary(`Received unparseable message: ${event.data}`);
        setIsLoading(false);
        setIsOutputReady(false);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket: Disconnected");
      // Implement reconnection logic here if desired
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket: Error:", error);
      setLoadingMessage("Connection error. Please try again.");
      setIsLoading(false);
      setIsOutputReady(false);
    };

    // Cleanup: Close WebSocket when component unmounts
    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, [sessionId]); // Re-run effect only if sessionId changes (which it won't after initial mount)

  // Navigation functions for visualization gallery
  const nextImage = useCallback(() => {
    if (isOutputReady) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % visualizationImages.length
      );
    }
  }, [isOutputReady, visualizationImages.length]);

  const prevImage = useCallback(() => {
    if (isOutputReady) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + visualizationImages.length) %
          visualizationImages.length
      );
    }
  }, [isOutputReady, visualizationImages.length]);

  // Context value to be provided to consumers
  const contextValue: WebSocketContextType = {
    sessionId,
    summary,
    visualizationImages,
    currentImageIndex,
    nextImage,
    prevImage,
    recommendedEmotion,
    recommendedEmotionReason,
    inappropriateEmotion,
    inappropriateEmotionReason,
    isLoading,
    loadingMessage,
    isOutputReady,
    sendMessage,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

// --- Custom Hook to Consume the Context ---
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
