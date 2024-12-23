'use client';

import { useEffect, useRef, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquareOffIcon } from 'lucide-react';

interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export default function SubmissionsList() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const isInitialLoad = useRef(true);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(
      collection(db, 'submissions'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const submissionsData: Submission[] = [];
      querySnapshot.forEach((doc) => {
        submissionsData.push({ id: doc.id, ...doc.data() } as Submission);
      });
      setSubmissions(submissionsData);
    });
    toast({
      title: 'Submissions Updated',
      description: `There are now ${submissions.length} total submissions.`,
    });
    return () => unsubscribe();
  }, [toast]);

  return (
    <div className="space-y-4 m-2">
      {submissions.map((submission) => (
        <Accordion type="single" collapsible>
          <Card key={submission.id}>
            <AccordionItem value="item-1">
              <CardHeader className="flex flex-row items-center  justify-between	">
                <AccordionTrigger>
                  {' '}
                  <CardTitle>{submission.name}</CardTitle>
                </AccordionTrigger>
                <div>
                  <Badge className="bg-red-500">New</Badge>{' '}
                  <Button size="sm">
                    <MessageSquareOffIcon size={10} />
                  </Button>
                </div>
              </CardHeader>

              <AccordionContent>
                <CardContent>
                  <p>
                    <strong>Email:</strong> {submission.email}
                  </p>
                  <p>
                    <strong>Message:</strong> {submission.message}
                  </p>
                  <p>
                    <strong>Submitted:</strong>{' '}
                    {submission.createdAt.toDate().toLocaleString()}
                  </p>
                </CardContent>
              </AccordionContent>
            </AccordionItem>
          </Card>
        </Accordion>
      ))}
    </div>
  );
}
