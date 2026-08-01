import { Link } from 'react-router-dom';
import logo from '@/assets/images/logo.png';

export default function Logo() {
    return (
        <Link to="/dashboard" className="flex items-center justify-center">
            <img src={logo} alt="BoilerPlate" className="h-14 w-32 object-contain"/>
        </Link>
    );
}