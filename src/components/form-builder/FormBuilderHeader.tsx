
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  EyeIcon,
  MoreHorizontal,
  Save,
  Settings,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface FormBuilderHeaderProps {
  formTitle: string;
  onTitleChange: (title: string) => void;
  formId: string;
}

const FormBuilderHeader: React.FC<FormBuilderHeaderProps> = ({ 
  formTitle, 
  onTitleChange,
  formId
}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(formTitle);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleSave = () => {
    toast.success('Form saved successfully');
  };

  const handlePreview = () => {
    toast.info('Opening form preview');
    // Navigate to preview or open in new tab
  };

  const handleShare = () => {
    toast.info('Opening share dialog');
    // Open share dialog
  };

  const handleBack = () => {
    navigate('/');
  };

  // Update this function to handle both blur events and keyboard events
  const handleTitleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onTitleChange(e.target.value);
    setIsEditingTitle(false);
  };
  
  // Add separate handler for keyboard events
  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onTitleChange(e.currentTarget.value);
      setIsEditingTitle(false);
    }
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b bg-background">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleBack}
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        {isEditingTitle ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            autoFocus
            className="max-w-[240px] h-9 font-medium"
          />
        ) : (
          <h1 
            className="text-lg font-medium cursor-pointer hover:underline"
            onClick={() => setIsEditingTitle(true)}
          >
            {title}
          </h1>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreview}
          className="hidden sm:flex"
        >
          <EyeIcon className="mr-1 h-4 w-4" />
          Preview
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="hidden sm:flex"
        >
          <Share2 className="mr-1 h-4 w-4" />
          Share
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={handleSave}
        >
          <Save className="mr-1 h-4 w-4" />
          Save
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast.info('Opening form settings')}>
              <Settings className="mr-2 h-4 w-4" />
              Form Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="sm:hidden" onClick={handlePreview}>
              <EyeIcon className="mr-2 h-4 w-4" />
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem className="sm:hidden" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/')}>
              Exit Builder
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FormBuilderHeader;
