
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Copy,
  Grip,
  MoreHorizontal,
  Settings,
  Trash
} from 'lucide-react';
import { toast } from 'sonner';

interface FormFieldProps {
  field: any;
  onRemove: () => void;
  onUpdate: (updates: any) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ field, onRemove, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localField, setLocalField] = useState({ ...field });

  const handleUpdate = (key: string, value: any) => {
    const updates = { [key]: value };
    setLocalField({ ...localField, ...updates });
    onUpdate(updates);
  };

  const handleFieldClick = (e: React.MouseEvent) => {
    // Prevent event bubbling if clicking on input or button
    if (
      (e.target as HTMLElement).tagName === 'INPUT' ||
      (e.target as HTMLElement).tagName === 'BUTTON'
    ) {
      return;
    }
    setIsEditing(!isEditing);
  };

  const handleDuplicate = () => {
    toast.success('Field duplicated');
    // This would typically be handled by a parent component
  };

  const renderFieldPreview = () => {
    switch (field.id) {
      case 'short-text':
        return (
          <Input 
            placeholder={field.placeholder || 'Enter text here'}
            disabled
          />
        );
      
      case 'long-text':
        return (
          <Textarea 
            placeholder={field.placeholder || 'Enter longer text here'}
            disabled
          />
        );

      case 'email':
        return (
          <Input 
            type="email"
            placeholder={field.placeholder || 'name@example.com'}
            disabled
          />
        );

      case 'phone':
        return (
          <Input 
            type="tel"
            placeholder={field.placeholder || '+1 (555) 000-0000'}
            disabled
          />
        );

      case 'number':
        return (
          <Input 
            type="number"
            placeholder={field.placeholder || '0'}
            disabled
          />
        );

      case 'dropdown':
        return (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: any, index: number) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'radio':
        return (
          <RadioGroup disabled>
            {field.options?.map((option: any, index: number) => (
              <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem value={option.value} id={`radio-${field.uniqueId}-${index}`} />
                <Label htmlFor={`radio-${field.uniqueId}-${index}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option: any, index: number) => (
              <div className="flex items-center space-x-2" key={index}>
                <Checkbox id={`check-${field.uniqueId}-${index}`} disabled />
                <label
                  htmlFor={`check-${field.uniqueId}-${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      // Add more field types as needed
      
      default:
        return (
          <div className="text-muted-foreground italic text-sm">
            Preview not available for this field type
          </div>
        );
    }
  };

  const renderEditForm = () => {
    return (
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor={`field-label-${field.uniqueId}`}>Field Label</Label>
          <Input
            id={`field-label-${field.uniqueId}`}
            value={localField.label}
            onChange={(e) => handleUpdate('label', e.target.value)}
          />
        </div>
        
        {['short-text', 'long-text', 'email', 'phone', 'number'].includes(field.id) && (
          <div className="grid gap-2">
            <Label htmlFor={`field-placeholder-${field.uniqueId}`}>Placeholder Text</Label>
            <Input
              id={`field-placeholder-${field.uniqueId}`}
              value={localField.placeholder || ''}
              onChange={(e) => handleUpdate('placeholder', e.target.value)}
            />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            id={`field-required-${field.uniqueId}`}
            checked={localField.required}
            onCheckedChange={(checked) => 
              handleUpdate('required', checked === true)
            }
          />
          <Label htmlFor={`field-required-${field.uniqueId}`}>
            Required field
          </Label>
        </div>
      </div>
    );
  };

  return (
    <Card className="relative border shadow-sm cursor-pointer group">
      <div className="absolute left-0 top-0 bottom-0 px-2 py-4 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Grip className="h-5 w-5 text-muted-foreground" />
      </div>
      
      <CardHeader className="py-3 px-6 flex flex-row items-center">
        <div className="flex items-center space-x-2 flex-1">
          <field.icon className="h-4 w-4 text-muted-foreground" />
          <div className="font-medium text-sm flex items-center">
            {localField.label}
            {localField.required && (
              <span className="text-destructive ml-1">*</span>
            )}
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditing(!isEditing)}>
              <Settings className="mr-2 h-4 w-4" />
              {isEditing ? 'Preview' : 'Edit'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDuplicate}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onRemove} className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
      <CardContent className="p-6" onClick={handleFieldClick}>
        {isEditing ? renderEditForm() : renderFieldPreview()}
      </CardContent>
      
      {isEditing && (
        <CardFooter className="px-6 py-3 bg-muted/50 flex justify-end">
          <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
            Done
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
