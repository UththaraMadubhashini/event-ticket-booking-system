import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import { database, ref, set, get, child } from '../../../../firebase-config';
import { uploadBytesResumable, getDownloadURL, ref as storageRef } from "firebase/storage";
import { storage } from '../../../../firebase-config';

const AddEvents = () => {
  const [eventData, setEventData] = useState({
    eventID: '',
    name: '',
    eventImage: null,
    date: '',
    time: '',
    location: '',
    priceRange: '',
    availability: '',
    category: ''
  });
  const [success, setSuccess] = useState('');
  const [eventNameExists, setEventNameExists] = useState(false);
  const [error, setError] = useState(''); // Add state for error messages

  // Function to sanitize event name
  const sanitizeEventName = (name) => {
    return name.replace(/[.#$/[\]]/g, '');
  };

  // Function to check if event name exists
  const checkEventNameExists = useCallback(async (name) => {
    const sanitizedEventName = sanitizeEventName(name);
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `events/${sanitizedEventName}`));
    setEventNameExists(snapshot.exists());
  }, []);

  // Function to generate the next event ID
  const generateNextEventID = useCallback(async () => {
    const dbRef = ref(database, 'events');
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const events = snapshot.val();
      const eventCount = Object.keys(events).length;
      const nextEventID = eventCount + 1;
      setEventData(prevData => ({ ...prevData, eventID: nextEventID.toString() }));
    } else {
      setEventData(prevData => ({ ...prevData, eventID: '1' }));
    }
  }, []);

  // useEffect to check if event name exists whenever the event name changes
  useEffect(() => {
    if (eventData.name) {
      checkEventNameExists(eventData.name);
    }
  }, [eventData.name, checkEventNameExists]);

  // useEffect to generate the next event ID when the component mounts
  useEffect(() => {
    generateNextEventID();
  }, [generateNextEventID]);

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'eventImage') {
      setEventData({ ...eventData, [name]: files[0] });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };

  // Function to handle image upload
  const handleImageUpload = async () => {
    if (eventData.eventImage) {
      const imageRef = storageRef(storage, `events/${sanitizeEventName(eventData.name)}/image`);
      const uploadTask = uploadBytesResumable(imageRef, eventData.eventImage);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.error('Error uploading image:', error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    }
    return null;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const sanitizedEventName = sanitizeEventName(eventData.name);

    if (eventNameExists) {
      setError('Event name already exists. Please choose a different name.');
      return;
    }

    try {
      const imageUrl = await handleImageUpload();
      const newEventData = {
        ...eventData,
        eventImage: imageUrl,
      };

      await set(ref(database, 'events/' + sanitizedEventName), newEventData);
      setSuccess(`Event "${eventData.name}" created successfully`);
      setEventData({ eventID: '', name: '', eventImage: null, date: '', time: '', location: '', 
                      priceRange: '', availability: '', category: '' });
      generateNextEventID();

      const emptyFields = Object.entries(eventData).filter(([key, value]) => !String(value).trim());
      if (emptyFields.length > 0) {
        // Display alert message for empty fields
        setError(`Please fill in the following fields: ${emptyFields.map(([key]) => key).join(', ')}`);
      } else {
        // All fields are filled, proceed with form submission
        alert('Form submitted successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error occurred while creating the event.');
    }
  };

  const handleNumberInput = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setEventData({ ...eventData, [name]: value });
    } else {
      setError(`${name === 'priceRange' ? 'Price Range' : 'Availability'} must be a number.`);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center', p: 2 }}>
      <Paper elevation={4} sx={{ padding: '20px', width: '400px', textAlign: 'center' }}>
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          {/* Event ID */}
          <TextField
            label="Event ID"
            name="eventID"
            value={eventData.eventID}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            disabled
          />
          {/* Event Name */}
          <TextField
            label="Event Name"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          {/* Event Image */}
          <TextField
            label="Event Image"
            name="eventImage"
            type="file"
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
          />
          {/* Event Date */}
          <TextField
            label="Event Date"
            name="date"
            type="date"
            value={eventData.date}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
          />
          {/* Event Time */}
          <TextField
            label="Event Time"
            name="time"
            type="time"
            value={eventData.time}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
          />
          {/* Location */}
          <TextField
            label="Location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          {/* Price Range */}
          <TextField
            label="Price Range"
            name="priceRange"
            value={eventData.priceRange}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">Rs.</InputAdornment>
            }}
          />
          {/* Availability */}
          <TextField
            label="Availability"
            name="availability"
            value={eventData.availability}
            onChange={handleNumberInput}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          {/* Category dropdown menu */}
          <TextField
            select
            label="Category"
            name="category"
            value={eventData.category}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="Musical">Musical</MenuItem>
            <MenuItem value="Dancing">Dancing</MenuItem>
            <MenuItem value="Stage Drama">Stage Drama</MenuItem>
            <MenuItem value="Food festivals">Food festivals</MenuItem>
          </TextField>
          {/* Submit button */}
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
           Create Event 
          </Button>
        </form>
        {/* Success message */}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        {/* Error message */}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
    </Box>
  );
};

export default AddEvents;
