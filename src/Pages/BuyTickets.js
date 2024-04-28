import { useParams } from 'react-router-dom';
import HanthanetaPayana from '../Pages/HanthanetaPayana';
import BassEnigma from '../Pages/BassEnigma'; 

const BuyTickets = () => {
  const { eventTitle } = useParams();

  // Render the relevant event component based on eventTitle
  switch (eventTitle) {
    case 'hanthaneta-payana':
      return <HanthanetaPayana />;
    case 'bass-enigma':
      return <BassEnigma />;
    default:
      return <div>NotFound PAGE</div>;
  }
};

export default BuyTickets;
