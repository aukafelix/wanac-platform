import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddClassModal({ open, onClose, onSubmit, form, onChange }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Class Name"
            value={form.name}
            onChange={onChange}
            required
          />
          <Input
            name="sectionName"
            placeholder="Section Name"
            value={form.sectionName}
            onChange={onChange}
            required
          />
          <DialogFooter>
            <Button type="submit">Add Class</Button>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
