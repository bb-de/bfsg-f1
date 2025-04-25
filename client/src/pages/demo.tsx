import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
// Removed the import of the React AccessibilityWidget component

export default function Demo() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Inject the accessibilityWidget script on mount
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/accessibility-widget.js";
    script.async = true;
    
    // Set event listener to know when the script is loaded
    script.onload = () => {
      setScriptLoaded(true);
      
      // Force initialization (in case DOMContentLoaded was already fired)
      if (typeof window['AccessibilityWidget'] === 'object' && 
          typeof window['AccessibilityStore'] === 'object' && 
          typeof window['AccessibilityEffects'] === 'object') {
        
        // Objects should already be initialized by the script itself
        console.log("AccessibilityWidget loaded successfully");
      } else {
        console.error("AccessibilityWidget not found after script load");
      }
    };
    
    script.onerror = () => {
      console.error("Failed to load the accessibility widget script");
    };
    
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      <div className="p-4 max-w-5xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Button>
          </Link>
          <h1 className="text-xl font-medium">Accessibility Widget Demo</h1>
        </div>

        {/* Demo Website Content */}
        <div id="demo-website">
          <h1 className="text-3xl font-semibold mb-6">Demo Website Content</h1>
          <p className="mb-4">
            This is a demo page to showcase how the accessibility widget would work on a real website. The content here can be modified using the accessibility widget.
          </p>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-medium mb-4">About Our Company</h2>
            <p className="mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Maecenas non felis gravida, efficitur eros at, tincidunt nisl. Praesent non odio euismod, finibus erat at, finibus odio.
            </p>
            <p className="mb-3">
              Fusce maximus, sem in tincidunt convallis, justo odio ultrices felis, ac vehicula enim massa non nibh. Nullam nec interdum enim, vitae sodales elit.
            </p>
            <a href="#" className="text-primary hover:underline">
              Learn more about us →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80"
                alt="People collaborating in an office"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-medium mb-2">Our Services</h3>
              <p>
                We provide high-quality services to meet your needs. Our expert team is ready to help you achieve your goals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80"
                alt="Modern office space"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-medium mb-2">Our Approach</h3>
              <p>
                With a user-centered approach, we ensure that all solutions are designed with accessibility and usability in mind.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-medium mb-4">Contact Us</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea id="message" rows={4} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
              </div>
              <Button type="button">Send Message</Button>
            </form>
          </div>
        </div>
      </div>

      {/* Status indicator (for testing) */}
      {!scriptLoaded && (
        <div className="fixed bottom-2 left-2 bg-yellow-100 text-yellow-800 p-2 rounded text-sm">
          Loading widget...
        </div>
      )}
    </div>
  );
}
