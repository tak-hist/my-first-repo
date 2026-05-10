'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import styles from './page.module.css';

type Task = {
  id: string;
  label: string;
  done: boolean;
};

const storageKey = 'pocket-launch-tasks';

const defaultTasks: Task[] = [
  { id: 'idea', label: 'アプリの目的を1文で書く', done: true },
  { id: 'screen', label: '最初の1画面に必要な要素だけ残す', done: false },
  { id: 'copy', label: '公開用の説明文とスクリーンショットを用意する', done: false },
  { id: 'vercel', label: 'GitHub連携後、Vercelで無料公開する', done: false }
];

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [newTask, setNewTask] = useState('');
  const [idea, setIdea] = useState('例: 毎朝30秒で今日やることを決めるミニアプリ');

  useEffect(() => {
    const savedTasks = window.localStorage.getItem(storageKey);
    const savedIdea = window.localStorage.getItem('pocket-launch-idea');

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks) as Task[]);
    }

    if (savedIdea) {
      setIdea(savedIdea);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    window.localStorage.setItem('pocket-launch-idea', idea);
  }, [idea]);

  const completedCount = tasks.filter((task) => task.done).length;
  const progress = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round((completedCount / tasks.length) * 100);
  }, [completedCount, tasks.length]);

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const label = newTask.trim();
    if (!label) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: createId(), label, done: false }
    ]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  const resetTasks = () => {
    setTasks(defaultTasks);
    setIdea('例: 毎朝30秒で今日やることを決めるミニアプリ');
  };

  return (
    <main className={styles.pageShell}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>No Base44 / ChatGPT + Codex Starter</p>
        <h1>スマホで使える1ページWebアプリを、今日公開する。</h1>
        <p className={styles.lead}>
          Pocket Launchは、アプリのアイデアと公開までのToDoを1画面で管理するVercel向けスターターです。
        </p>
        <div className={styles.heroActions}>
          <a href="#checklist" className={styles.primaryButton}>チェックリストへ</a>
          <a href="https://vercel.com/new" className={styles.secondaryButton} target="_blank" rel="noreferrer">Vercelで公開</a>
        </div>
      </section>

      <section className={styles.card} aria-labelledby="idea-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Step 1</p>
          <h2 id="idea-title">アプリの芯を決める</h2>
        </div>
        <label className={styles.label} htmlFor="idea">
          ユーザーに届けたい価値
        </label>
        <textarea
          id="idea"
          className={styles.textarea}
          value={idea}
          onChange={(event) => setIdea(event.target.value)}
          rows={4}
        />
      </section>

      <section className={styles.card} id="checklist" aria-labelledby="checklist-title">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Step 2</p>
          <h2 id="checklist-title">公開チェックリスト</h2>
        </div>

        <div className={styles.progressCard}>
          <div>
            <span className={styles.progressValue}>{progress}%</span>
            <p>{completedCount}/{tasks.length} 完了</p>
          </div>
          <div className={styles.progressTrack} aria-label={`進捗 ${progress}%`}>
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        <form className={styles.addForm} onSubmit={addTask}>
          <input
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="追加するToDo"
            aria-label="追加するToDo"
          />
          <button type="submit">追加</button>
        </form>

        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <li key={task.id} className={task.done ? styles.doneTask : undefined}>
              <button type="button" className={styles.checkButton} onClick={() => toggleTask(task.id)} aria-label={`${task.label}を切り替え`}>
                {task.done ? '✓' : ''}
              </button>
              <span>{task.label}</span>
              <button type="button" className={styles.deleteButton} onClick={() => removeTask(task.id)} aria-label={`${task.label}を削除`}>
                削除
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.publishPanel} aria-labelledby="publish-title">
        <p className={styles.kicker}>Step 3</p>
        <h2 id="publish-title">無料公開の流れ</h2>
        <ol>
          <li>GitHubにこのリポジトリをpushする</li>
          <li>Vercelで「Add New Project」を選ぶ</li>
          <li>Framework PresetがNext.jsであることを確認する</li>
          <li>Build Commandは <code>npm run build</code> のままDeployする</li>
        </ol>
        <button type="button" className={styles.resetButton} onClick={resetTasks}>サンプル状態に戻す</button>
      </section>
    </main>
  );
}
