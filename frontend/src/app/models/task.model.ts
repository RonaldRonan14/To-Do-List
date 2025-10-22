export interface Task {
    id: string;
    title: string;
    annotations: string | null;
    completed: boolean;
    favorited: boolean;
    dueDate: string | null;
    dateCompleted: string | null;
}

export interface TaskCreate {
    title: string;
}

export interface TaskUpdate {
    title: string;
    annotations: string | null;
    dueDate: string | null;
}

export interface TaskModeCreate {
    completed: boolean | null;
    favorited: boolean | null;
    today: boolean | null;
}