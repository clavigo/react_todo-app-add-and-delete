import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useEffect, useState } from 'react';
import { FilterType } from '../../types/FilterType';

interface FooterProps {
  todos: Todo[];
  todosType: FilterType;
  handleTodosTypeChange: (todosType: FilterType) => void;
  handleDeleteTodo: (todoId: number) => Promise<void>;
}

export const Footer: React.FC<FooterProps> = ({
  todos,
  todosType = FilterType.ALL,
  handleTodosTypeChange,
  handleDeleteTodo,
}) => {
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState<Todo[]>([]);

  useEffect(() => {
    setActive(todos.filter(todo => !todo.completed).length);
    setCompleted(todos.filter(todo => todo.completed));
  }, [todos]);

  const handleDeleteButton = () => {
    completed.map(todo => {
      handleDeleteTodo(todo.id);
    });
  };

  return (
    todos.length > 0 && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {active} items left
        </span>

        <nav className="filter" data-cy="Filter">
          {Object.values(FilterType).map(filter => (
            <a
              key={filter}
              href="#/"
              className={classNames('filter__link', {
                selected: todosType === filter,
              })}
              data-cy={`FilterLink${filter}`}
              onClick={() => handleTodosTypeChange(filter)}
            >
              {filter}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={completed.length === 0}
          onClick={handleDeleteButton}
        >
          Clear completed
        </button>
      </footer>
    )
  );
};
