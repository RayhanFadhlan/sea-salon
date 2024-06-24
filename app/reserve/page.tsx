import { ReserveForm } from "@/components/reserve-form";

export default function reserve() {
    return (
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold">Reserve</h2>

            <div className="my-8">
                <ReserveForm />
            </div>
            
       </div>
    );
}