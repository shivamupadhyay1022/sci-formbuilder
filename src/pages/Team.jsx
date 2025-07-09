import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Search, UserPlus, Mail, UserMinus, Info, X } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const Team = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const teamMembers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinedDate: '2025-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', joinedDate: '2025-02-10' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer', status: 'pending', joinedDate: null },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Editor', status: 'active', joinedDate: '2025-03-22' },
    { id: 5, name: 'Alex Brown', email: 'alex@example.com', role: 'Viewer', status: 'active', joinedDate: '2025-04-05' },
  ];

  const roleDescriptions = {
    Admin: 'Can manage all forms, responses, and team members',
    Editor: 'Can create and edit forms, view responses',
    Viewer: 'Can only view forms and responses'
  };

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangeRole = (memberId, newRole) => {
    toast.success(`Role updated to ${newRole}`);
  };

  const handleResendInvite = (email) => {
    toast.success(`Invitation resent to ${email}`);
  };

  const confirmDelete = (id) => {
    setMemberToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteMember = () => {
    if (memberToDelete) {
      toast.success(`Team member removed`);
      setShowDeleteDialog(false);
      setMemberToDelete(null);
    }
  };

  // Form schema for member invitation
  const inviteSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Must be a valid email address'),
    role: z.string().min(1, 'Role is required')
  });

  const inviteForm = useForm({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'Viewer'
    }
  });

  const handleInviteSubmit = (values) => {
    toast.success(`Invitation sent to ${values.email}`);
    setShowInviteDialog(false);
    inviteForm.reset();
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">Manage team members and their permissions</p>
          </div>
          {/* Dialog Invite Member */}
          <>
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              onClick={() => setShowInviteDialog(true)}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Member
            </button>
            {showInviteDialog && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
                <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
                  {/* DialogHeader */}
                  <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                    <h2 className="text-lg font-semibold leading-none tracking-tight">Invite Team Member</h2>
                    <p className="text-sm text-muted-foreground">
                      Send an invitation to join your team
                    </p>
                  </div>

                  <form onSubmit={inviteForm.handleSubmit(handleInviteSubmit)} className="space-y-4">
                    {/* FormField Name */}
                    <div>
                      <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                      <input
                        id="name"
                        placeholder="Enter name"
                        {...inviteForm.register("name")}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      />
                      {inviteForm.formState.errors.name && <p className="text-sm font-medium text-destructive">{inviteForm.formState.errors.name.message}</p>}
                    </div>

                    {/* FormField Email */}
                    <div>
                      <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                      <input
                        id="email"
                        placeholder="Enter email"
                        {...inviteForm.register("email")}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      />
                      {inviteForm.formState.errors.email && <p className="text-sm font-medium text-destructive">{inviteForm.formState.errors.email.message}</p>}
                    </div>

                    {/* FormField Role */}
                    <div>
                      <label htmlFor="role" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Role</label>
                      <select
                        id="role"
                        {...inviteForm.register("role")}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                      {inviteForm.formState.errors.role && <p className="text-sm font-medium text-destructive">{inviteForm.formState.errors.role.message}</p>}
                    </div>

                    {/* DialogFooter */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                      <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2" onClick={() => setShowInviteDialog(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Send Invitation</button>
                    </div>
                  </form>
                  <button
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none"
                    onClick={() => setShowInviteDialog(false)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </button>
                </div>
              </div>
            )}
          </>
        </div>

        <div className="flex space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input 
              className="pl-9 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Card Team Members */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          {/* CardHeader */}
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center justify-between">
              <span>Team Members</span>
              {/* Tooltip */}
              <div className="relative inline-block">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 w-10" onMouseEnter={() => setOpenDropdownId('tooltip')} onMouseLeave={() => setOpenDropdownId(null)}>
                  <Info className="h-4 w-4" />
                </button>
                {openDropdownId === 'tooltip' && (
                  <div className="absolute z-50 w-80 rounded-md border bg-popover p-4 text-popover-foreground shadow-md top-full left-1/2 -translate-x-1/2 mt-2">
                    <div className="space-y-2">
                      <h4 className="font-medium">Role Permissions</h4>
                      <div className="text-sm space-y-1">
                        <p><span className="font-medium">Admin:</span> {roleDescriptions.Admin}</p>
                        <p><span className="font-medium">Editor:</span> {roleDescriptions.Editor}</p>
                        <p><span className="font-medium">Viewer:</span> {roleDescriptions.Viewer}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </h3>
          </div>
          {/* CardContent */}
          <div className="p-6 pt-0">
            {/* Table */}
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Email</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Role</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Joined</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">{member.name}</td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{member.email}</td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                        {/* Select Role */}
                        <select 
                          defaultValue={member.role} 
                          onChange={(e) => handleChangeRole(member.id, e.target.value)}
                          className="w-[110px] flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Editor">Editor</option>
                          <option value="Viewer">Viewer</option>
                        </select>
                      </td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                        {/* Badge Status */}
                        <div 
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                            member.status === 'active' ? 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80' : 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          } capitalize`}
                        >
                          {member.status}
                        </div>
                      </td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                        {member.joinedDate 
                          ? format(new Date(member.joinedDate), 'MMM d, yyyy')
                          : '-'
                        }
                      </td>
                      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                        <div className="flex justify-end space-x-2">
                          {member.status === 'pending' && (
                            <button 
                              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                              onClick={() => handleResendInvite(member.email)}
                            >
                              <Mail className="mr-1 h-4 w-4" />
                              Resend
                            </button>
                          )}
                          <button 
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3"
                            onClick={() => confirmDelete(member.id)}
                          >
                            <UserMinus className="mr-1 h-4 w-4" />
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredMembers.length === 0 && (
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td colSpan={6} className="p-4 align-middle [&:has([role=checkbox])]:pr-0 h-24 text-center">
                        No team members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Dialog Delete Member */}
        {showDeleteDialog && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
              {/* DialogHeader */}
              <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                <h2 className="text-lg font-semibold leading-none tracking-tight">Remove Team Member</h2>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to remove this team member? They will lose access to all forms and data.
                </p>
              </div>
              {/* DialogFooter */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2" onClick={() => setShowDeleteDialog(false)}>
                  Cancel
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2" onClick={handleDeleteMember}>
                  Remove
                </button>
              </div>
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none"
                onClick={() => setShowDeleteDialog(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Team;