
import React from 'react';
import MainLayout from '../components/layout/MainLayout';

const Templates = () => {
  return (
    <MainLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Templates</h1>
        <p className="text-muted-foreground mb-4">Browse and use pre-made form templates.</p>
        <div className="bg-card border rounded-lg p-8 text-center">
          <h2 className="text-xl font-medium mb-2">Coming Soon</h2>
          <p className="text-muted-foreground">The templates library is under development.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Templates;
