import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hiragana, katakana } from './components/kana';
import { Checkbox } from '@mantine/core';

function App() {
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedChars, setSelectedChars] = useState<Set<string>>(new Set());

  // Toggles the selection state of an entire row (sound). 
  // Adds or removes the row from selectedRows and updates all corresponding character selections in selectedChars accordingly.
  const toggleRow = (sound: string, chars: string[]) => {
    setSelectedRows((prev) =>
      prev.includes(sound)
        ? prev.filter((s) => s !== sound)
        : [...prev, sound]
    );

    setSelectedChars((prevChars) => {
      const updatedChars = new Set(prevChars);
      chars.forEach((char) => {
        if(!char) return;
        if(selectedRows.includes(sound)) {
          updatedChars.delete(char);
        }else{
          updatedChars.add(char)
        }
      });
      return updatedChars
    })
  };

  // Toggles the selection state of a single character.
  // Adds the character to selectedChars if it's not already selected, or removes it if it's already selected.
  const toggleChar = (char: string) => {
    setSelectedChars((prevChars) => {
      const updatedChars = new Set(prevChars);
      if(updatedChars.has(char)){
        updatedChars.delete(char);
      }else{
        updatedChars.add(char);
      }
      return updatedChars;
    })
  }

  // Toggles selection state for all hiragana
  const toggleSelectAllHiragana = () => {
    //check if all hiragana is already selected
    const hiraganaSounds = hiragana.map(h => h.sound);
    const isAllHiraganaSelected = hiraganaSounds.every(sound => selectedRows.includes(sound));

    if(isAllHiraganaSelected){
      //if all rows selected remove hiragana selections
      setSelectedRows(prevRows => prevRows.filter(sound => !hiraganaSounds.includes(sound)));
      setSelectedChars(prevChars => {
        const updatedChars = new Set(prevChars);
        hiragana.forEach(row => row.chars.forEach(char => updatedChars.delete(char)));
        return updatedChars;
      });
    }else{
      //if not all selected, select all hiragana
      setSelectedRows(prevRows => [...new Set([...prevRows, ...hiraganaSounds])]);
      setSelectedChars(prevChars => {
        const updatedChars = new Set(prevChars);
        hiragana.forEach(row => row.chars.forEach(char => updatedChars.add(char)));
        return updatedChars;
      });
    }
  }

  // Toggles selection state for all katakana
  const toggleSelectAllKatakana = () => {
    //check if all hiragana is already selected
    const katakanaSounds = katakana.map(k => k.sound);
    const isAllKatakanaSelected = katakanaSounds.every(sound => selectedRows.includes(sound));
  
    if (isAllKatakanaSelected) {
      //if all rows selected remove katakana selections
      setSelectedRows(prevRows => prevRows.filter(sound => !katakanaSounds.includes(sound)));
      setSelectedChars(prevChars => {
        const updatedChars = new Set(prevChars);
        katakana.forEach(row => row.chars.forEach(char => updatedChars.delete(char)));
        return updatedChars;
      });
    } else {
      //if not all selected, select all katakana
      setSelectedRows(prevRows => [...new Set([...prevRows, ...katakanaSounds])]);
      setSelectedChars(prevChars => {
        const updatedChars = new Set(prevChars);
        katakana.forEach(row => row.chars.forEach(char => updatedChars.add(char)));
        return updatedChars;
      });
    }
  };


  return (
    <div className="min-h-screen bg-[#090909] py-4">
      <div className="max-w-7xl mx-auto bg-neutral-900 border-2 border-gray-600 rounded-lg px-6 py-6 shadow-lg overflow-x-">

        {/* Scrollable Content Section */}
        <div className='flex flex-row gap-10 justify-center flex-grow overflow-y-auto max-h-[750px] px-4 mb-4'>
        
        {/* Hiragana section */}
        <div className='flex-1 flex flex-col items-center gap-6'>
          <h1 className='text-white font-bold text-3xl text-center'>平仮名<br />Hiragana</h1>
            <Checkbox
              onChange={toggleSelectAllHiragana}
              color="blue"
              label="Select All Hiragana"
              className="cursor-pointer"
              size="md"
              styles={{
                label: { color: 'white' }
              }}
            />
            <div className="w-full max-w-xs flex flex-col gap-4">
              {hiragana.map(({ sound, chars }) => (
                <div key={sound} className="flex items-center gap-4 justify-start">
                  <Checkbox
                    checked={selectedRows.includes(sound)}
                    onChange={() => toggleRow(sound, chars)}
                    color="blue"
                    className="cursor-pointer"
                    size="md"
                    radius="md"
                  />
                <div className="flex gap-2">
                  {chars.map((char, idx) =>
                    char ? (
                      <button
                        key={idx}
                        onClick={() => toggleChar(char)}
                        className={`text-2xl rounded-lg border-2 px-4 py-2 transition duration-300 ease-in-out
                          ${
                            selectedChars.has(char)
                              ? 'bg-blue-500 text-white border-blue-500'
                              : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                          }`}
                        >
                      {char}
                    </button>
                      ) : (
                        <div
                          key={idx}
                          className="px-4 py-2 opacity-20 bg-neutral-800 rounded-lg"
                        />
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Katakana Section */}
          <div className='flex-1 flex flex-col items-center gap-6'>
            <h1 className='text-white font-bold text-3xl text-center'>片仮名<br />Katakana</h1>
              <Checkbox
              onChange={toggleSelectAllKatakana}
              color="red"
              label="Select All Katakana"
              className="cursor-pointer"
              size="md"
              styles={{
                label: { color: 'white' }
              }}
            />
              <div className="w-full max-w-xs flex flex-col gap-4">
                {katakana.map(({ sound, chars }) => (
                <div key={sound} className="flex items-center gap-4 justify-start">
                  <Checkbox
                    checked={selectedRows.includes(sound)}
                    onChange={() => toggleRow(sound, chars)}
                    color="red"
                    className="cursor-pointer"
                    size="md"
                    radius="xl"
                  />
                  <div className="flex gap-2">
                    {chars.map((char, idx) =>
                      char ? (
                        <button
                          key={idx}
                          onClick={() => toggleChar(char)}
                          className={`text-2xl rounded-lg border-2 px-4 py-2 transition duration-300 ease-in-out
                            ${
                              selectedChars.has(char)
                                ? 'bg-red-500 text-white border-red-500'
                                : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                                }`}
                                >
                                {char}
                              </button>
                            ) : (
                              <div
                                key={idx}
                                className="px-4 py-2 opacity-20 bg-neutral-800 rounded-lg"
                              />
                              )
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
              {/* Start Button */}
              <div className='flex justify-center border-t border-gray-600'>
                <button
                  onClick={() => {
                    if (selectedChars.size > 0) {
                      navigate('/game', { state: { selectedChars: [...selectedChars] } });
                    } else {
                      alert('Select at least one character to start the game');
                    }
                  }}
                  className="px-10 py-3 text-lg font-bold rounded-lg transition mt-4 border-blue-500 border-2 text-blue-500 hover:bg-blue-500 hover:text-white"
                >
                  Start
                  </button>
                </div>
              </div>
            </div>
  );
}

export default App;
