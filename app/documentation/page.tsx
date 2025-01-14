import { CodeBlock } from "@/components/ui/code-block"

export default function Documentation() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Documentation</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <p className="mb-4">Install the required dependencies:</p>
        
        <CodeBlock
          language="bash"
          value="sudo apt update && sudo apt upgrade -y"
        />
        
        <CodeBlock
          language="bash"
          value="sudo apt install build-essential git curl -y"
        />
      </section>

      {/* Add more sections as needed */}
    </div>
  )
}
