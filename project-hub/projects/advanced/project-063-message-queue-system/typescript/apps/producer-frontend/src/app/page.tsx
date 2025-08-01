'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from 'zod';

const producerSchema = z.object({
  message: z.string()
})

export default function Home() {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof producerSchema>>({
    resolver: zodResolver(producerSchema),
    defaultValues: {
      message: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof producerSchema>) => {
    setIsSubmitting(true);
    const response = await axios.post('http://localhost:9000/post-message', {
      message: values.message
    });
    form.reset();
    toast.success('Message sent')
    setIsSubmitting(false);
  }

  return (
    <main className='bg-zinc-950 flex items-center justify-center min-h-screen text-white p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-zinc-900 rounded-lg border border-zinc-800 p-8 shadow-lg'>
          <div className='mb-6 text-center'>
            <h1 className='text-2xl font-semibold text-white mb-2'>Kafka Broker - Send Message</h1>
            <p className='text-zinc-400 text-sm'>Enter your message below</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="message"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-zinc-300 font-medium'>Your message</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your message"
                        {...field}
                        className='bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-600 focus:ring-zinc-600'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className='w-full bg-white text-zinc-900 hover:bg-zinc-200 font-medium transition-colors cursor-pointer disabled:bg-white/80'
                disabled={isSubmitting}
              >
                Send Message
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}