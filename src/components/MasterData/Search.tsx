"use client";
import React from 'react'
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { TextField } from '@mui/material';

const Search = () => {
    
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
 
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <TextField
    fullWidth
    placeholder="Search"
    onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get('query')?.toString()}
    sx={{
      flex: 1,
    }}
  />
  )
}

export default Search