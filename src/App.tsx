import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logoBottom from './nobubar.png';


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100%; 
`;


const Container = styled.div`
position: relative;
display: flex;
flex-direction: column;
padding: 2rem;
max-width: 50em;
background-color: rgba(255, 255, 255, 0.8);
border-radius: 15px;
margin: 0 auto;
`;

const InputContainer = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
margin-bottom: 1rem;
width: 100%; /* add this line */
max-width: 25em; /* change from pixels to em */
`;

const Label = styled.label`
  margin-right: 1rem;
`;

const Input = styled.input`
width: 20em; 
margin-right: 1rem;
`;

const Button = styled.button`
  margin-top: 1rem;
`;

const Result = styled.div`
  margin-top: 1rem;
`;

const FixedImage = styled.img`
  position: fixed;
  right: 0;
  z-index: -1;
  height: auto;
  bottom: calc(5% - 32rem);
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Link = styled.a`
  color: #333;
  text-decoration: none;
  font-weight: bold;
`;

interface Profile {
  shotTime: number;
  outputGrams: number;
  inputGrams: number;
  temperature: number;
  grindSize: number;
  pressure: number;
  taste: string;
  coffeeName: string;
}

const App: React.FC = () => {
  const [shotTime, setShotTime] = useState<number>(0);
  const [outputGrams, setOutputGrams] = useState<number>(0);
  const [inputGrams, setInputGrams] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(90);
  const [grindSize, setGrindSize] = useState<number>(0);
  const [pressure, setPressure] = useState<number>(9);
  const [taste, setTaste] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string>('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [coffeeName, setCoffeeName] = useState<string>('');

  useEffect(() => {
    const savedProfiles = JSON.parse(localStorage.getItem('espressoProfiles') || '[]');
    setProfiles(savedProfiles);
  }, []);

  const saveProfile = () => {
    const newProfile: Profile = { shotTime, outputGrams, inputGrams, temperature, grindSize, pressure, taste, coffeeName };
    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    localStorage.setItem('espressoProfiles', JSON.stringify(updatedProfiles));
  };

  const handleTasteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTaste(e.target.value);
    let suggestionText = '';

    switch (e.target.value) {
      case 'too_bitter':
        suggestionText = 'Try a coarser grind size, lower temperature, or reduce pressure.';
        break;
      case 'too_sour':
        suggestionText = 'Try a finer grind size, higher temperature, or increase pressure.';
        break;
      case 'no_crema':
        suggestionText = 'Ensure your coffee is fresh, increase pressure, or try a finer grind size.';
        break;
      default:
        suggestionText = '';
    }

    setSuggestion(suggestionText);
  };

  return (
    <Wrapper>
      <Container>
        <h1>Espresso Shot Adjustments</h1>
        <InputContainer>
          <Label htmlFor="coffeeName">Coffee Name:</Label>
          <Input
            id="coffeeName"
            type="text"
            value={coffeeName}
            onChange={(e) => setCoffeeName(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="shotTime">Shot Time:</Label>
          <Input
            id="shotTime"
            type="number"
            value={shotTime}
            onChange={(e) => setShotTime(parseFloat(e.target.value))}
          />
          <span>seconds</span>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="outputGrams">Output Grams:</Label>
          <Input
            id="outputGrams"
            type="number"
            value={outputGrams}
            onChange={(e) => setOutputGrams(parseFloat(e.target.value))}
          />
          <span>g</span>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="inputGrams">Input Grams:</Label>
          <Input
            id="inputGrams"
            type="number"
            value={inputGrams}
            onChange={(e) => setInputGrams(parseFloat(e.target.value))}
          />
          <span>g</span>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="waterTemperature">Water Temperature:</Label>
          <Input
            id="waterTemperature"
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
          />
          <span>°C</span>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="pressure">Pressure:</Label>
          <Input
            id="pressure"
            type="number"
            value={pressure}
            onChange={(e) => setPressure(parseFloat(e.target.value))}
          />
          <span>bars</span>
        </InputContainer>
        <h3>Taste Feedback</h3>
        <select value={taste} onChange={handleTasteChange}>
          <option value="">--Select--</option>
          <option value="too_bitter">Too bitter</option>
          <option value="too_sour">Too sour</option>
          <option value="no_crema">No crema</option>
        </select>
        <Result>
          {suggestion && (
            <>
              <h4>Suggestion:</h4>
              <p>{suggestion}</p>
            </>
          )}
        </Result>
        <Button onClick={saveProfile}>Save Profile</Button>
        <h2>Saved Profiles</h2>
        <ul>
          {profiles.map((profile, index) => (
            <li key={index}>
              {`Shot Time: ${profile.shotTime}s, Output Grams: ${profile.outputGrams}g, Input Grams: ${profile.inputGrams}g, Temperature: ${profile.temperature}°C, Grind Size: ${profile.grindSize}, Pressure: ${profile.pressure} bars, Taste: ${profile.taste}`}
            </li>
          ))}
        </ul>
        <Footer>
          <p>
            Like this app? You can support me by donating on <Link href="https://ko-fi.com/stupidfatcat" target="_blank">Ko-fi</Link>!
          </p>
        </Footer>
        <FixedImage src={logoBottom} alt="Your image description" />
      </Container>
    </Wrapper>
  );
};

export default App;
