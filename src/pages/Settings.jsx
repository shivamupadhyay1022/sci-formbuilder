
import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { toast } from 'sonner';
import { 
  User, 
  Building2, 
  Palette, 
  Bell, 
  Link, 
  Globe, 
  Mail, 
  Key, 
  Trash2, 
  Upload,
  RefreshCw,
  X
} from 'lucide-react';


const Settings = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [notifications, setNotifications] = useState({
    formSubmissions: true,
    teamInvites: true,
    mentions: false
  });
  const [activeTab, setActiveTab] = useState("profile"); // State for Tabs

  const handleSaveProfile = () => {
    toast.success('Profile settings saved');
  };

  const handleDeleteAccount = () => {
    toast.error('Account deleted');
    setShowDeleteDialog(false);
  };

  const handleConnect = (service) => {
    toast.success(`Connected to ${service}`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Tabs */}
        <div className="" >
          {/* TabsList */}
          <div
            className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground mb-4"
          >
            {/* TabsTrigger Profile */}
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === "profile" ? 'bg-background text-foreground shadow-sm' : ''}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            {/* TabsTrigger Workspace */}
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === "workspace" ? 'bg-background text-foreground shadow-sm' : ''}`}
              onClick={() => setActiveTab("workspace")}
            >
              Workspace
            </button>
            {/* TabsTrigger Notifications */}
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === "notifications" ? 'bg-background text-foreground shadow-sm' : ''}`}
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </button>
            {/* TabsTrigger Integrations */}
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === "integrations" ? 'bg-background text-foreground shadow-sm' : ''}`}
              onClick={() => setActiveTab("integrations")}
            >
              Integrations
            </button>
          </div>

          {/* TabsContent Profile */}
          {activeTab === "profile" && (
            <div
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {/* Card */}
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                {/* CardHeader */}
                <div
                  className="flex flex-col space-y-1.5 p-6"
                >
                  {/* CardTitle */}
                  <h3
                    className="text-2xl font-semibold leading-none tracking-tight"
                  >
                    Profile Settings
                  </h3>
                </div>
                {/* CardContent */}
                <div className="p-6 pt-0 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-10 h-10 text-muted-foreground" />
                    </div>
                    {/* Button Upload Photo */}
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      {/* Label Name */}
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Name
                      </label>
                      {/* Input Name */}
                      <input
                        id="name"
                        defaultValue="John Doe"
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      />
                    </div>
                    <div>
                      {/* Label Email */}
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email (non-editable)
                      </label>
                      {/* Input Email */}
                      <input
                        id="email"
                        value="john@example.com"
                        disabled
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      />
                    </div>
                    <div>
                      {/* Label Current Password */}
                      <label
                        htmlFor="current-password"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Current Password
                      </label>
                      {/* Input Current Password */}
                      <input
                        id="current-password"
                        type="password"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      />
                    </div>
                    <div>
                      {/* Label New Password */}
                      <label
                        htmlFor="new-password"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        New Password
                      </label>
                      {/* Input New Password */}
                      <input
                        id="new-password"
                        type="password"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      />
                    </div>
                    
                    <div className="flex justify-between items-center pt-4">
                      {/* Button Save Changes */}
                      <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        onClick={handleSaveProfile}
                      >
                        Save Changes
                      </button>
                      {/* AlertDialog */}
                      <>
                        {showDeleteDialog && (
                          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
                            {/* AlertDialogContent */}
                            <div
                              className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg"
                            >
                              {/* AlertDialogHeader */}
                              <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                                {/* AlertDialogTitle */}
                                <h2 className="text-lg font-semibold leading-none tracking-tight">Are you absolutely sure?</h2>
                                {/* AlertDialogDescription */}
                                <p className="text-sm text-muted-foreground">
                                  This action cannot be undone. This will permanently delete your
                                  account and remove all your data.
                                </p>
                              </div>
                              {/* AlertDialogFooter */}
                              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                                {/* AlertDialogCancel */}
                                <button
                                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                                  onClick={() => setShowDeleteDialog(false)}
                                >
                                  Cancel
                                </button>
                                {/* AlertDialogAction */}
                                <button
                                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"
                                  onClick={handleDeleteAccount}
                                >
                                  Delete Account
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
                        {/* AlertDialogTrigger */}
                        <button onClick={() => setShowDeleteDialog(true)}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </button>
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TabsContent Workspace */}
          {activeTab === "workspace" && (
            <div
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {/* Card */}
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                {/* CardHeader */}
                <div
                  className="flex flex-col space-y-1.5 p-6"
                >
                  {/* CardTitle */}
                  <h3
                    className="text-2xl font-semibold leading-none tracking-tight"
                  >
                    Workspace Settings
                  </h3>
                </div>
                {/* CardContent */}
                <div className="p-6 pt-0 space-y-6">
                  <div>
                    {/* Label Workspace Name */}
                    <label
                      htmlFor="workspace-name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Workspace Name
                    </label>
                    {/* Input Workspace Name */}
                    <input
                      id="workspace-name"
                      defaultValue="My Workspace"
                      type="text"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    />
                  </div>
                  <div>
                    {/* Label Subdomain */}
                    <label
                      htmlFor="subdomain"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Subdomain
                    </label>
                    <div className="flex items-center space-x-2">
                      {/* Input Subdomain */}
                      <input
                        id="subdomain"
                        defaultValue="myworkspace"
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      />
                      <span className="text-muted-foreground">.formhub.com</span>
                    </div>
                  </div>
                  <div>
                    {/* Label Brand Color */}
                    <label
                      htmlFor="brand-color"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Brand Color
                    </label>
                    {/* Input Brand Color */}
                    <input
                      id="brand-color"
                      type="color"
                      defaultValue="#6366F1"
                      className="flex h-10 w-20 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    />
                  </div>
                  <div>
                    {/* Label Timezone */}
                    <label
                      htmlFor="timezone"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Timezone
                    </label>
                    <select className="w-full p-2 border rounded-md" defaultValue="UTC">
                      <option value="UTC">UTC</option>
                      <option value="EST">EST</option>
                      <option value="PST">PST</option>
                    </select>
                  </div>
                  {/* Button Save Workspace Settings */}
                  <button
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    Save Workspace Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TabsContent Notifications */}
          {activeTab === "notifications" && (
            <div
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {/* Card */}
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                {/* CardHeader */}
                <div
                  className="flex flex-col space-y-1.5 p-6"
                >
                  {/* CardTitle */}
                  <h3
                    className="text-2xl font-semibold leading-none tracking-tight"
                  >
                    Notification Preferences
                  </h3>
                </div>
                {/* CardContent */}
                <div className="p-6 pt-0 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        {/* Label Form Submissions */}
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Form Submissions
                        </label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when someone submits a form
                        </p>
                      </div>
                      {/* Switch Form Submissions */}
                      <button
                        role="switch"
                        aria-checked={notifications.formSubmissions}
                        data-state={notifications.formSubmissions ? "checked" : "unchecked"}
                        className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${notifications.formSubmissions ? 'bg-primary' : 'bg-input'}`}
                        onClick={() => setNotifications(prev => ({ ...prev, formSubmissions: !prev.formSubmissions }))}
                      >
                        <span
                          data-state={notifications.formSubmissions ? "checked" : "unchecked"}
                          className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        {/* Label Team Invites */}
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Team Invites
                        </label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about team invitation updates
                        </p>
                      </div>
                      {/* Switch Team Invites */}
                      <button
                        role="switch"
                        aria-checked={notifications.teamInvites}
                        data-state={notifications.teamInvites ? "checked" : "unchecked"}
                        className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${notifications.teamInvites ? 'bg-primary' : 'bg-input'}`}
                        onClick={() => setNotifications(prev => ({ ...prev, teamInvites: !prev.teamInvites }))}
                      >
                        <span
                          data-state={notifications.teamInvites ? "checked" : "unchecked"}
                          className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        {/* Label Mentions */}
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Mentions
                        </label>
                        <p className="text-sm text-muted-foreground">
                          Notifications when someone mentions you
                        </p>
                      </div>
                      {/* Switch Mentions */}
                      <button
                        role="switch"
                        aria-checked={notifications.mentions}
                        data-state={notifications.mentions ? "checked" : "unchecked"}
                        className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${notifications.mentions ? 'bg-primary' : 'bg-input'}`}
                        onClick={() => setNotifications(prev => ({ ...prev, mentions: !prev.mentions }))}
                      >
                        <span
                          data-state={notifications.mentions ? "checked" : "unchecked"}
                          className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TabsContent Integrations */}
          {activeTab === "integrations" && (
            <div
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {/* Card */}
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                {/* CardHeader */}
                <div
                  className="flex flex-col space-y-1.5 p-6"
                >
                  {/* CardTitle */}
                  <h3
                    className="text-2xl font-semibold leading-none tracking-tight"
                  >
                    Integrations
                  </h3>
                </div>
                {/* CardContent */}
                <div className="p-6 pt-0 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Globe className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Google Sheets</h3>
                          <p className="text-sm text-muted-foreground">Connected</p>
                        </div>
                      </div>
                      {/* Button Reconnect */}
                      <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                        onClick={() => handleConnect('Google Sheets')}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reconnect
                      </button>
                    </div>

                    <div className="space-y-4">
                      {/* Label Webhooks */}
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Webhooks
                      </label>
                      <div className="space-y-2">
                        {/* Input Webhook URL */}
                        <input
                          placeholder="https://your-webhook-url.com"
                          type="text"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        />
                        {/* Button Add Webhook */}
                        <button
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                        >
                          <Link className="w-4 h-4 mr-2" />
                          Add Webhook
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
