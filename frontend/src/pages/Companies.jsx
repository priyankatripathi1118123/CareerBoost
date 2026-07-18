import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CompaniesList from './CompaniesList';
import CompanyProfile from './CompanyProfile';

export default function Companies() {
  return (
    <MemoryRouter initialEntries={['/companies']}>
      <Routes>
        <Route path="/companies" element={<CompaniesList />} />
        <Route path="/companies/:id" element={<CompanyProfile />} />
      </Routes>
    </MemoryRouter>
  );
}
