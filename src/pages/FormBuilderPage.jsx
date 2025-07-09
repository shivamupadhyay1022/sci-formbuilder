import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft,
  EyeIcon,
  MoreHorizontal,
  Save,
  Settings,
  Share2,
  Search,
  X,
  ChevronDown,
  Check,
  Minus,
  Plus,
  Type,
  List,
  Calendar,
  CheckSquare,
  Radio,
  MessageSquare,
  FileText,
  Mail,
  Phone,
  Link,
  Hash,
  Star,
  Upload,
  Image,
  File,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { supabase } from "../../supabase";

// Mock data for form fields and categories
const FORM_CATEGORIES = [
  { id: "basic", name: "Basic Fields" },
  { id: "advanced", name: "Advanced Fields" },
  { id: "layout", name: "Layout Fields" },
];

const FORM_FIELDS = [
  {
    id: "text",
    name: "Text Input",
    description: "Short text input",
    icon: Type,
    category: "basic",
  },
  {
    id: "textarea",
    name: "Text Area",
    description: "Long text input",
    icon: MessageSquare,
    category: "basic",
  },
  {
    id: "number",
    name: "Number Input",
    description: "Numeric input",
    icon: Hash,
    category: "basic",
  },
  {
    id: "email",
    name: "Email Input",
    description: "Email address input",
    icon: Mail,
    category: "basic",
  },
  {
    id: "phone",
    name: "Phone Input",
    description: "Phone number input",
    icon: Phone,
    category: "basic",
  },
  {
    id: "date",
    name: "Date Picker",
    description: "Date selection",
    icon: Calendar,
    category: "basic",
  },
  {
    id: "dropdown",
    name: "Dropdown",
    description: "Select from options",
    icon: List,
    category: "advanced",
  },
  {
    id: "radio",
    name: "Radio Buttons",
    description: "Select one option",
    icon: Radio,
    category: "advanced",
  },
  {
    id: "checkbox",
    name: "Checkbox",
    description: "Single checkbox",
    icon: CheckSquare,
    category: "advanced",
  },
  {
    id: "checkbox-group",
    name: "Checkbox Group",
    description: "Select multiple options",
    icon: CheckSquare,
    category: "advanced",
  },
  {
    id: "file",
    name: "File Upload",
    description: "Upload a file",
    icon: Upload,
    category: "advanced",
  },
  {
    id: "image",
    name: "Image Upload",
    description: "Upload an image",
    icon: Image,
    category: "advanced",
  },
  {
    id: "rating",
    name: "Rating",
    description: "Star rating",
    icon: Star,
    category: "advanced",
  },
  {
    id: "url",
    name: "URL Input",
    description: "Website URL",
    icon: Link,
    category: "basic",
  },
  {
    id: "paragraph",
    name: "Paragraph",
    description: "Static text block",
    icon: FileText,
    category: "layout",
  },
];

// Utility function for class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

