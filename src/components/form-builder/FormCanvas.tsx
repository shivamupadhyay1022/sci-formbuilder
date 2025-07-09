
import React, { useState } from 'react';
import type { FormFieldType } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { FormField } from './FormField';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface FormFieldWithId extends FormFieldType {
  uniqueId: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: { label: string; value: string }[];
}

interface FormCanvasProps {
  draggedField: FormFieldType | null;
  onDrop: (fieldType: FormFieldType, index: number) => void;
  onDragEnd: () => void;
}

const FormCanvas: React.FC<FormCanvasProps> = ({ draggedField, onDrop, onDragEnd }) => {
  const [fields, setFields] = useState<FormFieldWithId[]>([]);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Allow drag-and-drop from sidebar
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggedField) {
      const boundingRect = e.currentTarget.getBoundingClientRect();
      const mouseY = e.clientY - boundingRect.top;
      const height = boundingRect.height;
      // Position as percentage to determine index
      const percentagePosition = mouseY / height;
      const targetIndex = Math.floor(percentagePosition * (fields.length + 1));
      // Unique field
      const newField: FormFieldWithId = {
        ...draggedField,
        uniqueId: `${draggedField.id}-${Date.now()}-${Math.floor(Math.random() * 5000)}`,
        label: `${draggedField.name} Field`,
        required: false,
        options: draggedField.id === 'dropdown' || draggedField.id === 'radio' || draggedField.id === 'checkbox' 
          ? [
              { label: 'Option 1', value: 'option-1' },
              { label: 'Option 2', value: 'option-2' },
              { label: 'Option 3', value: 'option-3' },
            ] 
          : undefined,
      };
      // Insert the new field
      const newFields = [...fields];
      newFields.splice(targetIndex, 0, newField);
      setFields(newFields);
      onDrop(draggedField, targetIndex);
      onDragEnd();
      setDragOverIndex(null);
    }
  };

  // For internal reordering with DnD
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFields(items);
  };

  const handleRemoveField = (uniqueId: string) => {
    setFields(fields.filter(field => field.uniqueId !== uniqueId));
  };

  const handleFieldUpdate = (uniqueId: string, updates: Partial<FormFieldWithId>) => {
    setFields(fields.map(field => 
      field.uniqueId === uniqueId 
        ? { ...field, ...updates }
        : field
    ));
  };

  return (
    <div 
      className={cn(
        "flex-1 h-full overflow-auto px-1 py-4 sm:px-4 md:px-8 form-builder-canvas bg-background z-10",
        draggedField && "bg-muted/50"
      )}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={() => setDragOverIndex(fields.length)}
      onDragLeave={() => setDragOverIndex(null)}
    >
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-lg sm:text-2xl font-bold mb-4 text-center">Your Form Title</h1>
        <p className="text-muted-foreground text-center mb-8 px-2 sm:px-0">Form description goes here. Explain the purpose of your form.</p>
        {/* DragDropContext handles only internal reordering, not sidebar drop */}
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
                      Drag and drop form fields here to start building your form
                    </p>
                  </div>
                ) : (
                  fields.map((field, index) => (
                    <Draggable key={field.uniqueId} draggableId={field.uniqueId} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <FormField 
                            field={field}
                            onRemove={() => handleRemoveField(field.uniqueId)}
                            onUpdate={(updates) => handleFieldUpdate(field.uniqueId, updates)}
                          />
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
  );
};

export default FormCanvas;
