import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddExperienceModal({ open, onClose, onSubmit, form, onChange, agenda, onAgendaChange, onAddAgendaStep, onRemoveAgendaStep }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Experience</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            name="title"
            placeholder="Experience Title"
            value={form.title}
            onChange={onChange}
            required
          />
          <Input
            name="subtitle"
            placeholder="Subtitle"
            value={form.subtitle}
            onChange={onChange}
          />
          <div>
            <div className="mb-2 font-medium">Agenda Steps</div>
            {agenda.map((step, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input
                  placeholder="Step Title"
                  value={step.title}
                  onChange={e => onAgendaChange(idx, "title", e.target.value)}
                  required
                />
                <Input
                  placeholder="Duration (e.g. 5 mins)"
                  value={step.duration}
                  onChange={e => onAgendaChange(idx, "duration", e.target.value)}
                />
                {agenda.length > 1 && (
                  <Button type="button" variant="destructive" onClick={() => onRemoveAgendaStep(idx)}>&times;</Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={onAddAgendaStep}>+ Add Step</Button>
          </div>
          <DialogFooter>
            <Button type="submit">Add Experience</Button>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
