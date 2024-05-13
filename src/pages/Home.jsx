import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useLogin } from '../useLogin';

const Home = () => {
  useLogin();
  return (
    <main className="flex">
      <Sidebar />
      <div className="flex max-w-7xl w-full p-8">
        <Outlet />
      </div>
    </main>
  );
};

export default Home;
