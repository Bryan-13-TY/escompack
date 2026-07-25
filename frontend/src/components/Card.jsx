import { Link } from 'react-router-dom';

import './Card.css';

export function Card({ icon, title, description, buttonText, pageLink }) {
    return (
        <div className="card">
            <div className="icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>

            <Link to={pageLink}>
                <button>
                    <span>{buttonText}</span>
                </button>
            </Link>
        </div>
    );
}
