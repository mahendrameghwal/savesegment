import  { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import schemaOptions from './data/schemaOptions';
import Popup from './components/Popup/Popup';
import toast from 'react-hot-toast';



function App() {
  {/* all the state for showing popup and schema and segment */}
  const [showPopup, setShowPopup] = useState(false);
  const [animatePopup, setAnimatePopup] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([]);

  {/** handle animination of popup */}
  useEffect(() => {
    if (showPopup) {
      setTimeout(() => setAnimatePopup(true), 10);
    } else {
      setAnimatePopup(false);
    }
  }, [showPopup]);

{/** after the save segment should be remove Popup */}
  const handleSaveSegment = () => setShowPopup(true);
  


  const handlePopupClose = () => {
    setAnimatePopup(false);
    setTimeout(() => {
      setShowPopup(false);
      setSegmentName('');
      setSchemas([]);
    }, 300);
  };

  {/* if schema is not include than add into schema array */}
  const handleAddSchema = (schema) => {
    if (schema && !schemas.includes(schema)) {
      setSchemas([...schemas, schema]);
    }
  };

  {/** for remove a special or specific schema */}
  const handleRemoveSchema = (schema) => {
    setSchemas(schemas.filter(s => s !== schema));
  };



{/** for make a post request to server using https://webhook-test.com/  */}  
const handleSubmit = async () => {
  const data = {
    segment_name: segmentName,
    schema: schemas.map(schema => ({
      [schema]: schemaOptions.find(opt => opt.value === schema)?.label
    })),
  };

  try {
    const response = await axios.post('https://webhook-test.com/e82aaee1a37770dfe3a17fcd840a5b77', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
console.log(response);
    if (response.status === 200) {
      toast.success('save schema to successfully');
      handlePopupClose();
    } else {
     toast.error('Failed to send data');
    }
  } catch (error) {
    toast.error(error.message)
  }
};



  const availableSchemas = schemaOptions.filter(opt => !schemas.includes(opt.value));

  return (
    <div className="app">
      <button onClick={handleSaveSegment} className="btn-primary">Save Segment</button>
      
      {showPopup && (
        <Popup
        animatePopup={animatePopup}
        availableSchemas={availableSchemas}
        handleSubmit={handleSubmit}
        handleRemoveSchema={handleRemoveSchema}
        handleAddSchema={handleAddSchema}
        setSegmentName={setSegmentName}
        segmentName={segmentName}
        schemas={schemas}
        schemaOptions={schemaOptions}
        handlePopupClose={handlePopupClose }
        />

      )}
    </div>
  );
}

export default App;