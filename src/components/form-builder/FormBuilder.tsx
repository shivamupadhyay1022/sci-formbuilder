
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import FormBuilderHeader from './FormBuilderHeader';
import FormBuilderSidebar from './FormBuilderSidebar';
import FormCanvas from './FormCanvas';
import { FormFieldType } from '@/lib/constants';
import { toast } from 'sonner';

const FormBuilder: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [draggedField, setDraggedField] = useState<FormFieldType | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDragStart = (field: FormFieldType) => {
    setDraggedField(field);
    setSidebarOpen(false);
  };

  const handleDrop = (field: FormFieldType, index: number) => {
    if (field) {
      toast.success(`Added ${field.name} field`);
    }
  };

  // Add a handler for field clicks
  const handleFieldClick = (field: FormFieldType) => {
    // Simulate dropping the field at the end of the form
    handleDrop(field, 999); // Using a high index number to add at the end
    setDraggedField(field); // Set the field for FormCanvas to use
    
    // A slight delay to simulate the drop action
    setTimeout(() => {
      setDraggedField(null);
    }, 100);
  };

  return (
    <div className="flex flex-col h-screen">
      <FormBuilderHeader 
        formTitle={formTitle}
        onTitleChange={setFormTitle}
        formId={formId || ''}
      />
      {/* Mobile Sidebar button */}
      <button
        className="inline-flex items-center gap-2 md:hidden p-2 mt-2 ml-2 w-fit h-fit bg-background border border-border rounded shadow z-30"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open fields sidebar"
      >
        <span className="text-flowform-600 font-bold">Fields</span>
      </button>
      <div className="flex flex-1 overflow-hidden w-full">
        {/* Sidebar: hidden on mobile unless explicitly toggled */}
        <FormBuilderSidebar
          onDragStart={handleDragStart}
          onFieldClick={handleFieldClick} // Add the click handler
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        {/* Canvas: takes full width on mobile, margin on desktop */}
        <div className="flex-1 flex flex-col min-w-0">
          <FormCanvas 
            draggedField={draggedField}
            onDrop={handleDrop}
            onDragEnd={() => setDraggedField(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
