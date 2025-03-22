import React, {useEffect} from 'react';
import {Image, Text} from "@/components/LV1";

function ApplyJobSuccess() {
    useEffect(()=>{
        if(window){
            window.scrollTo(0,0)
        }
    }, [])
    return (
        <div className="text-center p-2 w-[600px] mx-auto">
            <div className="flex justify-center my-10">
                <Image imageType="image" src="/images/happy_news.svg" width={250} height={250} />
            </div>

            <Text size="semilg" weight="semilg" className="mb-1">
                Thank you for submitting the application form.
            </Text>
            <Text>We'll be in touch as soon as possible.</Text>

            <Text className="mt-16" color="neutral700">
                Powered by <span className="font-semibold">Juncture</span>
            </Text>
        </div>
    );
}

export default ApplyJobSuccess;