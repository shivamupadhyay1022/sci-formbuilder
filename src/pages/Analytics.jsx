import React, { useState, useEffect, useMemo } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';
import { Download, FileBarChart, Loader, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const Analytics = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState('');
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Replace with your actual Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';

  // Effect to fetch the list of available forms (sheets)
  useEffect(() => {
    const fetchForms = async () => {
      if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
        setError('Google Script URL is not configured.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getSheetNames`);
        const result = await response.json();

        if (result.status === 'success') {
          setForms(result.data);
          if (result.data.length > 0) {
            setSelectedForm(result.data[0].name); // Select the first form by default
          }
        } else {
          throw new Error(result.message || 'Failed to fetch form list.');
        }
      } catch (err) {
        setError(err.message);
        toast.error(`Error: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForms();
  }, []);

  // Effect to fetch response data when a form is selected
  useEffect(() => {
    if (!selectedForm) return;

    const fetchResponseData = async () => {
      setIsDataLoading(true);
      setResponses([]); // Clear previous data
      try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getSheetData&sheetName=${encodeURIComponent(selectedForm)}`);
        const result = await response.json();

        if (result.status === 'success') {
          setResponses(result.data);
        } else {
          throw new Error(result.message || `Failed to fetch data for ${selectedForm}.`);
        }
      } catch (err) {
        toast.error(`Error: ${err.message}`);
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchResponseData();
  }, [selectedForm]);

  // Memoized calculation for response trends
  const responseTrendData = useMemo(() => {
    if (!responses || responses.length === 0) return [];
    
    const countsByDate = responses.reduce((acc, curr) => {
      // Assuming the first column is always a timestamp
      const timestamp = Object.values(curr)[0];
      if (timestamp && typeof timestamp === 'string') {
        const date = new Date(timestamp).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.entries(countsByDate).map(([date, count]) => ({ date, responses: count }));
  }, [responses]);

  const handleExportAnalytics = (format) => {
    toast.info(`Exporting as ${format} is not yet implemented.`);
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center p-12"><Loader className="h-8 w-8 animate-spin text-primary" /></div>;
    }

    if (error) {
      return (
        <div className="text-center p-12 border rounded-lg bg-destructive/10 text-destructive">
          <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
          <h3 className="text-lg font-medium mb-2">An Error Occurred</h3>
          <p>{error}</p>
        </div>
      );
    }

    if (forms.length === 0) {
        return (
            <div className="text-center p-12 border rounded-lg bg-muted/20">
                <h3 className="text-lg font-medium mb-2">No Forms Found</h3>
                <p className="text-muted-foreground">Create a form first to see its analytics.</p>
            </div>
        );
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <p className="text-muted-foreground text-sm">Total Submissions</p>
            <p className="text-3xl font-bold">{isDataLoading ? <Loader className="h-6 w-6 animate-spin"/> : responses.length}</p>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <p className="text-muted-foreground text-sm">Form Fields</p>
            <p className="text-3xl font-bold">{isDataLoading ? <Loader className="h-6 w-6 animate-spin"/> : (responses[0] ? Object.keys(responses[0]).length : 0)}</p>
          </div>
           <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <p className="text-muted-foreground text-sm">Last Response</p>
            <p className="text-3xl font-bold">{isDataLoading ? <Loader className="h-6 w-6 animate-spin"/> : (responses.length > 0 ? new Date(Object.values(responses[responses.length-1])[0]).toLocaleDateString() : 'N/A')}</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-6">
          <div className="p-6">
            <h3 className="text-2xl font-semibold">Response Trends</h3>
          </div>
          <div className="h-[350px] p-6 pt-0">
            {isDataLoading ? (
                <div className="flex justify-center items-center h-full"><Loader className="h-8 w-8 animate-spin text-primary" /></div>
            ) : responseTrendData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="responses" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
                <div className="flex justify-center items-center h-full text-muted-foreground">No response data to display for this period.</div>
            )}
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
                <h3 className="text-2xl font-semibold">Recent Submissions</h3>
            </div>
            <div className="p-6 pt-0">
                {isDataLoading ? (
                    <div className="flex justify-center items-center h-40"><Loader className="h-8 w-8 animate-spin text-primary" /></div>
                ) : responses.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                                <tr>
                                    {Object.keys(responses[0]).map(key => <th key={key} className="px-6 py-3">{key}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {responses.slice(0, 5).map((response, index) => (
                                    <tr key={index} className="border-b">
                                        {Object.values(response).map((value, i) => <td key={i} className="px-6 py-4">{value}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-10 text-muted-foreground">No submissions yet for this form.</div>
                )}
            </div>
        </div>
      </>
    );
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track form performance and engagement</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
          <div className="flex gap-4">
            <select 
              value={selectedForm} 
              onChange={(e) => setSelectedForm(e.target.value)} 
              className="w-[220px] flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading || forms.length === 0}
            >
              {forms.map(form => (
                <option key={form.id} value={form.name}>
                  {form.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2" onClick={() => handleExportAnalytics('pdf')}>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </button>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2" onClick={() => handleExportAnalytics('csv')}>
              <FileBarChart className="mr-2 h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>
        
        {renderContent()}

      </div>
    </MainLayout>
  );
};

export default Analytics;