const FormBuilderPage = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [draggedField, setDraggedField] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [fields, setFields] = useState([]); // State for form canvas fields
  const [search, setSearch] = useState(""); // State for sidebar search
  const [openDropdownId, setOpenDropdownId] = useState(null); // For header dropdown
  const [isSaving, setIsSaving] = useState(false);

  // TODO: Replace with your actual Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyWhSBrKfjCFr4NShGrtxeioON3kaPPjY7YhqcOM12M4P3ql3ZdDLyw_5ubhBhY68zVYQ/exec";

  const handleDragStart = (field) => {
    setDraggedField(field);
    setSidebarOpen(true);
  };

  const handleDrop = (field, index) => {
    if (field) {
      toast.success(`Added ${field.name} field`);
      const newField = {
        ...field,
        uniqueId: `${field.id}-${Date.now()}-${Math.floor(
          Math.random() * 5000
        )}`,
        label: `${field.name} Field`,
        required: false,
        options:
          field.id === "dropdown" ||
          field.id === "radio" ||
          field.id === "checkbox-group"
            ? [
                { label: "Option 1", value: "option-1" },
                { label: "Option 2", value: "option-2" },
                { label: "Option 3", value: "option-3" },
              ]
            : undefined,
      };
      const newFields = [...fields];
      newFields.splice(index, 0, newField);
      setFields(newFields);
    }
  };

  const handleFieldClick = (field) => {
    handleDrop(field, fields.length); // Add to end of form
    setDraggedField(field);
    setTimeout(() => {
      setDraggedField(null);
    }, 100);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleSave = async () => {
    if (!formTitle.trim()) return toast.error("Please add a form title.");
    if (fields.length === 0) return toast.error("Form cannot be empty.");

    setIsSaving(true);
    const toastId = toast.loading("Saving...");

    try {
      // Update form title
      const { error: updateError } = await supabase
        .from("tables")
        .update({ name: formTitle.trim() })
        .eq("id", formId);

      if (updateError) throw updateError;

      // Delete old fields (clean slate)
      await supabase.from("table_columns").delete().eq("table_id", formId);

      // Insert new fields
      const insertData = fields.map((field, index) => ({
        table_id: formId,
        name: field.label,
        type: field.id,
        required: field.required,
        options: field.options || null,
        position: index,
      }));

      const { error: insertError } = await supabase
        .from("table_columns")
        .insert(insertData);

      if (insertError) throw insertError;

      toast.success("Form saved successfully!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Save failed: " + err.message, { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    toast.info("Opening form preview");
    // Navigate to preview or open in new tab
  };

  const handleShare = () => {
    toast.info("Opening share dialog");
    // Open share dialog
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleTitleBlur = (e) => {
    setFormTitle(e.target.value);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      setFormTitle(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFields(items);
  };

  const moveField = (index, direction) => {
    const newFields = [...fields];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newFields.length) return;
    const [moved] = newFields.splice(index, 1);
    newFields.splice(targetIndex, 0, moved);
    setFields(newFields);
  };

  const handleRemoveField = (uniqueId) => {
    setFields(fields.filter((field) => field.uniqueId !== uniqueId));
  };

  const handleFieldUpdate = (uniqueId, updates) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.uniqueId === uniqueId ? { ...field, ...updates } : field
      )
    );
  };

  const filteredFields = search.trim()
    ? FORM_FIELDS.filter(
        (field) =>
          field.name.toLowerCase().includes(search.toLowerCase()) ||
          field.description.toLowerCase().includes(search.toLowerCase())
      )
    : FORM_FIELDS;

  const fieldsByCategory = FORM_CATEGORIES.map((category) => ({
    ...category,
    fields: filteredFields.filter((field) => field.category === category.id),
  }));

  useEffect(() => {
    const loadForm = async () => {
      try {
        const { data: form, error: formError } = await supabase
          .from("tables")
          .select("*")
          .eq("id", formId)
          .single();

        if (formError) throw formError;
        setFormTitle(form.name);

        const { data: columns, error: colError } = await supabase
          .from("table_columns")
          .select("*")
          .eq("table_id", formId)
          .order("position", { ascending: true });

        if (colError) throw colError;

        const formatted = columns.map((field) => ({
          uniqueId: field.id,
          id: field.type,
          label: field.name,
          required: field.required,
          options: field.options || [],
        }));
        setFields(formatted);
      } catch (err) {
        toast.error("Failed to load form: " + err.message);
      }
    };

    if (formId) loadForm();
  }, [formId]);

  return (
    <div className="flex flex-col h-screen">
      {/* FormBuilderHeader */}
      <div className="flex-col md:flex md:flex-row items-center justify-between px-3 py-3 border-b bg-background">
        <div className="flex items-center space-x-4">
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 w-10"
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          {/* Desktop Fields Toggle */}
          <button
            className="hidden md:inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            Fields
          </button>

          <input
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            className="max-w-[240px] bg-white h-9 font-medium text-lg p-2 rounded-md border-none focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            className=" items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 hidden sm:flex"
            onClick={handlePreview}
          >
            <EyeIcon className="mr-1 h-4 w-4" />
            Preview
          </button>

          <button
            className="md:hidden p-3 bg-primary text-primary-foreground rounded-full"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open fields sidebar"
          >
            <Plus className="h-6 w-6" />
          </button>

          <button
            className=" items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 hidden sm:flex"
            onClick={handleShare}
          >
            <Share2 className="mr-1 h-4 w-4" />
            Share
          </button>

          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="mr-1 h-4 w-4" />
            {isSaving ? "Saving..." : "Save"}
          </button>

          {/* DropdownMenu */}
          <div className="relative z-50 ">
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 w-9"
              onClick={() =>
                setOpenDropdownId(openDropdownId === "header" ? null : "header")
              }
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            {openDropdownId === "header" && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-10"
                onMouseLeave={() => setOpenDropdownId(null)}
              >
                <div
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  onClick={() => toast.info("Opening form settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Form Settings
                </div>
                <div
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 sm:hidden"
                  onClick={handlePreview}
                >
                  <EyeIcon className="mr-2 h-4 w-4" />
                  Preview
                </div>
                <div
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 sm:hidden"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </div>
                <div className="-mx-1 my-1 h-px bg-muted" />
                <div
                  className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  onClick={() => navigate("/")}
                >
                  Exit Builder
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile-only sidebar toggle button */}

      <div className="flex flex-1 overflow-hidden">
        {/* --- Sidebar (Unified for Mobile and Desktop) --- */}
        <div
          className={cn(
            "bg-background flex flex-col h-full border-r z-50 transition-transform duration-300 ease-in-out",
            "fixed w-80 md:static md:w-80 md:flex-shrink-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full hidden"
          )}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-3 border-b">
            <span className="font-bold text-flowform-600">Fields</span>
            <button
              onClick={() => {
                setSidebarOpen(false);
                console.log("click");
                console.log(sidebarOpen);
              }}
              aria-label="Close sidebar"
              className="md:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          {/* Search */}
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <input
                placeholder="Search fields..."
                className="pl-9 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {/* Fields List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              {search && filteredFields.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-center text-muted-foreground text-sm">
                  <p>No fields found matching "{search}"</p>
                </div>
              ) : (
                FORM_CATEGORIES.map(
                  (category) =>
                    fieldsByCategory.find((cat) => cat.id === category.id)
                      ?.fields.length > 0 && (
                      <div
                        key={category.id}
                        className="border-b last:border-b-0"
                      >
                        <button
                          className="flex flex-1 items-center justify-between py-3 font-medium transition-all hover:underline w-full text-sm"
                          onClick={() =>
                            setOpenDropdownId(
                              openDropdownId === category.id
                                ? null
                                : category.id
                            )
                          }
                        >
                          {category.name}
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                              openDropdownId === category.id ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openDropdownId === category.id && (
                          <div className="overflow-hidden text-sm pb-4">
                            <div className="grid grid-cols-1 gap-2 p-1">
                              {fieldsByCategory
                                .find((cat) => cat.id === category.id)
                                ?.fields.map((field) => (
                                  <button
                                    key={field.id}
                                    className="inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-auto text-left px-3 py-2 hover:bg-muted cursor-grab active:cursor-grabbing"
                                    draggable
                                    onDragStart={() => handleDragStart(field)}
                                    onClick={() => handleFieldClick(field)}
                                  >
                                    <field.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <div>
                                      <div className="font-medium text-xs">
                                        {field.name}
                                      </div>
                                      <div className="text-xs text-muted-foreground line-clamp-1">
                                        {field.description}
                                      </div>
                                    </div>
                                  </button>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                )
              )}
            </div>
          </div>
        </div>

        {/* Overlay for mobile - shown when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* --- Form Canvas --- */}
        <div
          className={cn(
            "flex-1 h-full overflow-auto px-1 py-4 sm:px-4 md:px-8 form-builder-canvas bg-background transition-all duration-300 ease-in-out",
            draggedField && "bg-muted/50",
            sidebarOpen ? "md:ml-0" : "md:ml-0" // The sidebar's negative margin handles the push
          )}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (draggedField) {
              const boundingRect = e.currentTarget.getBoundingClientRect();
              const mouseY = e.clientY - boundingRect.top;
              const height = boundingRect.height;
              const percentagePosition = mouseY / height;
              const targetIndex = Math.floor(
                percentagePosition * (fields.length + 1)
              );
              handleDrop(draggedField, targetIndex);
            }
          }}
        >
          <div className="w-full">
            <h1 className="text-lg sm:text-2xl font-bold mb-4 text-center">
              Your Form Title
            </h1>
            <p className="text-muted-foreground text-center mb-8 px-2 sm:px-0">
              Form description goes here. Explain the purpose of your form.
            </p>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="form-fields">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {fields.length === 0 ? (
                      <div className="flex flex-col items-center justify-center bg-card rounded-lg p-8 sm:p-12 border border-dashed text-center">
                        <p className="text-muted-foreground mb-2 text-sm sm:text-base">
                          Drag and drop form fields here to start building your
                          form
                        </p>
                      </div>
                    ) : (
                      fields.map((field, index) => (
                        <Draggable
                          key={field.uniqueId}
                          draggableId={field.uniqueId}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 rounded-md shadow-sm border border-gray-200 mb-4"
                            >
                              {/* Top Row: Type and Remove Button */}
                              <div className="flex justify-between items-center mb-2">
                                <div className="text-xs text-muted-foreground italic">
                                  {field.name || field.id}
                                </div>
                                <button
                                  onClick={() =>
                                    handleRemoveField(field.uniqueId)
                                  }
                                  className="text-red-500 hover:text-red-700 text-sm"
                                >
                                  ✕
                                </button>
                              </div>

                              {/* Editable Label, Placeholder, Required, Arrows */}
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
                                {/* Label Editor */}
                                <div className="flex flex-col w-full sm:w-1/2">
                                  <label className="text-xs text-muted-foreground mb-1">
                                    Field Label
                                  </label>
                                  <input
                                    type="text"
                                    value={field.label}
                                    onChange={(e) =>
                                      handleFieldUpdate(field.uniqueId, {
                                        label: e.target.value,
                                      })
                                    }
                                    className="text-sm font-medium border border-gray-300 rounded-md px-2 py-1 w-full"
                                    placeholder="Field label"
                                  />
                                </div>

                                {/* Placeholder Editor */}
                                <div className="flex flex-col w-full sm:w-1/2">
                                  <label className="text-xs text-muted-foreground mb-1">
                                    Placeholder
                                  </label>
                                  <input
                                    type="text"
                                    value={field.placeholder || ""}
                                    onChange={(e) =>
                                      handleFieldUpdate(field.uniqueId, {
                                        placeholder: e.target.value,
                                      })
                                    }
                                    className="text-sm border border-gray-300 rounded-md px-2 py-1 w-full"
                                    placeholder="Placeholder text"
                                  />
                                </div>

                                {/* Required Toggle */}
                                <div className="flex items-center mt-2 sm:mt-6 sm:ml-4">
                                  <input
                                    type="checkbox"
                                    checked={field.required}
                                    onChange={(e) =>
                                      handleFieldUpdate(field.uniqueId, {
                                        required: e.target.checked,
                                      })
                                    }
                                    id={`required-${field.uniqueId}`}
                                    className="mr-2"
                                  />
                                  <label
                                    htmlFor={`required-${field.uniqueId}`}
                                    className="text-sm text-muted-foreground"
                                  >
                                    Required
                                  </label>
                                </div>

                                {/* Mobile Up/Down Buttons */}
                                <div className="flex sm:hidden items-center mt-2 sm:mt-6 gap-1 self-end">
                                  <button
                                    onClick={() => moveField(index, -1)}
                                    className="text-xs text-gray-500 border rounded p-1 hover:bg-gray-100"
                                  >
                                    ↑
                                  </button>
                                  <button
                                    onClick={() => moveField(index, 1)}
                                    className="text-xs text-gray-500 border rounded p-1 hover:bg-gray-100"
                                  >
                                    ↓
                                  </button>
                                </div>
                              </div>

                              {/* Option editor for dropdown / radio / checkbox-group */}
                              {["dropdown", "radio", "checkbox-group"].includes(
                                field.id
                              ) && (
                                <div className="mt-2 space-y-2">
                                  <label className="text-sm text-muted-foreground mb-1 block">
                                    Options
                                  </label>
                                  {field.options?.map((option, i) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center gap-2"
                                    >
                                      <input
                                        type="text"
                                        value={option.label}
                                        onChange={(e) => {
                                          const newOptions = [...field.options];
                                          newOptions[i].label = e.target.value;
                                          handleFieldUpdate(field.uniqueId, {
                                            options: newOptions,
                                          });
                                        }}
                                        className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm"
                                      />
                                      <button
                                        onClick={() => {
                                          const newOptions =
                                            field.options.filter(
                                              (_, idx) => idx !== i
                                            );
                                          handleFieldUpdate(field.uniqueId, {
                                            options: newOptions,
                                          });
                                        }}
                                        className="text-red-500 text-xs px-2 py-1 border rounded hover:bg-red-50"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    onClick={() => {
                                      const newOption = {
                                        label: `Option ${
                                          field.options?.length + 1 || 1
                                        }`,
                                        value: `option-${Date.now()}`,
                                      };
                                      const newOptions = [
                                        ...(field.options || []),
                                        newOption,
                                      ];
                                      handleFieldUpdate(field.uniqueId, {
                                        options: newOptions,
                                      });
                                    }}
                                    className="text-xs text-blue-600 hover:underline"
                                  >
                                    + Add Option
                                  </button>
                                </div>
                              )}

                              {/* PREVIEW Section */}
                              <div className="mt-4 space-y-2 text-sm">
                                {/* <label className="font-medium">{field.label}</label> */}
                                {field.id === "dropdown" ? (
                                  <>
                                    <p className="text-xs text-muted-foreground italic">
                                      Preview
                                    </p>
                                    <select className="w-full border border-gray-300 rounded px-2 py-1">
                                      {field.options?.map((opt, i) => (
                                        <option key={i} value={opt.value}>
                                          {opt.label}
                                        </option>
                                      ))}
                                    </select>
                                  </>
                                ) : field.id === "radio" ? (
                                  <>
                                    <p className="text-xs text-muted-foreground italic">
                                      Preview
                                    </p>
                                    <div className="space-y-1">
                                      {field.options?.map((opt, i) => (
                                        <label
                                          key={i}
                                          className="flex items-center gap-2"
                                        >
                                          <input
                                            type="radio"
                                            name={field.uniqueId}
                                          />
                                          {opt.label}
                                        </label>
                                      ))}
                                    </div>
                                  </>
                                ) : field.id === "checkbox" ? (
                                  <>
                                    <p className="text-xs text-muted-foreground italic">
                                      Preview
                                    </p>
                                    <label className="flex items-center gap-2">
                                      <input type="checkbox" />
                                      {field.label}
                                    </label>
                                  </>
                                ) : field.id === "checkbox-group" ? (
                                  <>
                                    <p className="text-xs text-muted-foreground italic">
                                      Preview
                                    </p>
                                    <div className="space-y-1">
                                      {field.options?.map((opt, i) => (
                                        <label
                                          key={i}
                                          className="flex items-center gap-2"
                                        >
                                          <input
                                            type="checkbox"
                                            name={field.uniqueId}
                                          />
                                          {opt.label}
                                        </label>
                                      ))}
                                    </div>
                                  </>
                                ) : field.id === "rating" ? (
                                  <>
                                    <p className="text-xs text-muted-foreground italic">
                                      Preview
                                    </p>
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <svg
                                          key={i}
                                          className="w-5 h-5 text-yellow-400 fill-current"
                                          viewBox="0 0 20 20"
                                        >
                                          <path d="M10 15l-5.878 3.09L5.845 12 .635 7.91l6.062-.883L10 1l3.303 6.027 6.062.883-5.21 4.09 1.723 5.18z" />
                                        </svg>
                                      ))}
                                    </div>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {fields.length > 0 && (
              <div className="mt-8 flex justify-center">
                <button className="bg-flowform-600 hover:bg-flowform-700 text-white px-5 py-2 rounded-md transition-colors w-full sm:w-auto">
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBuilderPage;
