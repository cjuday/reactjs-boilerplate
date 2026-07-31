import { Button } from "@/components/ui";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>Dashboard</h1>
      <button
        onClick={async () => {
            const response = await fetch('http://localhost:3000/auth/refresh', {
            method: 'POST',
            credentials: 'include',
            });

            console.log(response.status);
            console.log(await response.json());
        }}
        >
        Test Refresh
        </button>
        <Button onClick={() => navigate('/')}>
  Go to Login
</Button>
    </div>
  );
}