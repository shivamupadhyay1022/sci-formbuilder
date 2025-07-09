
import React, { useState } from 'react';
import { FORM_CATEGORIES, FORM_FIELDS, FormFieldType } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FormBuilderSidebarProps {
  onDragStart: (field: FormFieldType) => void;
  onFieldClick?: (field: FormFieldType) => void; // Add click handler prop
  open?: boolean;
  onClose?: () => void;
}

const FormBuilderSidebar: React.FC<FormBuilderSidebarProps> = ({ onDragStart, onFieldClick, open, onClose }) => {
  const [search, setSearch] = useState('');
  
  const filteredFields = search.trim() 
    ? FORM_FIELDS.filter(field => 
        field.name.toLowerCase().includes(search.toLowerCase()) ||
        field.description.toLowerCase().includes(search.toLowerCase())
      )
    : FORM_FIELDS;

  const fieldsByCategory = FORM_CATEGORIES.map(category => ({
    ...category,
    fields: filteredFields.filter(field => field.category === category.id)
  }));

  const handleFieldClick = (field: FormFieldType) => {
    if (onFieldClick) {
      onFieldClick(field);
      // Close sidebar on mobile after clicking a field
      if (window.innerWidth < 768 && onClose) {
        onClose();
      }
    }
  };
  
  return (
    <div
      className={cn(
        "w-full max-w-xs bg-background flex flex-col h-full border-r z-50",
        "fixed md:static top-0 left-0 transition-transform duration-300",
        open ? 'block' : 'hidden md:flex'
      )}
      style={{maxWidth:'90vw'}}
    >
      {/* Mobile topbar for closing */}
      <div className="flex md:hidden items-center justify-between p-3 border-b">
        <span className="font-bold text-flowform-600">Fields</span>
        <button onClick={onClose} aria-label="Close sidebar">
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search fields..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {/* Make this section scrollable */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {search && filteredFields.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center text-muted-foreground text-sm">
              <p>No fields found matching "{search}"</p>
            </div>
          ) : (
            <Accordion
              type="multiple"
              defaultValue={FORM_CATEGORIES.map(cat => cat.id)}
              className="w-full"
            >
              {fieldsByCategory.map(category => 
                category.fields.length > 0 && (
                  <AccordionItem value={category.id} key={category.id}>
                    <AccordionTrigger className="text-sm py-3">
                      {category.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 gap-2 p-1">
                        {category.fields.map(field => (
                          <Button
                            key={field.id}
                            variant="outline"
                            className={cn(
                              "h-auto text-left justify-start px-3 py-2 hover:bg-muted",
                              "cursor-grab active:cursor-grabbing"
                            )}
                            draggable
                            onDragStart={() => onDragStart(field)}
                            onClick={() => handleFieldClick(field)} // Add click handler
                          >
                            <div className="mr-2 text-muted-foreground">
                              <field.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-medium text-xs">{field.name}</div>
                              <div className="text-xs text-muted-foreground line-clamp-1">
                                {field.description}
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              )}
            </Accordion>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FormBuilderSidebar;
