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
  userID: number;
}

interface ReservationData {
  id: number;
  user_name: string;
  phone: string;
  branch_name: string;
  service_name: string;
  duration: number;
  time: string;
  date: string;
}

export const ReservationTable = ({ userID }: ReservationTableProps) => {
  const [data, setData] = useState<ReservationData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/reservation?user_id=${userID}`;
        const response = await fetch(url);
        const fetchedData = await response.json();
        setData(fetchedData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userID]);

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
          {data.map((item) => (
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
}