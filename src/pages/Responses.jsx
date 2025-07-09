import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { 
  Search, 
  Filter, 
  FileSpreadsheet, 
  FileText, 
  FileBadge, 
  FileOutput, 
  Trash2, 
  Plus, 
  Download, 
  MoreHorizontal,
  Columns,
  Share2,
  X,
  Users,
  Trophy,
  Award,
  Target
} from 'lucide-react';
import { toast } from 'sonner';

const Responses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedForm, setSelectedForm] = useState('all');
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingCell, setEditingCell] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [responseToDelete, setResponseToDelete] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState({
    form: true,
    respondent: true,
    email: true,
    phone: true,
    submittedAt: true,
    status: true
  });
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showColumnsDropdown, setShowColumnsDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const forms = [
    { id: 'all', name: 'All Forms' },
    { id: '1', name: 'Customer Feedback' },
    { id: '2', name: 'Job Application' },
    { id: '3', name: 'Event Registration' },
    { id: '4', name: 'Product Survey' },
  ];

  const responses = [
    { 
      id: 1, 
      formName: 'Customer Feedback',
      formId: '1', 
      respondent: 'John Doe', 
      email: 'john@example.com',
      phone: '(555) 123-4567',
      submittedAt: '2025-04-16 14:30', 
      status: 'Complete' 
    },
    {
      id: 2, 
      formName: 'Job Application',
      formId: '2', 
      respondent: 'Jane Smith', 
      email: 'jane@example.com',
      phone: '(555) 987-6543',
      submittedAt: '2025-04-16 12:15', 
      status: 'Complete' 
    },
    {
      id: 3, 
      formName: 'Event Registration',
      formId: '3', 
      respondent: 'Mike Johnson', 
      email: 'mike@example.com',
      phone: '(555) 456-7890',
      submittedAt: '2025-04-15 09:45', 
      status: 'Partial' 
    },
    {
      id: 4, 
      formName: 'Product Survey',
      formId: '4', 
      respondent: 'Sarah Wilson', 
      email: 'sarah@example.com',
      phone: '(555) 234-5678',
      submittedAt: '2025-04-15 16:20', 
      status: 'Complete' 
    },
    {
      id: 5, 
      formName: 'Customer Feedback',
      formId: '1', 
      respondent: 'Robert Brown', 
      email: 'robert@example.com',
      phone: '(555) 876-5432',
      submittedAt: '2025-04-14 11:05', 
      status: 'Complete' 
    }
  ];

  const ads = [
    {
      title: "New Features Available!",
      subtitle: "Explore our latest updates",
      description: "We've added powerful new tools to streamline your workflow.",
      color: "from-flowform-500 to-flowform-600"
    },
    {
      title: "Refer a Friend",
      subtitle: "Get 20% off your next month!",
      description: "Share the love and earn rewards for every successful referral.",
      color: "from-yellow-400 to-yellow-500"
    }
  ];

  const quickFacts = [
    { icon: <Users className="w-6 h-6 text-flowform-400" />, title: "Total Responses", value: "1,234" },
    { icon: <Trophy className="w-6 h-6 text-flowform-400" />, title: "Forms Created", value: "56" },
    { icon: <Award className="w-6 h-6 text-flowform-400" />, title: "Avg. Completion Rate", value: "88%" },
    { icon: <Target className="w-6 h-6 text-flowform-400" />, title: "Active Users", value: "345" }
  ];

  const filteredResponses = responses.filter(response => {
    const matchesSearch = searchTerm === '' || 
      response.respondent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      response.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      response.formName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesForm = selectedForm === 'all' || response.formId === selectedForm;
    
    return matchesSearch && matchesForm;
  });

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAllRows = () => {
    if (selectedRows.length === filteredResponses.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredResponses.map(r => r.id));
    }
  };

  const handleCellClick = (rowId, column) => {
    setEditingCell({ rowId, column });
  };

  const handleCellEdit = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      setEditingCell(null);
      if (e.key === 'Enter') {
        toast.success('Response data updated');
      }
    }
  };

  const confirmDelete = (id) => {
    setResponseToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteResponse = () => {
    if (responseToDelete) {
      toast.success(`Response ${responseToDelete} deleted successfully`);
      setShowDeleteDialog(false);
      setResponseToDelete(null);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length) {
      toast.success(`${selectedRows.length} responses deleted successfully`);
      setSelectedRows([]);
    }
  };

  const handleExport = (format) => {
    toast.success(`Exporting responses as ${format}`);
  };

  const handleSyncWithGoogleSheets = () => {
    toast.success('Synced with Google Sheets successfully');
  };

  const handleAddNewResponse = () => {
    toast.success('New response entry added');
  };

  const toggleColumnVisibility = (column) => {
    setVisibleColumns({
      ...visibleColumns,
      [column]: !visibleColumns[column]
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-6 bg-black/10 rounded-lg shadow-lg my-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Responses</h1>
          <p className="text-gray-400">View and manage form submissions</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input 
              className="pl-9 flex h-10 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Search responses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Select Form */}
            <select value={selectedForm} onChange={(e) => setSelectedForm(e.target.value)} className="w-[180px] flex h-10 items-center justify-between rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-flowform-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 text-white">
              <optgroup label="Forms" className="bg-black/20 text-white">
                {forms.map(form => (
                  <option key={form.id} value={form.id} className="bg-black/20 text-white">
                    {form.name}
                  </option>
                ))}
              </optgroup>
            </select>

            {/* DropdownMenu Toggle Columns */}
            <div className="relative">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-white/10 bg-black/20 hover:bg-flowform-700/50 hover:text-white h-10 w-10" onClick={() => setShowColumnsDropdown(!showColumnsDropdown)}>
                <Columns className="h-4 w-4" />
              </button>
              {showColumnsDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-md border border-white/10 bg-black/20 p-1 text-white shadow-lg z-10" onMouseLeave={() => setShowColumnsDropdown(false)}>
                  <div className="px-2 py-1.5 text-sm font-semibold">Toggle Columns</div>
                  <div className="-mx-1 my-1 h-px bg-gray-700" />
                  <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-flowform-700/50 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => toggleColumnVisibility('form')}>
                    <input type="checkbox" checked={visibleColumns.form} readOnly className="mr-2 peer h-4 w-4 shrink-0 rounded-sm border border-flowform-500 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-flowform-500 data-[state=checked]:text-white" />
                    Form Name
                  </div>
                  <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-flowform-700/50 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => toggleColumnVisibility('respondent')}>
                    <input type="checkbox" checked={visibleColumns.respondent} readOnly className="mr-2 peer h-4 w-4 shrink-0 rounded-sm border border-flowform-500 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-flowform-500 data-[state=checked]:text-white" />
                    Respondent
                  </div>
                  <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-flowform-700/50 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => toggleColumnVisibility('email')}>
                    <input type="checkbox" checked={visibleColumns.email} readOnly className="mr-2 peer h-4 w-4 shrink-0 rounded-sm border border-flowform-500 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-flowform-500 data-[state=checked]:text-white" />
                    Email
                  </div>
                  <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-flowform-700/50 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => toggleColumnVisibility('phone')}>
                    <input type="checkbox" checked={visibleColumns.phone} readOnly className="mr-2 peer h-4 w-4 shrink-0 rounded-sm border border-flowform-500 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-flowform-500 data-[state=checked]:text-white" />
                    Phone
                  </div>
                  <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-flowform-700/50 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => toggleColumnVisibility('submittedAt')}>
                    <input type="checkbox" checked={visibleColumns.submittedAt} readOnly className="mr-2 peer h-4 w-4 shrink-0 rounded-sm border border-flowform-500 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-flowform-500 data-[state=checked]:text-white" />
                    Submitted At
                  </div>
                  <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-flowform-700/50 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => toggleColumnVisibility('status')}>
                    <input type="checkbox" checked={visibleColumns.status} readOnly className="mr-2 peer h-4 w-4 shrink-0 rounded-sm border border-flowform-500 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-flowform-500 data-[state=checked]:text-white" />
                    Status
                  </div>
                </div>
              )}
            </div>

            {/* DropdownMenu Export */}
            <div className="relative">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-white/10 bg-black/20 hover:bg-flowform-700/50 hover:text-white h-10 px-4 py-2" onClick={() => setShowExportDropdown(!showExportDropdown)}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </button>
              {showExportDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-md border border-white/10 bg-black/20 p-1 text-white shadow-lg z-10" onMouseLeave={() => setShowExportDropdown(false)}>
                  <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-flowform-700/50 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => handleExport('xlsx')}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Excel (.xlsx)
                  </div>
                  <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-flowform-700/50 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => handleExport('csv')}>
                    <FileText className="mr-2 h-4 w-4" />
                    CSV
                  </div>
                  <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-flowform-700/50 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => handleExport('json')}>
                    <FileBadge className="mr-2 h-4 w-4" />
                    JSON
                  </div>
                  <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-flowform-700/50 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => handleExport('pdf')}>
                    <FileOutput className="mr-2 h-4 w-4" />
                    PDF
                  </div>
                </div>
              )}
            </div>

            {/* Tooltip Sync with Google Sheets */}
            <div className="relative inline-block">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-white/10 bg-black/20 hover:bg-flowform-700/50 hover:text-white h-10 px-4 py-2" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} onClick={handleSyncWithGoogleSheets}>
                <Share2 className="mr-2 h-4 w-4" />
                Sync
              </button>
              {showTooltip && (
                <div className="absolute z-50 rounded-md border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white shadow-lg top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
                  <p>Sync with Google Sheets</p>
                </div>
              )}
            </div>

            {/* Button Add Entry */}
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-flowform-500 to-flowform-600 text-white hover:from-flowform-600 hover:to-flowform-700 h-10 px-4 py-2" onClick={handleAddNewResponse}>
              <Plus className="mr-2 h-4 w-4" />
              Add Entry
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-400">
            {filteredResponses.length} responses {selectedRows.length > 0 && `(${selectedRows.length} selected)`}
          </div>

          {selectedRows.length > 0 && (
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-red-600 text-white hover:bg-red-700 h-9 rounded-md px-3" onClick={handleDeleteSelected}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected
            </button>
          )}
        </div>

        {/* Card Table */}
        <div className="rounded-lg border border-white/10 bg-black/20 text-white shadow-lg">
          <div className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="sticky top-0 bg-black/20 [&_tr]:border-b border-white/10">
                  <tr className="border-b border-white/10 transition-colors hover:bg-black/30 data-[state=selected]:bg-black/40">
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-400 [&:has([role=checkbox])]:pr-0 w-[40px]">
                      <input 
                        type="checkbox" 
                        checked={filteredResponses.length > 0 && selectedRows.length === filteredResponses.length}
                        onChange={handleSelectAllRows}
                        className="peer h-4 w-4 shrink-0 rounded-sm border border-flowform-500 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-flowform-500 data-[state=checked]:text-white"
                      />
                    </th>
                    {visibleColumns.form && <th className="h-12 px-4 text-left align-middle font-medium text-gray-400 [&:has([role=checkbox])]:pr-0">Form</th>}
                    {visibleColumns.respondent && <th className="h-12 px-4 text-left align-middle font-medium text-gray-400 [&:has([role=checkbox])]:pr-0">Respondent</th>}
                    {visibleColumns.email && <th className="h-12 px-4 text-left align-middle font-medium text-gray-400 [&:has([role=checkbox])]:pr-0">Email</th>}
                    {visibleColumns.phone && <th className="h-12 px-4 text-left align-middle font-medium text-gray-400 [&:has([role=checkbox])]:pr-0">Phone</th>}
                    {visibleColumns.submittedAt && <th className="h-12 px-4 text-left align-middle font-medium text-gray-400 [&:has([role=checkbox])]:pr-0">Submitted At</th>}
                    {visibleColumns.status && <th className="h-12 px-4 text-left align-middle font-medium text-gray-400 [&:has([role=checkbox])]:pr-0">Status</th>}
                    <th className="h-12 px-4 text-right align-middle font-medium text-gray-400 [&:has([role=checkbox])]:pr-0">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredResponses.length === 0 ? (
                    <tr className="border-b border-white/10 transition-colors hover:bg-black/30 data-[state=selected]:bg-black/40">
                      <td colSpan={Object.values(visibleColumns).filter(Boolean).length + 2} className="p-4 align-middle [&:has([role=checkbox])]:pr-0 h-24 text-center text-gray-400">
                        No responses found.
                      </td>
                    </tr>
                  ) : (
                    filteredResponses.map((response) => (
                      <tr key={response.id} className={selectedRows.includes(response.id) ? 'bg-black/40' : 'border-b border-white/10'}>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <input 
                            type="checkbox" 
                            checked={selectedRows.includes(response.id)} 
                            onChange={() => handleSelectRow(response.id)}
                            className="peer h-4 w-4 shrink-0 rounded-sm border border-flowform-500 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-flowform-500 data-[state=checked]:text-white"
                          />
                        </td>
                        {visibleColumns.form && (
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-white">
                            {response.formName}
                          </td>
                        )}
                        {visibleColumns.respondent && (
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-white" onClick={() => handleCellClick(response.id, 'respondent')}>
                            {editingCell?.rowId === response.id && editingCell?.column === 'respondent' ? (
                              <input 
                                defaultValue={response.respondent}
                                autoFocus
                                onKeyDown={handleCellEdit}
                                onBlur={() => setEditingCell(null)}
                                className="h-8 py-1 flex w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              />
                            ) : (
                              <span className="cursor-pointer hover:bg-black/30 px-2 py-1 rounded-sm -mx-2 -my-1">
                                {response.respondent}
                              </span>
                            )}
                          </td>
                        )}
                        {visibleColumns.email && (
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-white" onClick={() => handleCellClick(response.id, 'email')}>
                            {editingCell?.rowId === response.id && editingCell?.column === 'email' ? (
                              <input 
                                defaultValue={response.email}
                                autoFocus
                                onKeyDown={handleCellEdit}
                                onBlur={() => setEditingCell(null)}
                                className="h-8 py-1 flex w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              />
                            ) : (
                              <span className="cursor-pointer hover:bg-black/30 px-2 py-1 rounded-sm -mx-2 -my-1">
                                {response.email}
                              </span>
                            )}
                          </td>
                        )}
                        {visibleColumns.phone && (
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-white" onClick={() => handleCellClick(response.id, 'phone')}>
                            {editingCell?.rowId === response.id && editingCell?.column === 'phone' ? (
                              <input 
                                defaultValue={response.phone}
                                autoFocus
                                onKeyDown={handleCellEdit}
                                onBlur={() => setEditingCell(null)}
                                className="h-8 py-1 flex w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              />
                            ) : (
                              <span className="cursor-pointer hover:bg-black/30 px-2 py-1 rounded-sm -mx-2 -my-1">
                                {response.phone}
                              </span>
                            )}
                          </td>
                        )}
                        {visibleColumns.submittedAt && (
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-white">{response.submittedAt}</td>
                        )}
                        {visibleColumns.status && (
                          <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                            <div 
                              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-flowform-500 focus:ring-offset-2 ${
                                response.status === "Complete" ? 'border-transparent bg-flowform-500 text-white hover:bg-flowform-600' : 'border-transparent bg-gray-700 text-white hover:bg-gray-600'
                              }`}
                            >
                              {response.status}
                            </div>
                          </td>
                        )}
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                          {/* DropdownMenu Actions */}
                          <div className="relative">
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-black/30 hover:text-white h-10 w-10" onClick={() => setOpenDropdownId(openDropdownId === response.id ? null : response.id)}>
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </button>
                            {openDropdownId === response.id && (
                              <div className="absolute right-0 mt-2 w-48 rounded-md border border-white/10 bg-black/20 p-1 text-white shadow-lg z-10" onMouseLeave={() => setOpenDropdownId(null)}>
                                <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-flowform-700/50 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => window.open(`/response/${response.id}`, '_blank')}>
                                  View Details
                                </div>
                                <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-flowform-700/50 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-red-500 focus:text-red-600" onClick={() => confirmDelete(response.id)}>
                                  Delete
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Facts Section */}
        <div className="mt-8 mb-8">
          <h3 className="text-xl font-bold mb-4 text-white">Quick Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickFacts.map((fact, index) => (
              <div key={index} className="bg-black/20 border border-white/10 rounded-xl p-4 text-center shadow-lg">
                <div className="flex justify-center mb-2">{fact.icon}</div>
                <p className="text-sm font-semibold text-white">{fact.title}</p>
                <p className="text-xs text-flowform-400">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-white">Announcements & Promotions</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {ads.map((ad, index) => (
              <div key={index} className="bg-black/20 border border-white/10 rounded-xl p-4 text-left shadow-lg">
                <div className={`bg-gradient-to-r ${ad.color} bg-clip-text text-transparent font-bold text-lg mb-1`}>
                  {ad.title}
                </div>
                <p className="text-white font-semibold text-sm mb-1">{ad.subtitle}</p>
                <p className="text-gray-400 text-xs">{ad.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dialog Delete Response */}
        {showDeleteDialog && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-white/10 bg-black/20 p-6 shadow-lg duration-200 sm:rounded-lg text-white">
              {/* DialogHeader */}
              <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                <h2 className="text-lg font-semibold leading-none tracking-tight">Delete Response</h2>
                <p className="text-sm text-gray-400">
                  Are you sure you want to delete this response? This action cannot be undone.
                </p>
              </div>
              {/* DialogFooter */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-white/10 bg-black/20 hover:bg-black/30 hover:text-white h-10 px-4 py-2" onClick={() => setShowDeleteDialog(false)}>
                  Cancel
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-red-600 text-white hover:bg-red-700 h-10 px-4 py-2" onClick={handleDeleteResponse}>
                  Delete
                </button>
              </div>
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus-visible:ring-flowform-500 focus-visible:ring-offset-2 disabled:pointer-events-none"
                onClick={() => setShowDeleteDialog(false)}
              >
                <X className="h-4 w-4 text-white" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Responses;
