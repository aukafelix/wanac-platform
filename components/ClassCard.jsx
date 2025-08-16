import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ClassCard({ cls, isSelected, onSelect, onEdit, onDelete, onAddExperience }) {
  return (
    <Card className={isSelected ? "border-blue-600 border-2" : "border border-gray-200"}>
      <CardHeader>
        <CardTitle>{cls.name} <span className="text-sm text-gray-400 ml-2">({cls.sectionName})</span></CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="outline" size="sm" onClick={onSelect} className="mr-2">Select</Button>
        <Button variant="secondary" size="sm" onClick={onEdit} className="mr-2">Edit</Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>Delete</Button>
      </CardContent>
      <CardFooter>
        <Button variant="default" size="sm" onClick={onAddExperience}>+ Add Experience</Button>
      </CardFooter>
    </Card>
  );
}
