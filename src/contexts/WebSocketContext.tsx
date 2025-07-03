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

// --- Constants (moved from UserAgency for context initialization) ---
const INITIAL_WORD_COUNT = 200;
const INITIAL_PURPOSE = "Inform";
const INITIAL_COLOR_SCHEME = ["#4A90E2", "#50E3C2", "#FF6B6B"].join(","); // Default first color scheme

// --- Interfaces for Context Data ---
export interface GenerateNarrativePayload {
  // Exported for use in UserAgency
  emotion: string;
  intensity_level: number;
  word_count: number;
  purpose: string;
  colorScheme: string;
}

interface WebSocketContextType {
  sessionId: string;
  summary: string;
  setSummary: (summary: string) => void;
  visualizationImages: string[];
  setVisualizationImages: (images: string[]) => void;
  recommendedEmotion: string;
  recommendedEmotionReason: string;
  inappropriateEmotion: string;
  inappropriateEmotionReason: string;
  isGeneratingSummary: boolean;
  setIsGeneratingSummary: (generating: boolean) => void;

  // NEW: User input states managed by context
  selectedEmotion: string;
  setSelectedEmotion: (emotion: string) => void;
  emotionIntensity: number;
  setEmotionIntensity: (intensity: number) => void;
  selectedWordCount: number;
  setWordCount: (count: number) => void;
  purpose: string;
  setPurpose: (purpose: string) => void;
  colorScheme: string;
  setColorScheme: (scheme: string) => void;
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
  const [visualizationImages, setVisualizationImages] = useState<string[]>([]);
  const [recommendedEmotion, setRecommendedEmotion] = useState<string>("");
  const [recommendedEmotionReason, setRecommendedEmotionReason] =
    useState<string>("");
  const [inappropriateEmotion, setInappropriateEmotion] = useState<string>("");
  const [inappropriateEmotionReason, setInappropriateEmotionReason] =
    useState<string>("");
  const [isGeneratingSummary, setIsGeneratingSummary] =
    useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] =
    useState<string>("Preparing data...");
  const [isOutputReady, setIsOutputReady] = useState<boolean>(false);
  // NEW: User input states, now managed by the context
  const [selectedEmotion, setSelectedEmotion] = useState<string>("joy"); // Default initial emotion
  const [isEmotionInitialized, setIsEmotionInitialized] = useState(false); // Flag for initial set
  const [emotionIntensity, setEmotionIntensity] = useState<number>(1);
  const [selectedWordCount, setWordCount] =
    useState<number>(INITIAL_WORD_COUNT);
  const [purpose, setPurpose] = useState<string>(INITIAL_PURPOSE);
  const [colorScheme, setColorScheme] = useState<string>(INITIAL_COLOR_SCHEME);

  // Effect to initialize selectedEmotion from recommendedEmotion only once
  useEffect(() => {
    if (recommendedEmotion && !isEmotionInitialized) {
      console.log(
        "Initializing selectedEmotion from recommendedEmotion:",
        recommendedEmotion
      );
      // Set the selected emotion to the recommended
      setSelectedEmotion(recommendedEmotion.toLowerCase());
      setIsEmotionInitialized(true); // Mark as initialized
    }
  }, [recommendedEmotion, isEmotionInitialized]);

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
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket: Disconnected");
      // Implement reconnection logic here if desired
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket: Error:", error);
      setLoadingMessage("Connection error. Please try again.");
    };

    // Cleanup: Close WebSocket when component unmounts
    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, [sessionId]); // Re-run effect only if sessionId changes (which it won't after initial mount)

  // Context value to be provided to consumers
  const contextValue: WebSocketContextType = {
    sessionId,
    summary,
    setSummary,
    visualizationImages,
    setVisualizationImages,
    recommendedEmotion,
    recommendedEmotionReason,
    inappropriateEmotion,
    inappropriateEmotionReason,
    isGeneratingSummary,
    setIsGeneratingSummary,

    // NEW: Provide user input states and their setters
    selectedEmotion,
    setSelectedEmotion,
    emotionIntensity,
    setEmotionIntensity,
    selectedWordCount,
    setWordCount,
    purpose,
    setPurpose,
    colorScheme,
    setColorScheme,
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
