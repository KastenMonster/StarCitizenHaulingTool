import '@mantine/core/styles.css';
import { Welcome } from './Welcome/Welcome';
import { ColorSchemeToggle } from './ColorSchemeToggle/ColorSchemeToggle';

export default function App() {
  return (
    <div>
      <Welcome />
      <ColorSchemeToggle />
    </div>
  );
}
