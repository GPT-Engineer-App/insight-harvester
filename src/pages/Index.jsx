import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Upload, Search, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState('');
  const [ingestionStatus, setIngestionStatus] = useState('idle');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setIngestionStatus('loading');
    // Simulating file upload and processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIngestionStatus('success');
  };

  const { data: insights, isLoading, error } = useQuery({
    queryKey: ['insights', query],
    queryFn: async () => {
      if (!query) return null;
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return "Here are some insights based on your query...";
    },
    enabled: !!query,
  });

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Customer Insights LLM App</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upload Customer Notes</h2>
        <div className="flex items-center gap-4">
          <Input type="file" onChange={handleFileChange} accept=".txt,.csv,.json" />
          <Button onClick={handleUpload} disabled={!file || ingestionStatus === 'loading'}>
            {ingestionStatus === 'loading' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            Upload
          </Button>
        </div>
        {ingestionStatus === 'success' && (
          <Alert className="mt-4">
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Customer notes have been ingested successfully.</AlertDescription>
          </Alert>
        )}
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Query Customer Notes</h2>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Enter your query here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={() => {}} disabled={!query || isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            Search
          </Button>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Insights</h2>
        {error ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) : insights ? (
          <Textarea className="w-full h-40" value={insights} readOnly />
        ) : (
          <p className="text-gray-500">Enter a query to see insights from customer conversations.</p>
        )}
      </div>
    </div>
  );
};

export default Index;
