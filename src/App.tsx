import { Bell, Clock, Gamepad2, Plus, Zap } from "lucide-react";
import "./App.css";
import { useState } from "react";


interface MyButtonProps {
  title: string;
  disabled: boolean;
  onClick: () => void
}

interface EnterTaskProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

function EnterTask({ placeholder, value, onChange }: EnterTaskProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="task-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function MyButton({ title, disabled, onClick }: MyButtonProps) {
  return (
    <button className="start-button" disabled={disabled} onClick={onClick}>
      <Plus size={18} strokeWidth={3} />
      {title}
    </button>
  );
}

export default function MyApp() {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);


  const createTask = async () => {
    if (!task.trim()) {
      console.log("Please enter a task");
      return;
    }
    setLoading(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/tasks/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify({name:task,}),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Task added");
        }
        else {
          console.log(data.detail)
        }

    } catch (err) {
      console.error(err);
      console.log("error, unable to connect to server");

    }
    finally {
      setLoading(false);
    }

  }
  return (
    <main className="app-container">
      <nav className="top-bar">
        <div className="logo">
          <Gamepad2 size={24} />
          <span>ACTIVITY.EXE</span>
        </div>
        <div className="bar-item">
          <span>MY QUESTS</span>
        </div>

        
      </nav>

      <section className="hero">
        <div className="hero-tag">
          <Zap size={14} fill="currentColor" />
          YOUR DAILY QUEST
        </div>

        <h1>
          LEVEL UP
          <span>YOUR LIFE.</span>
        </h1>

        <p className="hero-description">
          Small missions. Real progress.
          <br />
          Complete your quests and keep moving.
        </p>
      </section>

      <section className="task-panel">
        <div className="panel-header">
          <div>
            <span className="panel-label">NEW QUEST</span>
            <h2>What are we doing?</h2>
          </div>

          <div className="quest-icon">
            <Plus size={22} strokeWidth={3} />
          </div>
        </div>

        <EnterTask placeholder="Type your next quest here..." value={task} onChange={setTask} />

        <div className="input-bottom">
          <span>MAKE IT COUNT.</span>
          <MyButton title="ADD QUEST" disabled={false} onClick={createTask} />
        </div>
      </section>

      <section className="quick-info">
        <div className="info-card">
          <div className="info-icon yellow">
            <Clock size={20} />
          </div>
          <div>
            <span className="info-label">TODAY</span>
            <h3>Make it count</h3>
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon red">
            <Bell size={20} />
          </div>
          <div>
            <span className="info-label">REMINDERS</span>
            <h3>Stay on track</h3>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>INSERT COIN TO BEGIN</span>
        <span className="footer-decor">◆ ◆ ◆</span>
      </footer>
    </main>
  );
}