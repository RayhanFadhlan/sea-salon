"use client";
import { FormEvent, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useToast } from './ui/use-toast';
import { prisma } from "@/lib/prisma";

interface Branch {
  id: number; 
  name: string;

}

export  function AddServiceForm() {
  const [branches, setBranches] = useState([]);
  const {toast} = useToast();
  
  useEffect(() => {
    const fetchBranches = async () => {
      const response = await fetch("/api/admin/addservice");
      const data = await response.json();
      setBranches(data);
    };

    fetchBranches();
  }, []);
  
  
  const handleSubmit = async (e : FormEvent) => {
    
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    try{
      const response = await fetch("/api/admin/addservice", {
        method: "POST",
        body: JSON.stringify(formObject),
      });
      if (response.ok) {
        toast({description: "Service added successfully"});
        form.reset();
      } else {
        const errorResponse = await response.json();
        toast({description: errorResponse.message, variant: "destructive"});
        form.reset();
      }
    }catch(error){
      toast({description: "An error occurred", variant: "destructive"});
    }
   
  }
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[400px] space-y-4">
      <h2 className="text-2xl font-semibold">Add Service</h2>
      <div>
        <Label htmlFor="name">Service Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter service name"
          required
        />
      </div>
      <div>
        <Label htmlFor="duration">Session Time (minutes)</Label>
        <Input
          id="duration"
          name="duration"
          type="number"
          placeholder="Enter session time"
          required
        />
      </div>
      <div>
        <Label htmlFor="branch-select">Select Branch</Label>
        <Select name = "branch">
         <SelectTrigger id="branch">
            <SelectValue placeholder="Select branch" />
         </SelectTrigger>
            <SelectContent position="popper">
            {branches.map((branch : Branch) => (
                <SelectItem
                key={branch.name}
                value={branch.name}
                >
                {branch.name}
                </SelectItem>
            ))}
            </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        Add Service
      </Button>
    </form>
  );
}