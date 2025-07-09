import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import FormBuilderPage from "./pages/FormBuilderPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import Forms from "./pages/Forms.jsx";
import Responses from "./pages/Responses.jsx";
import Analytics from "./pages/Analytics.jsx";
import Templates from "./pages/Templates.jsx";
import Team from "./pages/Team.jsx";
import Settings from "./pages/Settings.jsx";
import Form from "./pages/Form.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider delayDuration={0}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/responses" element={<Responses />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/team" element={<Team />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/form-builder/:formId" element={<FormBuilderPage />} />
          <Route path="/form/:id" element={<Form />} /> {/* ✅ Add this line */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
