import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
interface ReservationTableProps {
  reservations: ReservationData[];  
}

export const ReservationTable = ({ reservations}: ReservationTableProps) => {
 
  return (
    <div className="flex items-center justify-center py-4">
      <Table className="w-[90%] mx-auto">
        <TableCaption>Your past reservation</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Branch Name</TableHead>
            <TableHead>Service Type</TableHead>
            <TableHead>Service Duration (minutes)</TableHead>
            <TableHead>Service Time</TableHead>
            <TableHead>Service Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.user_name}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.branch_name}</TableCell>
              <TableCell>{item.service_name}</TableCell>
              <TableCell>{item.duration}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
