import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Accessibility Widget</CardTitle>
          <CardDescription>
            A barrier-free plugin for websites that enhances accessibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              This accessibility widget can be easily embedded on any website via a simple script tag. It provides users with a comprehensive set of accessibility adjustments to customize their browsing experience.
            </p>
            
            <h3 className="text-xl font-semibold mt-6">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-medium mb-2">Content Adjustments</h4>
                <ul className="list-disc list-inside text-sm">
                  <li>Content scaling</li>
                  <li>Font family changing</li>
                  <li>Headings highlighting</li>
                  <li>Text magnification</li>
                  <li>And more...</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-medium mb-2">Color Adjustments</h4>
                <ul className="list-disc list-inside text-sm">
                  <li>Dark contrast</li>
                  <li>High contrast</li>
                  <li>Saturation controls</li>
                  <li>Monochrome mode</li>
                  <li>And more...</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-medium mb-2">Orientation Adjustments</h4>
                <ul className="list-disc list-inside text-sm">
                  <li>Reading guides</li>
                  <li>Focus highlighting</li>
                  <li>Custom cursors</li>
                  <li>Animation control</li>
                  <li>And more...</li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mt-6">Implementation</h3>
            <div className="bg-gray-800 p-4 rounded-lg text-white font-mono text-sm overflow-x-auto">
              &lt;script src="https://your-domain.com/accessibility-widget.js"&gt;&lt;/script&gt;
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link href="/demo" className="flex-1">
              <Button className="w-full">View Demo</Button>
            </Link>
            <Button variant="outline" className="flex-1" onClick={() => window.open("https://github.com/your-repository", "_blank")}>
              GitHub Repository
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
