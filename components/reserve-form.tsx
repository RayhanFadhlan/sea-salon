import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

type Branch = {
  id: number;
  name: string;
  location: string;
  open_time: string;
  close_time: string;
};

type Service = {
  id: number;
  name: string;
  duration: number;
};

type ReserveFormProps = {
  user_id: number;
};

const reservationSchema = z.object({
  name: z.string().min(5, "Please enter your name."),
  phone: z.string().min(5, "Please enter a valid phone number (min 5 digit)."),
  branch_id: z.number(),
  service_id: z.number(),
  date: z.date(),
  time: z.string(),
});

export function ReserveForm({ user_id }: ReserveFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof reservationSchema>>({
    resolver: zodResolver(reservationSchema),
  });

  const [branches, setBranches] = useState<Branch[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch("/api/branch");
        const responseData = await response.json();
        setBranches(responseData.data);
      } catch (error) {
        console.error("Failed to fetch branches:", error);
      }
    };

    fetchBranches();
  }, []);

  const fetchServices = async (branchId: number) => {
    try {
      const response = await fetch(
        `/api/servicesByBranch?branch_id=${branchId}`,
      );
      const responseData = await response.json();
      setServices(responseData.data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  const onBranchChange = (branchId: string) => {
    form.setValue("branch_id", parseInt(branchId, 10));
    fetchServices(Number(branchId));
  };

  const onServiceChange = (serviceId: string) => {
    form.setValue("service_id", parseInt(serviceId, 10));
  };

  const onSubmit: SubmitHandler<z.infer<typeof reservationSchema>> = async (
    data,
  ) => {
    const formattedDate = format(new Date(data.date), "yyyy-MM-dd");
    const formattedData = {
      ...data,
      date: formattedDate,
      user_id: user_id,
      branch_id: Number(data.branch_id),
      service_id: Number(data.service_id),
    };
    console.log(formattedData);

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        body: JSON.stringify(formattedData),
      });
      if (response.ok) {
        toast({ description: "Reservation added successfully" });
      } else {
        const errorResponse = await response.json();
        toast({ description: errorResponse.message, variant: "destructive" });
      }
    } catch (error: any) {
      toast({ description: error.message, variant: "destructive" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a phone number with minimum 7 digits"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="branch_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch</FormLabel>
              <Select
                onValueChange={onBranchChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a branch" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={String(branch.id)}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type</FormLabel>
              <Select
                onValueChange={onServiceChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={String(service.id)}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}