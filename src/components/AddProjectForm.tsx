// src/components/AddProjectForm.tsx
import { useState } from 'react';
import type { Project } from '../data/projects';

type AddProjectFormProps = {
  onAddProject: (project: Project) => void;
};

function AddProjectForm({ onAddProject }: AddProjectFormProps) {
  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [techInput, setTechInput] = useState('');
  const [featured, setFeatured] = useState(false);
  const [finished, setFinished] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !summary.trim()) {
      // basic guard - in real app you'd show a message
      return;
    }

    const techArray = techInput
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);

    const newProject: Project = {
      id: Date.now(), // simple unique-ish id for now
      name: name.trim(),
      summary: summary.trim(),
      tech: techArray,
      featured,
      finished,
      details: 'New project added from the form.',
    };

    onAddProject(newProject);

    // clear form
    setName('');
    setSummary('');
    setTechInput('');
    setFeatured(false);
    setFinished(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a new project</h3>

      <div>
        <label htmlFor="project-name">Name</label>
        <input
          id="project-name"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="project-summary">Summary</label>
        <textarea
          id="project-summary"
          value={summary}
          onChange={event => setSummary(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="project-tech">Tech (comma separated)</label>
        <input
          id="project-tech"
          value={techInput}
          onChange={event => setTechInput(event.target.value)}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={featured}
            onChange={event => setFeatured(event.target.checked)}
          />
          Featured project
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={finished}
            onChange={event => setFinished(event.target.checked)}
          />
          Finished project?
        </label>
      </div>

      <button type="submit">Add project</button>
    </form>
  );
}

export default AddProjectForm;