import { useReducer, useState } from 'react';

interface numbersType {
  number1: number;
  number2: number;
}

type CalculatorAction =
  | { type: 'add'; number1: number; number2: number }
  | { type: 'subtract'; number1: number; number2: number }
  | { type: 'multiply'; number1: number; number2: number }
  | { type: 'divide'; number1: number; number2: number };

const App = () => {
  const [numbers, setNumbers] = useState<numbersType>({
    number1: 0,
    number2: 0,
  });
  const [error, setError] = useState<string>('');

  function setNumber(key: string, value: number) {
    setNumbers((prev) => ({ ...prev, [key]: value }));
  }

  function resultReducer(state: number, action: CalculatorAction): number {
    setError(''); // Reset error message on each action

    if (!action.number1 || isNaN(action.number1)) action.number1 = 0;
    if (!action.number2 || isNaN(action.number2)) action.number2 = 0;

    switch (
      action.type // Should switch on action.type, not state
    ) {
      case 'add':
        return action.number1 + action.number2;
      case 'subtract':
        return action.number1 - action.number2;
      case 'multiply':
        return action.number1 * action.number2;
      case 'divide':
        if (action.number2 === 0) {
          setError('Cannot divide by zero');
          return state; // Return current state instead of dividing by zero
        }
        return action.number1 / action.number2;
      default:
        return state; // Return current state for unknown action types
    }
  }

  const [result, calculateResult] = useReducer(resultReducer, 0);

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4">
        <input
          type="number"
          className="rounded-md shadow-md p-4"
          value={numbers.number1}
          onChange={(e) => setNumber('number1', parseFloat(e.target.value))}
        />
        <input
          type="number"
          className="rounded-md shadow-md p-4"
          value={numbers.number2}
          onChange={(e) => setNumber('number2', parseFloat(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-4 gap-x-4 my-4">
        <button
          className="bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md"
          onClick={() => calculateResult({ type: 'add', ...numbers })}
        >
          +
        </button>
        <button
          className="bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md"
          onClick={() => calculateResult({ type: 'subtract', ...numbers })}
        >
          -
        </button>
        <button
          className="bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md"
          onClick={() => calculateResult({ type: 'multiply', ...numbers })}
        >
          *
        </button>
        <button
          className="bg-blue-200 px-2 py-4 text-lg hover:bg-blue-500 hover:text-white rounded-md"
          onClick={() => calculateResult({ type: 'divide', ...numbers })}
        >
          /
        </button>
      </div>
      <div>Result: {result}</div>
      <div className="text-red-500">{error}</div>
    </div>
  );
};

export default App;
