import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import Column from "./Components/Column/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Input from "./Components/Input/Input";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Add tests to homework" },
    { id: 2, title: "Fix styling in About section" },
    { id: 3, title: "Learn how to center a div" },
  ]);

  const addTasks = (title) => {
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, title }]);
  };

  const getTaskPosition = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (active.id === over.id) {
      return;
    } else {
      setTasks((tasks) => {
        const originalPosition = getTaskPosition(active.id);
        const newPosition = getTaskPosition(over.id);
        return arrayMove(tasks, originalPosition, newPosition);
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <div className="app">
      <h1>My Tasks ✅</h1>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <Input onSubmit={addTasks} />
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}

export default App;
