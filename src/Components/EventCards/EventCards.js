import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@mui/material';

const EventCard = ({
  title,
  image,
  date,
  time,
  location,
  priceRange,
  availability,
  editable,
  onFieldChange,
  onUpdate,
}) => {
  const handleChange = (field, value) => {
    onFieldChange(field, value);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
      <img src={image} alt={title} style={{ width: '100%' }} />
      <TextField
        label="Title"
        value={title}
        onChange={(e) => handleChange('title', e.target.value)}
        fullWidth
        style={{ marginBottom: '10px' }}
        disabled={!editable}
      />
      {/* Add other editable fields here */}
      {editable && (
        <Button variant="contained" color="primary" onClick={onUpdate}>
          Save Changes
        </Button>
      )}
    </div>
  );
};

EventCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  priceRange: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
