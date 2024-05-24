import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem'; // Import MenuItem for dropdown menu
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
    category: '' // Add category to the state
  });
  const [success, setSuccess] = useState('');
  const [eventNameExists, setEventNameExists] = useState(false);

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

  // useEffect to check if event name exists whenever the event name changes
  useEffect(() => {
    if (eventData.name) {
      checkEventNameExists(eventData.name);
    }
  }, [eventData.name, checkEventNameExists]);

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
    const sanitizedEventName = sanitizeEventName(eventData.name);

    if (eventNameExists) {
      setSuccess('Event name already exists. Please choose a different name.');
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
      setEventData({ eventID: '', name: '', eventImage: null, date: '', time: '', location: '', priceRange: '', availability: '', category: '' });
    } catch (error) {
      console.error('Error:', error);
      setSuccess('Error occurred while creating the event.');
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
          />
          {/* Availability */}
          <TextField
            label="Availability"
            name="availability"
            value={eventData.availability}
            onChange={handleChange}
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
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Create Event
          </Button>
        </form>
        {/* Success message */}
        {success && <p>{success}</p>}
      </Paper>
    </Box>
  );
};

export default AddEvents;
