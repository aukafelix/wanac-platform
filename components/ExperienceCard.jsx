import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ExperienceCard({ exp, onEdit, onDelete }) {
  return (
    <Card className="mb-2">
      <CardHeader>
        <CardTitle>{exp.title} <span className="text-sm text-gray-400 ml-2">{exp.subtitle}</span></CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5">
          {exp.agenda && exp.agenda.map((step, idx) => (
            <li key={idx}>{step.title} <span className="text-xs text-gray-400">({step.duration})</span></li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" size="sm" onClick={onEdit} className="mr-2">Edit</Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>Delete</Button>
      </CardFooter>
    </Card>
  );
}
