import List from '../ui/List';
import TodoCard from './TodoCard';

const TodosList = ({ todos, onToggle, onOpenMenu }) => {
  return (
    <List
      title="To-Dos"
      items={todos}
      renderItem={(todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onOpenMenu={() => onOpenMenu(todo.id)}
        />
      )}
    />
  );
};

export default TodosList;