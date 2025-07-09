
import {
  AlignLeft,
  Calendar,
  Check,
  CheckCheck,
  CheckSquare,
  FileText,
  Hand,
  Hash,
  Image,
  List,
  Mail,
  Phone,
  Star,
  TextCursorInput,
  Timer,
  Upload,
  Type,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

// Define the schema for form field types
export interface FormFieldType {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  category: "basic" | "advanced" | "layout" | "media";
}

// Define all available form field types
export const FORM_FIELDS: FormFieldType[] = [
  // Basic Fields
  {
    id: "short-text",
    name: "Short Text",
    icon: Type,
    description: "Single line text input",
    category: "basic",
  },
  {
    id: "long-text",
    name: "Long Text",
    icon: AlignLeft,
    description: "Multiple lines of text",
    category: "basic",
  },
  {
    id: "email",
    name: "Email",
    icon: Mail,
    description: "Email address input with validation",
    category: "basic",
  },
  {
    id: "phone",
    name: "Phone",
    icon: Phone,
    description: "Phone number input",
    category: "basic",
  },
  {
    id: "number",
    name: "Number",
    icon: Hash,
    description: "Numerical input only",
    category: "basic",
  },
  {
    id: "dropdown",
    name: "Dropdown",
    icon: List,
    description: "Select from a list of options",
    category: "basic",
  },
  {
    id: "checkbox",
    name: "Checkbox",
    icon: CheckSquare,
    description: "Multiple selection checkbox",
    category: "basic",
  },
  {
    id: "radio",
    name: "Radio",
    icon: Check,
    description: "Single selection radio button",
    category: "basic",
  },
  {
    id: "multiple-choice",
    name: "Multiple Choice",
    icon: CheckCheck,
    description: "Choose multiple options",
    category: "basic",
  },

  // Advanced Fields
  {
    id: "date",
    name: "Date",
    icon: Calendar,
    description: "Date selection calendar",
    category: "advanced",
  },
  {
    id: "time",
    name: "Time",
    icon: Timer,
    description: "Time selection input",
    category: "advanced",
  },
  {
    id: "file-upload",
    name: "File Upload",
    icon: Upload,
    description: "Allow file uploads",
    category: "advanced",
  },
  {
    id: "signature",
    name: "Signature",
    icon: Hand,
    description: "Digital signature field",
    category: "advanced",
  },
  {
    id: "rating",
    name: "Rating",
    icon: Star,
    description: "Star rating selection",
    category: "advanced",
  },

  // Layout Fields
  {
    id: "page-break",
    name: "Page Break",
    icon: FileText,
    description: "Split form into multiple pages",
    category: "layout",
  },

  // Media Fields
  {
    id: "image",
    name: "Image",
    icon: Image,
    description: "Upload or embed images",
    category: "media",
  },
];

export const FORM_CATEGORIES = [
  {
    id: "basic",
    name: "Basic Fields",
    description: "Common form fields for most use cases",
  },
  {
    id: "advanced",
    name: "Advanced Fields",
    description: "Complex fields for specific needs",
  },
  {
    id: "layout",
    name: "Layout Elements",
    description: "Structure and organize your form",
  },
  {
    id: "media",
    name: "Media Elements",
    description: "Add rich media to your forms",
  },
];

// Sample form templates
export const FORM_TEMPLATES = [
  {
    id: "contact",
    name: "Contact Form",
    description: "Basic contact information collection",
    icon: "mail",
  },
  {
    id: "survey",
    name: "Customer Survey",
    description: "Gather feedback from customers",
    icon: "clipboardList",
  },
  {
    id: "event",
    name: "Event Registration",
    description: "Sign up participants for an event",
    icon: "calendar",
  },
  {
    id: "application",
    name: "Job Application",
    description: "Collect job applicant information",
    icon: "briefcase",
  },
];

// Mock data for demonstration
export const MOCK_FORMS = [
  {
    id: "form1",
    title: "Customer Feedback Survey",
    description: "Gather insights about our customer service",
    created: "2025-02-15T10:30:00",
    modified: "2025-04-14T14:22:00",
    responses: 178,
    status: "published",
  },
  {
    id: "form2",
    title: "Event Registration",
    description: "Sign up for our annual conference",
    created: "2025-03-05T09:15:00",
    modified: "2025-04-12T11:45:00",
    responses: 52,
    status: "published",
  },
  {
    id: "form3",
    title: "Job Application",
    description: "Apply for open positions",
    created: "2025-03-20T15:40:00",
    modified: "2025-04-10T16:30:00",
    responses: 24,
    status: "published",
  },
  {
    id: "form4",
    title: "Product Feedback",
    description: "Share your thoughts on our new release",
    created: "2025-04-01T08:20:00",
    modified: "2025-04-01T08:20:00",
    responses: 0,
    status: "draft",
  },
];
