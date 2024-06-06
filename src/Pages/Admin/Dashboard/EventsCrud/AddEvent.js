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

const AddEvents = ({ onEventAdded }) => {
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
  const [error, setError] = useState(''); 
  const [errors, setErrors] = useState({});

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
    setErrors({ ...errors, [name]: '' });
    if (name === 'eventImage') {
      setEventData({ ...eventData, [name]: files[0] });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };

  // Function to handle form field blur (when field loses focus)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  // Function to validate a specific field
  const validateField = (name, value) => {
    let newErrors = { ...errors };

    if (!value) {
      newErrors[name] = `${name[0].toUpperCase() + name.slice(1)} is required`;
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
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

    const newErrors = {};
    Object.keys(eventData).forEach(key => {
      if (!eventData[key]) {
        newErrors[key] = `${key[0].toUpperCase() + key.slice(1)} is required`;
      }
    });

    if (!eventData.name) newErrors.name = 'Event name is required';
    if (!eventData.eventImage) newErrors.eventImage = 'Event image is required';
    if (!eventData.date) newErrors.date = 'Event date is required';
    if (!eventData.time) newErrors.time = 'Event time is required';
    if (!eventData.location) newErrors.location = 'Location is required';
    if (!eventData.priceRange) newErrors.priceRange = 'Price range is required';
    if (!eventData.availability) newErrors.availability = 'Availability is required';
    if (!eventData.category) newErrors.category = 'Category is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

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

      // Read current counter value
      const counterRef = ref(database, 'events_counter');
      const counterSnapshot = await get(counterRef);
      let currentCounter = counterSnapshot.exists() ? counterSnapshot.val() : 0;

      // Increment counter
      const newCounter = currentCounter + 1;

      // Update counter value in database
      await set(counterRef, newCounter);

      await set(ref(database, 'events/' + sanitizedEventName), newEventData);
      setSuccess(`Event "${eventData.name}" created successfully`);
      setEventData({ eventID: '', name: '', eventImage: null, date: '', time: '', location: '', 
                      priceRange: '', availability: '', category: '' });
      generateNextEventID();

      // Notify the parent component about the addition of a new event
      onEventAdded(newEventData);
      setError('');
      
    } catch (error) {
      console.error('Error:', error);
      // setError('Error occurred while creating the event.');
    }
  };

  const handleNumberInput = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setEventData({ ...eventData, [name]: value });
      setErrors({ ...errors, [name]: '' });
      setError('');
    } else {
      // setError('Price Range must be an integer.');
      setErrors({ ...errors, [name]: 'This field must be a number' });
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
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            error={!!errors.name || eventNameExists}
            helperText={errors.name || (eventNameExists ? "Event name already exists." : "")}
          />
          {/* Event Image */}
          <TextField
            label="Event Image"
            name="eventImage"
            type="file"
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
            error={!!errors.eventImage}
            helperText={errors.eventImage}
          />
          {/* Event Date */}
          <TextField
            label="Event Date"
            name="date"
            type="date"
            value={eventData.date}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
            error={!!errors.date}
            helperText={errors.date}
          />
          {/* Event Time */}
          <TextField
            label="Event Time"
            name="time"
            type="time"
            value={eventData.time}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
            error={!!errors.time}
            helperText={errors.time}
          />
          {/* Location */}
          <TextField
            label="Location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            error={!!errors.location}
            helperText={errors.location}
          />
          {/* Price Range */}
          <TextField
            label="Price Range"
            name="priceRange"
            value={eventData.priceRange}
            onChange={handleNumberInput}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">Rs.</InputAdornment>}}
            error={!!errors.priceRange}
            helperText={errors.priceRange}
          />
          {/* Availability */}
          <TextField
            label="Availability"
            name="availability"
            value={eventData.availability}
            onChange={handleNumberInput}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            error={!!errors.availability}
            helperText={errors.availability}
          />
          {/* Category dropdown menu */}
          <TextField
            select
            label="Category"
            name="category"
            value={eventData.category}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            error={!!errors.category}
            helperText={errors.category}
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