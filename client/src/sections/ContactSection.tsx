import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fadeIn, staggerContainer } from '@/lib/animations';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://shivajichaulagain.workers.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your message couldn't be sent. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-12"
        >
          <motion.div 
            variants={fadeIn('up')}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-300">
              Have a question about physics, my research, or want to collaborate on a project? Feel free to reach out!
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              variants={fadeIn('up')}
              className="md:col-span-1 space-y-6"
            >
              <Card className="bg-[#080a0a] border-[#5D3E7C] border p-6">
                <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-start">
                    <i className="ri-mail-line text-xl text-[#FF65A3] mr-3 mt-1"></i>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <a href="mailto:contact@shivaji.dev" className="text-white hover:text-[#FF65A3] transition-colors">
                        shivajichaulagain@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <i className="ri-map-pin-line text-xl text-[#FF65A3] mr-3 mt-1"></i>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white">Kathmandu, Nepal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <i className="ri-time-line text-xl text-[#FF65A3] mr-3 mt-1"></i>
                    <div>
                      <p className="text-gray-400 text-sm">Response Time</p>
                      <p className="text-white">Usually within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-[#141B34] border-[#5D3E7C] border p-6">
                <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
                <CardContent className="p-0">
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/Shivaji-137" 
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#5D3E7C] text-white hover:bg-[#FF65A3] transition-colors"
                      aria-label="GitHub"
                    >
                      <i className="ri-github-fill text-lg"></i>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/shivaji137/" 
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#5D3E7C] text-white hover:bg-[#FF65A3] transition-colors"
                      aria-label="LinkedIn"
                    >
                      <i className="ri-linkedin-fill text-lg"></i>
                    </a>
                    {/* <a 
                      href="#" 
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#5D3E7C] text-white hover:bg-[#FF65A3] transition-colors"
                      aria-label="Twitter"
                    >
                      <i className="ri-twitter-fill text-lg"></i>
                    </a> */}
                    <a 
                      href="#" 
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#5D3E7C] text-white hover:bg-[#FF65A3] transition-colors"
                      aria-label="Google Scholar"
                    >
                      <i className="ri-book-fill text-lg"></i>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              variants={fadeIn('up', 0.1)}
              className="md:col-span-2"
            >
              <Card className="bg-[#141B34] border-[#5D3E7C] border p-6">
                <h3 className="text-xl font-bold text-white mb-6">Send Me a Message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                className="bg-[#0B1026] border-[#5D3E7C] text-white focus-visible:ring-[#FF65A3]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your email" 
                                className="bg-[#0B1026] border-[#5D3E7C] text-white focus-visible:ring-[#FF65A3]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Message subject" 
                              className="bg-[#0B1026] border-[#5D3E7C] text-white focus-visible:ring-[#FF65A3]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message" 
                              className="bg-[#0B1026] border-[#5D3E7C] text-white focus-visible:ring-[#FF65A3] min-h-[150px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#5D3E7C] text-white hover:bg-[#FF65A3]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="ri-loader-4-line animate-spin mr-2"></i>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="ri-send-plane-fill mr-2"></i>
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
