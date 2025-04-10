import { Loader } from 'lucide-react';
import React from 'react';

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen ">
      <Loader className="animate-spin text-7xl" />
    </div>
  );
};

export default loading;
