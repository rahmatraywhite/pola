import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react';
import {
  PresentationChartBarIcon,
  Cog6ToothIcon,
  PowerIcon,
  TableCellsIcon,
} from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <Card className="max-w-[20rem] h-screen p-4 shadow-lg">
      <div className="mb-2 p-4">
        <Typography variant="h5" className="text-2xl font-bold">
          Dev
        </Typography>
      </div>
      <List>
        <Link to="/">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Input Data
          </ListItem>
        </Link>
        <Link to="/data">
          <ListItem>
            <ListItemPrefix>
              <TableCellsIcon className="h-5 w-5" />
            </ListItemPrefix>
            List Data
          </ListItem>
        </Link>
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
