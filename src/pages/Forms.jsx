
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { PlusCircle, Search, FilterX, Grid2X2, LayoutList, Eye, Copy, Trash2, Pencil, Loader, X } from 'lucide-react';
import { supabase } from '../../supabase';
import MainLayout from '../components/layout/MainLayout.tsx';

const Forms = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [formToDelete, setFormToDelete] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchForms = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('tables')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedForms = data.map(form => ({
        id: form.id,
        name: form.name,
        status: 'published',
        responses: 0,
        created: new Date(form.created_at).toISOString().split('T')[0],
        lastUpdated: new Date(form.created_at).toISOString().split('T')[0],
      }));

      setForms(formattedForms);
    } catch (err) {
      console.error(err);
      toast.error(`Error fetching forms: ${err.message}`);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const filteredForms = forms.filter(form =>
    form.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditForm = (id) => {
    navigate(`/form-builder/${id}`);
    setOpenDropdownId(null);
  };

  const handleViewLiveForm = (id) => {
    toast.info(`Opening live view for form ${id}`);
    window.open(`/form/${id}`, '_blank');
    setOpenDropdownId(null);
  };

  const handleDuplicateForm = async (id) => {
    const form = forms.find(f => f.id === id);
    if (!form) return;

    try {
      const { data, error } = await supabase
        .from('tables')
        .insert([{ name: `${form.name} (Copy)`, description: '' }])
        .select();

      if (error) throw error;
      toast.success('Form duplicated successfully');
      fetchForms();
    } catch (err) {
      console.error(err);
      toast.error('Error duplicating form');
    }

    setOpenDropdownId(null);
  };

  const confirmDelete = (id) => {
    setFormToDelete(id);
    setShowDeleteDialog(true);
    setOpenDropdownId(null);
  };

  const handleDeleteForm = async () => {
    if (!formToDelete) return;

    try {
      const { error } = await supabase
        .from('tables')
        .delete()
        .eq('id', formToDelete);

      if (error) throw error;

      toast.success('Form deleted successfully');
      fetchForms();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete form');
    } finally {
      setShowDeleteDialog(false);
      setFormToDelete(null);
    }
  };

  const handleCreateForm = async () => {
    try {
      const { data, error } = await supabase
        .from('tables')
        .insert([{ name: 'Untitled Form', description: '' }])
        .select()
        .single();

      if (error) throw error;

      navigate(`/form-builder/${data.id}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to create form');
    }
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredForms.map((form) => (
        <div key={form.id} className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col">
          <div className="p-6 flex-1">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium">{form.name}</h3>
              <div className="relative">
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                  onClick={() => setOpenDropdownId(openDropdownId === form.id ? null : form.id)}
                >
                  <span className="sr-only">Open menu</span>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                    <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </button>
                {openDropdownId === form.id && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-10" onMouseLeave={() => setOpenDropdownId(null)}>
                    <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => handleEditForm(form.id)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </div>
                    <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => handleViewLiveForm(form.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Live
                    </div>
                    <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => handleDuplicateForm(form.id)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </div>
                    <div className="-mx-1 my-1 h-px bg-muted" />
                    <div
                      className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-destructive focus:text-destructive"
                      onClick={() => confirmDelete(form.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <div
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                  form.status === 'published' ? 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80' :
                  form.status === 'draft' ? 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80' :
                  'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80'
                } capitalize`}
              >
                {form.status}
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <div className="flex justify-between mb-1">
                <span>Responses:</span>
                <span className="font-medium">{form.responses}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Created:</span>
                <span>{form.created}</span>
              </div>
              <div className="flex justify-between">
                <span>Last updated:</span>
                <span>{form.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Name</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Status</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Responses</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Created</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Last Updated</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Actions</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {filteredForms.map((form) => (
              <tr key={form.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">{form.name}</td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <div
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                      form.status === 'published' ? 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80' :
                      form.status === 'draft' ? 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80' :
                      'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80'
                    } capitalize`}
                  >
                    {form.status}
                  </div>
                </td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{form.responses}</td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{form.created}</td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{form.lastUpdated}</td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                  <div className="flex justify-end space-x-1">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 w-10" onClick={() => handleEditForm(form.id)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 w-10" onClick={() => handleViewLiveForm(form.id)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 w-10" onClick={() => handleDuplicateForm(form.id)}>
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Duplicate</span>
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 w-10" onClick={() => confirmDelete(form.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Forms</h1>
            <p className="text-muted-foreground">Create and manage your forms</p>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            onClick={handleCreateForm}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Form
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm"
              placeholder="Search forms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              className={`h-10 w-10 rounded-md ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'border border-input hover:bg-accent'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid2X2 className="h-4 w-4 mx-auto" />
            </button>
            <button
              className={`h-10 w-10 rounded-md ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'border border-input hover:bg-accent'}`}
              onClick={() => setViewMode('list')}
            >
              <LayoutList className="h-4 w-4 mx-auto" />
            </button>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="h-10 px-3 rounded-md border hover:bg-accent text-sm flex items-center"
              >
                <FilterX className="h-4 w-4 mr-1" /> Clear
              </button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center p-12 border rounded-lg bg-destructive/10 text-destructive">
            <h3 className="text-lg font-medium mb-2">Failed to load forms</h3>
            <p>{error}</p>
          </div>
        ) : filteredForms.length === 0 ? (
          <div className="text-center p-12 border rounded-lg bg-muted/20">
            <h3 className="text-lg font-medium mb-2">No forms found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 'Try a different search term' : 'Create your first form to get started'}
            </p>
            {!searchQuery && (
              <button
                className="inline-flex items-center justify-center gap-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md"
                onClick={handleCreateForm}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New Form
              </button>
            )}
          </div>
        ) : viewMode === 'grid' ? renderGridView() : renderListView()}

        {showDeleteDialog && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
            <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border bg-background p-6 rounded-lg shadow-lg">
              <div className="text-center">
                <h2 className="text-lg font-semibold">Delete Form</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Are you sure you want to delete this form? This action cannot be undone.
                </p>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="h-10 px-4 py-2 rounded-md border hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteForm}
                  className="h-10 px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </button>
              </div>
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="absolute top-4 right-4"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Forms;
