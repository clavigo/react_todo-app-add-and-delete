/* eslint-disable jsx-a11y/label-has-associated-control */
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface TodoListProps {
  todoList: Todo[];
  tempTodo: Todo | null;
  loadingTodos: number[];
  handleDeleteTodo: (todoId: number) => Promise<void>;
}

export const TodoList: React.FC<TodoListProps> = ({
  todoList,
  tempTodo,
  loadingTodos,
  handleDeleteTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todoList?.map(todo => {
        const isActiveModal = loadingTodos.some(id => id === todo.id);

        return (
          <TodoItem
            todo={todo}
            isActiveModal={isActiveModal}
            handleDeleteTodo={handleDeleteTodo}
            key={todo.id}
          />
        );
      })}
      {tempTodo && (
        <TodoItem
          todo={tempTodo}
          isActiveModal={true}
          handleDeleteTodo={handleDeleteTodo}
        />
      )}
    </section>
  );
};
