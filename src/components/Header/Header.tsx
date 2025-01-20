import { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';

interface HeaderProps {
  todoList: Todo[];
  handleAddTodo: (query: string) => Promise<void>;
}

export const Header: React.FC<HeaderProps> = ({ handleAddTodo, todoList }) => {
  const [query, setQuery] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const newTodoInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoInput.current) {
      newTodoInput.current.focus();
    }
  }, [todoList, isDisabled]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsDisabled(true);

    handleAddTodo(query.trim())
      .then(() => {
        setQuery('');
      })
      .catch(() => {})
      .finally(() => setIsDisabled(false));
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => setQuery(event.target.value)}
          ref={newTodoInput}
          disabled={isDisabled}
        />
      </form>
    </header>
  );
};
