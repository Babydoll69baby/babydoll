"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CodeGenerator() {
  const [prompt, setPrompt] = useState("")
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateCode = () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate AI code generation
    setTimeout(() => {
      let generatedCode = ""

      if (language === "javascript") {
        generatedCode = `// Generated JavaScript code based on: "${prompt}"
const generateAiResponse = async (userInput) => {
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userInput })
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error:', error);
    return 'Sorry, there was an error processing your request.';
  }
};

// Example usage
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('generate-btn');
  button.addEventListener('click', async () => {
    const input = document.getElementById('user-input').value;
    const result = await generateAiResponse(input);
    document.getElementById('result').textContent = result;
  });
});`
      } else if (language === "python") {
        generatedCode = `# Generated Python code based on: "${prompt}"
import requests
import json

def generate_ai_response(user_input):
  """
  Send a request to the AI API and return the response.
  
  Args:
      user_input (str): The user's input prompt
      
  Returns:
      str: The AI-generated response
  """
  try:
      response = requests.post(
          "https://api.example.com/ai",
          headers={"Content-Type": "application/json"},
          data=json.dumps({"prompt": user_input})
      )
      
      response.raise_for_status()  # Raise exception for HTTP errors
      
      return response.json().get("result", "No result found")
  except requests.exceptions.RequestException as e:
      print(f"Error: {e}")
      return "Sorry, there was an error processing your request."

# Example usage
if __name__ == "__main__":
  user_prompt = input("Enter your prompt: ")
  result = generate_ai_response(user_prompt)
  print(f"AI Response: {result}")`
      } else if (language === "typescript") {
        generatedCode = `// Generated TypeScript code based on: "${prompt}"
interface AiResponse {
  result: string;
  timestamp: number;
}

interface AiRequest {
  prompt: string;
  options?: {
    temperature?: number;
    maxTokens?: number;
  };
}

async function generateAiResponse(userInput: string): Promise<string> {
  try {
    const request: AiRequest = {
      prompt: userInput,
      options: {
        temperature: 0.7,
        maxTokens: 150
      }
    };
    
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data: AiResponse = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error:', error);
    return 'Sorry, there was an error processing your request.';
  }
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('generate-btn');
  if (button) {
    button.addEventListener('click', async () => {
      const input = document.getElementById('user-input') as HTMLInputElement;
      const result = await generateAiResponse(input.value);
      const outputElement = document.getElementById('result');
      if (outputElement) {
        outputElement.textContent = result;
      }
    });
  }
});`
      }

      setCode(generatedCode)
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <section className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="backdrop-blur-md bg-black/20 rounded-2xl p-6 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
      >
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            AI Code Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Textarea
                placeholder="Describe the code you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[200px] bg-gray-800/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
              />
              <div className="flex gap-4">
                <div className="flex-1">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-gray-800/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 rounded-md p-2"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                  </select>
                </div>
                <Button
                  onClick={generateCode}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isGenerating || !prompt.trim()}
                >
                  {isGenerating ? (
                    <>
                      <span className="mr-2">Generating</span>
                      <span className="relative flex h-3 w-12">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75"></span>
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75 left-4"></span>
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75 left-8"></span>
                      </span>
                    </>
                  ) : (
                    "Generate Code"
                  )}
                </Button>
              </div>
            </div>

            <div className="relative">
              <pre className="min-h-[200px] p-4 bg-gray-900/80 rounded-lg border border-gray-700 overflow-auto">
                <code className="text-sm font-mono text-gray-300">
                  {code || "// Your generated code will appear here"}
                </code>
              </pre>
              {code && (
                <Button
                  onClick={() => navigator.clipboard.writeText(code)}
                  variant="outline"
                  className="absolute top-2 right-2 border-gray-700 hover:border-blue-500 hover:bg-blue-500/10 text-xs"
                >
                  Copy
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </motion.div>
    </section>
  )
}

