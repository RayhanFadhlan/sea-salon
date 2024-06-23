import React from 'react';

import ReviewList from '@/components/review-list';
import ReviewForm from '@/components/review-form';



export default function Review() {
    return (
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold">Reviews</h2>

            <div className="my-8">
                <ReviewList />
            </div>
            <div className="flex justify-center">
                <ReviewForm />
            </div>
       </div>
    );
}