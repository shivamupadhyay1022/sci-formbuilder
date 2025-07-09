import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { PlusCircle, ArrowUpRight, LineChart, Users, FileText, TrendingUp, Copy, MoreVertical, Pencil, Share2, Trash } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { MOCK_FORMS } from '@/lib/constants';
import { formatDistanceToNow } from 'date-fns';

const Dashboard = () => {
  const navigate = useNavigate();
  const [createFormTitle, setCreateFormTitle] = useState('');
  const [createFormDescription, setCreateFormDescription] = useState('');
  const [isCreateFormDialogOpen, setIsCreateFormDialogOpen] = useState(false);
  const [isCreatingForm, setIsCreatingForm] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleCreateFormSubmit = (e) => {
    e.preventDefault();
    setIsCreatingForm(true);

    // Simulate API call
    setTimeout(() => {
      setIsCreatingForm(false);
      setIsCreateFormDialogOpen(false);
      toast.success('Form created successfully');
      // Navigate to form builder with a generated ID
      navigate(`/form-builder/new-${Date.now()}`);
    }, 500);
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and create your forms.
          </p>
        </div>
        {/* Inlined CreateFormDialog */}
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
          onClick={() => setIsCreateFormDialogOpen(true)}
        >
          <PlusCircle className="mr-1 h-4 w-4" /> New Form
        </button>

        {isCreateFormDialogOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
            <div className="relative w-full max-w-[525px] rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
              <form onSubmit={handleCreateFormSubmit}>
                <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                  <h2 className="text-lg font-semibold leading-none tracking-tight">Create a new form</h2>
                  <p className="text-sm text-muted-foreground">
                    Enter the details for your new form. You can customize it fully in the form builder.
                  </p>
                </div>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Form Title</label>
                    <input
                      id="title"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={createFormTitle}
                      onChange={(e) => setCreateFormTitle(e.target.value)}
                      placeholder="E.g. Customer Feedback Survey"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Description (optional)</label>
                    <textarea
                      id="description"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={createFormDescription}
                      onChange={(e) => setCreateFormDescription(e.target.value)}
                      placeholder="Briefly describe the purpose of your form"
                    />
                  </div>
                </div>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    onClick={() => setIsCreateFormDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    disabled={!createFormTitle.trim() || isCreatingForm}
                  >
                    {isCreatingForm ? "Creating..." : "Create Form"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Inlined StatCard for Total Forms */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
          <div className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <h3 className="text-sm font-medium">Total Forms</h3>
            <div className="h-8 w-8 bg-secondary/50 rounded-md flex items-center justify-center">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className={`flex items-center mr-1 ${12 > 0 ? "text-green-600" : "text-red-600"}`}>
                <ArrowUpRight className={`h-3 w-3 ${12 < 0 && "rotate-180"}`} />
                {Math.abs(12)}%
              </span>
              vs. previous month
            </p>
          </div>
        </div>

        {/* Inlined StatCard for Total Responses */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
          <div className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <h3 className="text-sm font-medium">Total Responses</h3>
            <div className="h-8 w-8 bg-secondary/50 rounded-md flex items-center justify-center">
              <LineChart className="h-4 w-4" />
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">2,345</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className={`flex items-center mr-1 ${8 > 0 ? "text-green-600" : "text-red-600"}`}>
                <ArrowUpRight className={`h-3 w-3 ${8 < 0 && "rotate-180"}`} />
                {Math.abs(8)}%
              </span>
              vs. previous month
            </p>
          </div>
        </div>

        {/* Inlined StatCard for Conversion Rate */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
          <div className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <h3 className="text-sm font-medium">Conversion Rate</h3>
            <div className="h-8 w-8 bg-secondary/50 rounded-md flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">64.2%</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className={`flex items-center mr-1 ${-2 > 0 ? "text-green-600" : "text-red-600"}`}>
                <ArrowUpRight className={`h-3 w-3 ${-2 < 0 && "rotate-180"}`} />
                {Math.abs(-2)}%
              </span>
              vs. previous month
            </p>
          </div>
        </div>

        {/* Inlined StatCard for Active Users */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
          <div className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <h3 className="text-sm font-medium">Active Users</h3>
            <div className="h-8 w-8 bg-secondary/50 rounded-md flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              in your workspace
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Forms</h2>
        </div>
        {/* Inlined RecentForms */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_FORMS.map((form) => {
            const handleCopyLink = () => {
              navigator.clipboard.writeText(`https://flowform.app/f/${form.id}`);
              toast.success('Form link copied to clipboard');
            };

            const handleShare = () => {
              toast.info('Opening share dialog');
            };

            const handleDuplicate = () => {
              toast.success('Form duplicated successfully');
            };

            const lastModified = formatDistanceToNow(new Date(form.modified), { addSuffix: true });

            return (
              <div key={form.id} className="rounded-lg border bg-card text-card-foreground shadow-sm h-full hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-flowform-600" />
                      <h3 className="font-medium text-lg">{form.title}</h3>
                    </div>
                    <div className="relative">
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                        onClick={() => toggleDropdown(form.id)}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {openDropdownId === form.id && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-10">
                          <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => navigate(`/form-builder/${form.id}`)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </div>
                          <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={handleCopyLink}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy link
                          </div>
                          <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={handleShare}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </div>
                          <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={handleDuplicate}>
                            <FileText className="mr-2 h-4 w-4" />
                            Duplicate
                          </div>
                          <div className="my-1 h-px bg-muted" />
                          <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-destructive focus:text-destructive" onClick={() => toast.success('Form deleted successfully')}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{form.description}</p>

                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${form.status === 'published' ? 'bg-primary text-primary-foreground hover:bg-primary/80' : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'} capitalize`}>
                      {form.status}
                    </span>
                    <div className="text-sm text-muted-foreground">
                      {form.responses} {form.responses === 1 ? 'response' : 'responses'}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 border-t bg-secondary/20 text-xs text-muted-foreground">
                  Updated {lastModified}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;