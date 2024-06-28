"use client";
import { FormEvent, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from './ui/use-toast';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export function AddBranchForm() {
  const {toast} = useToast();

  const handleSubmit = async (e : FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    try{
      const response = await fetch("/api/admin/addbranch", {
        method: "POST",
      
        body: JSON.stringify(formObject),
      });
      if (response.ok) {
        toast({description: "Branch added successfully"});
      } else {
        const errorResponse = await response.json();
        toast({description: errorResponse.message, variant: "destructive"});
        
      }
    }catch(error){
      toast({description: "An error occurred", variant: "destructive"});
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[400px] space-y-4">
      <h2 className="text-2xl font-semibold">Add Branch</h2>
      <div>
        <Label htmlFor="name">Branch Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter branch name"
          required
        />
      </div>
      <div>
        <Label htmlFor="location">Branch Location</Label>
        <Input
          id="location"
          name="location"
          type="text"
          placeholder="Enter branch location"
          required
        />
      </div>
      <div className="grid gap-2">
        <div>
          <Label htmlFor="opening_time">Opening Time</Label>
          <Input

            id="open_time"
            name="open_time"
            type="time"
            required
          />
        </div>
        <div>
          <Label htmlFor="close_time">Closing Time</Label>
          <Input
            id="close_time"
            name="close_time"
            type="time"  
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Add Branch
      </Button>
    </form>
  );
}
