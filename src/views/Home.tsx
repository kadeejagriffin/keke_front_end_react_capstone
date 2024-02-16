import { RetreatType } from '../types';

type HomeProps = {
    isLoggedIn: boolean;
    retreats: RetreatType[];
};

export default function Home({ isLoggedIn, retreats }: HomeProps) {
    return (
        <div>
            <h1>{isLoggedIn ? 'Namastay' : 'Welcome, please log in!'}</h1>
            {isLoggedIn && (
                <ul>
                    {retreats.map(retreat => (
                        <li key={retreat.id}>
                            <h2>{retreat.name}</h2>
                            <p>Location: {retreat.location}</p>
                            <p>Date: {retreat.date}</p>
                            <p>Description: {retreat.description}</p>
                            <p>Duration: {retreat.duration}</p>
                            <p>Cost: {retreat.cost}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}






